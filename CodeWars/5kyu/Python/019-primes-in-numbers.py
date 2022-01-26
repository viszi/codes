# https://www.codewars.com/kata/54d512e62a5e54c96200019e
# Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :
# "(p1**n1)(p2**n2)...(pk**nk)"
# where a ** b means a to the power of b
# Example: n = 86240 should return "(2**5)(5)(7**2)(11)"

def prime_factors(n):
    divisors = {}
    div = 2

    while n > 1:
        if n % div == 0:
            if div in divisors:
                divisors[div] += 1
            else:
                divisors[div] = 1

            n /= div
        else:
            if div == 2:
                div += 1
            else:
                div += 2

    result = ''

    for [key, value] in divisors.items():
        if value > 1:
            result += f'({key}**{value})'
        else:
            result += f'({key})'

    return result


# same as above but generating result immediately instead of using a dictionary
def prime_factors(n):
    divisor = 2
    count = 0
    result = ''

    while n > 1:
        if n % divisor == 0:
            count += 1
            n /= divisor
        else:
            result += f'({divisor}**{count})' if count > 1 else f'({divisor})'
            count = 0
            if divisor == 2:
                divisor += 1
            else:
                divisor += 2

    return result


print(prime_factors(86240), "(2**5)(5)(7**2)(11)")
print(prime_factors(7775460), "(2**2)(3**3)(5)(7)(11**2)(17)")
