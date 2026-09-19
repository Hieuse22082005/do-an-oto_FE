import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Remove the background from FinesTab.tsx
bg_to_remove = """      {/* FULL-WIDTH BACKGROUND PATTERNS & ORBS (TRN VIN) */}
      <div className="absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2 h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.25]"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/30 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
      </div>"""

content = content.replace(bg_to_remove, "")

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Removed background from FinesTab.tsx")
