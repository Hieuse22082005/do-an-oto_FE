import codecs
import re

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# 1. Video fixed -> absolute
content = content.replace('fixed inset-0 z-0', 'absolute inset-0 z-0')

# 2. Add HomeTestimonials import
if 'HomeTestimonials' not in content:
    content = content.replace('import { Icon } from "@iconify/react";', 'import { Icon } from "@iconify/react";\nimport { HomeTestimonials } from "../ui/home-testimonials";')

# 3. Add SlotMachineText and ScrollReveal imports
if 'SlotMachineText' not in content:
    content = content.replace('import { Icon } from "@iconify/react";', 'import { Icon } from "@iconify/react";\nimport { SlotMachineText } from "../ui/slot-machine";\nimport { ScrollReveal } from "../ui/scroll-reveal";')

# 4. Insert HomeTestimonials under mission section
mission_pattern = r'(<section id="mission".*?</section>)'
match = re.search(mission_pattern, content, flags=re.DOTALL)
if match:
    mission_str = match.group(1)
    new_mission_str = mission_str + '\n      <section className="relative z-10 py-16 border-t border-slate-800/50 bg-[#030712] font-sans">\n        <HomeTestimonials />\n      </section>\n'
    content = content.replace(mission_str, new_mission_str)

# 5. Replace 1,402 etc with SlotMachineText
content = content.replace(
    '<p className="font-mono text-4xl font-black md:text-5xl text-white">1,402</p>',
    '<p className="font-mono text-4xl font-black md:text-5xl text-white"><SlotMachineText text="1,402" /></p>'
)
content = content.replace(
    '<p className="font-mono text-4xl font-black md:text-5xl text-white">0.5<span className="text-2xl text-slate-500">s</span></p>',
    '<p className="font-mono text-4xl font-black md:text-5xl text-white"><SlotMachineText text="0.5" /><span className="text-2xl text-slate-500">s</span></p>'
)
content = content.replace(
    '<p className="font-mono text-4xl font-black md:text-5xl text-white">99.9<span className="text-2xl text-slate-500">%</span></p>',
    '<p className="font-mono text-4xl font-black md:text-5xl text-white"><SlotMachineText text="99.9" /><span className="text-2xl text-slate-500">%</span></p>'
)
content = content.replace(
    '<p className="font-mono text-4xl font-black md:text-5xl text-white">100<span className="text-2xl text-slate-500">%</span></p>',
    '<p className="font-mono text-4xl font-black md:text-5xl text-white"><SlotMachineText text="100" /><span className="text-2xl text-slate-500">%</span></p>'
)

# 6. Apply clean ScrollReveal
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

# Close Data blocks
content = content.replace(
    '</SlotMachineText></p>\n            </div>',
    '</SlotMachineText></p>\n            </ScrollReveal>'
)
content = content.replace(
    '</span></p>\n            </div>',
    '</span></p>\n            </ScrollReveal>'
)

# Mission inner
content = content.replace(
    '<div className="relative z-10 mx-auto max-w-7xl">',
    '<ScrollReveal className="relative z-10 mx-auto max-w-7xl">'
).replace(
    '          </div>\n        </div>\n      </section>',
    '          </div>\n        </ScrollReveal>\n      </section>'
)

# Technology inner
content = content.replace(
    '<div className="mx-auto max-w-7xl">\n          <div className="mb-20 flex',
    '<ScrollReveal className="mx-auto max-w-7xl">\n          <div className="mb-20 flex'
).replace(
    '          </div>\n        </div>\n      </section>',
    '          </div>\n        </ScrollReveal>\n      </section>'
)

# Explore inner
content = content.replace(
    '<div className="relative z-10 mx-auto max-w-4xl text-center">',
    '<ScrollReveal className="relative z-10 mx-auto max-w-4xl text-center">'
).replace(
    '          </div>\n      </section>',
    '          </ScrollReveal>\n      </section>'
)

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Restored all changes safely!")
