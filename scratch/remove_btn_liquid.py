import codecs
import glob

files = glob.glob(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\*.tsx')
for filepath in files:
    content = codecs.open(filepath, 'r', 'utf-8').read()
    if 'btn-liquid' in content:
        content = content.replace('btn-liquid ', '')
        codecs.open(filepath, 'w', 'utf-8').write(content)
        print(f'Removed btn-liquid from {filepath}')
