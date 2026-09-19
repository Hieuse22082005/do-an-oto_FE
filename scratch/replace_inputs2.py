import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
text = codecs.open(file_path, 'r', 'utf-8').read()

new_class = 'w-full h-[60px] bg-[#383838] text-[#383838] border-0 border-t-[50px] border-solid border-t-[#383838] outline outline-[7px] outline-[#383838] outline-offset-0 text-center text-lg font-bold font-mono transition-all duration-1000 hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase'

# extract inputs
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
    # find className="..."
    c_start = inp.find('className="')
    if c_start != -1:
        c_end = inp.find('"', c_start + 11)
        if c_end != -1:
            old_class_full = inp[c_start:c_end+1]
            new_inp = inp.replace(old_class_full, f'className="{new_class}"')
            text = text.replace(inp, new_inp)

codecs.open(file_path, 'w', 'utf-8').write(text)
