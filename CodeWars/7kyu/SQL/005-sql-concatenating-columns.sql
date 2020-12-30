-- https://www.codewars.com/kata/59440034e94fae05b2000073
-- Your task is to use a select statement to return a single column table containing the full title of the person (concatenate all columns together except id)

SELECT prefix ||' '|| first ||' '|| last ||' '|| suffix title 
FROM names;