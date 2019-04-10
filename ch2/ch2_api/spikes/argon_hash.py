from argon2 import PasswordHasher

ph = PasswordHasher()
hash = ph.hash("s3kr3tp4ssw0rd")

print(hash)