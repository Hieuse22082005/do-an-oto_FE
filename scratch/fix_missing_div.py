import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

content = content.replace('</label>\n<div className="w-24 h-24 relative shrink-0">', '</label>\n</div>\n<div className="w-24 h-24 relative shrink-0">')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed missing div')
