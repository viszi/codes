-- https://www.codewars.com/kata/59401e0e54a655a298000040
-- You have access to a table of monsters. In each row, the characteristic column has a single comma. Your job is to find it using position(). You must return a table. The comma column will contain the position of the comma within the characteristics string. Order the results by comma.

SELECT id, name, POSITION(',' IN characteristics) AS comma
FROM monsters
ORDER BY comma;