import codecs

file_path = 'components/Header.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the user actions opening tag to add whitespace-nowrap
old_user = 'div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest"'
new_user = 'div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest whitespace-nowrap"'

if old_user in content:
    content = content.replace(old_user, new_user)
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(content)
    print("Fixed user actions whitespace!")
else:
    print("Could not find the target string!")
