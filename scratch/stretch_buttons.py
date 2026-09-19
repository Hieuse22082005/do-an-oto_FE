import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace <div className="flex flex-col gap-2"> with flex-1
content = content.replace('<div className="flex flex-col gap-2">', '<div className="flex flex-col gap-3 flex-1">')

# Add flex-1 to the button so they stretch evenly
# We find: className={`w-full flex items-center
content = content.replace('className={`w-full flex items-center', 'className={`w-full flex-1 flex items-center')

# Also, if they are stretching, we want the content inside to be centered vertically if needed, but flex items-center already does that.
# Let's also increase the icon size slightly and text size slightly if they have so much space, or just keep them same.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Expanded the 5 options to fill the layout!")
