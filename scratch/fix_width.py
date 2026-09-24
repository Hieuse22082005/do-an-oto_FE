import codecs
import re

file_path = 'components/modals/CarDetailModal.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Change video column to 1/3
content = content.replace('w-full lg:w-2/3 h-[50vh] lg:h-full relative bg-black', 'w-full lg:w-1/3 h-[50vh] lg:h-full relative bg-black')

# Change text column to 2/3
content = content.replace('w-full lg:w-1/3 h-full bg-zinc-950 flex flex-col justify-center', 'w-full lg:w-2/3 h-full bg-zinc-950 flex flex-col justify-center')

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)
print("Updated video to 1/3!")
