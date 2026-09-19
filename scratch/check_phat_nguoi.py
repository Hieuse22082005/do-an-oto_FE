import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

idx = content.find("if (activeMenu === 'phat-nguoi')")
with open(r"c:\Users\Hieu\Desktop\do an oto_FE\scratch\check_phat_nguoi_out.txt", "w", encoding="utf-8") as f:
    f.write(content[idx:idx+1500])
