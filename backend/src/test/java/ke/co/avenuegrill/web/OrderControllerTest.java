package ke.co.avenuegrill.web;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import ke.co.avenuegrill.dto.OrderResponse;
import ke.co.avenuegrill.service.OrderService;
import ke.co.avenuegrill.web.error.ConflictException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private OrderService orderService;

    private static final String VALID_BODY = """
            {
              "items": [ { "menuItemId": "11111111-1111-1111-1111-111111111111", "quantity": 2 } ],
              "contactName": "Jane W.",
              "contactPhone": "0712345678",
              "deliveryZoneId": "22222222-2222-2222-2222-222222222222",
              "addressLine1": "Near the market",
              "paymentMethod": "CASH"
            }
            """;

    @Test
    void createsCashOrder() throws Exception {
        when(orderService.createOrder(any())).thenReturn(new OrderResponse(
                "AG-2606-0042", "CONFIRMED", 90000, 15000, 105000,
                "CASH", "NOT_REQUIRED", new OrderResponse.Payment(false, "NOT_REQUIRED")));

        mvc.perform(post("/api/v1/orders").contentType(MediaType.APPLICATION_JSON).content(VALID_BODY))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.reference").value("AG-2606-0042"))
                .andExpect(jsonPath("$.status").value("CONFIRMED"))
                .andExpect(jsonPath("$.totalKes").value(105000))
                .andExpect(jsonPath("$.payment.required").value(false));
    }

    @Test
    void rejectsInvalidBodyWith400() throws Exception {
        // empty items + missing required fields → bean validation kicks in
        mvc.perform(post("/api/v1/orders").contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"items\": [] }"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error.code").value("VALIDATION_ERROR"));
    }

    @Test
    void storeClosedReturns409Envelope() throws Exception {
        when(orderService.createOrder(any()))
                .thenThrow(new ConflictException("STORE_CLOSED", "We're not accepting orders right now."));

        mvc.perform(post("/api/v1/orders").contentType(MediaType.APPLICATION_JSON).content(VALID_BODY))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error.code").value("STORE_CLOSED"));
    }

    @Test
    void returnsOrderStatus() throws Exception {
        when(orderService.getOrderStatus("AG-2606-0042"))
                .thenReturn(new ke.co.avenuegrill.dto.OrderStatusDto("AG-2606-0042", "CONFIRMED", "NOT_REQUIRED"));

        mvc.perform(get("/api/v1/orders/AG-2606-0042/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CONFIRMED"))
                .andExpect(jsonPath("$.paymentState").value("NOT_REQUIRED"));
    }
}
