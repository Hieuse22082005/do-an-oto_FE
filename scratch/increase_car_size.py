import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

content = content.replace('<div className="w-24 h-24 relative shrink-0">', '<div className="w-40 h-40 relative shrink-0 ml-4">')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Made car icon bigger')
