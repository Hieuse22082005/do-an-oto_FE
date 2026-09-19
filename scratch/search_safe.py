import codecs
import os

search = 'Định Giá AI'
for root, _, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or '.next' in root: continue
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            try:
                content = codecs.open(f'{root}/{f}', 'r', 'utf-8').read()
                if search in content:
                    print(f'{root}/{f}')
            except:
                pass
