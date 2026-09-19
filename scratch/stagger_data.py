import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Fix the inner tags for data section
content = content.replace(
    '<ScrollReveal className="mx-auto max-w-7xl">\n          <div className="grid grid-cols-2 divide-x divide-y border border-slate-800 md:grid-cols-4 md:divide-y-0 text-[#00f2fe]">',
    '<div className="mx-auto max-w-7xl">\n          <div className="grid grid-cols-2 divide-x divide-y border border-slate-800 md:grid-cols-4 md:divide-y-0 text-[#00f2fe]">'
)

content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">L',
    '<ScrollReveal delay={0.1} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">L'
)
content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">T',
    '<ScrollReveal delay={0.2} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">T'
)
# For the third one (Độ Chính Xác, the character might be decoded differently, so just search for the start)
content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">',
    '<ScrollReveal delay={0.3} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">'
)
content = content.replace(
    '<div className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">U',
    '<ScrollReveal delay={0.4} className="bg-[#0b1120]/30 p-8 text-center">\n              <p className="mb-2 text-xs uppercase tracking-widest font-mono">U'
)

# And now replace the </div> closing tags for these blocks with </ScrollReveal>
# The blocks end with </p>\n            </div>
content = content.replace(
    '</SlotMachineText /></p>\n            </div>',
    '</SlotMachineText /></p>\n            </ScrollReveal>'
)
content = content.replace(
    '</span></p>\n            </div>',
    '</span></p>\n            </ScrollReveal>'
)

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Staggered data section")
