# https://www.codewars.com/kata/5174a4c0f2769dd8b1000003
# Finish the solution so that it sorts the passed in array of numbers. If the function passes in an empty array or null/nil value then it should return an empty array.
# For example:
# solution([1,2,3,10,5]) # should return [1,2,3,5,10]
# solution(None) # should return []

def solution(nums):
    return sorted(nums) if nums != None else []


print(solution([1,2,3,10,5]), [1,2,3,5,10])
print(solution(None), [])
print(solution([]), [])
print(solution([20,2,10]), [2,10,20])
print(solution([2,20,10]), [2,10,20])