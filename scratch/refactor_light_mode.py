import codecs
import re
import os

color_map = {
    # Backgrounds
    r'(?<![:\-])\bbg-slate-900\b': 'bg-white dark:bg-slate-900',
    r'(?<![:\-])\bbg-\[\#0f172a\]\b': 'bg-slate-50 dark:bg-[#0f172a]',
    r'(?<![:\-])\bbg-\[\#111827\]\b': 'bg-white dark:bg-[#111827]',
    r'(?<![:\-])\bbg-\[\#020617\]/50\b': 'bg-white/80 dark:bg-[#020617]/50',
    r'(?<![:\-])\bbg-\[\#09090b\]/80\b': 'bg-white/80 dark:bg-[#09090b]/80',
    r'(?<![:\-])\bbg-\[\#09090b\]\b': 'bg-slate-50 dark:bg-[#09090b]',
    r'(?<![:\-])\bbg-\[\#F3F4F6\]\b': 'bg-slate-50 dark:bg-[#F3F4F6]',
    r'(?<![:\-])\bbg-black/40\b': 'bg-white/60 dark:bg-black/40',
    r'(?<![:\-])\bbg-slate-950\b': 'bg-slate-50 dark:bg-slate-950',
    r'(?<![:\-])\bbg-gray-900\b': 'bg-gray-100 dark:bg-gray-900',
    r'(?<![:\-])\bbg-slate-800/50\b': 'bg-slate-200/50 dark:bg-slate-800/50',
    r'(?<![:\-])\bbg-black/20\b': 'bg-black/5 dark:bg-black/20',
    r'(?<![:\-])\bbg-black/60\b': 'bg-white/80 dark:bg-black/60',
    
    # Borders
    r'(?<![:\-])\bborder-slate-800\b': 'border-slate-200 dark:border-slate-800',
    r'(?<![:\-])\bborder-white/10\b': 'border-black/5 dark:border-white/10',
    r'(?<![:\-])\bborder-white/20\b': 'border-black/10 dark:border-white/20',
    r'(?<![:\-])\bborder-slate-700\b': 'border-slate-300 dark:border-slate-700',
    
    # Text
    r'(?<![:\-])\btext-slate-200\b': 'text-slate-800 dark:text-slate-200',
    r'(?<![:\-])\btext-slate-300\b': 'text-slate-700 dark:text-slate-300',
    r'(?<![:\-])\btext-slate-400\b': 'text-slate-600 dark:text-slate-400',
    r'(?<![:\-])\btext-gray-400\b': 'text-gray-500 dark:text-gray-400',
    r'(?<![:\-])\btext-gray-500\b': 'text-gray-600 dark:text-gray-500',
    r'(?<![:\-])\btext-white\b': 'text-slate-900 dark:text-white',
    r'(?<![:\-])\btext-gray-300\b': 'text-slate-700 dark:text-gray-300',
    r'(?<![:\-])\btext-gray-200\b': 'text-slate-800 dark:text-gray-200',
    
    # Hover states
    r'\bhover:text-white\b': 'hover:text-slate-900 dark:hover:text-white',
    r'\bhover:bg-white/10\b': 'hover:bg-black/5 dark:hover:bg-white/10',
    r'\bhover:text-gray-300\b': 'hover:text-slate-700 dark:hover:text-gray-300',
    
    # Special specific tweaks
    r"bg-\[url\('https://www.transparenttextures.com/patterns/cubes.png'\)\]": "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert dark:invert-0",
}

def process_file(filepath):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    original = content
    
    # Special fix for page.tsx dynamically injected background
    if 'page.tsx' in filepath:
        content = content.replace("isDarkMode ? 'bg-[#09090b]' : 'bg-[#F3F4F6]'", "'bg-[#F3F4F6] dark:bg-[#09090b]'")
        content = content.replace("isDarkMode &&", "")
        # The glowing orbs
        content = content.replace("bg-indigo-500/20", "bg-indigo-300/40 dark:bg-indigo-500/20")
        content = content.replace("bg-purple-500/20", "bg-purple-300/40 dark:bg-purple-500/20")
        content = content.replace("bg-blue-500/20", "bg-blue-300/40 dark:bg-blue-500/20")

    for old, new in color_map.items():
        content = re.sub(old, new, content)
        
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

print("Batch refactoring complete!")
