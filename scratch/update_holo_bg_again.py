import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Make the background of holo-input stand out from the layout (which is white)
# but not be pitch black. Let's use a solid very light slate/gray: #f1f5f9 (slate-100) or #e2e8f0 (slate-200)
# Currently it is: background: rgba(2, 132, 199, 0.05);
content = content.replace('background: rgba(2, 132, 199, 0.05);', 'background: #f1f5f9;')
content = content.replace('background-color: rgba(255,255,255,0.9);', 'background-color: #f1f5f9;')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Updated holo input background to slate-100')
