import codecs
import re

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

if 'ScrollReveal' not in content:
    content = content.replace('import { SlotMachineText } from "../ui/slot-machine";', 'import { SlotMachineText } from "../ui/slot-machine";\nimport { ScrollReveal } from "../ui/scroll-reveal";')

def wrap_section(section_id, content):
    pattern = r'(<section id="' + section_id + r'".*?</section>)'
    
    def repl(m):
        return '<ScrollReveal>\n' + m.group(1) + '\n</ScrollReveal>'
        
    return re.sub(pattern, repl, content, flags=re.DOTALL)

def wrap_class_section(class_substr, content):
    pattern = r'(<section className="[^"]*' + class_substr + r'".*?</section>)'
    
    def repl(m):
        return '<ScrollReveal>\n' + m.group(1) + '\n</ScrollReveal>'
        
    return re.sub(pattern, repl, content, flags=re.DOTALL)

# Let's wrap mission, technology, data, explore
content = wrap_section("mission", content)
content = wrap_section("technology", content)
content = wrap_section("data", content)
content = wrap_section("explore", content)

# Wrap HomeTestimonials section
content = wrap_class_section("relative z-10 py-16", content)

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Wrapped sections in ScrollReveal")
