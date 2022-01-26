# https://www.codewars.com/kata/59ce11ea9f0cbc8a390000ed
# The prime number sequence starts with: 2,3,5,7,11,13,17,19.... Notice that 2 is in position one.
# 3 occupies position two, which is a prime-numbered position. Similarly, 5, 11 and 17 also occupy prime-numbered positions. We shall call primes such as 3,5,11,17 dominant primes because they occupy prime-numbered positions in the prime number sequence. Let's call this listA.
# As you can see from listA, for the prime range range(0,10), there are only two dominant primes (3 and 5) and the sum of these primes is: 3 + 5 = 8.
# Similarly, as shown in listA, in the range (6,20), the dominant primes in this range are 11 and 17, with a sum of 28.
# Given a range (a,b), what is the sum of dominant primes within that range? Note that a <= range <= b and b will not exceed 500000.

def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False

    for d in range(3, int(n ** 0.5) + 1, 2):
        if n % d == 0: return False
    return True

def solve(a,b):
    sum = 0
    position = 0

    for num in range(b + 1):
        if is_prime(num):
            position += 1
            if is_prime(position) and num >= a: sum += num
    return sum


# using sieve in the same for loop
def solve(a,b):
    sum = 0
    primeCount = 0
    sieve = [0] * (b + 1)
    sieve[0], sieve[1] = 1, 1

    for num in range(b + 1):
        if sieve[num] == 0:
            for x in range(num + num, b + 1, num):
                sieve[x] = 1
            primeCount += 1

            if num >=a and sieve[primeCount] == 0: sum += num

    return sum

print(solve(0,10),8)
print(solve(2,200),1080)
print(solve(200,2000),48132)
print(solve(500,10000),847039)
print(solve(4000,450000),806250440)