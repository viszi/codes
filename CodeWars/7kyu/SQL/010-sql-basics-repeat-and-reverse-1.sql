-- https://www.codewars.com/kata/59414360f5c3947364000070
-- Using our monsters table. Return table where the name is the original string repeated three times (do not add any spaces), and the characteristics are the original strings in reverse (e.g. 'abc, def, ghi' becomes 'ihg ,fed ,cba').

SELECT REPEAT(name, 3) AS name, REVERSE(characteristics) AS characteristics
FROM monsters;