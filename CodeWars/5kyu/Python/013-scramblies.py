# https://www.codewars.com/kata/55c04b4cc56a697bb0000048
# Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.
# Only lower case letters will be used (a-z). No punctuation or digits will be included.
# Performance needs to be considered. Input strings s1 and s2 are null terminated.
# scramble('rkqodlw', 'world') ==> True
# scramble('cedewaraaossoqqyt', 'codewars') ==> True
# scramble('katas', 'steak') ==> False

def scramble(s1, s2):
    base = {}

    for s in s1:
        if s in base:
            base[s] += 1
        else:
            base[s] = 1
    
    for s in s2:
        if s not in base: return False
        if base[s] == 0: return False
        base[s] -= 1
    return True


# other solution from Codewars
def scramble(s1,s2):
    for c in set(s2):
        if s1.count(c) < s2.count(c):
            return False
    return True

print(scramble('rkqodlw', 'world'),  True)
print(scramble('cedewaraaossoqqyt', 'codewars'), True)
print(scramble('katas', 'steak'), False)
print(scramble('scriptjava', 'javascript'), True)
print(scramble('scriptingjava', 'javascript'), True)