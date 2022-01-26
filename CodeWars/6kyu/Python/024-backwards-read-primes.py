# https://www.codewars.com/kata/5539fecef69c483c5a000015
# Find all Backwards Read Primes between two positive given numbers (both inclusive), the second one always being greater than or equal to the first one. The resulting array or the resulting string will be ordered following the natural order of the prime numbers.
# Examples (in general form):
# backwardsPrime(2, 100) => [13, 17, 31, 37, 71, 73, 79, 97] 


def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False

    for d in range(3, int(n ** 0.5) + 1, 2):
        if n % d == 0: return False
    return True

# using the mathematical way to reverse the number
import math
def reverse_number(n):
    r = 0

    exp = math.floor(math.log10(n))
    c = 0

    while n > 0:
        x = (n % 10) * 10**(exp-c)
        r += x
        n = n // 10
        c += 1
    return r


def backwards_prime(start, stop):
    result = set()

    for x in range(start, stop + 1):
        if is_prime(x):
            #reverse = reverse_number(x)
            reverse = int(str(x)[::-1])
            if x != reverse and is_prime(reverse):
                result.add(x)
                if reverse >= start and reverse <= stop: result.add(reverse)
    
    return sorted(result)

print(backwards_prime(2, 100), [13, 17, 31, 37, 71, 73, 79, 97])
print(backwards_prime(9900, 10000), [9923, 9931, 9941, 9967])
print(backwards_prime(501, 599), [])
print(backwards_prime(7000, 7100), [7027, 7043, 7057])