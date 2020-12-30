-- https://www.codewars.com/kata/582cb0224e56e068d800003c
-- You get given the time in hours and you need to return the number of litres Nathan will drink, rounded to the smallest value.
-- time = 3 ----> litres = 1
-- time = 6.7---> litres = 3

SELECT id, hours, FLOOR(hours * 0.5) AS liters FROM cycling;