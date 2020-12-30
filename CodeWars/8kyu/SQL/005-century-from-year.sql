-- https://www.codewars.com/kata/5a3fe3dde1ce0e8ed6000097
-- The first century spans from the year 1 up to and including the year 100, The second - from the year 101 up to and including the year 200, etc.
-- centuryFromYear(1705)  returns (18)
-- centuryFromYear(1900)  returns (19)

SELECT CAST(FLOOR(yr / 100) + (CASE WHEN yr - FLOOR(yr / 100) * 100 = 0 THEN 0 ELSE 1 END) AS Int) AS century FROM years;