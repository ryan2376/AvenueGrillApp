package ke.co.avenuegrill.dto;

import java.util.List;
import java.util.UUID;

public record MenuCategoryDto(
        UUID id,
        String name,
        String slug,
        String tagline,
        int sortOrder,
        List<MenuItemDto> items) {
}
