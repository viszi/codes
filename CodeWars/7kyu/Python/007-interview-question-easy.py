# https://www.codewars.com/kata/5b358a1e228d316283001892
# You receive the name of a city as a string, and you need to return a string that shows how many times each letter shows up in the string by using asterisks (*).
# For example: "Chicago"  -->  "c:**,h:*,i:*,a:*,g:*,o:*"
# As you can see, the letter c is shown only once, but with 2 asterisks.
# The return string should include only the letters (not the dashes, spaces, apostrophes, etc). There should be no spaces in the output, and the different letters are separated by a comma (,) as seen in the example above.
# Note that the return string must list the letters in order of their first appearance in the original string.

def get_strings(city):
    letters = {}

    c = city.lower()
    for char in c:
        if char != " ":
            letters[char] = c.count(char)

    result = ""
    for key, value in letters.items():
        result += f'{key}:{"*" * value},'
    
    return result[:-1]

def get_strings(city):
    result = ''

    citySmall = city.lower()

    for char in citySmall:
        if char not in result and char != ' ':
            result += f'{char}:{"*" * citySmall.count(char)},'

    return result[:-1]

print(get_strings("Chicago"), "c:**,h:*,i:*,a:*,g:*,o:*")
print(get_strings("Bangkok"), "b:*,a:*,n:*,g:*,k:**,o:*")
print(get_strings("Las Vegas"), "l:*,a:**,s:**,v:*,e:*,g:*")