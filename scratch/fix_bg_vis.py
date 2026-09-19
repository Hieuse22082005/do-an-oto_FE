import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Make the wrapper have z-10 and remove negative z-indexes from orbs
content = content.replace(
    '<div className="w-full relative min-h-[700px] font-sans pb-10 pt-4">',
    '<div className="w-full relative z-10 min-h-[700px] font-sans pb-10 pt-4 overflow-hidden">'
)

# Fix opacity and mix blend for cubes
content = content.replace(
    'opacity-[0.15] mix-blend-overlay',
    'opacity-[0.25]' # Remove mix-blend so it's definitely visible
)

# Fix orbs z-index to be 0 instead of -10 so they don't fall behind the page background
content = content.replace(
    'pointer-events-none -z-10 animate-',
    'pointer-events-none z-0 animate-'
)

# Make sure they are brighter
content = content.replace('bg-indigo-500/20', 'bg-indigo-500/30')
content = content.replace('bg-violet-500/15', 'bg-violet-500/20')

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Fixed background visibility!")
