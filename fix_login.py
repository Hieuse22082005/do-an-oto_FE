with open('app/login/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('localStorage.setItem("user_email", email);', 'localStorage.setItem("user_email", email);\n        localStorage.setItem("user_id", data.session.user.id);')

with open('app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    text2 = f.read()

text2 = text2.replace('const userTier = localStorage.getItem("user_tier") || "standard";', 'const userTier = localStorage.getItem("user_tier") || "standard";\n    const userId = localStorage.getItem("user_id");')
text2 = text2.replace('email: userEmail,', 'id: userId,\n          email: userEmail,')

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text2)
