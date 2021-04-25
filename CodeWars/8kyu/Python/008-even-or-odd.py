# https://www.codewars.com/kata/53da3dbb4a5168369a0000fe
# Create a function (or write a script in Shell) that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.


def even_or_odd(number):
    return "Even" if number % 2 == 0 else "Odd"


def even_or_odd(number):
    return ["Even", "Odd"][number % 2]


def even_or_odd(number): return "Odd" if number % 2 else "Even"


even_or_odd = lambda number: "Odd" if number % 2 else "Even"
even_or_odd = lambda n:'EOvdedn'[n%2::2]


print(even_or_odd(2), "Even")
print(even_or_odd(1), "Odd")
print(even_or_odd(0), "Even")
print(even_or_odd(1545452), "Even")
print(even_or_odd(7), "Odd")
print(even_or_odd(78), "Even")
print(even_or_odd(17), "Odd")
print(even_or_odd(74156741), "Odd")
print(even_or_odd(100000), "Even")
print(even_or_odd(-123), "Odd")
print(even_or_odd(-456), "Even")
