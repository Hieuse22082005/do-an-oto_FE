import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"c:\Users\Hieu\Desktop\do an oto_FE\scratch\check_opacity_out.txt", "w", encoding="utf-8") as out_f:
    for i, line in enumerate(lines):
        if "opacity" in line and "absolute" in line:
            out_f.write(f"{i+1}: {line.strip()}\n")
