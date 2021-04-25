# https://www.codewars.com/kata/534d2f5b5371ecf8d2000a08
# Your task, is to create NxN multiplication table, of size provided in parameter.

def multiplication_table(size):
    result = []

    for i in range(size):
        rows = [(j+1)*(i+1) for j in range(size)]
        result.append(rows)

    return result


print(multiplication_table(3), [[1, 2, 3], [2, 4, 6], [3, 6, 9]])
