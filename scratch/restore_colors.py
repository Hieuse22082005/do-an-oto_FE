import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# Restore solid backgrounds for Celestia sections
content = content.replace('bg-[#030712]/30 backdrop-blur-md', 'bg-[#030712]')
content = content.replace('bg-[#060a14]/30 backdrop-blur-md', 'bg-[#060a14]')

# Add solid background to HomeTestimonials section
content = content.replace('<section className="relative z-10 py-16">', '<section className="relative z-10 py-16 border-t border-slate-800/50 bg-[#030712] font-sans">')

codecs.open(home_path, 'w', 'utf-8').write(content)
print('Restored solid colors and matched HomeTestimonials section')
