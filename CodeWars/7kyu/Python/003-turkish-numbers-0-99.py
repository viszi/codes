# https://www.codewars.com/kata/5ebd53ea50d0680031190b96
# Complete the function to convert an integer into a string of the Turkish name.
#  - input will always be an integer 0-99;
#  - output should always be lower case.

# Forming the Turkish names for the numbers 0-99 is very straightforward:
#  - units (0-9) and tens (10, 20, 30, etc.) each have their own unique name;
#  - all other numbers are simply [tens] + [unit], like twenty one in English.

def get_turkish_number(num):
    UNITS = ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"]
    TENS = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"]

    if num < 10:
        return UNITS[num % 10]

    if num % 10 == 0:
        return TENS[num // 10]

    return f'{TENS[num // 10]} {UNITS[num % 10]}'


print(get_turkish_number(1), "bir")
print(get_turkish_number(13), "on üç")
print(get_turkish_number(27), "yirmi yedi")
print(get_turkish_number(38), "otuz sekiz")
print(get_turkish_number(77), "yetmiş yedi")
print(get_turkish_number(94), "doksan dört")
print(get_turkish_number(60), "altmış")
