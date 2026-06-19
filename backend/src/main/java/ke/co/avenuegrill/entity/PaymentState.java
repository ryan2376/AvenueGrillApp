package ke.co.avenuegrill.entity;

/**
 * Payment progress. In Phase 3 only NOT_REQUIRED (cash) and PENDING (M-Pesa
 * placeholder) are used; the remaining states are filled in by Phase 4.
 */
public enum PaymentState {
    NOT_REQUIRED,
    PENDING,
    INITIATED,
    PAID,
    FAILED
}
