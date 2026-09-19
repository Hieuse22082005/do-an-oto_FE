import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Slow down the expanding circle transition
content = re.sub(r'transition:\s*all\s*0\.7s\s*ease-out;', 'transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);', content)
# Also just in case they used 0.7s without ease-out somewhere
content = re.sub(r'transition:\s*all\s*0\.7s;', 'transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);', content)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Slowed down animation')
