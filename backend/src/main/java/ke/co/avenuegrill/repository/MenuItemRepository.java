package ke.co.avenuegrill.repository;

import java.util.UUID;
import ke.co.avenuegrill.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
}
