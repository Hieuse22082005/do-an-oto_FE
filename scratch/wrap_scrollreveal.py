import codecs
import re

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

if 'ScrollReveal' not in content:
    content = content.replace('import { SlotMachineText }', 'import { SlotMachineText }\nimport { ScrollReveal } from "../ui/scroll-reveal";')

# Replace <section id="mission"...> to have <ScrollReveal> inside
content = content.replace(
    '<div className="relative z-10 mx-auto max-w-7xl">',
    '<ScrollReveal>\n          <div className="relative z-10 mx-auto max-w-7xl">'
)
# Note: we need to find the matching closing div for each of these, which is very hard with regex.

# Safer: replace <section with <ScrollReveal><section
content = re.sub(
    r'(<section id="mission"[^>]*>)',
    r'<ScrollReveal>\n      \1',
    content
)
content = content.replace('</section>', '</section>\n      </ScrollReveal>')

# Wait, if I replace </section> with </section></ScrollReveal>, it will wrap the header too? No, header is </header>
# Let's fix the script to be very precise.
