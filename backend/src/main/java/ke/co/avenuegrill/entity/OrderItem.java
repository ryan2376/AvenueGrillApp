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

/** A single line of an order, with name + unit price snapshotted at order time. */
@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @Column(name = "item_name_snapshot", nullable = false)
    private String itemNameSnapshot;

    @Column(name = "unit_price_kes", nullable = false)
    private long unitPriceKes;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "line_total_kes", nullable = false)
    private long lineTotalKes;

    protected OrderItem() {
    }

    public OrderItem(MenuItem menuItem, String itemNameSnapshot, long unitPriceKes, int quantity) {
        this.menuItem = menuItem;
        this.itemNameSnapshot = itemNameSnapshot;
        this.unitPriceKes = unitPriceKes;
        this.quantity = quantity;
        this.lineTotalKes = unitPriceKes * quantity;
    }

    public UUID getId() { return id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public MenuItem getMenuItem() { return menuItem; }
    public String getItemNameSnapshot() { return itemNameSnapshot; }
    public long getUnitPriceKes() { return unitPriceKes; }
    public int getQuantity() { return quantity; }
    public long getLineTotalKes() { return lineTotalKes; }
}
