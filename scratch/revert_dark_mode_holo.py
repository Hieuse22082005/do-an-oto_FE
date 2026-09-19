import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

content = "".join(lines)

# Replace the dark mode variables to match the user's original dark theme
old_dark_vars = """.dark .glitch-input-wrapper {
  --primary-color: #00f2ea;
  --text-color: #94a3b8;
  --input-bg: rgba(15, 23, 42, 0.7);
}"""

new_dark_vars = """.dark .glitch-input-wrapper {
  --primary-color: #00f2ea;
  --text-color: #e5e5e5;
  --input-bg: rgba(13, 13, 13, 0.7);
}"""

# if the exact string isn't found because of trailing spaces/newlines, just do replace on substrings
content = content.replace('--input-bg: rgba(15, 23, 42, 0.7);', '--input-bg: rgba(13, 13, 13, 0.7);')
content = content.replace('--text-color: #94a3b8;', '--text-color: #e5e5e5;')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Reverted dark mode holo input to original dark gray')
