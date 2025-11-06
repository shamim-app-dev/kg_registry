-- Truncate tables to ensure a clean slate, and restart identity columns
TRUNCATE TABLE countries, cities RESTART IDENTITY CASCADE;

-- Seed countries
INSERT INTO countries (name) VALUES ('USA');
INSERT INTO countries (name) VALUES ('Canada');

-- Seed cities
INSERT INTO cities (name, country_id) VALUES ('New York', 1);
INSERT INTO cities (name, country_id) VALUES ('Toronto', 2);
