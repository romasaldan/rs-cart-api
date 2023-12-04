create table if not exists products (
	id uuid primary key,
	title text not null,
	description text not null,
	price integer not null
)

create table if not exists users (
   id uuid primary key,
   name text not null,
   password text not null
);

create table if not exists carts (
	id uuid not null primary key,
	user_id uuid not null,
	foreign key ("user_id") references "users" ("id"),
	created_at date not null,
	updated_at date not null,
	status VARCHAR(10) CHECK (status IN ('OPEN', 'ORDERED'))
)

create table if not exists cart_items (
	cart_id uuid,
	foreign key ("cart_id") references "carts" ("id"),
	product_id uuid,
    foreign key ("product_id") references "products" ("id"),
	count integer not null default 1 
)

create table if not exists orders (
	id uuid primary key,
	user_id uuid,
	foreign key ("user_id") references "users" ("id"),
	cart_id uuid,
	foreign key ("cart_id") references "carts" ("id"),
	payment jsonb,
	delivery jsonb,
	comments text,
	status VARCHAR(10) CHECK (status IN ('OPEN', 'ORDERED')),
	total integer not null
);

-- Populate products table
INSERT INTO products (id, title, description, price) VALUES
  ('550e8400-e29b-41d4-a716-446655440101', 'Laptop', 'Powerful laptop with high-resolution display', 1000),
  ('550e8400-e29b-41d4-a716-446655440102', 'Smartphone', 'Latest model with advanced features', 800),
  ('550e8400-e29b-41d4-a716-446655440103', 'Tablet', 'Portable tablet with long battery life', 500);

-- Populate users table
INSERT INTO users (id, name, password) VALUES
  ('c50094e1-a78a-4942-ba71-20551b596731', 'John Doe', 'password123'),
  ('c50094e1-a78a-4942-ba71-20551b596732', 'Jane Doe 1', 'secure456');

-- Populate carts table
INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
  ('4f02b169-2173-4d55-960f-21e67c3b4e19', 'c50094e1-a78a-4942-ba71-20551b596731', '2023-11-15', '2023-11-15', 'OPEN'),
  ('550e8400-e29b-41d4-a716-446655440201', 'c50094e1-a78a-4942-ba71-20551b596732', '2023-11-15', '2023-11-15', 'ORDERED');

-- Populate cart_items table
INSERT INTO cart_items (cart_id, product_id, count) VALUES
  ('4f02b169-2173-4d55-960f-21e67c3b4e19', '550e8400-e29b-41d4-a716-446655440101', 2),
  ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440102', 1);

-- Populate orders table
INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total) VALUES
  ('550e8400-e29b-41d4-a716-446655440301', 'c50094e1-a78a-4942-ba71-20551b596731', '4f02b169-2173-4d55-960f-21e67c3b4e19', '{"method": "credit_card"}', '{"address": "123 Main St"}', 'Special instructions here', 'OPEN', 250),
  ('550e8400-e29b-41d4-a716-446655440302', 'c50094e1-a78a-4942-ba71-20551b596732', '550e8400-e29b-41d4-a716-446655440201', '{"method": "paypal"}', '{"address": "456 Oak St"}', 'No comments', 'ORDERED', 300);