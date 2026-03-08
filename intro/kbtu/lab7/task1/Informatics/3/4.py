import math
b = int(input())
for i in range(2,int(math.sqrt(b))+1):
    if(b %i == 0):
        print(i)
        break
else:
    print(b)
