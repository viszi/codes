# https://www.codewars.com/kata/5526fc09a1bbd946250002dc
# You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.

# Examples
# [2, 4, 0, 100, 4, 11, 2602, 36]
# Should return: 11 (the only odd number)

# [160, 3, 1719, 19, 11, 13, -21]
# Should return: 160 (the only even number)

def find_outlier(nums):
    odd, even = [], []

    for num in nums:
        even.append(num) if num % 2 else odd.append(num)

    return even[0] if len(even) == 1 else odd[0]


def find_outlier(int):
    odds = [x for x in int if x % 2 != 0]
    evens = [x for x in int if x % 2 == 0]
    return odds[0] if len(odds) < len(evens) else evens[0]


print(find_outlier([2, 4, 6, 8, 10, 3]), 3)
print(find_outlier([2, 4, 0, 100, 4, 11, 2602, 36]), 11)
print(find_outlier([160, 3, 1719, 19, 11, 13, -21]), 160)
