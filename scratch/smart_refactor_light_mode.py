import codecs
import re
import os

class_map = {
    # Backgrounds
    'bg-slate-900': 'bg-white dark:bg-slate-900',
    'bg-[#0f172a]': 'bg-slate-50 dark:bg-[#0f172a]',
    'bg-[#111827]': 'bg-white dark:bg-[#111827]',
    'bg-[#111]': 'bg-white dark:bg-[#111]',
    'bg-[#222]': 'bg-gray-100 dark:bg-[#222]',
    'bg-[#020617]/50': 'bg-white/80 dark:bg-[#020617]/50',
    'bg-[#09090b]/80': 'bg-white/80 dark:bg-[#09090b]/80',
    'bg-[#09090b]': 'bg-slate-50 dark:bg-[#09090b]',
    'bg-[#F3F4F6]': 'bg-slate-50 dark:bg-[#F3F4F6]',
    'bg-black/40': 'bg-white/60 dark:bg-black/40',
    'bg-slate-950': 'bg-slate-50 dark:bg-slate-950',
    'bg-gray-900': 'bg-gray-100 dark:bg-gray-900',
    'bg-slate-800/50': 'bg-slate-200/50 dark:bg-slate-800/50',
    'bg-black/20': 'bg-black/5 dark:bg-black/20',
    'bg-black/60': 'bg-white/80 dark:bg-black/60',
    'bg-white/5': 'bg-black/5 dark:bg-white/5',
    'bg-white/10': 'bg-black/10 dark:bg-white/10',
    
    # Borders
    'border-slate-800': 'border-slate-200 dark:border-slate-800',
    'border-white/10': 'border-black/10 dark:border-white/10',
    'border-white/20': 'border-black/20 dark:border-white/20',
    'border-white/5': 'border-black/5 dark:border-white/5',
    'border-slate-700': 'border-slate-300 dark:border-slate-700',
    
    # Text
    'text-slate-200': 'text-slate-800 dark:text-slate-200',
    'text-slate-300': 'text-slate-700 dark:text-slate-300',
    'text-slate-400': 'text-slate-600 dark:text-slate-400',
    'text-gray-400': 'text-gray-600 dark:text-gray-400',
    'text-gray-500': 'text-gray-700 dark:text-gray-500',
    'text-white': 'text-slate-900 dark:text-white',
    'text-gray-300': 'text-slate-700 dark:text-gray-300',
    'text-gray-200': 'text-slate-800 dark:text-gray-200',
    
    # Hover states
    'hover:text-white': 'hover:text-slate-900 dark:hover:text-white',
    'hover:bg-white/10': 'hover:bg-black/5 dark:hover:bg-white/10',
    'hover:bg-white/5': 'hover:bg-black/5 dark:hover:bg-white/5',
    'hover:border-white/30': 'hover:border-black/20 dark:hover:border-white/30',
    'hover:text-gray-300': 'hover:text-slate-700 dark:hover:text-gray-300',
    'hover:text-blue-400': 'hover:text-blue-600 dark:hover:text-blue-400',
    
    # Specific backgrounds
    'bg-indigo-500/20': 'bg-indigo-300/40 dark:bg-indigo-500/20',
    'bg-purple-500/20': 'bg-purple-300/40 dark:bg-purple-500/20',
    'bg-blue-500/20': 'bg-blue-300/40 dark:bg-blue-500/20',
}

def replace_token(match):
    token = match.group(0)
    if token in class_map:
        return class_map[token]
    return token

def process_file(filepath):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    original = content
    
    # Special fix for page.tsx dynamically injected background logic
    if 'page.tsx' in filepath:
        content = content.replace("isDarkMode ? 'bg-[#09090b]' : 'bg-[#F3F4F6]'", "'bg-[#F3F4F6] dark:bg-[#09090b]'")
        content = content.replace("isDarkMode &&", "")
        # invert cubes
        content = content.replace("bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]", "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert dark:invert-0")

    # The regex matches any string of valid tailwind class characters
    # We don't need lookbehinds because it grabs the WHOLE token (e.g. `hover:text-white`)
    # and only replaces if it exactly matches a key in `class_map`.
    content = re.sub(r'\b[a-zA-Z0-9_/\#\[\]\-:]+\b', replace_token, content)
        
    if content != original:
        with codecs.open(filepath, 'w', 'utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

files_to_update = [
    r"c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx",
]

for f in files_to_update:
    if os.path.exists(f):
        process_file(f)

print("Smart Batch refactoring complete!")
