import hashlib

def hash_email(email):
    return hashlib.sha256(email.lower().strip().encode('utf-8')).hexdigest()
