import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
text = codecs.open(file_path, 'r', 'utf-8').read()
text = text.replace('\r\n', '\n')

input_class = 'w-full h-[56px] bg-[#383838] text-[#383838] border-0 border-t-[46px] border-solid border-t-[#383838] text-center text-lg font-bold font-mono transition-all duration-[800ms] hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase block'

wrapper_class = 'w-full relative border-[2px] border-white dark:border-slate-300 outline outline-[6px] outline-[#383838] bg-[#383838]'

# We need to find the inputs we previously modified.
# Since we already modified them, they have the old new_class:
old_class = 'w-full h-[60px] bg-[#383838] text-[#383838] border-0 border-t-[50px] border-solid border-t-[#383838] outline outline-[7px] outline-[#383838] outline-offset-0 text-center text-lg font-bold font-mono transition-all duration-1000 hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase'

# Find all inputs
start_idx = 0
inputs = []
while True:
    idx = text.find('<input ', start_idx)
    if idx == -1:
        break
    end_idx = text.find('/>', idx)
    inputs.append(text[idx:end_idx+2])
    start_idx = end_idx + 2

for inp in inputs:
    if old_class in inp:
        # Create the new input tag by replacing the className
        new_inp = inp.replace(old_class, input_class)
        # Wrap it
        wrapped = f'<div className="{wrapper_class}">{new_inp}</div>'
        text = text.replace(inp, wrapped)

codecs.open(file_path, 'w', 'utf-8').write(text)
