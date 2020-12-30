-- https://www.codewars.com/kata/5802e32dd8c944e562000020
-- For this challenge you need to create a simple SELECT statement that will return all columns from the products table, and join to the companies table so that you can return the company name.

SELECT p.id, p.name, p.isbn, p.company_id, p.price, c.name AS company_name
FROM products AS p
LEFT JOIN companies AS c
  ON p.company_id = c.id
;