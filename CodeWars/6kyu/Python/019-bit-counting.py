# https://www.codewars.com/kata/526571aae218b8ee490006f4
# Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.
# Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case


def countBits(n):
    binary = bin(n)[2:]
    return binary.count('1')

def countBits(n):
    binary = ''
    ones = 0

    while n > 0:
        b = n % 2
        if b == 1:
            ones += 1

        binary = str(b) + binary
        n = n // 2
    return ones

print(countBits(0), 0)
print(countBits(4), 1)
print(countBits(7), 3)
print(countBits(9), 2)
print(countBits(10), 2)