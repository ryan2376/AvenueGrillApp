package ke.co.avenuegrill.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "menu_option_value")
public class MenuOptionValue {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id", nullable = false)
    private MenuItemOption option;

    @Column(nullable = false)
    private String name;

    @Column(name = "price_delta_kes", nullable = false)
    private long priceDeltaKes;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    public UUID getId() { return id; }
    public String getName() { return name; }
    public long getPriceDeltaKes() { return priceDeltaKes; }
    public int getSortOrder() { return sortOrder; }
}
