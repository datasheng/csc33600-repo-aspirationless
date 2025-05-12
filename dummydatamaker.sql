# Dummy Data maker 
-- CATEGORY

INSERT INTO category (category_name) VALUES 
('Electronics'),
('Home Appliances'),
('Books'),
('Clothing'),
('Toys'),
('Groceries');

-- USERS
INSERT INTO user (user_name, user_email, user_password, subscription_status, user_role) VALUES
('Alice Johnson', 'alice@example.com', 'hashedpassword123', 'free', 'regular'),
('Bob Smith', 'bob@walmart.com', 'securepass456', 'premium', 'store'),
('Charlie Admin', 'charlie@admin.com', 'adminpass789', 'premium', 'admin'),
('Daniel Admin', 'Daniel@admin.com', 'adminpass456', 'premium', 'admin'),
('Eve Thompson', 'eve@example.com', 'hashed_password_1', 'free', 'regular'),
('Frank Martin', 'frank@example.com', 'hashed_password_2', 'free', 'regular'),
('Target Manager', 'store@target.com', 'hashed_password_3', 'premium', 'store'),
('Walgreens Lead', 'store@walgreens.com', 'hashed_password_4', 'premium', 'store'),
('BudgetMart Owner', 'budgetmart@store.com', 'hashed_password_5', 'free', 'store'),
('ValueDepot Owner', 'valuedepot@store.com', 'hashed_password_6', 'free', 'store');

-- STORES
INSERT INTO store (store_name, address, description, store_URL, store_logo, store_type) VALUES
('Walmart', '100 Main St, Bentonville, AR', 'Leading retail store', 'https://walmart.com', 'https://walmart.com/logo.png', 'premium'),
('Target', '200 Market St, Minneapolis, MN', 'Popular department store', 'https://target.com', 'https://target.com/logo.png', 'premium'),
('Walgreens', '300 Health Ave, Deerfield, IL', 'Pharmacy and retail', 'https://walgreens.com', 'https://walgreens.com/logo.png', 'premium'),
('BudgetMart', '400 Budget Blvd, Smalltown, TX', 'Affordable essentials for everyone', 'https://budgetmart.com', 'https://budgetmart.com/logo.png', 'regular'),
('ValueDepot', '500 Value Rd, Budget City, CA', 'Discount goods and home needs', 'https://valuedepot.com', 'https://valuedepot.com/logo.png', 'regular');

-- PRODUCT
INSERT INTO product (product_name, brand, model_number, description, image_url, category_ID) VALUES
-- Electronics
('iPhone 14', 'Apple', 'A2633', 'Latest Apple iPhone model', 'https://images.com/iphone14.jpg', 1),
('Samsung TV 55"', 'Samsung', 'UN55TU7000', 'Crystal UHD Smart TV', 'https://images.com/samsungtv.jpg', 1),
('Wireless Headphones', 'SoundMax', 'SM-HX900', 'Noise-canceling wireless headphones', 'https://img.products.com/hx900.jpg', 1),
('Smartphone X10', 'Futura', 'FT-X10', 'Latest 5G smartphone with OLED display', 'https://img.products.com/x10.jpg', 1),
('Gaming Laptop Z5', 'CyberTech', 'CT-Z5', 'High-performance gaming laptop', 'https://img.products.com/gaminglaptop.jpg', 1),
('Smartwatch Vibe', 'WristWare', 'WW-VB10', 'Fitness smartwatch with heart-rate tracking', 'https://img.products.com/smartwatch.jpg', 1),

