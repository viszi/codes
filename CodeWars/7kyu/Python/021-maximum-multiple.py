# https://www.codewars.com/kata/5aba780a6a176b029800041c
# Given a Divisor and a Bound , Find the largest integer N , Such That ,
# - N is divisible by divisor
# - N is less than or equal to bound
# - N is greater than 0.

def max_multiple(divisor, bound):
    return bound // divisor * divisor


print(max_multiple(2, 7), 6)
print(max_multiple(3, 10), 9)
print(max_multiple(7, 17), 14)
print(max_multiple(10, 50), 50)
print(max_multiple(37, 200), 185)
print(max_multiple(7, 100), 98)
