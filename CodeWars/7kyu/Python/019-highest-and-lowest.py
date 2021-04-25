# https://www.codewars.com/kata/554b4ac871d6813a03000035
# In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

# Example:
# high_and_low("1 2 3 4 5")  # return "5 1"
# high_and_low("1 2 -3 4 5") # return "5 -3"
# high_and_low("1 9 3 4 -5") # return "9 -5"

def convert(s):
    return int(s)

def high_and_low(numbers):
    nums = sorted(numbers.split(), key=convert)
    return f'{nums[len(nums)-1]} {nums[0]}' if nums else f'{numbers} {numbers}'

def high_and_low(numbers):
    nums = sorted(numbers.split(), key=int)
    return '{} {}'.format(nums[-1], nums[0])

def high_and_low(numbers):
    numbers = [int(c) for c in numbers.split()]
    return f"{max(numbers)} {min(numbers)}"


print(high_and_low("4 5 29 54 4 0 -214 542 -64 1 -3 6 -6"), "542 -214")
print(high_and_low("1 -1"), "1 -1")
print(high_and_low("1 1"), "1 1")
print(high_and_low("-1 -1"), "-1 -1")
print(high_and_low("1 -1 0"), "1 -1")
print(high_and_low("1 1 0"), "1 0")
print(high_and_low("-1 -1 0"), "0 -1")
print(high_and_low("42"), "42 42")
