package ke.co.avenuegrill.service;

import java.util.List;
import java.util.UUID;
import ke.co.avenuegrill.dto.MenuCategoryDto;
import ke.co.avenuegrill.dto.MenuItemDto;
import ke.co.avenuegrill.dto.MenuItemOptionDto;
import ke.co.avenuegrill.dto.MenuOptionValueDto;
import ke.co.avenuegrill.dto.MenuResponse;
import ke.co.avenuegrill.entity.MenuCategory;
import ke.co.avenuegrill.entity.MenuItem;
import ke.co.avenuegrill.entity.MenuItemOption;
import ke.co.avenuegrill.entity.MenuOptionValue;
import ke.co.avenuegrill.repository.MenuCategoryRepository;
import ke.co.avenuegrill.repository.MenuItemRepository;
import ke.co.avenuegrill.web.error.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MenuService {

    private final MenuCategoryRepository categories;
    private final MenuItemRepository items;

    public MenuService(MenuCategoryRepository categories, MenuItemRepository items) {
        this.categories = categories;
        this.items = items;
    }

    @Transactional(readOnly = true)
    public MenuResponse getMenu() {
        List<MenuCategoryDto> dtos = categories.findByActiveTrueOrderBySortOrderAsc().stream()
                .map(this::toCategoryDto)
                .toList();
        return new MenuResponse(dtos);
    }

    @Transactional(readOnly = true)
    public MenuItemDto getItem(UUID id) {
        MenuItem item = items.findById(id)
                .orElseThrow(() -> new NotFoundException("NOT_FOUND", "Menu item not found"));
        return toItemDto(item);
    }

    private MenuCategoryDto toCategoryDto(MenuCategory c) {
        List<MenuItemDto> itemDtos = c.getItems().stream().map(this::toItemDto).toList();
        return new MenuCategoryDto(c.getId(), c.getName(), c.getSlug(), c.getTagline(), c.getSortOrder(), itemDtos);
    }

    private MenuItemDto toItemDto(MenuItem i) {
        List<MenuItemOptionDto> optionDtos = i.getOptions().stream().map(this::toOptionDto).toList();
        return new MenuItemDto(
                i.getId(), i.getName(), i.getDescription(), i.getPriceKes(),
                i.getImageUrl(), i.isAvailable(), i.isFeatured(), optionDtos);
    }

    private MenuItemOptionDto toOptionDto(MenuItemOption o) {
        List<MenuOptionValueDto> valueDtos = o.getValues().stream()
                .map(this::toValueDto)
                .toList();
        return new MenuItemOptionDto(o.getId(), o.getName(), o.isRequired(), o.getMinSelect(), o.getMaxSelect(), valueDtos);
    }

    private MenuOptionValueDto toValueDto(MenuOptionValue v) {
        return new MenuOptionValueDto(v.getId(), v.getName(), v.getPriceDeltaKes());
    }
}
