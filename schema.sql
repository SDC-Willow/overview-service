CREATE DATABASE IF NOT EXISTS Overview;

use Overview;

CREATE TABLE IF NOT EXISTS products (
 id INT AUTO_INCREMENT primary key,
 name varchar(50),
 description varchar(1000),
 slogan varchar(200),
 category varchar(50),
 default_price int
);

-- CREATE TABLE IF NOT EXISTS cart (

-- )

CREATE TABLE IF NOT EXISTS styles (
 id INT AUTO_INCREMENT primary key,
 product_id int,
 FOREIGN KEY (product_id) REFERENCES products(id),
 name varchar(100),
 sale_price int,
 original_price int,
 default_style int
);

CREATE TABLE IF NOT EXISTS skus (
  id int AUTO_INCREMENT primary key,
  style_id int,
  FOREIGN KEY (style_id) REFERENCES styles(id),
  size varchar(5),
  quantity int
);

CREATE TABLE IF NOT EXISTS features (
  id int AUTO_INCREMENT primary key,
  product_id int,
  FOREIGN KEY (product_id) REFERENCES products(id),
  feature varchar(100),
  value varchar(100)
);

CREATE TABLE IF NOT EXISTS photos (
  id int AUTO_INCREMENT primary key,
  style_id int,
  FOREIGN KEY (style_id) REFERENCES styles(id),
  url varchar(3000),
  thumbnail_url varchar(3000)
);


-- LOAD DATA LOCAL INFILE '~/Downloads/product.csv'
-- INTO TABLE products
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '~/Downloads/styles.csv'
-- INTO TABLE styles
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '~/Downloads/skus.csv'
-- INTO TABLE skus
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '~/Downloads/features.csv'
-- INTO TABLE features
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '~/Downloads/1mil.csv'
-- INTO TABLE photos
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '~/Downloads/6mil.csv'
-- INTO TABLE photos
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
