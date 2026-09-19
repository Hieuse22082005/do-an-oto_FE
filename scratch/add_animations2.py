import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Make all text-white on inputs adaptive:
content = content.replace('text-white placeholder-slate-500', 'text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500')

# Enhance all inputs with hover/focus animations
def enhance_input(match):
    class_str = match.group(1)
    if 'focus:scale-[1.02]' not in class_str:
        class_str = class_str.replace('"', ' transition-all duration-300 focus:scale-[1.02] focus:shadow-lg hover:brightness-95 dark:hover:brightness-110"')
    return f'className={class_str}'

content = re.sub(r'<input[^>]*className=("[^"]*")', lambda m: m.group(0).replace(m.group(1), enhance_input(m).replace('className=', '')), content)

# Enhance all buttons
def enhance_button(match):
    class_str = match.group(1)
    if 'hover:-translate-y-1' not in class_str and 'active:scale-95' in class_str:
        class_str = class_str.replace('active:scale-95"', 'hover:-translate-y-1 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-95"')
    return f'className={class_str}'

content = re.sub(r'<button[^>]*className=("[^"]*")', lambda m: m.group(0).replace(m.group(1), enhance_button(m).replace('className=', '')), content)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Enhanced all inputs and buttons')
