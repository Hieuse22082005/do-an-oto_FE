import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Fix heading text color
content = content.replace('text-white tracking-tight', 'text-slate-900 dark:text-white tracking-tight')

# Fix subtitle
content = content.replace('text-gray-400 text-sm sm:text-base', 'text-gray-600 dark:text-gray-400 text-sm sm:text-base')

# Fix pill text
content = content.replace('text-gray-200 px-3 py-1', 'text-slate-800 dark:text-gray-200 px-3 py-1')

# Fix warn variables for phat-nguoi
content = content.replace('let warnBg = "bg-amber-900/20"', 'let warnBg = "bg-amber-100 dark:bg-amber-900/20"')
content = content.replace('let warnText = "text-amber-300"', 'let warnText = "text-amber-800 dark:text-amber-300"')

# Fix warn variables for dang-kiem
content = content.replace('warnBg="bg-red-900/20"', 'warnBg="bg-red-100 dark:bg-red-900/20"')
content = content.replace('warnText="text-red-300"', 'warnText="text-red-800 dark:text-red-300"')

# Fix warn variables for xe-mat-cap
content = content.replace('warnBg="bg-rose-900/20"', 'warnBg="bg-rose-100 dark:bg-rose-900/20"')
content = content.replace('warnText="text-rose-300"', 'warnText="text-rose-800 dark:text-rose-300"')

# VIP panel (Nâng cấp VIP tra cứu...) is usually `bg-white/5 border-white/10` and `text-white/60`
content = content.replace('bg-white/5 border-white/10', 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10')
content = content.replace('text-white/40', 'text-gray-500 dark:text-white/40')
content = content.replace('text-white/60', 'text-gray-600 dark:text-white/60')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed colors')
