# https://www.codewars.com/kata/5541f58a944b85ce6d00006a
# The Fibonacci numbers are the numbers in the following integer sequence (Fn):
# 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
# F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

# Given a number, say prod (for product), we search
# Some Examples of Return:
# (depend on the language)

# productFib(714) # should return (21, 34, true),
#                 # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

# productFib(800) # should return (34, 55, false),
#                 # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55

def fibonacci(n, cache={}):
    if n in cache:
        return cache[n]
    if n == 0:
        return 0
    if n == 1:
        return 1

    cache[n] = fibonacci(n - 1, cache) + fibonacci(n - 2, cache)
    return cache[n]


def productFib(prod):
    i = 1

    while True:
        num1 = fibonacci(i-1)
        num2 = fibonacci(i)

        if num1 * num2 == prod:
            return [num1, num2, True]

        if num1 * num2 < prod:
            i += 1

        if num1 * num2 > prod:
            return [num1, num2, False]


# other solution from Codewars
def productFib(prod):
    a, b = 0, 1
    while prod > a * b:
        a, b = b, a + b
    return [a, b, prod == a * b]


print(productFib(4895), [55, 89, True])
print(productFib(5895), [89, 144, False])
