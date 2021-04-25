# https://www.codewars.com/kata/56576f82ab83ee8268000059
# Kevin is noticing his space run out! Write a function that removes the spaces from the values and returns an array showing the space decreasing. For example, running this function on the array ['i', 'have','no','space'] would produce ['i','ihave','ihaveno','ihavenospace'].

def spacey(array):
    result = []

    for i, item in enumerate(array):
        if i == 0:
            result.append(item)
        else:
            result.append(result[i-1]+item)
        
    return result


print(spacey(['kevin', 'has','no','space']), [ 'kevin', 'kevinhas', 'kevinhasno', 'kevinhasnospace'])
print(spacey(['this','cheese','has','no','holes']), ['this','thischeese','thischeesehas','thischeesehasno','thischeesehasnoholes'])
