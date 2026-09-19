import codecs
import re

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Replace the extra </ScrollReveal> at the end of the data section
content = re.sub(
    r'(<\/ScrollReveal>\s*<\/div>\s*)<\/ScrollReveal>(\s*<\/section>\s*<section id="explore")',
    r'\1</div>\2',
    content
)

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Fixed extra closing tag")
