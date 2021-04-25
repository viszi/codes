# https://www.codewars.com/kata/52774a314c2333f0a7000688
# Write a function that takes a string of parentheses, and determines if the order of the parentheses is valid. The function should return true if the string is valid, and false if it's invalid.
# Examples
# "()"              =>  true
# ")(()))"          =>  false

def valid_parentheses(string):
    r = []

    for char in string:
        if char == '(': r.append(char)
        if char == ')':
            if len(r) > 0 and r[-1] == '(':
                r.pop()
            else:
                return False

    return True if len(r) == 0 else False


# solution from Codewars
def valid_parentheses(string):
    cnt = 0
    for char in string:
        if char == '(': cnt += 1
        if char == ')': cnt -= 1
        if cnt < 0: return False
    return True if cnt == 0 else False

print(valid_parentheses("  ("),False)
print(valid_parentheses(")test"),False)
print(valid_parentheses(""),True)
print(valid_parentheses("hi())("),False)
print(valid_parentheses("hi(hi)()"),True)
print(valid_parentheses("(())((()())())"), True)
print(valid_parentheses("()()(())"), True)
print(valid_parentheses("()()()(())()()()()()"), True)
print(valid_parentheses("()()()()()"), True)