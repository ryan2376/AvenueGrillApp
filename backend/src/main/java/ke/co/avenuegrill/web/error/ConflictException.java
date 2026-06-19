package ke.co.avenuegrill.web.error;

/**
 * Thrown when a request is well-formed but violates a business rule
 * (store closed, min order not met, out of zone, item unavailable).
 * Mapped to HTTP 409 with a machine-readable code.
 */
public class ConflictException extends RuntimeException {

    private final String code;

    public ConflictException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
