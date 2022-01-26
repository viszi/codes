# https://www.codewars.com/kata/59f38b033640ce9fc700015b
# In this Kata, you will be given an integer array and your task is to return the sum of elements occupying prime-numbered indices.
# The first element of the array is at index 0.

def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False

    for d in range(3, int(n ** 0.5) + 1, 2):
        if n % d == 0: return False
    return True

def total(arr):
    sum = 0

    for i in range(len(arr)):
        if is_prime(i): sum += arr[i]

    return sum


def total(arr):
    if len(arr) == 0: return 0
    
    sum = 0
    sieve = [0] * len(arr)
    sieve[0], sieve[1] = 1, 1

    for i in range(len(arr)):
        if sieve[i] == 0: 
            sum += arr[i]
            
            for x in range(i+i, len(arr), i):
                sieve[x] = 1

    return sum


print(total([]),0)
print(total([1,2,3,4]),7)
print(total([1,2,3,4,5,6]),13)
print(total([1,2,3,4,5,6,7,8]),21)
print(total([1,2,3,4,5,6,7,8,9,10,11]),21)
print(total([1,2,3,4,5,6,7,8,9,10,11,12,13]),33)
print(total([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]),47)