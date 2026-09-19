import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()
content = content.replace('\r\n', '\n')

old_main = 'className={`flex-[2] w-full max-w-4xl mx-auto flex flex-col gap-8 ${animationClass}`}'
new_main = 'className={`flex-[2] w-full max-w-4xl mx-auto flex flex-col gap-8 lg:pl-10 ${animationClass}`}'
content = content.replace(old_main, new_main)

codecs.open(file_path, 'w', 'utf-8').write(content)
