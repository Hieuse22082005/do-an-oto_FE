import codecs

file_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\home-testimonials.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

old_class = 'p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/5 mb-32 shadow-xl flex flex-wrap gap-6 items-center justify-center relative bg-white dark:bg-[#111]'
new_class = 'p-8 md:p-12 mb-32 flex flex-wrap gap-6 items-center justify-center relative bg-transparent'

content = content.replace(old_class, new_class)
codecs.open(file_path, 'w', 'utf-8').write(content)
print("Removed background rectangle from HomeTestimonials")
