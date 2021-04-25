# https://www.codewars.com/kata/52597aa56021e91c93000cb0
# Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
# move_zeros([1, 0, 1, 2, 0, 1, 3]) # returns [1, 1, 2, 1, 3, 0, 0]

def move_zeros(array):
    result = []
    zeros = 0

    for val in array:
        if val == 0:
            zeros += 1
        else:
            result.append(val)
    return result + [0] * zeros
    # return result + [0 for i in range(zeros)]


# solution from Codewars
def move_zeros(array):
    return [x for x in array if x] + [0]*array.count(0)


print(move_zeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1]),
      [1, 2, 1, 1, 3, 1, 0, 0, 0, 0])
print(move_zeros([9, 0, 0, 9, 1, 2, 0, 1, 0, 1, 0, 3, 0, 1, 9, 0, 0, 0, 0, 9]),
      [9, 9, 1, 2, 1, 1, 3, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
print(move_zeros([0, 0]), [0, 0])
print(move_zeros([0]), [0])
print(move_zeros([]), [])
