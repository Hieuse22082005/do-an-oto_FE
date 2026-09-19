import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove w-full and overflow-hidden from ALL watermarks
content = content.replace(' w-full overflow-hidden">', '">')

# 2. Fix thi-thu lock screen's watermark
# Currently it has:
# <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-[6rem] font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none tracking-tighter">
# TRA CỨU PHẠT NGUỘI
# </div>
# <div className="flex justify-center items-center gap-2 mb-4 relative z-10">
# <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
# <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-300">🚔 HỆ THỐNG CSDL CSGT TOÀN QUỐC</span>
# </div>
# </div>
# <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 tracking-tight mb-4 drop-shadow-sm py-1 relative z-10">
# Tra Cứu Phạt Nguội
# </h1>

# Let's find the thi-thu lock screen block
thi_thu_start = content.find("if (isLocked) return (")
if thi_thu_start != -1:
    thi_thu_end = content.find("<div className=\"absolute inset-0", thi_thu_start)
    thi_thu_block = content[thi_thu_start:thi_thu_end]
    
    new_thi_thu_block = thi_thu_block.replace("TRA CỨU PHẠT NGUỘI", "TÍNH NĂNG VIP")
    new_thi_thu_block = new_thi_thu_block.replace("Tra Cứu Phạt Nguội", "Khóa Chức Năng")
    new_thi_thu_block = new_thi_thu_block.replace("🚔 HỆ THỐNG CSDL CSGT TOÀN QUỐC", "🔒 YÊU CẦU NÂNG CẤP VIP")
    
    content = content[:thi_thu_start] + new_thi_thu_block + content[thi_thu_end:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Removed w-full overflow-hidden from watermarks and fixed thi-thu lock screen!")
