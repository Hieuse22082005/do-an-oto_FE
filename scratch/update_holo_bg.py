import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Change the glitch input variables to match a light theme better (and look good in dark too)
# Replace --primary-color: #00f2ea; with a blue that works on white, e.g. #0284c7 (Tailwind light blue 600) or #0ea5e9 (sky-500)
content = content.replace('--primary-color: #00f2ea;', '--primary-color: #0284c7;')
# Replace text color to be darker slate
content = content.replace('--text-color: #e5e5e5;', '--text-color: #64748b;')

# Replace the dark holo-input background with a very soft blue/transparent one
content = content.replace('background: rgba(13, 13, 13, 0.7);', 'background: rgba(2, 132, 199, 0.05);')

# Replace the border bottom color
content = content.replace('border-bottom: 2px solid #333;', 'border-bottom: 2px solid rgba(2, 132, 199, 0.2);')

# Replace input-label before/after background (which is currently hardcoded #212121)
content = content.replace('background-color: #212121;', 'background-color: rgba(255,255,255,0.9); backdrop-filter: blur(4px);')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Updated holo input background and colors')
