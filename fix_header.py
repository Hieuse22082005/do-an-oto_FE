with open('components/Header.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
pattern = r'(<button[^>]+onClick=\{onLogoutClick\})'
replacement = r'''
<button
    onClick={() => window.location.href = '/account/profile'}
    className="hidden lg:flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-5 py-2.5 text-xs font-black shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-md"
>
    Hồ Sơ & Nạp Tín Dụng
</button>
\1'''

text = re.sub(pattern, replacement, text)

with open('components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
