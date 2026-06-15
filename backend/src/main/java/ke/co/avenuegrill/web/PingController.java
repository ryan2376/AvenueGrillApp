package ke.co.avenuegrill.web;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Minimal liveness/sanity endpoint used to confirm the API is up and the
 * frontend → backend wiring works. Health details live at {@code /actuator/health}.
 */
@RestController
@RequestMapping("/api/v1")
public class PingController {

    @GetMapping("/ping")
    public Map<String, Object> ping() {
        return Map.of(
                "status", "ok",
                "service", "avenue-grill-backend"
        );
    }
}
