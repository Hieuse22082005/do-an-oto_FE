import codecs

path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(path, 'r', 'utf-8').read()

# Fix Standard tier
content = content.replace('Người dùng Tiêu chuẩn', 'Ngưi dA1ng TiAu chun') # wait, no, I just need to replace the mojibake with the right text
