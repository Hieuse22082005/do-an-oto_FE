import codecs

page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()
content = content.replace("'px-6 pt-12 pb-20'", "'px-6 pt-32 pb-20'")
codecs.open(page_path, 'w', 'utf-8').write(content)
print("Updated pt-12 to pt-32 in page.tsx")
