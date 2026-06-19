package ke.co.avenuegrill.dto;

/** Lightweight polling payload for GET /orders/{reference}/status. */
public record OrderStatusDto(String reference, String status, String paymentState) {
}
