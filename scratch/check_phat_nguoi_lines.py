import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"c:\Users\Hieu\Desktop\do an oto_FE\scratch\check_phat_nguoi_lines_out.txt", "w", encoding="utf-8") as out_f:
    for i, x in enumerate(lines[308:330]):
        out_f.write(f"{i+309}: {x.strip()}\n")
