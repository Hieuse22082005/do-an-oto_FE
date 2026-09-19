import codecs
filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

content = content.replace(
    'className="absolute inset-0 bg-[url(\'https://www.transparenttextures.com/patterns/cubes.png\')] opacity-30 dark:opacity-20 invert dark:invert-0 pointer-events-none"',
    'className="fixed top-0 left-0 w-full h-full z-[-1] bg-[url(\'https://www.transparenttextures.com/patterns/cubes.png\')] opacity-30 dark:opacity-20 invert dark:invert-0 pointer-events-none"'
)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
