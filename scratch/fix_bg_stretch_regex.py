import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Replace the current wrapper
content = re.sub(
    r'<div className="w-full max-w-\[1600px\] mx-auto px-6 sm:px-8 lg:px-12 relative min-h-\[700px\] font-sans pb-10 pt-4">.*?<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">',
    """<div className="w-full relative min-h-[700px] font-sans pb-10 pt-4">
      {/* FULL-WIDTH BACKGROUND PATTERNS & ORBS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
      
      {/* CENTERED CONTENT WRAPPER */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">""",
    content,
    flags=re.DOTALL
)

# We need to add one more </div> at the end.
content = re.sub(r'(\s*</div>\s*);\s*}$', r'\1\n    </div>\n  );\n}', content)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Fixed layout wrapping!")
