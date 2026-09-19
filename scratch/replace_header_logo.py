import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

pattern = r'<div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-slate-900 dark:text-white font-black text-xl shadow-\[0_0_15px_rgba\(37,99,235,0\.4\)\]">\s*Đ\s*</div>'
replacement = '<img src="/images/logo.png" alt="Logo" className="w-12 h-12 object-contain scale-[1.3]" />'

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
