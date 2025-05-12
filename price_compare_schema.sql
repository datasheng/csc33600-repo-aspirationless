
create database Price_Scout;

-- CATEGORY TABLE
CREATE TABLE category (
    category_ID INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL
);

-- USER TABLE
CREATE TABLE user (
    user_ID INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50),
    user_email VARCHAR(100) UNIQUE,
    user_password VARCHAR(100),
    subscription_status ENUM('free', 'premium') DEFAULT 'free',
    user_role ENUM('regular', 'store', 'admin') DEFAULT 'regular'
);

-- STORE TABLE
CREATE TABLE store (
    store_ID INT PRIMARY KEY AUTO_INCREMENT,
    store_name VARCHAR(100),
    address VARCHAR(255),
    description TEXT,
    store_URL TEXT,
    store_logo TEXT,
    store_type ENUM('regular', 'premium') DEFAULT 'regular'
);

-- PRODUCT TABLE
CREATE TABLE product (
    product_ID INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    brand VARCHAR(50),
    model_number VARCHAR(50),
    description TEXT,
    image_url TEXT,
    category_ID INT,
    FOREIGN KEY (category_ID) REFERENCES category(category_ID)
);

-- PRODUCT PRICES TABLE
CREATE TABLE product_prices (
    price_ID INT PRIMARY KEY AUTO_INCREMENT,
    product_ID INT,
    store_ID INT,
    price DECIMAL(10,2),
    product_link TEXT,
    affiliate_link TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_ID) REFERENCES product(product_ID),
    FOREIGN KEY (store_ID) REFERENCES store(store_ID)
);

-- SEARCH HISTORY TABLE
CREATE TABLE search_history (
    search_ID INT PRIMARY KEY AUTO_INCREMENT,
    user_ID INT,
    product_ID INT,
    store_ID INT,
    search_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    price_when_search DECIMAL(10,2),
    FOREIGN KEY (user_ID) REFERENCES user(user_ID),
    FOREIGN KEY (product_ID) REFERENCES product(product_ID),
    FOREIGN KEY (store_ID) REFERENCES store(store_ID)
);

-- CLICK LOG TABLE
CREATE TABLE click_log (
    click_ID INT PRIMARY KEY AUTO_INCREMENT,
    user_ID INT,
    product_ID INT,
    store_ID INT,
    clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_ID) REFERENCES user(user_ID),
    FOREIGN KEY (product_ID) REFERENCES product(product_ID),
    FOREIGN KEY (store_ID) REFERENCES store(store_ID)
);

-- ADS TABLE
CREATE TABLE ads (
    ad_ID INT PRIMARY KEY AUTO_INCREMENT,
    image_url TEXT,
    target_link TEXT,
    description TEXT,
    target_category_ID INT,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (target_category_ID) REFERENCES category(category_ID)
);
 