import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# 1. Fix wrappers that have bg-white dark:bg-slate-900 ... text-white
content = content.replace('bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-xl shadow-lg text-white', 'bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-xl shadow-lg text-slate-900 dark:text-white')

# 2. Fix specific headings like <h2 className="text-3xl font-bold text-white mb-2...
content = content.replace('text-3xl font-bold text-white', 'text-3xl font-bold text-slate-900 dark:text-white')

# 3. Fix text-slate-200 variables in the stats cards
content = content.replace('statColor = "text-slate-200"', 'statColor = "text-slate-900 dark:text-slate-200"')

# 4. Fix listTitle "PHÂN LOẠI BẰNG"
content = content.replace('font-bold text-white text-xs mb-5 uppercase tracking-wider', 'font-bold text-slate-900 dark:text-white text-xs mb-5 uppercase tracking-wider')

# 5. Fix "STOLEN" text-white
content = content.replace("? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-white'", "? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-slate-900 dark:text-white'")

# 6. Fix "Báo ngay cho cơ quan Công an..."
content = content.replace('text-sm text-white">Bo ngay cho c quan Cng an', 'text-sm text-slate-900 dark:text-white">Bo ngay cho c quan Cng an')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed text colors for all sub-tabs')
