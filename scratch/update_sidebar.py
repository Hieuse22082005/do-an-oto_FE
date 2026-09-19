import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\sidebar.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

content = content.replace(
    'import Link, { LinkProps } from "next/link";',
    'import Link, { LinkProps } from "next/link";\nimport { MouseEventHandler } from "react";'
)

content = content.replace(
    '  link: Links;\n  className?: string;\n  props?: LinkProps;\n}) => {',
    '  link: Links;\n  className?: string;\n  props?: any;\n  onClick?: MouseEventHandler<HTMLAnchorElement>;\n}) => {'
)

content = content.replace(
    '<Link\n      href={link.href}',
    '<Link\n      href={link.href}\n      onClick={onClick}'
)

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Updated SidebarLink to support onClick')
