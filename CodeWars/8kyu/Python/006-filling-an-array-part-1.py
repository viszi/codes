# https://www.codewars.com/kata/571d42206414b103dc0006a1
# Write a function that produces an array with the numbers 0 to N-1 in it.
# For example, the following code will result in an array containing the numbers 0 to 4:
# arr(5) // => [0,1,2,3,4]

def arr(n=0):
    result = []

    if n > 0:
        for i in range(n):
            result.append(i)
    return result


def arr(n=0): 
    return list(range(n))


def arr(n=0): 
    return [i for i in range(n)]

    
print(arr(4), [0, 1, 2, 3])
print(arr(0), [])
print(arr(), [])
