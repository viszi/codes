-- https://www.codewars.com/kata/594804a218e96caa8d00051b
-- Given a demographics table. You need to return the same table where all text fields (name & race) are changed to the ascii code of their first byte.
-- e.g. Verlie = 86 Warren = 87 Horace = 72 Tracy = 84

SELECT 
  id,
  ASCII(LEFT(name,1)) AS name,
  birthday,
  ASCII(LEFT(race,1)) AS race
FROM demographics;
