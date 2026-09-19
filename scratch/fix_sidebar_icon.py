import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Replace the inner padding of the active menu block
content = content.replace(
    'className={`rounded-xl px-2 py-2 transition-all',
    'className={`rounded-xl p-1.5 transition-all'
)
# Make the icon slightly smaller to fit perfectly in collapsed mode
content = content.replace(
    'w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-lg transition-all duration-300',
    'w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-lg transition-all duration-300'
)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed icon overflow')
