import codecs
path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(path, 'r', 'utf-8').read()
if 'import AnalyticsTab' not in content:
    content = content.replace('import { SlotMachineText } from "../ui/slot-machine";', 'import { SlotMachineText } from "../ui/slot-machine";\nimport AnalyticsTab from "./AnalyticsTab";')

if '<AnalyticsTab ' not in content:
    idx = content.rfind('</div>')
    if idx != -1:
        content = content[:idx] + '      <section className="relative z-10 w-full bg-[#030712] pt-20 border-t border-white/10">\n        <AnalyticsTab onTryNow={onTryNow} />\n      </section>\n' + content[idx:]

codecs.open(path, 'w', 'utf-8').write(content)
