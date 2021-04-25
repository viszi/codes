# https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1
# Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.
# Example
# "abcde" -> 0 # no characters repeats more than once
# "aabbcde" -> 2 # 'a' and 'b'


def duplicate_count(text):
    d = {}
    dupes = 0

    for i in text:
        item = i.lower()
        if item in d:
            if d[item] == 1:
                dupes += 1
            d[item] += 1
        else:
            d[item] = 1
    return dupes


import collections
def duplicate_count(text):
    d = collections.defaultdict(int)
    dupes = 0

    for i in text:
        item = i.lower()
        if d[item] == 1:
            dupes += 1
        d[item] += 1
    return dupes


print(duplicate_count(""), 0)
print(duplicate_count("abcde"), 0)
print(duplicate_count("abcdeaa"), 1)
print(duplicate_count("abcdeaB"), 2)
print(duplicate_count("Indivisibilities"), 2)