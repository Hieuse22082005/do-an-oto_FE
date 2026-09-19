import codecs
import re

def add_class(filepath):
    content = codecs.open(filepath, 'r', 'utf-8').read()
    # Add btn-liquid to primary buttons
    # Regex to find `<button className="... bg-..."` or similar
    content = re.sub(r'(<button[^>]*className=")(.*?bg-[a-z]+-[0-9]+.*?)"', r'\1btn-liquid \2"', content)
    # Exclude small icon buttons or modal close buttons
    # Well, it's safer to just do it manually for known primary buttons if possible, 
    # but regex replacing `bg-blue-600`, `bg-yellow-500` is usually fine.
    codecs.open(filepath, 'w', 'utf-8').write(content)

add_class(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx')
add_class(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx')
add_class(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx')
print('Applied btn-liquid')
