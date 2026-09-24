import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Change gradient from left to right
content = content.replace(
    'className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent z-10 w-full md:w-3/4"',
    'className="absolute inset-y-0 right-0 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10 w-full md:w-1/2"'
)

# 2. Align the text container to the right
content = content.replace(
    'className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-24 pb-12 md:pb-0 pointer-events-none"',
    'className="absolute inset-0 z-20 flex flex-col items-end justify-end md:justify-center px-6 md:px-12 lg:px-24 pb-12 md:pb-0 pointer-events-none text-right"'
)

# 3. Align the flex container of the tags to the right
content = content.replace(
    'className="flex flex-col sm:flex-row gap-4 pointer-events-auto"',
    'className="flex flex-col sm:flex-row justify-end gap-4 pointer-events-auto"'
)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Aligned text to the right!")
