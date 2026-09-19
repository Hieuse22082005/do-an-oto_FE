import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Add import
if 'SlotMachineText' not in content:
    content = content.replace('import { Icon } from "@iconify/react";', 'import { Icon } from "@iconify/react";\nimport { SlotMachineText } from "../ui/slot-machine";')

# Replace stats
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

codecs.open(home_path, 'w', 'utf-8').write(content)
print('Updated HomeTab.tsx with SlotMachineText')
