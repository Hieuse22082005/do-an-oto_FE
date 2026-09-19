import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

new_class = 'w-full h-[60px] bg-[#383838] text-[#383838] border-0 border-t-[50px] border-solid border-t-[#383838] outline outline-[7px] outline-[#383838] outline-offset-0 text-center text-lg font-bold font-mono transition-all duration-1000 hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase'

# Find all <input> tags and replace their className attribute
def replace_class(match):
    tag = match.group(0)
    # Replace the existing className with the new one
    new_tag = re.sub(r'className="[^"]+"', f'className="{new_class}"', tag)
    return new_tag

content = re.sub(r'<input[^>]+>', replace_class, content)

codecs.open(file_path, 'w', 'utf-8').write(content)
