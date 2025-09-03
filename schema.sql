-- Create products table
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL
);

-- Insert sample products
INSERT INTO products (name, price)
VALUES 
  ('T-Shirt', 500),
  ('Sneakers', 1200),
  ('Cap', 300),
  ('Backpack', 1500);
