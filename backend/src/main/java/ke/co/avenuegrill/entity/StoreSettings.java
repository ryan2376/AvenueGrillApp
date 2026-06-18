package ke.co.avenuegrill.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalTime;

/** Singleton row (id = 1) holding store-wide settings. See V1 migration. */
@Entity
@Table(name = "store_settings")
public class StoreSettings {

    @Id
    private Integer id;

    @Column(name = "accepting_orders", nullable = false)
    private boolean acceptingOrders;

    @Column(name = "open_time", nullable = false)
    private LocalTime openTime;

    @Column(name = "close_time", nullable = false)
    private LocalTime closeTime;

    @Column(name = "min_order_kes", nullable = false)
    private long minOrderKes;

    @Column(name = "default_delivery_fee_kes", nullable = false)
    private long defaultDeliveryFeeKes;

    public Integer getId() { return id; }
    public boolean isAcceptingOrders() { return acceptingOrders; }
    public LocalTime getOpenTime() { return openTime; }
    public LocalTime getCloseTime() { return closeTime; }
    public long getMinOrderKes() { return minOrderKes; }
    public long getDefaultDeliveryFeeKes() { return defaultDeliveryFeeKes; }
}
