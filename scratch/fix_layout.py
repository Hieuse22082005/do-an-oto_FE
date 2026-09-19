import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\layout.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()
for i, line in enumerate(lines):
    if '<html lang="vi"' in line:
        lines[i] = line.replace('<html lang="vi"', '<html lang="vi" suppressHydrationWarning')
        break
with codecs.open(filepath, 'w', 'utf-8') as f:
    f.writelines(lines)
print('Fixed layout.tsx')
