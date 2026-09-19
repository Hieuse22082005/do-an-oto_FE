import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# 1. NO ERRORS BLOCK
content = content.replace('bg-emerald-900/30 border border-emerald-500/30', 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30')
content = content.replace('text-emerald-200/70', 'text-emerald-600 dark:text-emerald-200/70')

# 2. FINES FOUND HEADER
# `bg-white dark:bg-[#1e293b] rounded-3xl p-6 text-white shadow-xl` -> remove text-white
content = content.replace('bg-white dark:bg-[#1e293b] rounded-3xl p-6 text-white', 'bg-white dark:bg-[#1e293b] rounded-3xl p-6 text-slate-900 dark:text-white')
# `text-2xl font-bold text-white` -> `text-2xl font-bold text-slate-900 dark:text-white`
content = content.replace('text-2xl font-bold text-white', 'text-2xl font-bold text-slate-900 dark:text-white')

# 3. FINES TICKET BODY
content = content.replace('border-slate-700 pb-3', 'border-slate-200 dark:border-slate-700 pb-3')
content = content.replace('font-bold text-white text-base', 'font-bold text-slate-900 dark:text-white text-base')
content = content.replace('font-bold text-slate-200', 'font-bold text-slate-900 dark:text-slate-200')
content = content.replace('border border-slate-700 shadow-inner', 'border border-slate-300 dark:border-slate-700 shadow-inner')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed colors for light mode')
