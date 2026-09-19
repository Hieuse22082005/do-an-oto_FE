import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ResultCertificate.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'<p className="font-serif italic text-xl text-\[#0B192C\] mb-2">\{data\.user_email\?\.split\(\'@\'\)\[0\] \|\| "Customer"\}</p>'
replacement = '<p className="font-serif italic text-xl text-[#0B192C] mb-2 truncate w-full px-2">{data.user_email?.split(\'@\')[0] || "Customer"}</p>'

content = re.sub(pattern, replacement, content)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Added truncate to Customer name")
