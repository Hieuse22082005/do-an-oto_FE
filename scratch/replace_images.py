import codecs
import re
filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\home-testimonials.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

content = re.sub(r'"https://images\.unsplash\.com/[^"]+"', '"/images/blockchain-ai.jpg"', content, count=1)
content = re.sub(r'"https://images\.unsplash\.com/[^"]+"', '"/images/data-protection.png"', content, count=1)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
