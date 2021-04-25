# https://www.codewars.com/kata/513e08acc600c94f01000001
# The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.
# Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.
# The following are examples of expected output values:
# rgb(255, 255, 255) # returns FFFFFF
# rgb(255, 255, 300) # returns FFFFFF

def decToHex(num):
    if num < 0: num = 0
    if num > 255: num = 255
    return str(hex(num)[2:]).upper().rjust(2,'0')
    #return '{0:0>2}'.format(hex(num)[2:])

def rgb(r, g, b):
    return f'{decToHex(r)}{decToHex(g)}{decToHex(b)}'


# solution from Codewars
def rgb(r, g, b):
    round = lambda x: min(255, max(x, 0))
    return ("{:02X}" * 3).format(round(r), round(g), round(b))


print(rgb(0,0,0),"000000", "testing zero values")
print(rgb(1,2,3),"010203", "testing near zero values")
print(rgb(255,255,255), "FFFFFF", "testing max values")
print(rgb(254,253,252), "FEFDFC", "testing near max values")
print(rgb(-20,275,125), "00FF7D", "testing out of range values")