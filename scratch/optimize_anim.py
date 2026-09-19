import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Reduce circle size from 2000px to 1000px
content = content.replace('height: 2000px;', 'height: 1200px;')
content = content.replace('width: 2000px;', 'width: 1200px;')

# Update the hover position
content = content.replace('top: -500px;\n  left: -500px;', 'top: -200px;\n  left: -200px;')

# Slow down transition and make it ease-in-out for a gentler start
content = re.sub(r'transition:\s*all\s*1\.2s\s*cubic-bezier[^;]+;', 'transition: all 1.8s ease-in-out;', content)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Optimized animation speed and size')
