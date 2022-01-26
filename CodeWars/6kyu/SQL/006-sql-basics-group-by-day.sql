-- https://www.codewars.com/kata/5811597e9d278beb04000038
SELECT 
  DATE(created_at) as day,
  description,
  count(*)
FROM events
WHERE 
  name = 'trained'
GROUP BY
  day, description
ORDER BY
  day
;