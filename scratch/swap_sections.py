import codecs
import re

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()

# We need to find the testimonials section
testimonials_pattern = r'(\s*<section className="relative z-10 py-16 border-t border-slate-800/50 bg-\[#030712\] font-sans">\s*<HomeTestimonials />\s*</section>\s*)'
match_t = re.search(testimonials_pattern, content)

# We need to find the mission section
mission_pattern = r'(\s*<section id="mission".*?</section>\s*)'
match_m = re.search(mission_pattern, content, flags=re.DOTALL)

if match_t and match_m:
    testimonials_str = match_t.group(1)
    mission_str = match_m.group(1)
    
    # We replace them.
    # Currently they are sequential: Testimonials then Mission
    old_block = testimonials_str + mission_str
    new_block = mission_str + testimonials_str
    
    # If they are exactly adjacent, we can replace the block
    if old_block in content:
        content = content.replace(old_block, new_block)
        codecs.open(home_path, 'w', 'utf-8').write(content)
        print("Swapped adjacent sections")
    else:
        # If they aren't strictly adjacent due to whitespace, we can remove testimonials and insert it after mission
        content = content.replace(testimonials_str, '')
        content = content.replace(mission_str, mission_str + testimonials_str)
        codecs.open(home_path, 'w', 'utf-8').write(content)
        print("Swapped non-adjacent sections")
else:
    print("Could not find one or both sections")

