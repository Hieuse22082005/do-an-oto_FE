import codecs
import re

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Make sure import is there
if 'import { ScrollReveal } from "../ui/scroll-reveal";' not in content:
    content = content.replace('import { SlotMachineText } from "../ui/slot-machine";', 'import { SlotMachineText } from "../ui/slot-machine";\nimport { ScrollReveal } from "../ui/scroll-reveal";')

# Data section stagger
content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">L',
    '<ScrollReveal delay={0.1} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">L'
)
content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">T',
    '<ScrollReveal delay={0.2} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">T'
)
content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">Đ',
    '<ScrollReveal delay={0.3} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">Đ'
)
content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">U',
    '<ScrollReveal delay={0.4} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">U'
)

content = content.replace(
    '</SlotMachineText></p>\n            </div>',
    '</SlotMachineText></p>\n            </ScrollReveal>'
)
content = content.replace(
    '</span></p>\n            </div>',
    '</span></p>\n            </ScrollReveal>'
)

# Also let's wrap the other sections inner div
# Mission
content = content.replace(
    '<div className="relative z-10 mx-auto max-w-7xl">',
    '<ScrollReveal className="relative z-10 mx-auto max-w-7xl">'
).replace(
    '          </div>\n        </div>\n      </section>',
    '          </div>\n        </ScrollReveal>\n      </section>'
)

# Technology 
content = content.replace(
    '<div className="mx-auto max-w-7xl">\n          <div className="mb-20 flex',
    '<ScrollReveal className="mx-auto max-w-7xl">\n          <div className="mb-20 flex'
).replace(
    '          </div>\n      </section>\n      <section className="relative z-10',
    '          </div>\n        </ScrollReveal>\n      </section>\n      <section className="relative z-10'
)

# Explore
content = content.replace(
    '<div className="relative z-10 mx-auto max-w-4xl text-center">',
    '<ScrollReveal className="relative z-10 mx-auto max-w-4xl text-center">'
).replace(
    '          </div>\n      </section>',
    '          </ScrollReveal>\n      </section>'
)

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Finished rewriting")
