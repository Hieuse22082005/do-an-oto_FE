import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Make the input taller and font bigger
content = content.replace('height: 4rem;', 'height: 5rem;')
content = content.replace('font-size: 1.25rem;', 'font-size: 1.75rem;')
content = content.replace('top: 1.2rem;', 'top: 1.6rem;') # Adjust label top position

# Adjust label when focused
content = content.replace('top: -1.5rem;\n  left: 0;\n  font-size: 0.85rem;', 'top: -1.5rem;\n  left: 0;\n  font-size: 1rem;')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Made holo input bigger')
