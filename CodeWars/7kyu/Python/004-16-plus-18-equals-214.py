# https://www.codewars.com/kata/5effa412233ac3002a9e471d
# For this kata you will have to forget how to add two numbers.

def add(num1, num2):
    [big, small] = [num1, num2] if num1 > num2 else [num2, num1]

    if big == 0:
        return 0

    result = ''
    while small > 0:
        result = str(small % 10 + big % 10) + result
        small //= 10
        big //= 10

    if big > 0:
        result = str(big) + result

    return int(result)


print(add(2, 11), 13)
print(add(0, 1), 1)
print(add(0, 0), 0)
print(add(16, 18), 214)
print(add(26, 39), 515)
print(add(122, 81), 1103)
