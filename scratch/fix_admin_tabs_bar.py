import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

c1 = '<div className="border-b border-slate-800 sticky top-0 z-40 bg-[#020617]/50 backdrop-blur-md">'
r1 = '<div className="border-b border-white/10 sticky top-0 z-40 bg-black/40 backdrop-blur-2xl" style={{ width: \'100vw\', marginLeft: \'calc(-50vw + 50%)\' }}>'

c2 = '<div className="px-8 flex gap-8 items-center h-14">'
r2 = '<div className="w-full max-w-[1600px] mx-auto px-8 md:px-14 flex gap-8 items-center h-14">'

if c1 in content and c2 in content:
    content = content.replace(c1, r1)
    content = content.replace(c2, r2)
    with codecs.open(file_path, "w", "utf-8") as f:
        f.write(content)
    print("Tab bar breakout applied successfully!")
else:
    print(f"Target 1 found: {c1 in content}")
    print(f"Target 2 found: {c2 in content}")
