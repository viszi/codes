# https://www.codewars.com/kata/5cd4aec6abc7260028dcd942
# Given a number, num, return the shortest amount of steps it would take from 1, to land exactly on that number.
# xA step is defined as either:
# Adding 1 to the number: num += 1
# Doubling the number: num *= 2

def shortest_steps_to_num(num):
    common = {
        1: [0, ''],
        2: [1, '1+'],
        3: [2, '1+ 1+'],
        5: [3, '1+ 2x 1+'],
        7: [4, '1+ 1+ 2x 1+'],
        9: [4, '1+ 2x 2x 1+']
    }

    steps = 0
    result = []

    while num >=1:
        if num in common:
            steps += common[num][0]
            result.append(common[num][1])
            break
        
        if num % 2 == 0:
            result.append('2x')
            num /= 2
        else:
            result.append('1+')
            num -= 1
        steps += 1

    print(f'Steps: {" ".join(result)[::-1]}')
    return steps

#print(shortest_steps_to_num(1), 0)
#print(shortest_steps_to_num(7), 4)

print(shortest_steps_to_num(12), 4)
print(shortest_steps_to_num(16), 4)
print(shortest_steps_to_num(71), 9)