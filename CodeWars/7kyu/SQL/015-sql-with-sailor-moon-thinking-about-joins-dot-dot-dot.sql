-- https://www.codewars.com/kata/5ab7a736edbcfc8e62000007
-- Practise some SQL fundamentals by making a simple database on a topic you feel familiar with. Or use mine, populated with a wealth of Sailor Moon trivia.
-- Return a results table - sailor_senshi, real_name, cat and school - of all characters, containing each character's high school, their civilian name and the cat who introduced them to their magical crime-fighting destiny.
-- Keep in mind some senshi were not initiated by a cat guardian and one is not in high school. The field can be left blank if this is the case.

SELECT 
  sailors.senshi_name AS sailor_senshi,
  sailors.real_name_jpn AS real_name,
  cats.name AS cat,
  schools.school AS school
FROM sailorsenshi AS sailors
LEFT JOIN schools
  ON sailors.school_id = schools.id
LEFT JOIN cats
  ON sailors.cat_id = cats.id
;