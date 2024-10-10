-- users table 
CREATE TABLE  users(
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  client_type VARCHAR(20) NOT NULL,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATE DEFAULT current_date
);
--Complaint table 
CREATE TABLE complaint (
    complaint_id SERIAL PRIMARY KEY,
    customer_id INT,
    date_time TIMESTAMP,
    category VARCHAR(255),
    subject VARCHAR (255),
    description TEXT,
    product VARCHAR(255),
    status VARCHAR(255),
    assigned_to TEXT,
    priority VARCHAR(255),
    attachments TEXT[],
    resolution VARCHAR(255),
    resolution_date DATE,
    closed_date DATE,
    feedback TEXT,
    rating NUMERIC ,
    channel VARCHAR(255));
  -- costumer table
  CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    age INT,
    gender VARCHAR(10)
); 