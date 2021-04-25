# https://www.codewars.com/kata/5f3afc40b24f090028233490
# Your job is to change the given string s using a non-negative integer n.
# Each bit in n will specify whether or not to swap the case for each alphabetic character in s: if the bit is 1, swap the case; if its 0, leave it as is. When you finished with the last bit of n, start again with the first bit.
# You should skip the checking of bits when a non-alphabetic character is encountered, but they should be preserved in their original positions.
# Examples
# swap('Hello world!', 11)  -->  'heLLO wORLd!'

def swap(s, n):
    result = ''
    mask = bin(n)[2:]
    c = -1

    for char in s:
        if char.isalpha():
            c += 1        
            bit = mask[c % len(mask)]

            if bit == '1':
                result += char.swapcase()
            else:
                result += char
        else:
            result += char
    return result


print(swap('Hello world!', 11), 'heLLO wORLd!')
print(swap('the quick broWn fox leapt over the fence',9),'The QUicK BrowN foX LeaPT ovER thE FenCE')
print(swap('eVerybody likes ice cReam',85),'EVErYbODy LiKeS IcE creAM')
print(swap('gOOd MOrniNg',7864),'GooD MorNIng')
print(swap('how are you today?',12345),'HOw are yoU TOdaY?')
print(swap('the lord of the rings', 0), 'the lord of the rings')
print(swap('',11345),'')