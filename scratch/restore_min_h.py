import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()
content = content.replace('min-h-[calc(100vh-80px)]', 'min-h-screen')
codecs.open(home_path, 'w', 'utf-8').write(content)
print("Restored min-h-screen to video header")
