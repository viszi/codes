# https://www.codewars.com/kata/523f5d21c841566fde000009
# Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.
# It should remove all values from list a, which are present in list b keeping their order.
# array_diff([1,2],[1]) == [2]

def array_diff(a, b):
    result = []

    for value in a:
        if value not in b:
            result.append(value)

    return result


def array_diff(a, b):
    return [x for x in a if x not in b]


print(array_diff([1, 2], [1]), [2], "a was [1,2], b was [1], expected [2]")
print(array_diff([1, 2, 2], [1]), [2, 2],
      "a was [1,2,2], b was [1], expected [2,2]")
print(array_diff([1, 2, 2], [2]), [1],
      "a was [1,2,2], b was [2], expected [1]")
print(array_diff([1, 2, 2], []), [1, 2, 2],
      "a was [1,2,2], b was [], expected [1,2,2]")
print(array_diff([], [1, 2]), [], "a was [], b was [1,2], expected []")
print(array_diff([1, 2, 3], [1, 2]), [3],
      "a was [1,2,3], b was [1, 2], expected [3]")
