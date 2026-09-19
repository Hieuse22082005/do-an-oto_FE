import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    lines = f.readlines()

# add import
import_idx = -1
for i, line in enumerate(lines):
    if "import CarDetailModal" in line:
        import_idx = i
        break

if import_idx != -1:
    lines.insert(import_idx + 1, "import TestimonialsSection from '../sections/TestimonialsSection';\n")

# find boundaries
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "{/* Testimonial */}" in line:
        start_idx = i
    if "{/* 6. CTA BANNER */}" in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    # We replace from start_idx to end_idx - 2 (to keep the `</section>`)
    
    # Actually, the section ends right before 6. CTA BANNER.
    # We can just replace the whole testimonial div with our component.
    new_block = [
        "        {/* Testimonials Animation */}\n",
        "        <div className=\"w-full bg-slate-50 relative -mt-10 pt-10\">\n",
        "          <TestimonialsSection />\n",
        "        </div>\n",
        "      </section>\n",
        "\n"
    ]
    
    lines = lines[:start_idx] + new_block + lines[end_idx:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.writelines(lines)
    
print("Replaced with new TestimonialsSection!")
