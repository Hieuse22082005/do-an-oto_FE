import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

pattern = r'<span className="w-3 h-3 rounded-full bg-blue-500"></span>'
replacement = '<img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain" />'

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
