import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

target = """    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative min-h-[700px] font-sans pb-10 pt-4">
      
      
      {/* Orb Tri (Xanh dng) */}
      
      
      {/* Orb Phi (/H phch) */}
      
      
      {/* Orb Di (Lc bo) */}
      

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">"""

new_content = """    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative min-h-[700px] font-sans pb-10 pt-4">
      {/* BACKGROUND HEXAGON/CIRCUIT PATTERN (Subtle) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      {/* GRADIENT ORBS */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-violet-500/15 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">"""

if target in content:
    content = content.replace(target, new_content)
    print("Replaced background!")
else:
    print("Target not found! Let me try regex.")
    import re
    # Fallback to regex
    content = re.sub(
        r'<div className="w-full max-w-\[1600px\].*?<div className="relative z-10 grid',
        new_content[:-71], # Strip the <div classname="relative...
        content,
        flags=re.DOTALL
    )
    print("Replaced with regex!")

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)
