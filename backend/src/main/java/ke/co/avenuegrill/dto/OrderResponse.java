package ke.co.avenuegrill.dto;

/**
 * Result of creating an order (HTTP 201). Cash → CONFIRMED, payment not required.
 * M-Pesa → PENDING_PAYMENT, payment required (settled in Phase 4).
 */
public record OrderResponse(
        String reference,
        String status,
        long subtotalKes,
        long deliveryFeeKes,
        long totalKes,
        String paymentMethod,
        String paymentState,
        Payment payment) {

    public record Payment(boolean required, String state) {
    }
}
