import codecs

file_path = 'components/modals/CarDetailModal.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

content = content.replace("const mediaList = [];", "const mediaList: { type: string, url: string }[] = [];")

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Fixed TS error!")
