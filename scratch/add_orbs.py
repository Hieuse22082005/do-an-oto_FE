import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacement = """  return (
    <div className="w-full mx-auto relative min-h-[700px] font-sans pb-10">
      {/* Lưới công nghệ và Gradient Orbs chuyển động */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"></div>
      
      {/* Orb Trái (Xanh dương) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite_alternate]"></div>
      
      {/* Orb Phải (Đỏ/Hổ phách) */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
      
      {/* Orb Dưới (Lục bảo) */}
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-[pulse_7s_ease-in-out_infinite_alternate]"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 animate-[fadeIn_0.5s_ease-out] items-start">"""

# Replace the specific div
new_content = content.replace('  return (\n    <div className="w-full mx-auto relative min-h-[700px] font-sans pb-10">\n      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-[fadeIn_0.5s_ease-out] items-start">', replacement)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
print("Added animated orbs to FinesTab.")
