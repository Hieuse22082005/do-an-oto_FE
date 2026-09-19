import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

with codecs.open(filepath, 'w', 'utf-8') as f:
    for i, line in enumerate(lines):
        if i == 511 and '</div>' in line:
            # 510 is <GlitchInput...
            # 511 is </div> (closes the <div className="relative">)
            pass
        elif i == 512 and '</div>' in line:
            continue # Delete this one!
        else:
            f.write(line)
            
print('Fixed JSX error')
