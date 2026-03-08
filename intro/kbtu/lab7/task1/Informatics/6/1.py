def min(a, b, c, d):
    m = a

    if b < m:
        m = b
    if c < m:
        m = c
    if d < m:
        m = d

    return m


a, b, c, d = map(int, input().split())

print(min(a, b, c, d))