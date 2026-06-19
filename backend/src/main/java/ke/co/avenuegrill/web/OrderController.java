package ke.co.avenuegrill.web;

import jakarta.validation.Valid;
import ke.co.avenuegrill.dto.CreateOrderRequest;
import ke.co.avenuegrill.dto.OrderDetailDto;
import ke.co.avenuegrill.dto.OrderResponse;
import ke.co.avenuegrill.dto.OrderStatusDto;
import ke.co.avenuegrill.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse create(@Valid @RequestBody CreateOrderRequest request) {
        return orderService.createOrder(request);
    }

    @GetMapping("/orders/{reference}")
    public OrderDetailDto get(@PathVariable String reference) {
        return orderService.getOrder(reference);
    }

    @GetMapping("/orders/{reference}/status")
    public OrderStatusDto status(@PathVariable String reference) {
        return orderService.getOrderStatus(reference);
    }
}
