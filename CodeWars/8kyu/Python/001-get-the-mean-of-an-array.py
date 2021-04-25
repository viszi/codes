# https://www.codewars.com/kata/563e320cee5dddcf77000158/
# Return the average of the given array rounded down to its nearest integer.
# The array will never be empty.

import math


def get_average(marks):
    sum = 0
    for i in range(len(marks)):
        sum += marks[i]

    return math.floor(sum/len(marks))


def get_average(marks):
    sum = 0
    for num in marks:
        sum += num

    return math.floor(sum/len(marks))


def get_average(marks):
    sum = 0
    for num in marks:
        sum += num

    return math.floor(sum/len(marks))


def get_average(marks):
    return int(sum(marks) / len(marks))

def get_average(marks):
    return sum(marks) // len(marks)


import numpy
def get_average(marks):
    return int(numpy.mean(marks))


get_average =lambda x: sum(x)//len(x)

print(get_average([2, 2, 2, 2]), 2)
print(get_average([1, 5, 87, 45, 8, 8]), 25)
print(get_average([2, 5, 13, 20, 16, 16, 10]), 11)
print(get_average([1, 2, 15, 15, 17, 11, 12,
                   17, 17, 14, 13, 15, 6, 11, 8, 7]), 11)
