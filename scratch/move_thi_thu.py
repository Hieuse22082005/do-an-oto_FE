import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for thi-thu box (which has bg-yellow-900/10)
thi_thu_pattern = re.compile(
    r'( {8}<div key=\{activeMenu\}.*?\n)(\s*<div className="bg-yellow-900/10.*?\n(?:.*?\n)*?)(\s*<div className="text-center mb-10 relative">\n(?:.*?\n)*?\s*</div>\n\s*</div>\n)', 
    re.MULTILINE
)

def replace_thi_thu(match):
    prefix = match.group(1)
    box_start = match.group(2)
    title_block = match.group(3)
    
    # Title block contains two divs (title and the text below it) because I grouped it together in update_titles_exact.py
    title_lines = title_block.split('\n')
    unindented_title = '\n'.join([line[2:] if line.startswith('  ') else line for line in title_lines])
    
    return prefix + unindented_title + box_start

new_content = thi_thu_pattern.sub(replace_thi_thu, content)

# But what if I just manually search for `<div className="text-center mb-10 relative">` in thi_thu and move it?
# Let's write a robust way: Find `if (activeMenu === 'thi-thu') {`
# find `return (\n        <div key={activeMenu}`
# then the next line is the form box.
# and then find the title block and move it before the form box.

parts = content.split("if (activeMenu === 'thi-thu') {")
if len(parts) > 1:
    thi_thu_part = parts[1]
    # We will find the title block
    title_match = re.search(r'(\s*<div className="text-center mb-10 relative">.*?Xin chào.*?</p>\n\s*</div>\n)', thi_thu_part, re.DOTALL)
    if title_match:
        title_block = title_match.group(1)
        # Remove from thi_thu_part
        thi_thu_part = thi_thu_part.replace(title_block, '')
        
        # Unindent
        unindented = '\n'.join([line[2:] if line.startswith('  ') else line for line in title_block.split('\n')])
        
        # Insert after <div key={activeMenu}...>
        insert_idx = thi_thu_part.find('className={`lg:col-span-6')
        insert_idx = thi_thu_part.find('>', insert_idx) + 1
        
        thi_thu_part = thi_thu_part[:insert_idx] + '\n' + unindented + thi_thu_part[insert_idx:]
        
    parts[1] = thi_thu_part
    content = "if (activeMenu === 'thi-thu') {".join(parts)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Moved Thi Thu title block!")
