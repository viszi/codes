-- https://www.codewars.com/kata/590a95eede09f87472000213
-- In your application, there is a section for adults only. You need to get a list of names and ages of users from the users table, who are 18 years old or older.

SELECT name, age 
FROM users
WHERE age >= 18;