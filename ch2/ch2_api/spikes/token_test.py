from jose import jwt

key = 'secret'
encoded = jwt.encode({'some': 'payload'}, key, algorithm='HS256')
print("encoded : " + encoded)
decoded = jwt.decode(encoded, "wrong key", algorithms='HS256')
print("decoded : " + decoded)

print("hi")