-- https://www.codewars.com/kata/594633020a561e329a0000a2
-- Given a demographics table you need to return a table that shows a count of each race represented, ordered by the count in descending order.

SELECT race, COUNT(*) AS count
FROM demographics
GROUP BY race
ORDER BY COUNT(*) DESC;