package ke.co.avenuegrill.dto;

import java.util.UUID;

public record DeliveryZoneDto(UUID id, String name, String slug, long feeKes) {
}
