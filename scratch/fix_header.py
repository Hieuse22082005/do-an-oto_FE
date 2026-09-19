import codecs

file_path = 'components/Header.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Replace the nav opening tag to add whitespace-nowrap and reduce gap
old_nav = 'nav className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400"'
new_nav = 'nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400 whitespace-nowrap"'

if old_nav in content:
    content = content.replace(old_nav, new_nav)
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(content)
    print("Fixed header spacing and wrapping!")
else:
    print("Could not find the target string!")
