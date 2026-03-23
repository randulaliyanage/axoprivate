CREATE DATABASE IF NOT EXISTS axo_nique;
USE axo_nique;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    security_question_1 VARCHAR(255),
    security_answer_1 VARCHAR(255),
    security_question_2 VARCHAR(255),
    security_answer_2 VARCHAR(255),
    security_question_3 VARCHAR(255),
    security_answer_3 VARCHAR(255),
    enabled BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER'
);

CREATE TABLE IF NOT EXISTS products (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255)   NOT NULL,
  category        VARCHAR(100)   NOT NULL,
  price           DECIMAL(10, 2) NOT NULL,
  description     TEXT,
  emoji           VARCHAR(10),
  badge           VARCHAR(50),
  image_url       VARCHAR(500),
  in_stock        BOOLEAN        NOT NULL DEFAULT TRUE,
  sizes_raw       VARCHAR(255)   NOT NULL DEFAULT '',
  stock_quantity  INT            NOT NULL DEFAULT 0,
  low_stock_threshold INT        NOT NULL DEFAULT 5,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT       NOT NULL,
  quantity   INT          NOT NULL DEFAULT 1,
  size       VARCHAR(20),
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_name     VARCHAR(255) NOT NULL,
  customer_email    VARCHAR(255) NOT NULL,
  delivery_address  TEXT NOT NULL,
  subtotal          DECIMAL(10, 2) NOT NULL,
  shipping_fee      DECIMAL(10, 2) NOT NULL,
  total             DECIMAL(10, 2) NOT NULL,
  status            VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id          BIGINT NOT NULL,
  product_id        BIGINT,
  product_name      VARCHAR(255),
  product_category  VARCHAR(100),
  quantity          INT NOT NULL,
  unit_price        DECIMAL(10, 2) NOT NULL,
  line_total        DECIMAL(10, 2) NOT NULL,
  selected_size     VARCHAR(20),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS brand_profile (
  id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
  logo_url                VARCHAR(500),
  hero_banner_url         VARCHAR(500),
  discount_banner_text    VARCHAR(500),
  discount_banner_active  BOOLEAN DEFAULT FALSE,
  mission                 TEXT,
  vision                  TEXT,
  policies                TEXT,
  updated_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO brand_profile (id, logo_url, hero_banner_url, discount_banner_text, discount_banner_active, mission, vision, policies) VALUES
(1, NULL, NULL, '🔥 Free shipping on orders above LKR 5,000', TRUE,
 'To redefine streetwear in South Asia through premium craftsmanship and bold creative vision.',
 'To become the go-to lifestyle brand for the next generation of creators and culture-makers.',
 'We accept returns within 14 days of delivery. All items must be unworn and in original condition. International shipping available to selected countries.');

-- Axonique products
INSERT IGNORE INTO products (id, name, category, price, description, emoji, badge, image_url, in_stock, sizes_raw, stock_quantity, low_stock_threshold) VALUES
  (1,  'Timeless Tee (220 GSM)',   'T-Shirts', 2490.00, 'Premium quality Timeless Tee crafted from 220 GSM fabric. Comfortable fit with a classic design perfect for everyday wear. Durable and long-lasting with superior comfort.',   '👕', 'New',      'https://res.cloudinary.com/dimdro5dm/image/upload/v1772361691/Artboard_2_1_hnmmx0.png', TRUE, 'XS,S,M,L,XL,XXL', 45, 5),
  (2,  'Impossible Tee (220 GSM)', 'T-Shirts', 2490.00, 'The legendary Impossible Tee made from 220 GSM premium cotton. Perfect as a statement piece or everyday essential. Superior quality and durability.',                         '👕', 'New',      'https://res.cloudinary.com/dimdro5dm/image/upload/v1772361685/Artboard_1_1_qk5nj4.png', TRUE, 'XS,S,M,L,XL,XXL', 38, 5),
  (3,  'Phantom Tee (220 GSM)',    'T-Shirts', 2390.00, 'Sleek Phantom Tee crafted from 220 GSM fabric. Minimalist design with maximum comfort. Perfect for layering or wearing solo with style.',                                      '👕', 'Featured', 'https://res.cloudinary.com/dimdro5dm/image/upload/v1772372435/Whisk_220c855f9cae17a92ef44c2b9cfbc142dr_e1uymk.png', TRUE, 'S,M,L,XL,XXL', 3, 5),
  (4,  'Xenonix Tee (220 GSM)',    'T-Shirts', 2290.00, 'Modern Xenonix Tee featuring 220 GSM premium fabric. Contemporary design with premium comfort. Versatile and easy to style for any occasion.',                                 '👕', 'Featured', 'https://res.cloudinary.com/dimdro5dm/image/upload/v1772372615/Whisk_1b2718f44b9d3d685094184d21fd0057dr_jzj6dk.png', TRUE, 'XS,S,M,L,XL', 60, 5),
  (5,  'Timeless Hoodie',          'Hoodies',  4890.00, 'Oversized white hoodie with bold centered AXO logo. Heavy-weight cotton blend. Perfect for a bold streetwear statement.',                                                      '🧥', 'Limited',  'https://res.cloudinary.com/dimdro5dm/image/upload/v1772370314/Whisk_fa44f643be97a15965747d65c30045eceg_itzqa7.png', TRUE, 'XS,S,M,L,XL,XXL', 22, 5),
  (6,  'Phantom Hoodie',           'Hoodies',  5290.00, 'Charcoal gray zip-up hoodie with embroidered AXO branding. Full front zip with adjustable hood. Premium comfort and durability.',                                             '🧥', 'Limited',  'https://res.cloudinary.com/dimdro5dm/image/upload/v1772371995/Whisk_52c9893ff3ac20a98144ae7a4f7f4580dr_c3vp5b.png', TRUE, 'XS,S,M,L,XL', 4, 5),
  (7,  'Impossible Hoodie',        'Hoodies',  5490.00, 'Premium heavyweight black hoodie with kangaroo pocket and drawstring. Perfect for layering or as a statement piece. Ultra-soft fleece lining.',                                '🧥', 'Limited',  'https://res.cloudinary.com/dimdro5dm/image/upload/v1772370975/Whisk_4e6052ec69bf657bc6a48cc1a46c8f67dr_jywuyn.png', TRUE, 'S,M,L,XL,XXL', 30, 5),
  (8,  'Impossible Cap',           'Caps',     1990.00, 'Timeless snapback cap in black with embroidered AXO logo. Adjustable fit for all head sizes. Perfect for any casual outfit.',                                                  '🧢', 'New',      'https://res.cloudinary.com/dimdro5dm/image/upload/v1772371155/Whisk_aef561bc5f2edbbbfaa440f4298d7eaedr_psu4xz.png', TRUE, 'One Size', 75, 10),
  (9,  'Timeless Cap',             'Caps',     2190.00, 'Vintage-style trucker cap with white front panels and mesh back. Adjustable snapback closure. Great for hot days and street style.',                                          '🧢', 'New',      'https://res.cloudinary.com/dimdro5dm/image/upload/v1772371306/Whisk_c12c7e404e6248ea40c44fdfa5d43520eg_tbn8ek.png', TRUE, 'One Size', 2, 5),
  (10, 'Phantom Hat',              'Caps',     2090.00, 'Relaxed dad hat style with curved visor. Premium cotton construction with embroidered logo. One size fits most.',                                                             '🧢', 'Limited',  'https://res.cloudinary.com/dimdro5dm/image/upload/v1772372157/Whisk_62e23c381c7713c88a9489f40f05fdc5dr_uzthom.png', TRUE, 'One Size', 55, 10),
  (11, 'Xenonix Hoodie',           'Hoodies',  5690.00, 'Ultra-premium heavyweight Xenonix Hoodie. Double-lined hood with adjustable drawstring. Ribbed cuffs and hem for a tailored streetwear silhouette.', '🧥', 'New', 'https://res.cloudinary.com/dimdro5dm/image/upload/v1772370314/Whisk_fa44f643be97a15965747d65c30045eceg_itzqa7.png', TRUE, 'XS,S,M,L,XL,XXL', 35, 5),
  (12, 'AXO Cargo Pants',          'Bottoms',  6490.00, 'Tactical cargo pants with multiple utility pockets. Relaxed fit tapered at the ankle. Premium cotton-ripstop blend for durability and comfort.', '👖', 'New', 'https://res.cloudinary.com/dimdro5dm/image/upload/v1772361691/Artboard_2_1_hnmmx0.png', TRUE, 'S,M,L,XL', 20, 5),
  (13, 'Phantom Sweatshirt',       'Sweatshirts', 3990.00, 'Midweight crew-neck sweatshirt. Clean minimalist design with subtle AXO embroidery on the chest. Perfect for transitional weather.', '👕', 'Featured', 'https://res.cloudinary.com/dimdro5dm/image/upload/v1772372435/Whisk_220c855f9cae17a92ef44c2b9cfbc142dr_e1uymk.png', TRUE, 'XS,S,M,L,XL,XXL', 3, 5),
  (14, 'AXO Tote Bag',             'Accessories', 1490.00, 'Heavy-duty canvas tote bag with reinforced handles. Interior zip pocket. Fits a 15 inch laptop. Screen-printed AXO graphic on front panel.', '👜', 'New', 'https://res.cloudinary.com/dimdro5dm/image/upload/v1772371155/Whisk_aef561bc5f2edbbbfaa440f4298d7eaedr_psu4xz.png', TRUE, 'One Size', 50, 10),
  (15, 'Xenonix Cap',              'Caps',     2390.00, 'Structured 6-panel cap with flat brim. Premium wool-blend construction. Embroidered AXO logo on front. Fitted sizing for a sharp silhouette.', '🧢', 'Limited', 'https://res.cloudinary.com/dimdro5dm/image/upload/v1772371306/Whisk_c12c7e404e6248ea40c44fdfa5d43520eg_tbn8ek.png', TRUE, 'S/M,L/XL', 4, 5);

INSERT IGNORE INTO users (id, username, email, password, role, enabled) VALUES
  (1, 'admin', 'admin@axonique.store', '$2a$10$8.2PWSyOfS/W3vS9O3S9O3S9O3S9O3S9O3S9O3S9O3S9O3S9O3S9O', 'ADMIN', 1),
  (2, 'staff_jack', 'jack@axonique.store', '$2a$10$8.2PWSyOfS/W3vS9O3S9O3S9O3S9O3S9O3S9O3S9O3S9O3S9O3S9O', 'STAFF', 1);

INSERT IGNORE INTO orders (id, customer_name, customer_email, delivery_address, subtotal, shipping_fee, total, status, created_at) VALUES
  (1, 'Alice Smith', 'alice@gmail.com', '123 Kandy Road, Colombo', 4890.00, 500.00, 5390.00, 'COMPLETED', DATE_SUB(NOW(), INTERVAL 1 MONTH)),
  (2, 'Bob Johnson', 'bob@gmail.com', '45 Galle Face, Colombo', 2490.00, 500.00, 2990.00, 'PROCESSING', NOW());

INSERT IGNORE INTO order_items (order_id, product_id, product_name, product_category, quantity, unit_price, line_total, selected_size) VALUES
  (1, 5, 'Timeless Hoodie', 'Hoodies', 1, 4890.00, 4890.00, 'L'),
  (2, 1, 'Timeless Tee (220 GSM)', 'T-Shirts', 1, 2490.00, 2490.00, 'M');