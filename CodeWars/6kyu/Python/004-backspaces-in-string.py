# https://www.codewars.com/kata/5727bb0fe81185ae62000ae3
# Assume "#" is like a backspace in string. This means that string "a#bc#d" actually is "bd"
# Your task is to process a string with "#" symbols.

def clean_string(s):
    result = []

    for char in s:
        if char == "#":
            if len(result):
                result.pop()
        else:
            result.append(char)

    return ''.join(result)


def clean_string(s):
    result = ''

    for char in s:
        if char == "#":
            result = result[:-1]
        else:
            result += char
    return result

print(clean_string('abc#d##c'), "ac")
print(clean_string('abc####d##c#'), "" )
print(clean_string("#######"), "" )
print(clean_string(""), "" )