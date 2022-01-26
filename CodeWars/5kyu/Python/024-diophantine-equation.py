# https://www.codewars.com/kata/554f76dca89983cc400000bb
# In mathematics, a Diophantine equation is a polynomial equation, usually with two or more unknowns, such that only the integer solutions are sought or studied.
# In this kata we want to find all integers x, y (x >= 0, y >= 0) solutions of a diophantine equation of the form:
# x^2 - 4 * y^2 = n
# (where the unknowns are x and y, and n is a given positive number) in decreasing order of the positive xi.

# If there is no solution return [] or "[]" or "". (See "RUN SAMPLE TESTS" for examples of returns).

# Examples:
# solEquaStr(90005) --> "[[45003, 22501], [9003, 4499], [981, 467], [309, 37]]"
# solEquaStr(90002) --> "[]"
# Hint:
# x^2 - 4 * y^2 = (x - 2*y) * (x + 2*y)

import math
def sol_equa(n):
    factors = [[1, n]]

    for div in range(2, math.ceil(math.sqrt(n))+1):
        if n % div == 0:
            factors.append([div, n // div])

    result = []
    for [a, b] in factors:
        x = (a + b) / 2
        if x == int(x):
            y = (x - a) / 2
            if y == int(y):
                result.append([int(x), int(y)])

    return result

print(sol_equa(5), [[3, 1]])
print(sol_equa(12), [[4, 1]])
print(sol_equa(13), [[7, 3]])
print(sol_equa(16), [[4, 0]])
print(sol_equa(90005), [[45003, 22501], [9003, 4499], [981, 467], [309, 37]])