import codecs
import re

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# First, remove ALL instances of the section I just added
bad_section = '\n      <section className="relative z-10 py-16 border-t border-slate-800/50 bg-[#030712] font-sans">\n        <HomeTestimonials />\n      </section>\n'
content = content.replace(bad_section, '')

# Also remove any stray HomeTestimonials that might be formatted slightly differently just in case
content = re.sub(r'\s*<section[^>]*>\s*<HomeTestimonials />\s*</section>\s*', '\n', content)

# Now, add it ONCE precisely after the mission section
# We'll find the mission section and its closing tag
mission_pattern = r'(<section id="mission".*?</section>)'
match = re.search(mission_pattern, content, flags=re.DOTALL)

if match:
    mission_str = match.group(1)
    new_mission_str = mission_str + bad_section
    content = content.replace(mission_str, new_mission_str)
    codecs.open(home_path, 'w', 'utf-8').write(content)
    print("Fixed multiple HomeTestimonials")
else:
    print("Could not find mission section")
