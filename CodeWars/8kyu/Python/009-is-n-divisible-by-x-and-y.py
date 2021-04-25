# https://www.codewars.com/kata/5545f109004975ea66000086
# Create a function that checks if a number n is divisible by two numbers x AND y. All inputs are positive, non-zero digits.


def is_divisible(n,x,y):
    return True if n % x == 0 and n % y == 0 else False

print(is_divisible(3,2,2),False)
print(is_divisible(3,3,4),False)
print(is_divisible(12,3,4),True)
print(is_divisible(8,3,4),False)