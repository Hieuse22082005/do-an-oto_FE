import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Replace border-slate-600 which looks terrible in light mode
content = content.replace('border-slate-600', 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600')

# For the main input plate
content = content.replace('bg-white dark:bg-[#1e293b]/80', 'bg-white/80 dark:bg-[#1e293b]/50 backdrop-blur-md')
content = content.replace('border border-slate-200', 'border-2 border-slate-200')

# For the Stolen car input which has black/40 and red border
content = content.replace('bg-black/40 border border-red-900/50', 'bg-white/80 dark:bg-black/40 border-2 border-red-200 dark:border-red-900/50 backdrop-blur-md')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed input styles')
