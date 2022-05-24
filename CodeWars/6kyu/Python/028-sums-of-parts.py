# https://www.codewars.com/kata/5ce399e0047a45001c853c2b

# this version is too slow to accept
def parts_sums(ls):
    res = []
    for i in range(len(ls)+1):
        res.append(sum(ls[i:]))

    return res

def parts_sums(ls):
    totalSum = sum(ls)
    subSum = 0
    res = [totalSum]
    for num in ls:
        subSum += num
        res.append(totalSum-subSum)

    return res

# from Codewars the best solution
def parts_sums(ls):
    res = [sum(ls)]
    for num in ls:
        res.append(res[-1]-num)

    return res



print(parts_sums([0, 1, 3, 6, 10]), [20, 20, 19, 16, 10, 0])
