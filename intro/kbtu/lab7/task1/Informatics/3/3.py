import math
a = int(input())
b = int(input())
for i in range(a, b+1):
    if(i % math.sqrt(i) == 0):
        print(i)
