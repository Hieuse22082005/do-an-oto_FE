import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\sidebar.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

content = content.replace(
    'export const SidebarLink = ({\n  link,\n  className,\n  ...props\n}: {',
    'export const SidebarLink = ({\n  link,\n  className,\n  onClick,\n  ...props\n}: {'
)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Fixed onClick in SidebarLink')
