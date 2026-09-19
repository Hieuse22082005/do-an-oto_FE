import codecs

# 1. Update HomeTab.tsx
home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
lines = codecs.open(home_path, 'r', 'utf-8').readlines()
new_lines = []

imported = False
for line in lines:
    if 'import' in line and not imported:
        new_lines.append(line)
        new_lines.append('import { HomeTestimonials } from "../ui/home-testimonials";\n')
        imported = True
        continue
    
    new_lines.append(line)
    
    if '</header>' in line:
        new_lines.append('      <section className="relative z-10 py-16">\n')
        new_lines.append('        <HomeTestimonials />\n')
        new_lines.append('      </section>\n')

codecs.open(home_path, 'w', 'utf-8').writelines(new_lines)

# 2. Update AnalyticsTab.tsx
analytics_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AnalyticsTab.tsx'
lines = codecs.open(analytics_path, 'r', 'utf-8').readlines()
new_lines = []

for line in lines:
    if 'import { HomeTestimonials }' in line:
        continue
    if '<HomeTestimonials />' in line:
        continue
    new_lines.append(line)

codecs.open(analytics_path, 'w', 'utf-8').writelines(new_lines)
print("Moved HomeTestimonials from AnalyticsTab to HomeTab")