-- Home Appliances
('Blender Pro 3000', 'Ninja', 'NJ3000', 'High-speed kitchen blender', 'https://images.com/blender.jpg', 2),
('Microwave Oven', 'KitchenPro', 'KP-MW700', '700W compact microwave oven', 'https://img.products.com/mw700.jpg', 2),
('Air Fryer Max', 'CookMate', 'CM-AF100', 'Digital air fryer with rapid air tech', 'https://img.products.com/airfryer.jpg', 2),
('Washing Machine X1', 'LaundryPro', 'LP-WM500', 'Front-load washing machine', 'https://img.products.com/washingmachine.jpg', 2),
('Coffee Maker Deluxe', 'BrewMaster', 'BM-CM300', '12-cup programmable coffee maker', 'https://img.products.com/coffeemaker.jpg', 2),
('Vacuum Cleaner Lite', 'CleanSweep', 'CS-VC200', 'Bagless upright vacuum cleaner', 'https://img.products.com/vacuum.jpg', 2),
('Electric Kettle Swift', 'BoilTech', 'BT-KT100', '1.7L electric kettle with auto shutoff', 'https://img.products.com/kettle.jpg', 2),

-- Books
('The Great Gatsby', 'Penguin', '123456789', 'Classic American novel', 'https://images.com/gatsby.jpg', 3),
('To Kill a Mockingbird', 'HarperCollins', '9780061120084', 'Pulitzer-winning novel', 'https://img.products.com/mockingbird.jpg', 3),
('1984', 'Signet Classics', '9780451524935', 'Dystopian classic by George Orwell', 'https://img.products.com/1984.jpg', 3),
('Moby-Dick', 'Barnes & Noble', '9781593080181', 'Epic sea adventure novel', 'https://img.products.com/mobydick.jpg', 3),
('Pride and Prejudice', 'Penguin', '9780141439518', 'Jane Austen classic', 'https://img.products.com/pride.jpg', 3),
('Sapiens', 'Harper', '9780062316097', 'A brief history of humankind', 'https://img.products.com/sapiens.jpg', 3),

-- Clothing
('Basic T-Shirt', 'CottonWorld', 'CW-TS100', 'Comfortable cotton tee', 'https://img.products.com/shirt.jpg', 4),
('Winter Jacket', 'WarmWear', 'WW-JK200', 'Insulated waterproof jacket', 'https://img.products.com/jacket.jpg', 4),
('Kids Hoodie', 'PlayCloth', 'PC-HD150', 'Soft fleece hoodie for kids', 'https://img.products.com/kidshoodie.jpg', 4),
('Running Shoes', 'SprintCo', 'SC-SH300', 'Lightweight athletic shoes', 'https://img.products.com/shoes.jpg', 4),
('Evening Dress', 'Elegance', 'EL-DR500', 'Chic evening wear dress', 'https://img.products.com/dress.jpg', 4),
('Chino Pants', 'UrbanFit', 'UF-CP400', 'Slim fit casual pants', 'https://img.products.com/chinopants.jpg', 4),

-- Toys
('RC Car Zoomer', 'ToyRush', 'TR-RC101', 'Remote-controlled car with LED lights', 'https://img.products.com/rccar.jpg', 5),
('LEGO Creator Set', 'LEGO', 'LG-CS200', 'Multi-build LEGO set', 'https://img.products.com/lego.jpg', 5),
('Barbie Doll Dream', 'Mattel', 'MT-BD150', 'Fashion Barbie doll', 'https://img.products.com/barbie.jpg', 5),
('Stuffed Teddy Bear', 'CuddleBuddies', 'CB-TB300', 'Soft plush teddy', 'https://img.products.com/teddy.jpg', 5),
('Puzzle Box 500', 'BrainBlox', 'BB-PZ500', '500-piece puzzle set', 'https://img.products.com/puzzle.jpg', 5),
('Action Figure Hero-X', 'ToyMania', 'TM-AF100', 'Poseable superhero figure', 'https://img.products.com/actionfigure.jpg', 5),

