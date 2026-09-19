import codecs

text = codecs.open('components/tabs/FinesTab.tsx', 'r', 'utf-8').read()

start_idx = 0
with codecs.open('scratch/inputs_full.txt', 'w', 'utf-8') as f:
    count = 0
    while True:
        idx = text.find('<input ', start_idx)
        if idx == -1:
            break
        end_idx = text.find('/>', idx)
        f.write(f"--- Input {count} ---\n{text[idx:end_idx+2]}\n")
        start_idx = end_idx + 2
        count += 1
