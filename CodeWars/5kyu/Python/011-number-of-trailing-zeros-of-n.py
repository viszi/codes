# Write a program that will calculate the number of trailing zeros in a factorial of a given number.
# N! = 1 * 2 * 3 * ... * N
# Be careful 1000! has 2568 digits...
# For more info, see: http://mathworld.wolfram.com/Factorial.html

import math
def zeros(n):
    if n == 0: return 0

    kmax = math.floor(math.log(n, 5))
    zeroDigits = 0

    for k in range(1, kmax + 1):
        zeroDigits += (n // 5**k)

    return zeroDigits



print(zeros(0), 0, "Testing with n = 0")
print(zeros(6), 1, "Testing with n = 6")
print(zeros(30), 7, "Testing with n = 30")