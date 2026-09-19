import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Make the Next steps buttons use the animation
content = content.replace('className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 dark:from-cyan-400 hover:to-emerald-600 dark:to-emerald-400 text-slate-900 dark:text-white px-10 py-4 rounded-xl font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] flex items-center gap-2"', 'className="btn-uiverse rounded-xl font-extrabold px-10 py-4 transition-all hover:scale-[1.02]" style={{ "--color": "#059669" } as any}')

content = content.replace('className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]"', 'className="btn-uiverse w-full rounded-xl font-bold py-4 transition-all hover:scale-[1.02]" style={{ "--color": "#0284c7" } as any}')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Applied to EvaluateTab')
