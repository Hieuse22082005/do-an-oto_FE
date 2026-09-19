import codecs
import re
import os

grad_map = {
    'from-blue-400': 'from-blue-600 dark:from-blue-400',
    'to-emerald-400': 'to-emerald-600 dark:to-emerald-400',
    'to-purple-400': 'to-purple-600 dark:to-purple-400',
    'from-cyan-400': 'from-cyan-600 dark:from-cyan-400',
    'to-cyan-400': 'to-cyan-600 dark:to-cyan-400',
    'via-indigo-500': 'via-indigo-600 dark:via-indigo-500'
}

def process_file(filepath):
    if 'PenaltyTab' in filepath: return
    
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    original = content
    
    for old, new in grad_map.items():
        content = content.replace(new, old)
        content = content.replace(f"dark:{old}", "TEMP_DARK_PLACEHOLDER")
        content = content.replace(old, new)
        content = content.replace("TEMP_DARK_PLACEHOLDER", f"dark:{old}")
        
    if content != original:
        with codecs.open(filepath, 'w', 'utf-8') as f:
            f.write(content)
        print(f"Fixed gradients in {filepath}")

for root, dirs, files in os.walk(r'c:\Users\Hieu\Desktop\do an oto_FE'):
    if 'node_modules' in root or '.next' in root or '.git' in root:
        continue
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            process_file(os.path.join(root, f))
