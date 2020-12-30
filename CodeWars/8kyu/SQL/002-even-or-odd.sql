-- https://www.codewars.com/kata/53da3dbb4a5168369a0000fe/
-- You will be given a table, numbers, with one column number.
-- Return a table with a column is_even containing "Even" or "Odd" depending on number column values.

select (case when mod(number, 2) = 0 then 'Even' else 'Odd' end) as is_even from numbers;