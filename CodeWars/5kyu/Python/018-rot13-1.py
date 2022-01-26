# https://www.codewars.com/kata/530e15517bc88ac656000716
# Create a function that takes a string and returns the string ciphered with Rot13. If there are numbers or special characters included in the string, they should be returned as they are. 
# Only letters from the latin/english alphabet should be shifted, like in the original Rot13 "implementation".

def rot13(message):
    ALPHABET = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    result = ''
    for letter in message:
        pos = ALPHABET.find(letter)
        if pos >= 0:
            result += ALPHABET[pos+13]
        else:
            result += letter
    return result
    

print(rot13("test"),"grfg")
print(rot13("Test"),"Grfg")
print(rot13("Ruby is cool!"), "Ehol vf pbby!")
print(rot13("10+2 is twelve."), "10+2 vf gjryir.")
print(rot13("EBG13 rknzcyr."))