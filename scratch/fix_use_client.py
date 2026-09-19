import codecs
import glob

for file in glob.glob(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\*.tsx'):
    lines = codecs.open(file, 'r', 'utf-8').readlines()
    
    # check if "use client" is not on line 0 but exists
    use_client_idx = -1
    for i, line in enumerate(lines):
        if 'use client' in line:
            use_client_idx = i
            break
            
    if use_client_idx > 0:
        # Move it to top
        client_line = lines.pop(use_client_idx)
        lines.insert(0, client_line)
        codecs.open(file, 'w', 'utf-8').writelines(lines)
        print(f'Fixed {file}')

