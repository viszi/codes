# https://www.codewars.com/kata/586d6cefbcc21eed7a001155
# For a given string s find the character c (or C) with longest consecutive repetition and return: (c, l)
# where l (or L) is the length of the repetition. If there are two or more characters with the same l return the first in order of appearance.
# For empty string return: ('', 0)

def longest_repetition(chars):
    if chars == '':
        return ('', 0)

    previous = chars[0]
    repeat = 0
    longestChar = previous
    longestRep = 0

    for i in range(1, len(chars)):
        current = chars[i]
        if previous == current:
            repeat += 1
        else:
            repeat = 0
        
        if repeat > longestRep:
            longestRep = repeat
            longestChar = previous
        previous = current

    return (longestChar, longestRep+1)


print(longest_repetition("bbbaaabaaaa"), ('a', 4))
print(longest_repetition("aaaabb"), ('a', 4))
print(longest_repetition("cbdeuuu900"), ('u', 3))
print(longest_repetition("abbbbb"), ('b', 5))
print(longest_repetition("aabb"), ('a', 2))
print(longest_repetition("ba"), ('b', 1))
print(longest_repetition(""), ('', 0))
