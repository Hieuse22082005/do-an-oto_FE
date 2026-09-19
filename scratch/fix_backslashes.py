import codecs

page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()
content = content.replace("\\'smooth\\'", '"smooth"')
codecs.open(page_path, 'w', 'utf-8').write(content)
print("Fixed backslashes")
