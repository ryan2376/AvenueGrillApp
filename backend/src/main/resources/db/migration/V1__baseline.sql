-- V1 baseline migration for Avenue Grill.
-- Establishes the store-settings singleton (config that the rest of the schema
-- builds on). Full menu/order/payment tables arrive in later phases — see
-- docs/03-DATA-MODEL.md. Money is stored as KES minor units (BIGINT).

CREATE TABLE store_settings (
    id                       INTEGER PRIMARY KEY DEFAULT 1,
    accepting_orders         BOOLEAN NOT NULL DEFAULT TRUE,
    open_time                TIME    NOT NULL DEFAULT '10:00',
    close_time               TIME    NOT NULL DEFAULT '22:00',
    min_order_kes            BIGINT  NOT NULL DEFAULT 0,
    default_delivery_fee_kes BIGINT  NOT NULL DEFAULT 0,
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT store_settings_singleton CHECK (id = 1)
);

-- Seed the single settings row (10:00–22:00 EAT, accepting orders).
INSERT INTO store_settings (id) VALUES (1);
