import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

old_class = 'w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-blue-500/40 hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0'
new_class = 'btn-uiverse w-full py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-blue-500/40 hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0" style={{ "--color": "#2563eb" } as any}'

content = content.replace(old_class + '"', new_class)
codecs.open(filepath, 'w', 'utf-8').write(content)
print('Applied btn-uiverse to KIEM TRA LOI button')
