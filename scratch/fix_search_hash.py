import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace TRA_CUU_HASH with SEARCH_HASH
content = content.replace("'TRA_CUU_HASH'", "'SEARCH_HASH'")
content = content.replace('"TRA_CUU_HASH"', '"SEARCH_HASH"')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed SEARCH_HASH in AdminTab.tsx")
