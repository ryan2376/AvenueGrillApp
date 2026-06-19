package ke.co.avenuegrill.repository;

import java.util.Optional;
import java.util.UUID;
import ke.co.avenuegrill.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByReference(String reference);

    /** Atomic next value of the human-friendly reference counter (see V3 migration). */
    @Query(value = "SELECT nextval('order_reference_seq')", nativeQuery = true)
    long nextReferenceNumber();
}
