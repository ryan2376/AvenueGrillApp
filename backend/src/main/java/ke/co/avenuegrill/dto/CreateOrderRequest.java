package ke.co.avenuegrill.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.UUID;
import ke.co.avenuegrill.entity.PaymentMethod;

/**
 * Incoming checkout request. The server recomputes all money from the menu —
 * client-supplied prices/totals are never trusted (see docs/04-API-SPECIFICATION.md).
 */
public record CreateOrderRequest(
        @NotEmpty @Valid List<Line> items,
        @NotBlank @Size(max = 120) String contactName,
        @NotBlank String contactPhone,
        @NotNull UUID deliveryZoneId,
        @NotBlank @Size(max = 240) String addressLine1,
        @Size(max = 160) String landmark,
        @NotNull PaymentMethod paymentMethod,
        @Size(max = 500) String notes) {

    public record Line(
            @NotNull UUID menuItemId,
            @Min(1) int quantity) {
    }
}
