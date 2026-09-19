import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

lines.insert(639, '</div>\n')

codecs.open(filepath, 'w', 'utf-8').writelines(lines)
print('Inserted missing div')
