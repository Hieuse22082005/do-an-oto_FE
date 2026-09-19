import codecs
import re

def fix_file(filepath, replacements):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in replacements.items():
        content = content.replace(new, old) # avoid double
        content = content.replace(f"dark:{old}", "TEMP_DARK")
        content = content.replace(old, new)
        content = content.replace("TEMP_DARK", f"dark:{old}")
        
    if content != original:
        with codecs.open(filepath, 'w', 'utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

# 1. EvaluateTab
fix_file(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx', {
    'bg-[#333]': 'bg-gray-200 dark:bg-[#333]',
    'bg-[#222]': 'bg-white dark:bg-[#222]',
    'bg-[#111]': 'bg-white dark:bg-[#111]',
    'bg-[#0a0a0c]': 'bg-white dark:bg-[#0a0a0c]',
    'bg-black': 'bg-white dark:bg-black', # Dropdown is probably bg-black or similar
    'bg-slate-900': 'bg-white dark:bg-slate-900',
    'bg-slate-800': 'bg-slate-100 dark:bg-slate-800',
})

# 2. FinesTab
fix_file(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx', {
    'bg-[#1e293b]': 'bg-white dark:bg-[#1e293b]',
    'bg-[#0B101E]': 'bg-white dark:bg-[#0B101E]',
    'bg-[#0a0f1c]': 'bg-white dark:bg-[#0a0f1c]',
    'bg-slate-900/80': 'bg-white/80 dark:bg-slate-900/80',
    'bg-slate-900': 'bg-white dark:bg-slate-900',
    'bg-gray-900/80': 'bg-gray-100/80 dark:bg-gray-900/80',
    'bg-slate-800/50': 'bg-slate-100/50 dark:bg-slate-800/50',
    'bg-slate-800': 'bg-slate-50 dark:bg-slate-800',
    'bg-slate-700': 'bg-slate-200 dark:bg-slate-700',
    'bg-blue-900/20': 'bg-blue-100/20 dark:bg-blue-900/20',
    'bg-blue-900/40': 'bg-blue-100/40 dark:bg-blue-900/40',
    'bg-blue-900/50': 'bg-blue-100/50 dark:bg-blue-900/50',
    'text-blue-200': 'text-blue-800 dark:text-blue-200',
    'text-amber-200': 'text-amber-800 dark:text-amber-200',
    'text-slate-300': 'text-slate-700 dark:text-slate-300',
    'text-gray-300': 'text-gray-700 dark:text-gray-300',
})

# 3. SearchTab
fix_file(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx', {
    'bg-gradient-to-b from-indigo-900/40 to-black/40': 'bg-white dark:bg-gradient-to-b dark:from-indigo-900/40 dark:to-black/40',
    'bg-gradient-to-br from-amber-900/40 to-black/40': 'bg-amber-50 dark:bg-gradient-to-br dark:from-amber-900/40 dark:to-black/40',
    'bg-indigo-900/20': 'bg-indigo-100/50 dark:bg-indigo-900/20',
    'bg-[#0f1115]': 'bg-white dark:bg-[#0f1115]',
    'text-indigo-300': 'text-indigo-700 dark:text-indigo-300',
})
