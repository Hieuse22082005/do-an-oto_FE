import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for thi-thu
thi_thu_pattern = re.compile(
    r'( {8}<div key=\{activeMenu\}.*?\n)(\s*<div className="bg-\[#0f172a\]/90.*?\n(?:.*?\n)*?)(\s*<div className="text-center mb-10 relative">\n(?:.*?\n)*?\s*</p>\n\s*</div>\n)', 
    re.MULTILINE
)

# Actually, thi thu DOES have a background box:
# `bg-[#0f172a]/90 backdrop-blur-xl p-8 rounded-[2rem]`
# Wait, no it doesn't? Let's print it to see.
idx = content.find("if (activeMenu === 'thi-thu')")
print(content[idx:idx+1500])
