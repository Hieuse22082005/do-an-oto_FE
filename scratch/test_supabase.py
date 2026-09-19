import os
import requests

env_path = r"c:\Users\Hieu\Desktop\do an oto_FE\.env.local"
url = ""
key = ""
with open(env_path, "r") as f:
    for line in f:
        if line.startswith("NEXT_PUBLIC_SUPABASE_URL="):
            url = line.split("=", 1)[1].strip()
        elif line.startswith("NEXT_PUBLIC_SUPABASE_ANON_KEY="):
            key = line.split("=", 1)[1].strip()

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}"
}

tables = ["user_activity_logs", "transactions", "evaluations"]
for t in tables:
    res = requests.get(f"{url}/rest/v1/{t}?select=*&limit=1", headers=headers)
    print(f"{t}: {res.status_code} - {res.text[:100]}")
