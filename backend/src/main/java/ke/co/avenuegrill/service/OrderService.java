package ke.co.avenuegrill.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import ke.co.avenuegrill.dto.CreateOrderRequest;
import ke.co.avenuegrill.dto.DeliveryZoneDto;
import ke.co.avenuegrill.dto.OrderDetailDto;
import ke.co.avenuegrill.dto.OrderResponse;
import ke.co.avenuegrill.dto.OrderStatusDto;
import ke.co.avenuegrill.dto.StoreStatusDto;
import ke.co.avenuegrill.entity.DeliveryZone;
import ke.co.avenuegrill.entity.MenuItem;
import ke.co.avenuegrill.entity.Order;
import ke.co.avenuegrill.entity.OrderItem;
import ke.co.avenuegrill.entity.OrderStatus;
import ke.co.avenuegrill.entity.OrderStatusEvent;
import ke.co.avenuegrill.entity.PaymentMethod;
import ke.co.avenuegrill.entity.PaymentState;
import ke.co.avenuegrill.repository.DeliveryZoneRepository;
import ke.co.avenuegrill.repository.MenuItemRepository;
import ke.co.avenuegrill.repository.OrderRepository;
import ke.co.avenuegrill.web.error.BadRequestException;
import ke.co.avenuegrill.web.error.ConflictException;
import ke.co.avenuegrill.web.error.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private static final ZoneId EAT = ZoneId.of("Africa/Nairobi");

    private final OrderRepository orders;
    private final MenuItemRepository menuItems;
    private final DeliveryZoneRepository zones;
    private final StoreService storeService;

    public OrderService(OrderRepository orders, MenuItemRepository menuItems,
                        DeliveryZoneRepository zones, StoreService storeService) {
        this.orders = orders;
        this.menuItems = menuItems;
        this.zones = zones;
        this.storeService = storeService;
    }

    @Transactional(readOnly = true)
    public List<DeliveryZoneDto> getDeliveryZones() {
        return zones.findByActiveTrueOrderBySortOrderAsc().stream()
                .map(z -> new DeliveryZoneDto(z.getId(), z.getName(), z.getSlug(), z.getFeeKes()))
                .toList();
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest req) {
        StoreStatusDto store = storeService.getStatus();
        if (!store.isOpenNow()) {
            throw new ConflictException("STORE_CLOSED",
                    "We're not accepting orders right now. Please try during opening hours.");
        }

        DeliveryZone zone = zones.findById(req.deliveryZoneId())
                .filter(DeliveryZone::isActive)
                .orElseThrow(() -> new ConflictException("OUT_OF_ZONE",
                        "We don't deliver to that area yet."));

        Order order = new Order();
        long subtotal = 0;
        for (CreateOrderRequest.Line line : req.items()) {
            MenuItem item = menuItems.findById(line.menuItemId())
                    .orElseThrow(() -> new ConflictException("ITEM_UNAVAILABLE",
                            "An item in your cart is no longer available."));
            if (!item.isAvailable()) {
                throw new ConflictException("ITEM_UNAVAILABLE",
                        item.getName() + " is currently sold out.");
            }
            OrderItem orderItem = new OrderItem(item, item.getName(), item.getPriceKes(), line.quantity());
            order.addItem(orderItem);
            subtotal += orderItem.getLineTotalKes();
        }

        if (subtotal < store.minOrderKes()) {
            throw new ConflictException("MIN_ORDER_NOT_MET",
                    "Minimum order is not met.");
        }

        long deliveryFee = zone.getFeeKes();

        order.setReference(nextReference());
        order.setContactName(req.contactName().trim());
        order.setContactPhone(normalizePhone(req.contactPhone()));
        order.setDeliveryZone(zone);
        order.setAddressLine1(req.addressLine1().trim());
        order.setLandmark(blankToNull(req.landmark()));
        order.setNotes(blankToNull(req.notes()));
        order.setSubtotalKes(subtotal);
        order.setDeliveryFeeKes(deliveryFee);
        order.setTotalKes(subtotal + deliveryFee);
        order.setPaymentMethod(req.paymentMethod());

        // Cash → confirmed immediately. M-Pesa → awaits payment (settled in Phase 4).
        if (req.paymentMethod() == PaymentMethod.CASH) {
            order.setStatus(OrderStatus.CONFIRMED);
            order.setPaymentState(PaymentState.NOT_REQUIRED);
            order.addStatusEvent(new OrderStatusEvent(OrderStatus.CONFIRMED, "Order placed — Cash on Delivery."));
        } else {
            order.setStatus(OrderStatus.PENDING_PAYMENT);
            order.setPaymentState(PaymentState.PENDING);
            order.addStatusEvent(new OrderStatusEvent(OrderStatus.PENDING_PAYMENT, "Order placed — awaiting M-Pesa payment."));
        }

        Order saved = orders.save(order);

        boolean paymentRequired = saved.getPaymentMethod() == PaymentMethod.MPESA;
        return new OrderResponse(
                saved.getReference(),
                saved.getStatus().name(),
                saved.getSubtotalKes(),
                saved.getDeliveryFeeKes(),
                saved.getTotalKes(),
                saved.getPaymentMethod().name(),
                saved.getPaymentState().name(),
                new OrderResponse.Payment(paymentRequired, saved.getPaymentState().name()));
    }

    @Transactional(readOnly = true)
    public OrderDetailDto getOrder(String reference) {
        Order order = orders.findByReference(reference)
                .orElseThrow(() -> new NotFoundException("NOT_FOUND", "Order not found"));

        List<OrderDetailDto.Item> items = order.getItems().stream()
                .map(i -> new OrderDetailDto.Item(
                        i.getItemNameSnapshot(), i.getQuantity(), i.getUnitPriceKes(), i.getLineTotalKes()))
                .toList();

        List<OrderDetailDto.StatusEvent> history = order.getStatusEvents().stream()
                .map(e -> new OrderDetailDto.StatusEvent(e.getStatus().name(), e.getCreatedAt()))
                .toList();

        return new OrderDetailDto(
                order.getReference(), order.getStatus().name(),
                order.getContactName(), order.getContactPhone(),
                order.getDeliveryZone().getName(), order.getAddressLine1(), order.getLandmark(),
                order.getSubtotalKes(), order.getDeliveryFeeKes(), order.getTotalKes(),
                order.getPaymentMethod().name(), order.getPaymentState().name(), order.getNotes(),
                order.getCreatedAt(), items, history);
    }

    @Transactional(readOnly = true)
    public OrderStatusDto getOrderStatus(String reference) {
        Order order = orders.findByReference(reference)
                .orElseThrow(() -> new NotFoundException("NOT_FOUND", "Order not found"));
        return new OrderStatusDto(order.getReference(), order.getStatus().name(), order.getPaymentState().name());
    }

    /** Build a human-friendly reference like AG-2606-0042 (YYMM + monotonic counter). */
    private String nextReference() {
        LocalDate today = LocalDate.now(EAT);
        long n = orders.nextReferenceNumber();
        return String.format("AG-%02d%02d-%04d", today.getYear() % 100, today.getMonthValue(), n);
    }

    /** Normalize Kenyan phone input to 2547XXXXXXXX / 2541XXXXXXXX. */
    static String normalizePhone(String raw) {
        String digits = raw.replaceAll("[^0-9]", "");
        if (digits.startsWith("0") && digits.length() == 10) {
            digits = "254" + digits.substring(1);
        } else if (digits.length() == 9 && (digits.startsWith("7") || digits.startsWith("1"))) {
            digits = "254" + digits;
        }
        if (!digits.matches("254[17][0-9]{8}")) {
            throw new BadRequestException("VALIDATION_ERROR",
                    "Enter a valid Kenyan phone number, e.g. 0712 345 678.");
        }
        return digits;
    }

    private static String blankToNull(String s) {
        if (s == null) return null;
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }
}
