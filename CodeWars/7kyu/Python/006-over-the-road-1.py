# https://www.codewars.com/kata/5f0ed36164f2bc00283aed07
# You've just moved into a perfectly straight street with exactly n identical houses on either side of the road. Naturally, you would like to find out the house number of the people on the other side of the street. The street looks something like this:
# Street
# 1|   |6
# 3|   |4
# 5|   |2
# Evens increase on the right; odds decrease on the left. House numbers start at 1 and increase without gaps. When n = 3, 1 is opposite 6, 3 opposite 4, and 5 opposite 2.

def over_the_road(address, n):
    return (2*n)+1-address


print(over_the_road(1, 3), 6)
print(over_the_road(3, 3), 4)
print(over_the_road(2, 3), 5)
print(over_the_road(3, 5), 8)
print(over_the_road(7, 11), 16)
print(over_the_road(23633656673, 310027696726), 596421736780)
