import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

host = 'smtp-relay.brevo.com'
port = 587
user = os.environ.get('EMAIL_HOST_USER')
password = os.environ.get('EMAIL_HOST_PASSWORD')

print(f"Connecting to {host}:{port}...")
print(f"User: {user}")
# Partially mask password for safety in logs
masked_password = password[:4] + "*" * (len(password)-4) if password else "None"
print(f"Password: {masked_password}")

try:
    server = smtplib.SMTP(host, port)
    server.set_debuglevel(1)  # Show full SMTP conversation
    print("Connected. Starting TLS...")
    server.starttls()
    print("TLS started. Logging in...")
    server.login(user, password)
    print("Login successful!")
    server.quit()
except Exception as e:
    print(f"Error: {e}")