-- Groceries
('Organic Almonds', 'NutriFarm', 'NF-ALM500', '500g pack of organic almonds', 'https://img.products.com/almonds.jpg', 6),
('Rolled Oats', 'GrainPure', 'GP-RO250', 'Organic whole grain oats', 'https://img.products.com/oats.jpg', 6),
('Raw Honey Jar', 'BeeNature', 'BN-HN450', 'Pure raw honey 450g', 'https://img.products.com/honey.jpg', 6),
('Brown Rice 1kg', 'RiceField', 'RF-BR1000', 'Whole grain brown rice', 'https://img.products.com/brownrice.jpg', 6),
('Extra Virgin Olive Oil', 'OliveGold', 'OG-OO750', '750ml glass bottle', 'https://img.products.com/oliveoil.jpg', 6),
('Almond Milk', 'VitaDairy', 'VD-AM1L', '1L unsweetened almond milk', 'https://img.products.com/almondmilk.jpg', 6);

-- PRODUCT PRICES (including overlaps for groceries at Walmart, Target, Walgreens)
INSERT INTO product_prices (product_ID, store_ID, price, product_link, affiliate_link) VALUES
-- Electronics
(1, 1, 999.99, 'https://techiestore.com/iphone14', 'https://affiliate.com/a1'),
(2, 1, 499.49, 'https://techiestore.com/tv55', 'https://affiliate.com/a2'),
(3, 4, 89.99, 'https://techhaven.com/products/hx900', 'https://affiliate.com/hx900'),
(4, 4, 699.00, 'https://techhaven.com/products/x10', 'https://affiliate.com/x10'),
(5, 1, 1299.00, 'https://techiestore.com/gaminglaptop', 'https://affiliate.com/elec1'),
(6, 1, 199.95, 'https://techiestore.com/smartwatch', 'https://affiliate.com/elec2'),

-- Home Appliances
(7, 3, 89.99, 'https://homegoods.com/blender', 'https://affiliate.com/a4'),
(8, 5, 120.00, 'https://homeessentials.com/products/mw700', 'https://affiliate.com/mw700'),
(9, 3, 129.99, 'https://homegoods.com/airfryer', 'https://affiliate.com/appliance1'),
(10, 3, 499.00, 'https://homegoods.com/washingmachine', 'https://affiliate.com/appliance2'),
(11, 3, 149.50, 'https://homegoods.com/coffeemaker', 'https://affiliate.com/appliance3'),
(12, 3, 89.00, 'https://homegoods.com/vacuum', 'https://affiliate.com/appliance4'),
(13, 3, 35.99, 'https://homegoods.com/kettle', 'https://affiliate.com/appliance5'),

-- Books
(14, 2, 9.99, 'https://booknook.com/gatsby', 'https://affiliate.com/a3'),
(15, 2, 12.99, 'https://booknook.com/mockingbird', 'https://affiliate.com/book1'),
(16, 2, 8.49, 'https://booknook.com/1984', 'https://affiliate.com/book2'),
(17, 2, 11.75, 'https://booknook.com/mobydick', 'https://affiliate.com/book3'),
(18, 2, 9.89, 'https://booknook.com/pride', 'https://affiliate.com/book4'),
(19, 2, 17.49, 'https://booknook.com/sapiens', 'https://affiliate.com/book5'),

-- Clothing
(20, 3, 29.99, 'https://homegoods.com/shirt', 'https://affiliate.com/clothing1'),
(21, 3, 59.99, 'https://homegoods.com/jacket', 'https://affiliate.com/clothing2'),
(22, 3, 25.49, 'https://homegoods.com/kidshoodie', 'https://affiliate.com/clothing3'),
(23, 1, 79.99, 'https://techiestore.com/shoes', 'https://affiliate.com/clothing4'),
(24, 3, 39.95, 'https://homegoods.com/dress', 'https://affiliate.com/clothing5'),
(25, 1, 44.99, 'https://techiestore.com/chinopants', 'https://affiliate.com/clothing6'),

-- Toys
(26, 2, 39.95, 'https://booknook.com/rccar', 'https://affiliate.com/toy1'),
(27, 2, 59.00, 'https://booknook.com/lego', 'https://affiliate.com/toy2'),
(28, 2, 14.99, 'https://booknook.com/barbie', 'https://affiliate.com/toy3'),
(29, 2, 12.49, 'https://booknook.com/teddy', 'https://affiliate.com/toy4'),
(30, 2, 7.99, 'https://booknook.com/puzzle', 'https://affiliate.com/toy5'),
(31, 2, 16.89, 'https://booknook.com/actionfigure', 'https://affiliate.com/toy6'),

