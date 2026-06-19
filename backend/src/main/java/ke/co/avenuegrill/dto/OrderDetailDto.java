package ke.co.avenuegrill.dto;

import java.time.Instant;
import java.util.List;

/** Full order, returned by GET /orders/{reference} for the tracking page. */
public record OrderDetailDto(
        String reference,
        String status,
        String contactName,
        String contactPhone,
        String deliveryZone,
        String addressLine1,
        String landmark,
        long subtotalKes,
        long deliveryFeeKes,
        long totalKes,
        String paymentMethod,
        String paymentState,
        String notes,
        Instant placedAt,
        List<Item> items,
        List<StatusEvent> statusHistory) {

    public record Item(String name, int quantity, long unitPriceKes, long lineTotalKes) {
    }

    public record StatusEvent(String status, Instant at) {
    }
}
