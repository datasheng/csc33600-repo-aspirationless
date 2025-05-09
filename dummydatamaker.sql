# Dummy Data maker 
-- CATEGORY
INSERT INTO category (category_name) VALUES
('Electronics'), ('Home Appliances'), ('Books'), ('Clothing'), ('Toys');

-- USER
INSERT INTO user (user_name, user_email, user_password, subscription_status, user_role) VALUES
('Alice Johnson', 'alice@example.com', 'hashedpassword123', 'free', 'regular'),
('Bob Smith', 'bob@store.com', 'securepass456', 'premium', 'store'),
('Charlie Admin', 'charlie@admin.com', 'adminpass789', 'premium', 'admin');

-- STORE
INSERT INTO store (store_name, address, description, store_URL, store_logo, store_type) VALUES
('Techie Store', '123 Tech Street, NY', 'Your gadget destination', 'https://techiestore.com', 'https://techiestore.com/logo.png', 'premium'),
('BookNook', '456 Book Rd, TX', 'Books for all ages', 'https://booknook.com', 'https://booknook.com/logo.jpg', 'regular'),
('HomeGoods', '789 Comfort Ln, CA', 'Everything home-related', 'https://homegoods.com', 'https://homegoods.com/logo.png', 'regular');

-- PRODUCT
INSERT INTO product (product_name, brand, model_number, description, image_url, category_ID) VALUES
('iPhone 14', 'Apple', 'A2633', 'Latest Apple iPhone model', 'https://images.com/iphone14.jpg', 1),
('Samsung TV 55"', 'Samsung', 'UN55TU7000', 'Crystal UHD Smart TV', 'https://images.com/samsungtv.jpg', 1),
('The Great Gatsby', 'Penguin', '123456789', 'Classic American novel', 'https://images.com/gatsby.jpg', 3),
('Blender Pro 3000', 'Ninja', 'NJ3000', 'High-speed kitchen blender', 'https://images.com/blender.jpg', 2);

-- PRODUCT PRICES
INSERT INTO product_prices (product_ID, store_ID, price, product_link, affiliate_link) VALUES
(1, 1, 999.99, 'https://techiestore.com/iphone14', 'https://affiliate.com/a1'),
(2, 1, 499.49, 'https://techiestore.com/tv55', 'https://affiliate.com/a2'),
(3, 2, 9.99, 'https://booknook.com/gatsby', 'https://affiliate.com/a3'),
(4, 3, 89.99, 'https://homegoods.com/blender', 'https://affiliate.com/a4');

-- SEARCH HISTORY
INSERT INTO search_history (user_ID, product_ID, store_ID, price_when_search) VALUES
(1, 1, 1, 999.99),
(1, 3, 2, 9.99),
(2, 2, 1, 499.49);

-- CLICK LOG
INSERT INTO click_log (user_ID, product_ID, store_ID) VALUES
(1, 1, 1),
(1, 3, 2),
(2, 2, 1),
(3, 4, 3);

-- ADS
INSERT INTO ads (image_url, target_link, description, target_category_ID) VALUES
('https://ads.com/ad1.jpg', 'https://techiestore.com/promo', 'Get 10% off on electronics!', 1),
('https://ads.com/ad2.jpg', 'https://booknook.com/sale', 'Buy 2 books, get 1 free!', 3),
('https://ads.com/ad3.jpg', 'https://homegoods.com/blenderdeal', 'Blender deal of the week!', 2);




