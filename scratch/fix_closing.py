import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Fix the Lượt truy cập closing tag
if '<SlotMachineText text="1,402" /></p>\n            </div>' in content:
    content = content.replace(
        '<SlotMachineText text="1,402" /></p>\n            </div>',
        '<SlotMachineText text="1,402" /></p>\n            </ScrollReveal>'
    )
elif '1,402" /></p>\r\n            </div>' in content:
    content = content.replace(
        '<SlotMachineText text="1,402" /></p>\r\n            </div>',
        '<SlotMachineText text="1,402" /></p>\r\n            </ScrollReveal>'
    )
    
# In case it has a different space
import re
content = re.sub(
    r'(<SlotMachineText text="1,402" \/>.*?<\/p>)\s*<\/div>',
    r'\1\n            </ScrollReveal>',
    content,
    flags=re.DOTALL
)

codecs.open(home_path, 'w', 'utf-8').write(content)
print("Fixed closing tag")
