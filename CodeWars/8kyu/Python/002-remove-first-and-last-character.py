# https://www.codewars.com/kata/56bc28ad5bdaeb48760009b0
# Your goal is to create a function that removes the first and last characters of a string. You're given one parameter, the original string. You don't have to worry with strings with less than two characters.

def remove_char(s):
    return s[1:-1]


def remove_char(s): return s[1:-1]


def remove_char(s):
    s = list(s)
    s.pop()
    s.pop(0)
    return ''.join(s)


print(remove_char('eloquent'), 'loquen')
print(remove_char('country'), 'ountr')
print(remove_char('person'), 'erso')
print(remove_char('place'), 'lac')
print(remove_char('ok'), '')
print(remove_char('ooopsss'), 'oopss')
