package ke.co.avenuegrill.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String reference;

    @Column(name = "contact_name", nullable = false)
    private String contactName;

    @Column(name = "contact_phone", nullable = false)
    private String contactPhone;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "delivery_zone_id", nullable = false)
    private DeliveryZone deliveryZone;

    @Column(name = "address_line1", nullable = false)
    private String addressLine1;

    @Column(columnDefinition = "text")
    private String landmark;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(name = "fulfillment_type", nullable = false)
    private String fulfillmentType = "DELIVERY";

    @Column(name = "subtotal_kes", nullable = false)
    private long subtotalKes;

    @Column(name = "delivery_fee_kes", nullable = false)
    private long deliveryFeeKes;

    @Column(name = "total_kes", nullable = false)
    private long totalKes;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_state", nullable = false)
    private PaymentState paymentState;

    @Column(columnDefinition = "text")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("createdAt ASC")
    private List<OrderStatusEvent> statusEvents = new ArrayList<>();

    public void addItem(OrderItem item) {
        item.setOrder(this);
        items.add(item);
    }

    public void addStatusEvent(OrderStatusEvent event) {
        event.setOrder(this);
        statusEvents.add(event);
    }

    public UUID getId() { return id; }

    public String getReference() { return reference; }
    public void setReference(String reference) { this.reference = reference; }

    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public DeliveryZone getDeliveryZone() { return deliveryZone; }
    public void setDeliveryZone(DeliveryZone deliveryZone) { this.deliveryZone = deliveryZone; }

    public String getAddressLine1() { return addressLine1; }
    public void setAddressLine1(String addressLine1) { this.addressLine1 = addressLine1; }

    public String getLandmark() { return landmark; }
    public void setLandmark(String landmark) { this.landmark = landmark; }

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public String getFulfillmentType() { return fulfillmentType; }
    public void setFulfillmentType(String fulfillmentType) { this.fulfillmentType = fulfillmentType; }

    public long getSubtotalKes() { return subtotalKes; }
    public void setSubtotalKes(long subtotalKes) { this.subtotalKes = subtotalKes; }

    public long getDeliveryFeeKes() { return deliveryFeeKes; }
    public void setDeliveryFeeKes(long deliveryFeeKes) { this.deliveryFeeKes = deliveryFeeKes; }

    public long getTotalKes() { return totalKes; }
    public void setTotalKes(long totalKes) { this.totalKes = totalKes; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }

    public PaymentState getPaymentState() { return paymentState; }
    public void setPaymentState(PaymentState paymentState) { this.paymentState = paymentState; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

    public List<OrderItem> getItems() { return items; }
    public List<OrderStatusEvent> getStatusEvents() { return statusEvents; }
}
