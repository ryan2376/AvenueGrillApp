package ke.co.avenuegrill.web;

import java.util.UUID;
import ke.co.avenuegrill.dto.MenuItemDto;
import ke.co.avenuegrill.dto.MenuResponse;
import ke.co.avenuegrill.service.MenuService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/menu")
    public MenuResponse getMenu() {
        return menuService.getMenu();
    }

    @GetMapping("/menu/items/{id}")
    public MenuItemDto getItem(@PathVariable UUID id) {
        return menuService.getItem(id);
    }
}
