# https://www.codewars.com/kata/52e88b39ffb6ac53a400022e
# Take the following IPv4 address: 128.32.10.1
# 1st octet 128 has the binary representation: 10000000
# 2nd octet 32 has the binary representation: 00100000
# 3rd octet 10 has the binary representation: 00001010
# 4th octet 1 has the binary representation: 00000001
# So 128.32.10.1 == 10000000.00100000.00001010.00000001
# Because the above IP address has 32 bits, we can represent it as the unsigned 32 bit number: 2149583361
# Complete the function that takes an unsigned 32 bit number and returns a string representation of its IPv4 address.

def int32_to_ip(int32):
    # convert unsigned 32bit to binary - fill up with leading zeros
    binary = bin(int32)[2:].rjust(32, '0')
    return f'{int(binary[0:8], 2)}.{int(binary[8:16], 2)}.{int(binary[16:24], 2)}.{int(binary[24:], 2)}'
    

print(int32_to_ip(2154959208), "128.114.17.104") 
print(int32_to_ip(0), "0.0.0.0")
print(int32_to_ip(2149583361), "128.32.10.1")