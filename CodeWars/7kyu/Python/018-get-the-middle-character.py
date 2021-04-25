# https://www.codewars.com/kata/56747fd5cb988479af000028
# You are going to be given a word. Your job is to return the middle character of the word.
# If the word's length is odd, return the middle character. If the word's length is even, return the middle 2 characters.
# Kata.getMiddle("test") should return "es"
# Kata.getMiddle("testing") should return "t"

def get_middle(s):
    if len(s) % 2 == 0:
        start = len(s) // 2 - 1
        end = start + 2
    else:
        start = len(s) // 2
        end = start + 1

    return s[start:end]


print(get_middle("test"), "es")
print(get_middle("testing"), "t")
print(get_middle("middle"), "dd")
print(get_middle("A"), "A")
print(get_middle("of"), "of")
