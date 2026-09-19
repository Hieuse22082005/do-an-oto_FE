import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    lines = f.readlines()

# add import
import_idx = -1
for i, line in enumerate(lines):
    if "import TestimonialsSection" in line:
        import_idx = i
        break

if import_idx != -1:
    lines.insert(import_idx + 1, "import ContactSupportBlock from '../ui/contact-support-block';\n")

# find the place to insert ContactSupportBlock
start_idx = -1
for i, line in enumerate(lines):
    if "{/* 6. CTA BANNER */}" in line:
        start_idx = i
        break

if start_idx != -1:
    contact_block = [
        "        {/* Support Block */}\n",
        "        <div className=\"w-full bg-slate-50 py-20 px-6\">\n",
        "          <div className=\"max-w-7xl mx-auto flex flex-col items-center\">\n",
        "             <div className=\"text-center mb-10\">\n",
        "               <h2 className=\"text-3xl md:text-4xl font-serif text-slate-800 mb-4\">Cần hỗ trợ thêm?</h2>\n",
        "               <p className=\"text-slate-500 max-w-xl\">Đội ngũ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn về mua bán xe, trả góp và bảo hành.</p>\n",
        "             </div>\n",
        "             <ContactSupportBlock />\n",
        "          </div>\n",
        "        </div>\n",
        "\n"
    ]
    
    lines = lines[:start_idx] + contact_block + lines[start_idx:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.writelines(lines)
    
print("Added ContactSupportBlock to MarketplaceTab!")
