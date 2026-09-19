import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for the main box:
box_start_pattern = re.compile(
    r'( {8}<div key=\{activeMenu\}.*?\n)(\s*<div className="bg-\[#0f172a\]/90.*?\n(?:.*?\n)*?)(\s*<div className="text-center mb-10 relative">\n(?:.*?\n)*?\s*</p>\n\s*</div>\n)', 
    re.MULTILINE
)

def replace_func(match):
    prefix = match.group(1) # <div key={activeMenu}...>
    box_start = match.group(2) # <div className="bg...
    title_block = match.group(3) # <div className="text-center mb-10 relative">...</div>
    
    # We need to un-indent the title block by 2 spaces since it's moving out of the box
    # Title block currently has 12 spaces indentation. We want 10 spaces.
    title_lines = title_block.split('\n')
    unindented_title = '\n'.join([line[2:] if line.startswith('  ') else line for line in title_lines])
    
    return prefix + unindented_title + box_start

new_content = box_start_pattern.sub(replace_func, content)

# But wait, what about Thi Thử? It doesn't have `<div className="bg-[#0f172a]/90...`!
# Let's see if Thi Thu is still inside the box.
# If Thi Thu didn't match, we will handle it manually.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Moved title blocks successfully!")
