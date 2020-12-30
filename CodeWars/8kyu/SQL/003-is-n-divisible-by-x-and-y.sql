-- https://www.codewars.com/kata/5545f109004975ea66000086
-- Create a function that checks if a number n is divisible by two numbers x AND y. All inputs are positive, non-zero digits.
-- 1) n =   3, x = 1, y = 3 =>  true because   3 is divisible by 1 and 3
-- 2) n =  12, x = 2, y = 6 =>  true because  12 is divisible by 2 and 6

SELECT id, (CASE WHEN (MOD(n, x) + MOD(n, y)) = 0 THEN True ELSE False END) AS res FROM kata;