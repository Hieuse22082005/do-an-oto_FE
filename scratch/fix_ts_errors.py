import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

content = content.replace('let parsedInfo = {};', 'let parsedInfo: any = {};')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed TS errors')
