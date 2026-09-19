import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

with codecs.open(filepath, 'w', 'utf-8') as f:
    for i, line in enumerate(lines):
        if i == 586 and '<label className="relative inline-flex items-center justify-center cursor-pointer group/btn">' in line:
            continue
        f.write(line)

print('Removed duplicate label')
