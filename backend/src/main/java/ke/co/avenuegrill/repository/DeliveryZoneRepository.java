package ke.co.avenuegrill.repository;

import java.util.List;
import java.util.UUID;
import ke.co.avenuegrill.entity.DeliveryZone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryZoneRepository extends JpaRepository<DeliveryZone, UUID> {

    List<DeliveryZone> findByActiveTrueOrderBySortOrderAsc();
}
