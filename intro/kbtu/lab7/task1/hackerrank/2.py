n = int(input())
if n %2!=0 or (n%2==0 and n <=20 and n >=6):
    print("weird")
elif (n%2==0 and n > 20) or (n%2==0 and n <=5 and n >=2):
    print("not weird")