-- https://www.codewars.com/kata/55f9bca8ecaa9eac7100004a
-- Clock shows 'h' hours, 'm' minutes and 's' seconds after midnight.
-- Your task is to make 'Past' function which returns time converted to milliseconds.
-- {h: 0, m: 1, s: 1} => res: 61000

SELECT (h * 3600 + m * 60 + s) * 1000 AS res FROM past;