import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Fix the main container width
content = content.replace(
    '<div className="w-full mx-auto relative min-h-[700px] font-sans pb-10">',
    '<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-[700px] font-sans pb-10 pt-4">'
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Successfully wrapped FinesTab in a max-w-7xl container!")
