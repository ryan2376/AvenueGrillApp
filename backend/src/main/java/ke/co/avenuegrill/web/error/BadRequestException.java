package ke.co.avenuegrill.web.error;

/** Thrown for malformed input the bean-validation annotations can't express. Maps to HTTP 400. */
public class BadRequestException extends RuntimeException {

    private final String code;

    public BadRequestException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
