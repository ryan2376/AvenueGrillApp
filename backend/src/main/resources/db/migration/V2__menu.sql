-- V2: menu schema + seed.
-- See docs/03-DATA-MODEL.md and docs/04-API-SPECIFICATION.md.
-- Money is KES minor units (BIGINT). UUID PKs via gen_random_uuid() (built-in, PG13+).

CREATE TABLE menu_category (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT    NOT NULL,
    slug        TEXT    NOT NULL UNIQUE,
    tagline     TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    active      BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE menu_item (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID    NOT NULL REFERENCES menu_category (id),
    name        TEXT    NOT NULL,
    description TEXT,
    price_kes   BIGINT  NOT NULL,
    image_url   TEXT,
    available   BOOLEAN NOT NULL DEFAULT TRUE,
    featured    BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_menu_item_category ON menu_item (category_id, sort_order);

CREATE TABLE menu_item_option (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_item_id UUID    NOT NULL REFERENCES menu_item (id) ON DELETE CASCADE,
    name         TEXT    NOT NULL,
    required     BOOLEAN NOT NULL DEFAULT FALSE,
    min_select   INTEGER NOT NULL DEFAULT 0,
    max_select   INTEGER NOT NULL DEFAULT 1,
    sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE menu_option_value (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    option_id       UUID    NOT NULL REFERENCES menu_item_option (id) ON DELETE CASCADE,
    name            TEXT    NOT NULL,
    price_delta_kes BIGINT  NOT NULL DEFAULT 0,
    sort_order      INTEGER NOT NULL DEFAULT 0
);

-- ── Seed: categories ───────────────────────────────────────────────
INSERT INTO menu_category (name, slug, tagline, sort_order) VALUES
    ('Off the Grill',       'off-the-grill',     'Flame-grilled to perfection', 1),
    ('Kenyan Favourites',   'kenyan-favourites', 'The tastes of home',          2),
    ('Sides & Salads',      'sides-salads',      'Fresh and crisp',             3),
    ('Milkshakes & Drinks', 'milkshakes-drinks', 'Thick, creamy treats',        4);

-- ── Seed: items (prices in KES minor units; images served from frontend /public) ──
INSERT INTO menu_item (category_id, name, description, price_kes, image_url, featured, sort_order) VALUES
    ((SELECT id FROM menu_category WHERE slug = 'off-the-grill'),
        'Grilled Chicken', 'Juicy, tender and perfectly seasoned over the open flame.', 45000, '/food/grilled-chicken.jpg', TRUE, 1),
    ((SELECT id FROM menu_category WHERE slug = 'off-the-grill'),
        'Grilled Tilapia', 'Whole fresh tilapia, charred and full of flavour, with lemon.', 60000, '/food/grilled-tilapia.jpg', TRUE, 2),
    ((SELECT id FROM menu_category WHERE slug = 'kenyan-favourites'),
        'Pilau', 'Fragrant spiced rice with golden onions, served with kachumbari.', 25000, '/food/pilau.jpg', TRUE, 1),
    ((SELECT id FROM menu_category WHERE slug = 'kenyan-favourites'),
        'Githeri', 'Hearty maize and beans sautéed with vegetables — wholesome and filling.', 20000, '/food/githeri.jpg', TRUE, 2),
    ((SELECT id FROM menu_category WHERE slug = 'kenyan-favourites'),
        'Mukimo', 'Creamy mash of potatoes, green peas, maize and greens.', 25000, '/food/mukimo.jpg', FALSE, 3),
    ((SELECT id FROM menu_category WHERE slug = 'kenyan-favourites'),
        'Smocha', 'Soft chapati wrapped around a smokie with fresh kachumbari.', 10000, '/food/smocha.jpg', TRUE, 4),
    ((SELECT id FROM menu_category WHERE slug = 'sides-salads'),
        'Fresh Garden Salad', 'Crisp greens with tomato, cucumber, red onion and avocado.', 20000, '/food/salad.jpg', FALSE, 1),
    ((SELECT id FROM menu_category WHERE slug = 'milkshakes-drinks'),
        'Milkshakes', 'Strawberry and chocolate — thick, creamy and indulgent.', 30000, '/food/milkshakes.jpg', TRUE, 1);
