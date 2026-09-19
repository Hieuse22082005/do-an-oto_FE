import codecs
import re
filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

new_content = re.sub(r'<div className="absolute top-28 left-0 w-full flex justify-center -z-10 pointer-events-none select-none overflow-hidden">.*?</div>', '', content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(new_content)
