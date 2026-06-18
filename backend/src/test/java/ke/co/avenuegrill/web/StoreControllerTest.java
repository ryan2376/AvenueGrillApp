package ke.co.avenuegrill.web;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import ke.co.avenuegrill.dto.StoreStatusDto;
import ke.co.avenuegrill.service.StoreService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(StoreController.class)
class StoreControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private StoreService storeService;

    @Test
    void returnsStoreStatus() throws Exception {
        when(storeService.getStatus())
                .thenReturn(new StoreStatusDto(true, "10:00", "22:00", true, 0, 15000, "EAT"));

        mvc.perform(get("/api/v1/store/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isOpenNow").value(true))
                .andExpect(jsonPath("$.timezone").value("EAT"));
    }
}
