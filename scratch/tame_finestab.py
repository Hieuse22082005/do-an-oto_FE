import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Remove glowing orbs and background textures
content = re.sub(r'\{/\* Lưới công nghệ.*?</style>', '', content, flags=re.DOTALL)
content = re.sub(r'\{/\* Lưới công nghệ.*?</div>', '', content, flags=re.DOTALL)
content = re.sub(r'<div className="absolute inset-0 bg-\[url\([^)]+\)\].*?</div>', '', content)
content = re.sub(r'<div className="absolute -top-32.*?</div>', '', content)
content = re.sub(r'<div className="absolute top-1/3.*?</div>', '', content)
content = re.sub(r'<div className="absolute -bottom-32.*?</div>', '', content)

# 2. Remove giant ghost texts
content = re.sub(r'<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-\[.*?</div>', '', content, flags=re.DOTALL)
content = re.sub(r'<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-\[8rem\].*?</div>', '', content, flags=re.DOTALL)
content = re.sub(r'<div className="absolute inset-0 bg-\[radial-gradient.*?</div>', '', content)

# 3. Simplify containers (Tame glassmorphism)
content = content.replace('bg-[#1e293b]/50 backdrop-blur-xl', 'bg-[#0f172a]')
content = content.replace('bg-[#1e293b]/80 backdrop-blur-2xl', 'bg-[#0f172a]')
content = content.replace('bg-white/5 backdrop-blur-xl', 'bg-slate-900')
content = content.replace('bg-white/5', 'bg-slate-800/50')
content = content.replace('border-white/10', 'border-slate-800')
content = content.replace('border-white/20', 'border-slate-700')
content = content.replace('rounded-[2rem]', 'rounded-xl')
content = content.replace('rounded-[3rem]', 'rounded-2xl')
content = content.replace('shadow-2xl', 'shadow-lg')

# 4. Simplify text gradients and sizing
content = content.replace('text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400', 'text-white')
content = content.replace('text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500', 'text-yellow-500')
content = content.replace('font-extrabold', 'font-bold')
content = content.replace('font-black', 'font-bold')
content = content.replace('text-4xl sm:text-5xl md:text-5xl', 'text-2xl sm:text-3xl')
content = content.replace('text-3xl sm:text-4xl md:text-5xl', 'text-xl sm:text-2xl')
content = content.replace('tracking-[0.1em]', 'tracking-normal')
content = content.replace('tracking-tighter', 'tracking-normal')

# 5. Simplify buttons
content = content.replace('bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500', 'bg-blue-600 hover:bg-blue-700')
content = content.replace('bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400', 'bg-emerald-600 hover:bg-emerald-700')
content = content.replace('bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-300 hover:to-yellow-500', 'bg-yellow-500 hover:bg-yellow-600')
content = re.sub(r'shadow-\[0_0_20px_rgba[^\]]+\]', 'shadow-sm', content)
content = re.sub(r'shadow-\[0_0_30px_rgba[^\]]+\]', 'shadow-md', content)
content = re.sub(r'shadow-\[inset_0_0_20px_rgba[^\]]+\]', 'shadow-inner', content)
content = content.replace('py-5 text-lg', 'py-3 text-base')
content = content.replace('py-4', 'py-2.5')
content = content.replace('px-8 py-3', 'px-6 py-2')

# 6. Simplify inputs
content = content.replace('px-6 py-5 text-xl', 'px-4 py-3 text-base')

# 7. Menu active state
content = content.replace(
    "${activeMenu === item.id ? 'bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'hover:bg-slate-800/50 border border-transparent'}",
    "${activeMenu === item.id ? 'bg-slate-800 border-slate-700 shadow-sm' : 'hover:bg-slate-800/50 border-transparent'}"
)

# 8. Remove animation classes that make it bounce around too much
content = content.replace('animate-[fadeInRight_0.5s_ease-out]', '')
content = content.replace('animate-[fadeInUp_0.5s_ease-out]', '')
content = content.replace('animate-[fadeInLeft_0.5s_ease-out]', '')
content = content.replace('animate-[fadeIn_0.5s_ease-out]', '')

# Fix any lingering over-styled text
content = content.replace('uppercase drop-shadow-sm', 'font-medium')
content = content.replace('tracking-widest', 'tracking-wide')

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Tamed the AI cyberpunk styles into a clean modern dashboard!")
