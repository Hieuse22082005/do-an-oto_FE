with open('app/account/profile/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('http://localhost:8000', 'http://127.0.0.1:8080')

with open('app/account/profile/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
