import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()
mission_end = '        </div>\n      </section>'
testimonials_section = '\n      <section className="relative z-10 py-16 border-t border-slate-800/50 bg-[#030712] font-sans">\n        <HomeTestimonials />\n      </section>\n'

# Make sure it's not already there
if '<HomeTestimonials />' not in content:
    content = content.replace(mission_end, mission_end + testimonials_section)
    codecs.open(home_path, 'w', 'utf-8').write(content)
    print('Restored HomeTestimonials after mission section')
else:
    print('HomeTestimonials is already in the file')
