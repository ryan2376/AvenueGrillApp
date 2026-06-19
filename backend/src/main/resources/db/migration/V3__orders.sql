-- V3: orders + delivery zones (Phase 3 — Checkout + Cash on Delivery).
-- See docs/03-DATA-MODEL.md and docs/04-API-SPECIFICATION.md.
-- Money is KES minor units (BIGINT). Totals are recomputed server-side at order time;
-- order_item snapshots name + unit price so later menu edits never change historical orders.

-- ── Delivery zones (flat fee each; distance-based pricing is a later phase) ──
CREATE TABLE delivery_zone (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT    NOT NULL,
    slug        TEXT    NOT NULL UNIQUE,
    fee_kes     BIGINT  NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order  INTEGER NOT NULL DEFAULT 0
);

INSERT INTO delivery_zone (name, slug, fee_kes, sort_order) VALUES
    ('Gitimbine',        'gitimbine',   15000, 1),
    ('Makutano',         'makutano',    20000, 2),
    ('Meru Town / CBD',  'meru-town',   25000, 3),
    ('Gakoromone',       'gakoromone',  25000, 4),
    ('Kaaga',            'kaaga',       30000, 5);

-- ── Human-friendly order reference counter (AG-YYMM-NNNN) ──
CREATE SEQUENCE order_reference_seq START 1;

-- ── Orders ──
CREATE TABLE orders (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference        TEXT    NOT NULL UNIQUE,
    contact_name     TEXT    NOT NULL,
    contact_phone    TEXT    NOT NULL,
    delivery_zone_id UUID    NOT NULL REFERENCES delivery_zone (id),
    address_line1    TEXT    NOT NULL,
    landmark         TEXT,
    status           TEXT    NOT NULL,
    fulfillment_type TEXT    NOT NULL DEFAULT 'DELIVERY',
    subtotal_kes     BIGINT  NOT NULL,
    delivery_fee_kes BIGINT  NOT NULL,
    total_kes        BIGINT  NOT NULL,
    payment_method   TEXT    NOT NULL,
    payment_state    TEXT    NOT NULL,
    notes            TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_orders_status_created ON orders (status, created_at);

-- ── Order line items (price snapshot at order time) ──
CREATE TABLE order_item (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id           UUID   NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    menu_item_id       UUID   NOT NULL REFERENCES menu_item (id),
    item_name_snapshot TEXT   NOT NULL,
    unit_price_kes     BIGINT NOT NULL,
    quantity           INTEGER NOT NULL,
    line_total_kes     BIGINT NOT NULL
);
CREATE INDEX idx_order_item_order ON order_item (order_id);

-- ── Append-only status history ──
CREATE TABLE order_status_event (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id   UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    status     TEXT NOT NULL,
    note       TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_order_status_event_order ON order_status_event (order_id, created_at);
