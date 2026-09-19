import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

old_search_btn = 'className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black py-3 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all active:scale-95"'
new_search_btn = 'className="btn-uiverse w-full font-black py-3 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all active:scale-95" style={{ "--color": "#f59e0b" } as any}'

content = content.replace(old_search_btn, new_search_btn)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Applied to SearchTab')
