import codecs
import os

bracket_classes = {
    'bg-[#09090b]/80': 'bg-white/80 dark:bg-[#09090b]/80',
    'bg-[#09090b]': 'bg-slate-50 dark:bg-[#09090b]',
    'bg-[#111827]': 'bg-white dark:bg-[#111827]',
    'bg-[#111]': 'bg-white dark:bg-[#111]',
    'bg-[#222]': 'bg-gray-100 dark:bg-[#222]',
    'bg-[#020617]/50': 'bg-white/80 dark:bg-[#020617]/50',
}

files_to_update = [
    r"c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx",
    r"c:\Users\Hieu\Desktop\do an oto_FE\components\ui\glowy-waves-hero-shadcnui.tsx"
]

def process_file(filepath):
    if not os.path.exists(filepath):
        return
    
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    original = content
    
    for old, new in bracket_classes.items():
        # Clean up any double replacements just in case
        content = content.replace(new, old)
        
        # Replace occurrences that don't have dark: in front
        # Since we just cleaned up the `new` ones, any `old` left are purely `old` (unless they are already `dark:old`)
        # Wait, if it is `dark:bg-[#111]`, we don't want to replace it.
        # But wait, did I ever write `dark:bg-[#111]` originally? No, originally it was just `bg-[#111]`.
        # So we can safely replace `old` with `new` EXCEPT if it's `dark:old`.
        # To do this safely:
        content = content.replace(f"dark:{old}", "TEMP_DARK_PLACEHOLDER")
        content = content.replace(old, new)
        content = content.replace("TEMP_DARK_PLACEHOLDER", f"dark:{old}")

    if content != original:
        with codecs.open(filepath, 'w', 'utf-8') as f:
            f.write(content)
        print(f"Fixed brackets in {filepath}")

for f in files_to_update:
    process_file(f)
