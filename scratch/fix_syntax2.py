import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

content = content.replace(
    '<div classNam grid-cols-1 lg:grid-cols-12 gap-5  items-stretch">',
    '<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">'
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Fixed the syntax error!")
