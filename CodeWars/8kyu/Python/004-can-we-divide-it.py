# https://www.codewars.com/kata/5a2b703dc5e2845c0900005a
# create functionisDivideBy (or is_divide_by) to check if an integer number is divisible by each out of two arguments.

def is_divide_by(n, x, y):
    return n % x == 0 and n % y == 0


print(is_divide_by(8, 2, 4), True)
print(is_divide_by(12, -3, 4), True)
print(is_divide_by(8, 3, 4), False)
print(is_divide_by(48, 2, -5), False)
print(is_divide_by(-100, -25, 10), True)
print(is_divide_by(10000, 5, -3), False)
print(is_divide_by(4, 4, 2), True)
print(is_divide_by(5, 2, 3), False)
print(is_divide_by(-96, 25, 17), False)
print(is_divide_by(33, 1, 33), True)
