-- https://www.codewars.com/kata/55a70521798b14d4750000a4
-- Make a function that will return a greeting statement that uses an input; your program should return, "Hello, <name> how are you doing today?".

SELECT 'Hello, ' || name || ' how are you doing today?' AS greeting FROM person;