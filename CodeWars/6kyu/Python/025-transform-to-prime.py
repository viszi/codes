# https://www.codewars.com/kata/5a946d9fba1bb5135100007c
# Given a List [] of n integers , find minimum number to be inserted in a list, so that sum of all elements of list should equal the closest prime number .

from gmpy2 import next_prime, is_prime
def minimum_number(numbers):
    s = sum(numbers)
    return 0 if is_prime(s) else next_prime(s) - s


def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False

    for d in range(3, int(n ** 0.5) + 1, 2):
        if n % d == 0: return False
    return True


def minimum_number(numbers):
    s = sum(numbers)
    n = s
    
    while True:
        if is_prime(n): 
            break
        else:
            n += 1

    return n - s

print(minimum_number([3, 1, 2]), 1)
print(minimum_number([5, 2]), 0)
print(minimum_number([1, 1, 1]), 0)
print(minimum_number([2, 12, 8, 4, 6]), 5)
print(minimum_number([50, 39, 49, 6, 17, 28]), 2)
