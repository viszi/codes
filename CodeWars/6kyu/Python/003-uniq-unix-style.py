# https://www.codewars.com/kata/52249faee9abb9cefa0001ee
# Implement a function which behaves like the uniq command in UNIX.
# It takes as input a sequence and returns a sequence in which all duplicate elements following each other have been reduced to one instance.

def uniq(seq):
    result = []
    previous = ' '

    for current in seq:
        if previous != current:
            result.append(current)
        previous = current

    return result


def uniq(seq):
    if len(seq) == 0:
        return []
    rez = [seq[0]]
    for i in range(1, len(seq)):
        if seq[i] != rez[-1]:
            rez.append(seq[i])
    return rez


print(uniq(['a', 'a', 'b', 'b', 'c', 'a', 'b', 'c', 'c']),
      ['a', 'b', 'c', 'a', 'b', 'c'])
print(uniq(['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c']), ['a', 'b', 'c'])
print(uniq([]), [])
print(uniq(['foo']), ['foo'])
print(uniq(['bar']), ['bar'])
print(uniq(['']), [''])
print(uniq([None, 'a', 'a']), [None, 'a'])
