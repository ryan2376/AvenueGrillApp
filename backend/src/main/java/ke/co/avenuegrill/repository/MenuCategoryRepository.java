package ke.co.avenuegrill.repository;

import java.util.List;
import java.util.UUID;
import ke.co.avenuegrill.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, UUID> {

    List<MenuCategory> findByActiveTrueOrderBySortOrderAsc();
}
