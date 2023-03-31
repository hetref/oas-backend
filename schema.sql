CREATE DATABASE oas;
USE oas;

CREATE TABLE users (id integer PRIMARY KEY AUTO_INCREMENT, userfname VARCHAR(255) NOT NULL, userlname VARCHAR(255) NOT NULL, email TEXT NOT NULL, phone VARCHAR(20) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW());

CREATE TABLE orders 
(id integer PRIMARY KEY AUTO_INCREMENT, 
userfname VARCHAR(255) NOT NULL, 
userlname VARCHAR(255) NOT NULL, 
email TEXT NOT NULL, 
phone VARCHAR(20) NOT NULL, 
alt_name VARCHAR(255) NOT NULL, 
alt_email TEXT NOT NULL, 
alt_phone VARCHAR(20) NOT NULL, 
billing_address VARCHAR(255) NOT NULL, 
shipping_address VARCHAR(255) NOT NULL, 
item_one integer, 
item_two integer, 
item_three integer, 
item_four integer, 
fax_number TEXT, 
user_id integer NOT NULL, 
ordered_at TIMESTAMP NOT NULL DEFAULT NOW());

INSERT INTO orders (userfname, userlname, email, phone, alt_name, alt_email, alt_phone, billing_address, shipping_address, item_one, item_two, item_three, item_four, user_id) VALUES 
('Akshata', 'Shinde', 'shindeakahsta@gmail.com', '7896541235', 'Aryan', 'shindearyan179@gmail.com', '8097296453', 'Kamothe, Navi Mumbai, Maharashtra', 'Kamothe, Navi Mumbai, Maharashtra, Ravi Rachna', 0, 1, 2, 8, 4);

INSERT INTO orders ()