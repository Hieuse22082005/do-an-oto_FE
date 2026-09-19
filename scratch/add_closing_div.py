import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

with codecs.open(filepath, 'w', 'utf-8') as f:
    for i, line in enumerate(lines):
        if '<GlitchInput id="holo-plate-1"' in line:
            f.write(line)
            f.write('</div>\n') # Add the missing closing div
        else:
            f.write(line)

print('Added missing closing div')
