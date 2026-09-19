import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace includes("30G") with === "30G99999"
new_content = content.replace('if (queries.plate.includes("30G") || queries.plate === "29A11111") {', 'if (queries.plate === "30G99999" || queries.plate === "29A11111") {')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
    
print("Fixed mock logic!")
