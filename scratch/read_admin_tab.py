import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    lines = f.readlines()

with codecs.open(r"c:\Users\Hieu\Desktop\do an oto_FE\scratch\admin_tab_structure.txt", "w", "utf-8") as out_f:
    out_f.writelines(lines[:50]) # Just save first 50 lines to see props and state
