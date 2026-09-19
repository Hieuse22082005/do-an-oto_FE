import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Inject subtle grid and scan line
grid_decor = """
      {/* Tech Grid Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/30 shadow-[0_0_10px_#3b82f6] animate-scan-vertical -z-10 pointer-events-none opacity-50"></div>
"""

content = content.replace('      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>', '      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>\n' + grid_decor)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Subtle hacker style applied to clean UI!")
