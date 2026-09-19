import codecs

def fix_file(filepath, replacements):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    for old, new in replacements.items():
        content = content.replace(old, new)
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(content)

# Fix glowy waves hero
fix_file(r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\glowy-waves-hero-shadcnui.tsx', {
    'bg-black border-b border-black/5 dark:border-white/5': 'bg-slate-50 dark:bg-black border-b border-black/5 dark:border-white/5'
})

# Fix HomeTab
fix_file(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx', {
    'bg-[#0a0a0c]': 'bg-white dark:bg-[#0a0a0c]',
    'bg-black': 'bg-slate-100 dark:bg-black'
})

print('Fixed backgrounds!')
