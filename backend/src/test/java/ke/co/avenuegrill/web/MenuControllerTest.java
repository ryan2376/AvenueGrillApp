package ke.co.avenuegrill.web;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.UUID;
import ke.co.avenuegrill.dto.MenuCategoryDto;
import ke.co.avenuegrill.dto.MenuResponse;
import ke.co.avenuegrill.service.MenuService;
import ke.co.avenuegrill.web.error.NotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(MenuController.class)
class MenuControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private MenuService menuService;

    @Test
    void returnsMenu() throws Exception {
        var category = new MenuCategoryDto(
                UUID.randomUUID(), "Off the Grill", "off-the-grill", "Flame-grilled to perfection", 1, List.of());
        when(menuService.getMenu()).thenReturn(new MenuResponse(List.of(category)));

        mvc.perform(get("/api/v1/menu"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categories[0].slug").value("off-the-grill"));
    }

    @Test
    void itemNotFoundReturns404Envelope() throws Exception {
        when(menuService.getItem(any())).thenThrow(new NotFoundException("NOT_FOUND", "Menu item not found"));

        mvc.perform(get("/api/v1/menu/items/{id}", UUID.randomUUID()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.code").value("NOT_FOUND"));
    }
}
