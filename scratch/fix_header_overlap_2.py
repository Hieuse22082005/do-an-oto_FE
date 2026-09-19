import codecs

file_path = 'components/Header.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Change logo text from lg:block to xl:block
old_logo_text = 'className="text-2xl font-black uppercase tracking-tighter hidden lg:block transition-colors duration-300 text-[#00f2fe] drop-shadow-[0_0_2px_rgba(0,242,254,0.3)]"'
new_logo_text = 'className="text-2xl font-black uppercase tracking-tighter hidden xl:block transition-colors duration-300 text-[#00f2fe] drop-shadow-[0_0_2px_rgba(0,242,254,0.3)]"'
content = content.replace(old_logo_text, new_logo_text)

# 2. Add flex-shrink-0 to logo button
old_logo_btn = 'className="flex items-center gap-3 group"'
new_logo_btn = 'className="flex items-center gap-3 group shrink-0"'
content = content.replace(old_logo_btn, new_logo_btn)

# 3. Add flex-shrink-0 to user actions div
old_user_actions = 'className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest whitespace-nowrap"'
new_user_actions = 'className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest whitespace-nowrap shrink-0"'
content = content.replace(old_user_actions, new_user_actions)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Applied xl:block to logo text to fix overlap on lg screens!")
