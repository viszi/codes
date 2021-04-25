# https://www.codewars.com/kata/52685f7382004e774f0001f7
# Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)
# HH = hours, padded to 2 digits, range: 00 - 99
# MM = minutes, padded to 2 digits, range: 00 - 59
# SS = seconds, padded to 2 digits, range: 00 - 59
# The maximum time never exceeds 359999 (99:59:59)

def make_readable(seconds):
    hours = seconds // (60*60)
    seconds = seconds - hours*60*60
    minutes = seconds // 60
    seconds = seconds - minutes * 60

    return f'{str(hours).rjust(2,"0")}:{str(minutes).rjust(2,"0")}:{str(seconds).rjust(2,"0")}'


# solution from Codewars
def make_readable(seconds):
    return "{:0>2}:{:0>2}:{:0>2}".format(seconds // 3600, (seconds % 3600) // 60, (seconds % 3600) % 60)

print(make_readable(0), "00:00:00")
print(make_readable(5), "00:00:05")
print(make_readable(60), "00:01:00")
print(make_readable(86399), "23:59:59")
print(make_readable(359999), "99:59:59")