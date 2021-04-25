# https://www.codewars.com/kata/5c942f40bc4575001a3ea7ec
# Multiply all the digits of a nonnegative integer n by each other, repeating with the product until a single digit is obtained. The number of steps required is known as the multiplicative persistence.
# Create a function that calculates the individual results of each step, not including the original number, but including the single digit, and outputs the result as a list/array. If the input is a single digit, return an empty list/array.

def per(n):
    result = []

    if n < 10:
        return []

    while n > 9:
        product = 1
        for num in str(n):
            product *= int(num)
        
        result.append(product)
        n = product

    return result

def per(n):
    result = []

    if n < 10:
        return []

    while n > 9:
        product = 1
        
        i = n
        while i > 0:
            product *= i % 10
            i = i // 10

        result.append(product)
        n = product

    return result


print(per(1), [])
print(per(10), [0])
print(per(69), [54, 20, 0])
print(per(277777788888899), [4996238671872, 438939648, 4478976, 338688, 27648, 2688, 768, 336, 54, 20, 0])