import codecs

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Remove mode="wait"
old_presence = '<AnimatePresence mode="wait">'
new_presence = '<AnimatePresence>'

content = content.replace(old_presence, new_presence)

# Also, if we remove mode="wait", the opacity crossfade combined with the x-translation makes a perfect seamless swipe.
# Let's verify we are replacing the exact string.

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Removed mode=wait to fix black screen!")
