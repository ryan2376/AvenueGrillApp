package ke.co.avenuegrill.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "menu_item_option")
public class MenuItemOption {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean required;

    @Column(name = "min_select", nullable = false)
    private int minSelect;

    @Column(name = "max_select", nullable = false)
    private int maxSelect;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @OneToMany(mappedBy = "option")
    @OrderBy("sortOrder ASC")
    private List<MenuOptionValue> values = new ArrayList<>();

    public UUID getId() { return id; }
    public String getName() { return name; }
    public boolean isRequired() { return required; }
    public int getMinSelect() { return minSelect; }
    public int getMaxSelect() { return maxSelect; }
    public int getSortOrder() { return sortOrder; }
    public List<MenuOptionValue> getValues() { return values; }
}
