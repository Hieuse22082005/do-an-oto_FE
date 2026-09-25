with open('app/account/profile/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Replace `if (!profile) return null;`
text = text.replace('if (!profile) return null;', 'if (!profile) return <div className="min-h-screen flex items-center justify-center">Lỗi: Không tìm thấy hồ sơ cá nhân.</div>;')

with open('app/account/profile/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
