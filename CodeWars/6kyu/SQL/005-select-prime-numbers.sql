-- https://www.codewars.com/kata/59be9f425227ddd60c00003b
SELECT regexp_split_to_table('2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97',E',')::int
AS prime
;