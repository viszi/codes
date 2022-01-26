# https://www.codewars.com/kata/526989a41034285187000de4
# Implement a function that receives two IPv4 addresses, and returns the number of addresses between them (including the first one, excluding the last one).
# All inputs will be valid IPv4 addresses in the form of strings. The last address will always be greater than the first one.

# ips_between("10.0.0.0", "10.0.0.50")  ==   50 
# ips_between("10.0.0.0", "10.0.1.0")   ==  256 
# ips_between("20.0.0.10", "20.0.1.0")  ==  246

def ips_between(start, end):
    s = start.split('.')
    e = end.split('.')
    
    d0 = int(e[0])-int(s[0])
    d1 = int(e[1])-int(s[1])
    d2 = int(e[2])-int(s[2])
    d3 = int(e[3])-int(s[3])

    return d0 * 256 * 256 * 256 + d1 * 256 * 256 + d2 * 256 + d3


print(ips_between("10.0.0.0", "10.0.0.50"), 50)
print(ips_between("10.0.0.0", "10.0.1.0"), 256)
print(ips_between("20.0.0.10", "20.0.1.0"), 246)