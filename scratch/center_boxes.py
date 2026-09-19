import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

# Normalize CRLF
content = content.replace('\r\n', '\n')

# Find Box 1
old_box1 = '<div className="bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white relative overflow-hidden">'
new_box1 = '<div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white relative overflow-hidden">'
content = content.replace(old_box1, new_box1)

# Find Box 2
old_box2 = '<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex items-start gap-4">'
new_box2 = '<div className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">'
content = content.replace(old_box2, new_box2)

# Also fix the hasResult case wrapper to match the max-w-3xl
old_result = '<div className="animate-[fadeInUp_0.4s_ease-out]">'
new_result = '<div className="w-full max-w-3xl mx-auto animate-[fadeInUp_0.4s_ease-out]">'
content = content.replace(old_result, new_result)

codecs.open(file_path, 'w', 'utf-8').write(content)
