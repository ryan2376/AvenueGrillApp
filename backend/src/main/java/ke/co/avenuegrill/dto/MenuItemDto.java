package ke.co.avenuegrill.dto;

import java.util.List;
import java.util.UUID;

public record MenuItemDto(
        UUID id,
        String name,
        String description,
        long priceKes,
        String imageUrl,
        boolean available,
        boolean featured,
        List<MenuItemOptionDto> options) {
}
