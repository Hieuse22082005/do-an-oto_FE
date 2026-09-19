import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

target = 'className="border-b border-white/10 sticky top-0 z-40 bg-black/40 backdrop-blur-2xl" style={{ width: \'100vw\', marginLeft: \'calc(-50vw + 50%)\' }}'
replacement = 'className="border-b border-white/10 sticky top-20 z-40 bg-black/40 backdrop-blur-2xl -mt-16 mb-8" style={{ width: \'100vw\', marginLeft: \'calc(-50vw + 50%)\' }}'

if target in content:
    content = content.replace(target, replacement)
    with codecs.open(file_path, "w", "utf-8") as f:
        f.write(content)
    print("Tab bar position fixed successfully!")
else:
    print("Target not found!")
