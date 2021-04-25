# https://www.codewars.com/kata/530017aac7c0f49926000084
# Implement a function which takes a sequence of objects and a property name, and returns a sequence containing the named property of each object.
# For example:
# pluck([{'a':1}, {'a':2}], 'a')        # -> [1,2]
# pluck([{'a':1, 'b':3}, {'a':2}], 'b') # -> [3, None]
# If an object is missing the property, you should just leave it as undefined/None in the output array.

def pluck(objs, name):
    result = []

    for obj in objs:
        if name in obj:
            result.append(obj[name])
        else:
            result.append(None)
    return result


def pluck(obj, name):
    result = []

    for obj in objs:
        result.append(obj[name] if name in obj else None)
    return result


objs = [{'a': 1, 'b': 2, 'c': 3}, {'a': 4, 'b': 5, 'c': 6},
        {'a': 7, 'b': 8, 'c': 9}, {'a': 10, 'b': 11}]

print(pluck(objs, 'a'), [1, 4, 7, 10])
print(pluck(objs, 'b'), [2, 5, 8, 11])
print(pluck(objs, 'c'), [3, 6, 9, None])