-- Groceries (overlapping items)
(32, 1, 15.50, 'https://walmart.com/almonds', 'https://affiliate.com/almonds'),
(32, 2, 16.00, 'https://target.com/almonds', 'https://affiliate.com/almonds2'),
(32, 3, 15.75, 'https://walgreens.com/almonds', 'https://affiliate.com/almonds3'),
(33, 1, 5.00, 'https://walmart.com/oats', 'https://affiliate.com/groc1'),
(33, 2, 5.25, 'https://target.com/oats', 'https://affiliate.com/groc1b'),
(33, 3, 5.10, 'https://walgreens.com/oats', 'https://affiliate.com/groc1c'),
(34, 3, 6.99, 'https://homegoods.com/honey', 'https://affiliate.com/groc2'),
(35, 3, 4.89, 'https://homegoods.com/brownrice', 'https://affiliate.com/groc3'),
(36, 3, 9.49, 'https://homegoods.com/oliveoil', 'https://affiliate.com/groc4'),
(37, 3, 3.99, 'https://homegoods.com/almondmilk', 'https://affiliate.com/groc5');

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


INSERT INTO product_prices (product_ID, store_ID, price, product_link, affiliate_link) VALUES
(1, 1, 999.99, 'https://techiestore.com/iphone14', 'https://affiliate.com/a1'),
(2, 1, 499.49, 'https://techiestore.com/tv55', 'https://affiliate.com/a2'),
(3, 2, 9.99, 'https://booknook.com/gatsby', 'https://affiliate.com/a3'),
(4, 3, 89.99, 'https://homegoods.com/blender', 'https://affiliate.com/a4');



INSERT INTO search_history (user_ID, product_ID, store_ID, price_when_search) VALUES
(1, 1, 1, 999.99),

(1, 14, 2, 9.99),
(2, 2, 1, 499.49),
(4, 3, 4, 89.99),
(4, 4, 4, 699.00),
(5, 32, 1, 15.50);

(1, 3, 2, 9.99),
(2, 2, 1, 499.49);


-- CLICK LOG
INSERT INTO click_log (user_ID, product_ID, store_ID) VALUES
(1, 1, 1),
<<<<<<< HEAD
(1, 14, 2),
(2, 2, 1),
(3, 7, 3),
(4, 3, 4),
(5, 32, 1),
(4, 4, 4);

-- ADS
INSERT INTO ads (image_url, target_link, description, target_category_ID, active) VALUES
('https://ads.com/ad1.jpg', 'https://techiestore.com/promo', 'Get 10% off on electronics!', 1, TRUE),
('https://ads.com/ad2.jpg', 'https://booknook.com/sale', 'Buy 2 books, get 1 free!', 3, TRUE),
('https://ads.com/ad3.jpg', 'https://homegoods.com/blenderdeal', 'Blender deal of the week!', 2, TRUE),
('https://ads.com/electronics-sale.jpg', 'https://techhaven.com/sale', 'Big sale on electronics!', 1, TRUE),
('https://ads.com/groceries-offer.jpg', 'https://homeessentials.com/grocery', 'Fresh groceries at low prices!', 6, TRUE);

(1, 3, 2),
(2, 2, 1),
(3, 4, 3);

-- ADS
INSERT INTO ads (image_url, target_link, description, target_category_ID) VALUES
('https://ads.com/ad1.jpg', 'https://techiestore.com/promo', 'Get 10% off on electronics!', 1),
('https://ads.com/ad2.jpg', 'https://booknook.com/sale', 'Buy 2 books, get 1 free!', 3),
('https://ads.com/ad3.jpg', 'https://homegoods.com/blenderdeal', 'Blender deal of the week!', 2);





