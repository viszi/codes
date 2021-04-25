# https://www.codewars.com/kata/5715eaedb436cf5606000381
# You get an array of numbers, return the sum of all of the positives ones.
# Example [1,-4,7,12] => 1 + 7 + 12 = 20
# Note: if there is nothing to sum, the sum is default to 0.

def positive_sum(arr):
    sum = 0

    for num in arr:
        sum += num if num > 0 else 0

    return sum


def positive(num):
    if num > 0:
        return num
    return 0


def positive_sum(arr):
    positives = filter(positive, arr)
    return sum(positives)


def positive_sum(arr):
    return sum(filter(lambda x: x > 0,arr))


def positive_sum(arr):
    return sum(x for x in arr if x > 0)


print(positive_sum([1, 2, 3, 4, 5]), 15)
print(positive_sum([1, -2, 3, 4, 5]), 13)
print(positive_sum([-1, 2, 3, 4, -5]), 9)
print(positive_sum([]), 0)
print(positive_sum([-1, -2, -3, -4, -5]), 0)
