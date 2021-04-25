# https://www.codewars.com/kata/58a664bb586e986c940001d5
# Given string s, which contains only letters from a to z in lowercase.
# A set of alphabet is given by abcdefghijklmnopqrstuvwxyz.
# 2 sets of alphabets mean 2 or more alphabets.
# Your task is to find the missing letter(s). You may need to output them by the order a-z. It is possible that there is more than one missing letter from more than one set of alphabet.

def missing_alphabets(s):
    ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

    x = [s.count(char) for char in ALPHABET]
    maxX = max(x)
    result = ''

    for index, value in enumerate(x):
        missing = maxX - value
        if missing:
            result += ALPHABET[index] * missing

    return result
    


print(missing_alphabets("abcdefghijklmnopqrstuvwxy"),"z")
print(missing_alphabets("abcdefghijklmnopqrstuvwxyz"),"")
print(missing_alphabets("aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyy"),"zz")
print(missing_alphabets("abbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxy"),"ayzz")
print(missing_alphabets("codewars"),"bfghijklmnpqtuvxyz")