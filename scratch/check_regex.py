import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

box_start_pattern = re.compile(r'(          <div key=\{activeMenu\}.*?\n)(\s*<div className="bg-\[#0f172a\]/90.*?\n(?:.*?\n)*?)(\s*<div className="text-center mb-10 relative">\n(?:.*?\n)*?\s*</p>\n\s*</div>\n)', re.MULTILINE)

matches = box_start_pattern.findall(content)
print(f"Matches found: {len(matches)}")

if len(matches) == 0:
    # Let's see what the structure is
    phat_nguoi_idx = content.find("if (activeMenu === 'phat-nguoi')")
    print(content[phat_nguoi_idx:phat_nguoi_idx+1000].encode('utf-8'))
