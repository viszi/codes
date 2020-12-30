# https://stackoverflow.com/questions/18548345/converting-words-to-numbers-in-c

def parseInt(inputnumber):
    all = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "eleven": 11,
        "twelve": 12,
        "thirteen": 13,
        "fourteen": 14,
        "fifteen": 15,
        "sixteen": 16,
        "seventeen": 17,
        "eighteen": 18,
        "nineteen": 19,
        "twenty": 20,
        "thirty": 30,
        "forty": 40,
        "fifty": 50,
        "sixty": 60,
        "seventy": 70,
        "eighty": 80,
        "ninety": 90,
        "hundred": 100,
        "thousand": 1000,
        "million": 1000000,
        "billion": 1000000000,
        "trillion": 1000000000000,
        "quadrillion": 1000000000000000,
        "quintillion": 1000000000000000000,
        "sextillion": 1000000000000000000000,
        "septillion": 1000000000000000000000000,
        "octillion": 1000000000000000000000000000,
        "nonillion": 1000000000000000000000000000000
    }


    spliter = {
        "thousand": 1000,
        "million": 1000000,
        "billion": 1000000000,
        "trillion": 1000000000000,
        "quadrillion": 1000000000000000,
        "quintillion": 1000000000000000000,
        "sextillion": 1000000000000000000000,
        "septillion": 1000000000000000000000000,
        "octillion": 1000000000000000000000000000,
        "nonillion": 1000000000000000000000000000000
    }

    # inputnumber = input("Please enter string number : ")

    tokens = inputnumber.split(" ")

    result = 0
    partial_result = 0
    for index in range(len(tokens)):
        if tokens[index] in spliter:
            if partial_result == 0:
                partial_result = 1
            partial_result *= all[tokens[index]]
            result += partial_result
            partial_result = 0
        else:
            if tokens[index] == "hundred":
                if partial_result == 0:
                    partial_result = 1
                partial_result *= all[tokens[index]]

            else:
                partial_result += all[tokens[index]]

    result += partial_result

    return result

print(parseInt("seven hundred thousand"), 700000)
print(parseInt("two hundred thousand three"), 200003)
print(parseInt("five hundred thousand three hundred"), 500300)
print(parseInt("four hundred ninety four thousand one hundred ten"), 494110)
print(parseInt('ten thousand hundred ten'), 10100)
print(parseInt('one'), 1)
print(parseInt('twenty'), 20)
print(parseInt('two hundred forty six'), 246)
print(parseInt('two hundred ten'), 210)
print(parseInt('seven hundred eighty three thousand nine hundred nineteen'), 783919)
print(parseInt('two thousand two hundred eighty one'), 2281)
print(parseInt('six thousand one hundred forty four'), 6144)
print(parseInt('twenty three thousand five hundred sixty seven'), 23567)
print(parseInt('six hundred forty one thousand two hundred fifty six'), 641256)
print(parseInt('thirty one million nine hundred thirty four thousand six hundred twenty three'), 31934623)