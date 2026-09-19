import codecs
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
lines = codecs.open(page_path, 'r', 'utf-8').readlines()

new_lines = []
for i, line in enumerate(lines):
    if line.strip().startswith('<Header'):
        new_lines.append('{activeTab !== "home" && (\n')
        new_lines.append(line)
    elif line.strip() == '/>' and 280 < i < 300:
        new_lines.append(line)
        new_lines.append(')}\n')
    elif line.strip().startswith('<footer'):
        new_lines.append('{activeTab !== "home" && (\n')
        new_lines.append(line)
    elif line.strip() == '</footer>':
        new_lines.append(line)
        new_lines.append(')}\n')
    else:
        new_lines.append(line)

codecs.open(page_path, 'w', 'utf-8').writelines(new_lines)
print('Fixed page.tsx')
