import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"c:\Users\Hieu\Desktop\do an oto_FE\scratch\check_tra_cuu_out.txt", "w", encoding="utf-8") as out_f:
    for i, line in enumerate(lines):
        if "TRA C" in line.upper():
            out_f.write(f"{i+1}: {line.strip()}\n")
