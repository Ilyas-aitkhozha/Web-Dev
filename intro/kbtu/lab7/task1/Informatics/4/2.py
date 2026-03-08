n = int(input())
i = 2
while i < n:
    i+=1
    if n % i == 0:
        print(i)
        break