import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\PenaltyTab.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

target = 'transition-colors duration-300 overflow-hidden -mt-12">\n'
injection = """      {/* GRID & ORBS BACKGROUND (FORCED LIGHT MODE) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert opacity-[0.25]"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/30 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-violet-500/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
        <div className="absolute top-1/3 -left-20 w-[35rem] h-[35rem] bg-blue-300/40 rounded-full blur-[120px] animate-[pulse_7s_ease-in-out_infinite_alternate]"></div>
      </div>
"""

content = content.replace(target, target + injection)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print('Done')
