import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

# Using regex to find the handleTabChange function and replace setActiveTab('home'); inside the else block
pattern = r'(const handleTabChange = \(tab: string\) => \{.*?if \(user\) \{.*?setActiveTab\(tab\);.*?\} else \{.*?)(setActiveTab\(\'home\'\);)(.*?\}.*?\})'

def repl(match):
    return match.group(1) + "router.push('/login');" + match.group(3)

new_content = re.sub(pattern, repl, content, flags=re.DOTALL)

if new_content != content:
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(new_content)
    print('Updated successfully!')
else:
    print('Pattern not found')
