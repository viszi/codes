# https://www.codewars.com/kata/541c8630095125aba6000c00
# Digital root is the recursive sum of all the digits in a number.
# Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.
# Examples
#     16  -->  1 + 6 = 7
#    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6

def digital_root(n):
    while n >= 10:
        n = sum([int(x) for x in str(n)])

    return n


def digital_root(n):
    while n > 9:
        n = sum(map(int, str(n)))

    return n


print(digital_root(16), 7)
print(digital_root(942), 6)
print(digital_root(132189), 6)
print(digital_root(493193), 2)
