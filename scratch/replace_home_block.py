import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

import_statement = 'import { HomeTestimonials } from "../ui/home-testimonials";\n'
content = content.replace('import { GlowyWavesHero }', import_statement + 'import { GlowyWavesHero }')

pattern = r'<motion\.div[^>]*className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32"[^>]*>.*?</motion\.div>\s*(?=\{\/\* DATA ANALYSIS SECTION \*\/})'
new_block = '<HomeTestimonials />\n\n        '

new_content = re.sub(pattern, new_block, content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(new_content)
