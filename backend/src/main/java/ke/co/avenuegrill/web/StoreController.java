package ke.co.avenuegrill.web;

import ke.co.avenuegrill.dto.StoreStatusDto;
import ke.co.avenuegrill.service.StoreService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping("/store/status")
    public StoreStatusDto getStatus() {
        return storeService.getStatus();
    }
}
