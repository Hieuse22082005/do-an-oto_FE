import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

# Replace router.push('/login') with setActiveTab('home') but only in handleLogout context
new_content = content.replace("router.push('/login');", "setActiveTab('home');")

if new_content != content:
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(new_content)
    print('Updated successfully!')
else:
    print('Pattern not found!')
