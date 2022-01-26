-- https://www.codewars.com/kata/582cba7d3be8ce3a8300007c

SELECT 
  DATE(s.transaction_date) as day,
  d.name as department,
  COUNT(s.id) as sale_count
  FROM sale s
  JOIN department d ON s.department_id = d.id
  group by day, department
  order by day
  ;
  