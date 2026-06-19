package ke.co.avenuegrill.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

/** A delivery area with a flat fee. See V3 migration. */
@Entity
@Table(name = "delivery_zone")
public class DeliveryZone {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "fee_kes", nullable = false)
    private long feeKes;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getSlug() { return slug; }
    public long getFeeKes() { return feeKes; }
    public boolean isActive() { return active; }
    public int getSortOrder() { return sortOrder; }
}
