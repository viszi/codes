# https://www.codewars.com/kata/54b42f9314d9229fd6000d9c
# The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.
# Examples
# "din"      =>  "((("
# "recede"   =>  "()()()"
# "Success"  =>  ")())())"


def duplicate_encode(word):
    result = ''
    s = word.lower()

    for char in s:
        result += ")" if s.count(char) > 1 else "("

    return result


def duplicate_encode(word):
    word = word.lower()
    result = [")" if word.count(s) > 1 else "(" for s in word]

    return ''.join(result)


import collections
def duplicate_encode(word):
    d = collections.defaultdict(int)
    result = ''
    word = word.lower()

    for char in word:
        d[char] += 1

    for char in word:
        result += ")" if d[char] > 1 else "("
    return result


# same as above but without defaultdict - we have to handle non-existing keys
def duplciate_encode(word):
    d = {}
    result = ''
    word = word.lower()

    for char in word:
        if char in d:
            d[char] += 1
        else:
            d[char] = 1

    for char in word:
        result += "(" if d[char] == 1 else ")"
    return result


print(duplicate_encode("din"), "(((")
print(duplicate_encode("recede"), "()()()")
print(duplicate_encode("Success"), ")())())", "should ignore case")
print(duplicate_encode("(( @"), "))((")
