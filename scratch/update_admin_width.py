import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Make admin full width
old_class = "(activeTab === 'evaluate' || activeTab === 'search' || activeTab === 'fines') ? 'max-w-[110rem]' : 'max-w-6xl'"
new_class = "(activeTab === 'evaluate' || activeTab === 'search' || activeTab === 'fines' || activeTab === 'admin') ? 'max-w-full px-2 md:px-6' : 'max-w-6xl'"
content = content.replace(old_class, new_class)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated page.tsx layout logic for Admin tab")
