package ke.co.avenuegrill.web;

import java.util.List;
import ke.co.avenuegrill.dto.DeliveryZoneDto;
import ke.co.avenuegrill.dto.StoreStatusDto;
import ke.co.avenuegrill.service.OrderService;
import ke.co.avenuegrill.service.StoreService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class StoreController {

    private final StoreService storeService;
    private final OrderService orderService;

    public StoreController(StoreService storeService, OrderService orderService) {
        this.storeService = storeService;
        this.orderService = orderService;
    }

    @GetMapping("/store/status")
    public StoreStatusDto getStatus() {
        return storeService.getStatus();
    }

    @GetMapping("/store/delivery-zones")
    public List<DeliveryZoneDto> getDeliveryZones() {
        return orderService.getDeliveryZones();
    }
}
