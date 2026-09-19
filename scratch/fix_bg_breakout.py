import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Remove overflow-hidden from root
content = content.replace(
    '<div className="w-full relative z-10 min-h-[700px] font-sans pb-10 pt-4 overflow-hidden">',
    '<div className="w-full relative z-10 min-h-[700px] font-sans pb-10 pt-4">'
)

# Apply breakout hack to the background div layer
target_bg = """      {/* FULL-WIDTH BACKGROUND PATTERNS & ORBS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.25] pointer-events-none"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none z-0 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none z-0 animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>"""

new_bg = """      {/* FULL-WIDTH BACKGROUND PATTERNS & ORBS (TRN VIN) */}
      <div className="absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2 h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.25]"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/30 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
      </div>"""

if target_bg in content:
    content = content.replace(target_bg, new_bg)
    print("Background breakout applied successfully!")
else:
    print("Target not found! Please check.")

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)
