import codecs

lines = codecs.open(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx', 'r', 'utf-8').readlines()
for i, line in enumerate(lines):
    if '<button type="submit"' in line:
        print(line.encode('ascii', 'ignore').decode('ascii'))
