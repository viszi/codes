# https://www.codewars.com/kata/57a62154cf1fa5b25200031e
# Write function alternateCase which switch every letter in string from upper to lower and from lower to upper. E.g: Hello World -> hELLO wORLD

def alternate_case(s):
    result = ""

    for char in s:
        if char.upper() == char:
            result += char.lower()
        else:
            result += char.upper()
    return result


def alternate_case(s):
    result = ""

    for char in s:
        result += char.lower() if char.isupper() else char.upper()
        
    return result


def alternate_case(s):
    return s.swapcase()


print(alternate_case("ABC"), "abc")
print(alternate_case(""), "")
print(alternate_case(" "), " ")
print(alternate_case("Hello World"), "hELLO wORLD")
print(alternate_case("cODEwARS"), "CodeWars")
print(alternate_case("i LIKE MAKING KATAS VERY MUCH"),
      "I like making katas very much")
