package ke.co.avenuegrill.entity;

/** Lifecycle of an order. See docs/03-DATA-MODEL.md. */
public enum OrderStatus {
    PENDING_PAYMENT,
    CONFIRMED,
    PREPARING,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
}
