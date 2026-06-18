package ke.co.avenuegrill.dto;

import java.util.List;
import java.util.UUID;

public record MenuItemOptionDto(
        UUID id,
        String name,
        boolean required,
        int minSelect,
        int maxSelect,
        List<MenuOptionValueDto> values) {
}
