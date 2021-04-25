# https://www.codewars.com/kata/5cd5ba1ce4471a00256930c0
# Your job is to write function last_digits(n,d) which return the last d digits of an integer n as a list. n will be from 0 to 10^10


def solution(n, d):
    if d <= 0:
        return []

    result = []

    while len(result) < d and n > 0:
        result.insert(0, n % 10)
        n = n//10

    return result


def solution(n, d):
    if d <= 0:
        return []

    nums = [int(digit) for digit in str(n)]

    if d > len(nums):
        return nums

    return nums[len(nums)-d:]


def solution(n, d):
    return [int(s) for s in str(n)[-d:]] if d > 0 else []


print(solution(1, 1), [1])
print(solution(123767, 4), [3, 7, 6, 7])
print(solution(0, 1), [0])
print(solution(34625647867585, 10), [5, 6, 4, 7, 8, 6, 7, 5, 8, 5])
print(solution(1234, 0), [])
print(solution(24134, -4), [])
print(solution(1343, 5), [1, 3, 4, 3])
