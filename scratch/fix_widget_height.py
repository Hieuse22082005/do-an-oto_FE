import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

# Normalize CRLF
content = content.replace('\r\n', '\n')

# Find the renderRightWidgets container and remove h-full
old_container = 'className={`w-full max-w-sm lg:col-span-3 flex flex-col gap-5 h-full ${animationClass}`}'
new_container = 'className={`w-full max-w-sm lg:col-span-3 flex flex-col gap-5 ${animationClass}`}'
content = content.replace(old_container, new_container)

# Remove flex-[1], flex-[1.2], flex-[0.8] from the three widgets so they don't stretch
content = content.replace(
    'className={`flex-[1] flex flex-col justify-center p-5 rounded-3xl',
    'className={`flex-none flex flex-col justify-center p-5 rounded-3xl'
)
content = content.replace(
    'className="flex-[1.2] flex flex-col justify-center bg-white/60',
    'className="flex-none flex flex-col justify-center bg-white/60'
)
content = content.replace(
    'className={`flex-[0.8] flex flex-col justify-center ${warnBg}',
    'className={`flex-none flex flex-col justify-center ${warnBg}'
)

codecs.open(file_path, 'w', 'utf-8').write(content)
