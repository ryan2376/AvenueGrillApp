package ke.co.avenuegrill.service;

import java.time.LocalTime;
import java.time.ZoneId;
import ke.co.avenuegrill.dto.StoreStatusDto;
import ke.co.avenuegrill.entity.StoreSettings;
import ke.co.avenuegrill.repository.StoreSettingsRepository;
import ke.co.avenuegrill.web.error.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StoreService {

    /** Kenya operates on East Africa Time (UTC+3). */
    private static final ZoneId EAT = ZoneId.of("Africa/Nairobi");

    private final StoreSettingsRepository repository;

    public StoreService(StoreSettingsRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public StoreStatusDto getStatus() {
        StoreSettings s = repository.findById(1)
                .orElseThrow(() -> new NotFoundException("NOT_FOUND", "Store settings not configured"));

        boolean isOpenNow = s.isAcceptingOrders() && withinHours(s.getOpenTime(), s.getCloseTime());

        return new StoreStatusDto(
                s.isAcceptingOrders(),
                s.getOpenTime().toString(),
                s.getCloseTime().toString(),
                isOpenNow,
                s.getMinOrderKes(),
                s.getDefaultDeliveryFeeKes(),
                "EAT");
    }

    private boolean withinHours(LocalTime open, LocalTime close) {
        LocalTime now = LocalTime.now(EAT);
        if (close.isAfter(open)) {
            return !now.isBefore(open) && now.isBefore(close);
        }
        // Overnight window (e.g., 10:00 → 02:00): open if after open OR before close.
        return !now.isBefore(open) || now.isBefore(close);
    }
}
