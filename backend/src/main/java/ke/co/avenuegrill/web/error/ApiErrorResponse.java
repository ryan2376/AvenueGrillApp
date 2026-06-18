package ke.co.avenuegrill.web.error;

import java.util.List;

/** Standard error envelope (see docs/04-API-SPECIFICATION.md). */
public record ApiErrorResponse(ErrorBody error) {

    public record ErrorBody(String code, String message, List<FieldIssue> details) {
    }

    public record FieldIssue(String field, String issue) {
    }

    public static ApiErrorResponse of(String code, String message) {
        return new ApiErrorResponse(new ErrorBody(code, message, null));
    }
}
