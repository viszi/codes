-- https://www.codewars.com/kata/5809575e166583acfa000083
-- For this challenge you need to create a simple query to display each unique clan with their total points and ranked by their total points. You should then return a table that resembles below
-- The query must rank each clan by their total_points, you must return each unqiue clan and if there is no clan name (i.e. it's an empty string) you must replace it with [no clan specified], you must sum the total_points for each clan and the total_people within that clan.

SELECT
  RANK() OVER(ORDER BY SUM(points) DESC) AS rank,
  (CASE WHEN LENGTH(clan) = 0 THEN '[no clan specified]' ELSE clan END) AS clan,
  SUM(points) AS total_points,
  COUNT(name) AS total_people
FROM people
GROUP BY (CASE WHEN LENGTH(clan) = 0 THEN '[no clan specified]' ELSE clan END)
ORDER BY SUM(points) DESC
;