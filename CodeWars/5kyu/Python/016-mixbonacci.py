# https://www.codewars.com/kata/5811aef3acdf4dab5e000251
# - Mix -nacci sequences using a given pattern p.
# - Return the first n elements of the mixed sequence.
# Rules
# - The pattern p is given as a list of strings (or array of symbols in Ruby) using the pattern mapping below (e. g. ['fib', 'pad', 'pel'] means take the next fibonacci, then the next padovan, then the next pell number and so on).
# - When n is 0 or p is empty return an empty list.
# - If n is more than the length of p repeat the pattern.
#          ['fib',        'pad',      'pel',   'fib',        'pad',      'pel']
# result = [fibonacci(0), padovan(0), pell(0), fibonacci(1), padovan(1), pell(1)]
#          ['fib', 'fib', 'pel', 'fib', 'fib', 'pel']
# result = [fibonacci(0), fibonacci(1), pell(0), fibonacci(2), fibonacci(3), pell(1)]

def fib(n, cache={}):
    if n in cache: return cache[n]
    if n == 0: return 0
    if n == 1: return 1

    cache[n] = fib(n-1, cache) + fib(n-2, cache)
    return cache[n]


def pad(n, cache={}):
    if n in cache: return cache[n]
    if n == 0: return 1
    if n == 1: return 0
    if n == 2: return 0

    cache[n] = pad(n-2, cache) + pad(n-3, cache)
    return cache[n]


def jac(n, cache={}):
    if n in cache: return cache[n]
    if n == 0: return 0
    if n == 1: return 1

    cache[n] = jac(n-1, cache) + 2*jac(n-2, cache)
    return cache[n]


def pel(n, cache={}):
    if n in cache: return cache[n]
    if n == 0: return 0
    if n == 1: return 1

    cache[n] = 2*pel(n-1, cache) + pel(n-2, cache)
    return cache[n]


def tri(n, cache={}):
    if n in cache: return cache[n]
    if n == 0: return 0
    if n == 1: return 0
    if n == 2: return 1

    cache[n] = tri(n-1, cache) + tri(n-2, cache) + tri(n-3, cache)
    return cache[n]


def tet(n, cache={}):
    if n in cache: return cache[n]
    if n == 0: return 0
    if n == 1: return 0
    if n == 2: return 0
    if n == 3: return 1

    cache[n] = tet(n-1, cache) + tet(n-2, cache) + tet(n-3, cache) + tet(n-4, cache)
    return cache[n]


def mixbonacci(pattern, length):
    if len(pattern) == 0 or length == 0: return []

    result = []
    nextNum = {'fib' : 0, 'pad' : 0, 'jac': 0, 'pel': 0, 'tri': 0, 'tet': 0 } 

    for i in range(length):
        mix = pattern[i % len(pattern)]
        
        x = eval(f'{mix}({nextNum[mix]})')
        result.append(x)
        
        nextNum[mix] += 1
    return result    


# other solution on Codewars
SEQUENCES = {
    'fib': ((lambda s: s[-1] + s[-2]), (0, 1, 1, 2, 3)),
    'jac': ((lambda s: s[-1] + 2 * s[-2]), (0, 1, 1, 3, 5)),
    'pad': ((lambda s: s[-2] + s[-3]), (1, 0, 0, 1, 0)),
    'pel': ((lambda s: 2 * s[-1] + s[-2]), (0, 1, 2, 5, 12)),
    'tri': ((lambda s: s[-1] + s[-2] + s[-3]), (0, 0, 1, 1, 2)),
    'tet': ((lambda s: s[-1] + s[-2] + s[-3] + s[-4]), (0, 0, 0, 1, 1)),
}


def mixbonacci(pattern, length):
    if not pattern or length == 0:
        return []

    seqs = {
        k: (fn, list(initial)) 
        for k, (fn, initial) in SEQUENCES.items() 
        if k in pattern
    }
    result = []
    while len(result) < length:
        key, pattern = pattern[0], pattern[1:] + [pattern[0]]
        fn, seq = seqs[key]
        seq.append(fn(seq))
        result.append(seq.pop(0))
    return result

# print(mixbonacci([], 10), [])
# print(mixbonacci(['fib'], 0), [])
print(mixbonacci(['fib'], 10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
print(mixbonacci(['pad'], 10), [1, 0, 0, 1, 0, 1, 1, 1, 2, 2])
print(mixbonacci(['jac'], 10), [0, 1, 1, 3, 5, 11, 21, 43, 85, 171])
print(mixbonacci(['pel'], 10), [0, 1, 2, 5, 12, 29, 70, 169, 408, 985])
print(mixbonacci(['tri'], 10), [0, 0, 1, 1, 2, 4, 7, 13, 24, 44])
# print(mixbonacci(['tet'], 10), [0, 0, 0, 1, 1, 2, 4, 8, 15, 29])
# print(mixbonacci(['fib', 'tet'], 10), [0, 0, 1, 0, 1, 0, 2, 1, 3, 1])
print(mixbonacci(['jac', 'jac', 'pel'], 10), [0, 1, 0, 1, 3, 1, 5, 11, 2, 21])
