import codecs
import re

# 1. Fix HomeTestimonials colors
ht_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\home-testimonials.tsx'
ht_content = codecs.open(ht_path, 'r', 'utf-8').read()
# Replace `const isDark = theme === "dark";` with `const isDark = true;`
ht_content = ht_content.replace('const isDark = theme === "dark";', 'const isDark = true; // Forced true because HomeTab is always dark')
codecs.open(ht_path, 'w', 'utf-8').write(ht_content)


# 2. Fix Header Logo
header_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
h_content = codecs.open(header_path, 'r', 'utf-8').read()

old_logo = """<Icon icon="lucide:shield-check" className="text-3xl text-[#00f2fe]" />
          <span className="text-2xl font-black uppercase tracking-tighter text-white">OTOCHECK</span>"""

new_logo = """<img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain scale-[1.3]" />
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">
            ĐịnhGiáXe<span className="text-[#00f2fe]">.AI</span>
          </span>"""

h_content = h_content.replace(old_logo, new_logo)
codecs.open(header_path, 'w', 'utf-8').write(h_content)


# 3. Fix FinesTab quiz question text color
fines_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
f_content = codecs.open(fines_path, 'r', 'utf-8').read()
f_content = f_content.replace(
    'className="text-lg font-bold text-slate-100 mb-8 leading-relaxed px-2"',
    'className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-8 leading-relaxed px-2"'
)
codecs.open(fines_path, 'w', 'utf-8').write(f_content)


# 4. Fix page.tsx footer background for home tab in light mode
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
p_content = codecs.open(page_path, 'r', 'utf-8').read()
p_content = p_content.replace(
    "activeTab === 'home' ? 'bg-black'",
    "activeTab === 'home' ? 'bg-white dark:bg-black'"
)
codecs.open(page_path, 'w', 'utf-8').write(p_content)

print("Applied all 4 fixes!")
