# https://www.codewars.com/kata/520b9d2ad5c005041100000f
# Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.

def piggy(s):
    if s in ['.',',','!','?']:
        return s
    return f'{s[1:]}{s[0]}ay'

def pig_it(text):
    words = text.split(' ')

    words = map(piggy, words)
    return ' '.join(words)


import re
def pig_it(text):
    pattern = '(\s)'
    words = re.split(pattern, text)
    result = ''

    for word in words:
        if word in [' ','.',',']:
            result += word
        else:
            result += f'{word[1:]}{word[0]}ay'
    return result


# solution from Codewars
def pig_it(text):
    lst = text.split()
    return ' '.join( [word[1:] + word[:1] + 'ay' if word.isalpha() else word for word in lst])


# solution from Codewars
import re
def pig_it(text):
    return re.sub(r'([a-z])([a-z]*)', r'\2\1ay', text, flags=re.I)


print(pig_it('O tempora o mores !'))
print(pig_it('Pig latin is cool'),'igPay atinlay siay oolcay')
print(pig_it('This is my string'),'hisTay siay ymay tringsay')