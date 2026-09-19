import requests
import json

payload = {
    "Vehicle_brand": "VinFast",
    "license_plate": "30G-888.88"
}

try:
    print("Calling draft...")
    res = requests.post("http://127.0.0.1:8080/api/v1/transactions/evaluate/draft", json=payload, timeout=10)
    print("Status:", res.status_code)
    print(res.text)
except Exception as e:
    print("Error:", e)
