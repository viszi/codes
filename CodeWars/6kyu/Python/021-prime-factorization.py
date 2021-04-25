# https://www.codewars.com/kata/534a0c100d03ad9772000539
# The prime factorization of a positive integer is a list of the integer's prime factors, together with their multiplicities; the process of determining these factors is called integer factorization. The fundamental theorem of arithmetic says that every positive integer has a single unique prime factorization.
# The prime factorization of 24, for instance, is (2^3) * (3^1).

class PrimeFactorizer:
    def __init__(self, num):
        f = {}
        div = 2
        while num > 1:
            if num % div == 0:
                if div in f:
                    f[div] += 1
                else:
                    f[div] = 1
                num /= div
            else:
                if div == 2:
                    div = 3
                else:
                    div += 2
        self.factor = f


x = PrimeFactorizer(13)
print(x.factor, {13: 1})
x = PrimeFactorizer(24)
print(x.factor, {2: 3, 3: 1})