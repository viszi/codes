# https://www.codewars.com/kata/54a91a4883a7de5d7800009c
# Your job is to write a function which increments a string, to create a new string.
#  - If the string already ends with a number, the number should be incremented by 1.
#  - If the string does not end with a number. the number 1 should be appended to the new string.

# foo -> foo1
# foobar23 -> foobar24
# foo0042 -> foo0043

def increment_string(strng):
    num = ''
    for s in strng[::-1]:
        if s.isnumeric():
            num = s + num
        else: break

    strng = strng[0:len(strng)-len(num)]
    num = '1' if num == '' else str(int(num)+1).rjust(len(num), '0')   
    return strng + num


import re
def increment_string(strng):
    result = re.split("(\d+$)", strng)
    num = '0' if len(result) == 1 else result[1]
    return result[0] + str(int(num)+1).rjust(len(num), '0')
    

print(increment_string("foo"), "foo1")
print(increment_string("foobar001"), "foobar002")
print(increment_string("foobar1"), "foobar2")
print(increment_string("foobar00"), "foobar01")
print(increment_string("foobar99"), "foobar100")
print(increment_string("foobar099"), "foobar100")
print(increment_string(""), "1")
print(increment_string("05!Qqz8_LDa`z9960983%-t9139754&?#FZ/6aR;P207517No1|12863(Lc~llF*3154076067198048"))