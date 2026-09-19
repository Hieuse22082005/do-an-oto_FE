import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

content = re.sub(r'transition:\s*all\s*1\.8s\s*ease-in-out;', 'transition: all 0.85s ease-out;', content)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Balanced animation speed')
