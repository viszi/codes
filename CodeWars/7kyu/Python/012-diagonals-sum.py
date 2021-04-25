# https://www.codewars.com/kata/5592fc599a7f40adac0000a8
# Create a function that receives a (square) matrix and calculates the sum of both diagonals (main and secondary)
# Matrix = array of n length whose elements are n length arrays of integers.


def sum_diagonals(matrix):
    sum = 0
    size = len(matrix)

    for i in range(size):
        row = matrix[i]
        if row != []:
            sum += row[i] + row[size-1-i]
    return sum

print(sum_diagonals([[]]))
print(sum_diagonals([[1,2,3], [4,5,6], [7,8,9]]), 1 + 5 + 9 + 3 + 5 + 7)