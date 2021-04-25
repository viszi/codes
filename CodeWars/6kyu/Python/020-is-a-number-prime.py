# https://www.codewars.com/kata/5262119038c0985a5b00029f
# Define a function that takes one integer argument and returns logical value true or false depending on if the integer is a prime.
# Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

import math
def isPrime(num):
    if num < 2:
        return False
    if num == 2 or num == -2:
        return True
    if num % 2 == 0:
        return False

    for div in range(3, math.floor(math.sqrt(abs(num)))+1, 2):
        if num % div == 0:
            return False
    return True

print(isPrime(0),  False, "0  is not prime")
print(isPrime(1),  False, "1  is not prime")
print(isPrime(2),  True, "2  is prime")
print(isPrime(73), True, "73 is prime")
print(isPrime(75), False, "75 is not prime")
print(isPrime(-1), False, "-1 is not prime")
print(isPrime(3),  True, "3  is prime");
print(isPrime(5),  True, "5  is prime");
print(isPrime(7),  True, "7  is prime");
print(isPrime(41), True, "41 is prime");
print(isPrime(5099), True, "5099 is prime");
print(isPrime(4),  False, "4  is not prime");
print(isPrime(6),  False, "6  is not prime");
print(isPrime(8),  False, "8  is not prime");
print(isPrime(9), False, "9 is not prime");
print(isPrime(45), False, "45 is not prime");
print(isPrime(-5), False, "-5 is not prime");
print(isPrime(-8), False, "-8 is not prime");
print(isPrime(-41), False, "-41 is not prime");
