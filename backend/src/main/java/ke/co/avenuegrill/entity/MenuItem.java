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
@Table(name = "menu_item")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private MenuCategory category;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "price_kes", nullable = false)
    private long priceKes;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(nullable = false)
    private boolean available = true;

    @Column(nullable = false)
    private boolean featured = false;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @OneToMany(mappedBy = "menuItem")
    @OrderBy("sortOrder ASC")
    private List<MenuItemOption> options = new ArrayList<>();

    public UUID getId() { return id; }
    public MenuCategory getCategory() { return category; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public long getPriceKes() { return priceKes; }
    public String getImageUrl() { return imageUrl; }
    public boolean isAvailable() { return available; }
    public boolean isFeatured() { return featured; }
    public int getSortOrder() { return sortOrder; }
    public List<MenuItemOption> getOptions() { return options; }
}
