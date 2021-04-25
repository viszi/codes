# https://www.codewars.com/kata/55aa075506463dac6600010d
# Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!
# Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.
# The result will be an array of arrays or of tuples (in C an array of Pair) or a string, each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.
# list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
# list_squared(42, 250) --> [[42, 2500], [246, 84100]]


def listDivisors(num):
    divisors = []
    
    for d in range(1, int(num ** 0.5)+1):
        if num % d == 0:
            divisors.append(d)
            if d != num // d:
                divisors.append(num // d)
    return divisors


def squaredDivisors(arr):
    return [x*x for x in arr]

def list_squared(m, n):
    result = []

    for num in range(m, n + 1):
        divisors = listDivisors(num)
        squared = squaredDivisors(divisors)
        sumSquared = sum(squared)
        root = int(sumSquared ** 0.5)

        if sumSquared == root * root:
            result.append([num, sumSquared])

    return result


def list_squared(m, n):
    result = []

    for num in range(m, n + 1):
        # calculate sum of squared divisors of the current number
        squaredSum = 0
        for i in range(1, int(num ** 0.5) + 1):
            if num % i == 0:
                squaredSum += i * i
                j = num // i
                if i != j:
                    squaredSum += j * j

        root = int(squaredSum ** 0.5)
        if squaredSum == root * root:
            result.append([num, squaredSum])

    return result


print(list_squared(1, 250), [[1, 1], [42, 2500], [246, 84100]])
print(list_squared(42, 250), [[42, 2500], [246, 84100]])
print(list_squared(250, 500), [[287, 84100]])