import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
scratch_path = r"c:\Users\Hieu\Desktop\do an oto_FE\scratch\replacement.txt"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

with open(scratch_path, "r", encoding="utf-8") as f:
    replacement = f.read()

start_match = re.search(r"const renderCenterMain = \(\) => \{", content)
end_match = re.search(r"const renderRightWidgets = \(\) => \{.*?(?=\n  return \(\n    <div className=\"w-full mx-auto relative)", content, re.DOTALL)

if start_match and end_match:
    start_idx = start_match.start()
    end_idx = end_match.end()
    
    new_content = content[:start_idx] + replacement.strip() + "\n" + content[end_idx:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully replaced renderCenterMain and renderRightWidgets.")
else:
    print("Could not find boundaries for replacement.")
