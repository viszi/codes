# https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec
# Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.
# For example:
#  persistence(39) # returns 3, because 3*9=27, 2*7=14, 1*4=4
#                  # and 4 has only one digit


def persistence(n):
    c = 0
    if n < 10:
        return c

    while n >= 10:
        p = 1
        while n > 0:
            p *= n % 10
            n = n // 10
        c += 1
        n = p
    return c

# same as above with recursion


def persistence(n, c=0):
    if n < 10:
        return c

    p = 1
    while n > 0:
        p *= n % 10
        n = n // 10
    c += 1

    return persistence(p, c)


# using 3.8 math.prod
import math

def persistence(n):
    c, p = 0, 1
    while n >= 10:
        digits = [int(x) for x in str(n)]
        p = math.prod(digits)
        n = p
        c += 1

    return c


# using numpy
import numpy

def persistence(n):
    c, p = 0, 1
    while n >= 10:
        digits = [int(x) for x in str(n)]
        p = numpy.prod(digits)
        n = p
        c += 1

    return c    

print(persistence(39), 3)
print(persistence(4), 0)
print(persistence(25), 2)
print(persistence(999), 4)
