# https://www.codewars.com/kata/5ba38ba180824a86850000f7
# In this Kata, you will remove the left-most duplicates from a list of integers and return the result.
# # Remove the 3's at indices 0 and 3
# # followed by removing a 4 at index 1
# solve([3, 4, 4, 3, 6, 3]) # => [4, 6, 3]

def solve(arr):
    result = []

    for i in range(len(arr)-1, -1, -1):
        item = arr[i]
        if item not in result:
            result.insert(0, item)

    return result


def solve(arr):
    result = []

    for item in arr[::-1]:
        if item not in result:
            result.append(item)
    return result[::-1]

print(solve([3, 4, 4, 3, 6, 3]), [4, 6, 3])
print(solve([1, 2, 1, 2, 1, 2, 3]), [1, 2, 3])
print(solve([1, 2, 3, 4]), [1, 2, 3, 4])
print(solve([1, 1, 4, 5, 1, 2, 1]), [4, 5, 2, 1])
