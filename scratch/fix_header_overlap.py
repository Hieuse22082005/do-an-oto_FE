import codecs

file_path = 'components/Header.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add gap to the main container so they never overlap, they will push each other or overflow gracefully
old_container = 'className="mx-auto max-w-[1350px] px-6 flex items-center justify-between"'
new_container = 'className="mx-auto max-w-[1350px] px-6 flex items-center justify-between gap-4 lg:gap-8"'
content = content.replace(old_container, new_container)

# 2. Hide SMARTCAR text on smaller desktops (lg) and only show on xl if space is too tight, or just make it text-xl. 
# Let's make it hidden md:hidden lg:block (but wait, sm:block md:hidden lg:block means it shows on sm, hides on md, shows on lg. No, we want it hidden on md, showing on lg).
# The current is `hidden sm:block`. On iPad (768px), nav links show up, causing overlap. Let's make logo text `hidden xl:block`.
old_logo_text = 'className="text-2xl font-black uppercase tracking-tighter hidden sm:block transition-colors duration-300 text-[#00f2fe] drop-shadow-[0_0_2px_rgba(0,242,254,0.3)]"'
new_logo_text = 'className="text-2xl font-black uppercase tracking-tighter hidden lg:block transition-colors duration-300 text-[#00f2fe] drop-shadow-[0_0_2px_rgba(0,242,254,0.3)]"'
content = content.replace(old_logo_text, new_logo_text)

# 3. Reduce gap in nav links on smaller screens. 
old_nav = 'className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400 whitespace-nowrap"'
new_nav = 'className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400 whitespace-nowrap"'
content = content.replace(old_nav, new_nav)

# 4. Truncate user email so a very long email doesn't break the layout.
old_email = 'className="text-xs font-bold text-white normal-case tracking-normal"'
new_email = 'className="text-xs font-bold text-white normal-case tracking-normal max-w-[100px] lg:max-w-[150px] truncate block"'
content = content.replace(old_email, new_email)


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Applied responsive fixes to Header.tsx!")
