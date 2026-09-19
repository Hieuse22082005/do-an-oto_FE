import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Change the white inputs to have a slight gray background so they stand out from the white card
# Previously: bg-white/80 dark:bg-[#1e293b]/50 backdrop-blur-md border-2 border-slate-200
# Change to: bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600
content = content.replace('bg-white/80 dark:bg-[#1e293b]/50 backdrop-blur-md border-2 border-slate-200', 'bg-slate-100 dark:bg-[#1e293b]/80 border border-slate-300 dark:border-slate-600 shadow-inner')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Updated inputs in FinesTab')
