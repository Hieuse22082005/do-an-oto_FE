import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Change grid to remove items-start
content = content.replace("animate-[fadeIn_0.5s_ease-out] items-start", "animate-[fadeIn_0.5s_ease-out] items-stretch")

# 2. Change renderLeftMenu
pattern = r'(const renderLeftMenu = \(\) => \(\s*<div className="lg:col-span-3">)\s*<div className="bg-\[#111827\] p-4 rounded-3xl shadow-xl sticky top-6 border border-gray-800">'

replacement = r'const renderLeftMenu = () => (\n      <div className="lg:col-span-3 h-full">\n        <div className="bg-[#111827] p-4 rounded-[2rem] shadow-2xl border border-gray-800 h-full flex flex-col">'

content = re.sub(pattern, replacement, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated Left Sidebar layout!")
