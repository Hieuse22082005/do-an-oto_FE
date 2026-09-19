import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace container
content = content.replace(
    'className={`lg:col-span-3 space-y-5 ${animationClass}`}>',
    'className={`lg:col-span-3 flex flex-col gap-4 h-full ${animationClass}`}>'
)

# Stat block
content = content.replace(
    'className={`p-6 rounded-[2rem] shadow-xl border ${statBorder} ${statBg} backdrop-blur-xl transition-all duration-500 hover:shadow-2xl`}',
    'className={`flex-[1.2] flex flex-col justify-center p-6 rounded-[2rem] shadow-xl border ${statBorder} ${statBg} backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-2xl cursor-default group`}'
)

# List block
content = content.replace(
    'className="bg-[#0f172a]/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/10 transition-all duration-500 hover:shadow-2xl"',
    'className="flex-[1.5] flex flex-col justify-center bg-[#0f172a]/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-2xl cursor-default group"'
)

# Warn block
content = content.replace(
    'className={`${warnBg} backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border ${warnBorder} transition-all duration-500 hover:shadow-2xl`}',
    'className={`flex-1 flex flex-col justify-center ${warnBg} backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border ${warnBorder} transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-2xl cursor-default group`}'
)

# Tool block (VIP)
content = content.replace(
    'className="bg-gradient-to-br from-blue-900 to-[#0f172a] p-6 rounded-[2rem] shadow-2xl border border-blue-500/30 relative overflow-hidden flex flex-col justify-center text-center"',
    'className="flex-[1.2] bg-gradient-to-br from-blue-900 to-[#0f172a] p-6 rounded-[2rem] shadow-2xl border border-blue-500/30 relative overflow-hidden flex flex-col justify-center text-center transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] cursor-pointer group"'
)

# Upgrade block (Non-VIP)
content = content.replace(
    'className="bg-gradient-to-br from-slate-800 to-[#0f172a] p-6 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-center text-center"',
    'className="flex-[1.2] bg-gradient-to-br from-slate-800 to-[#0f172a] p-6 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-center text-center transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-xl cursor-pointer group"'
)

# Add some child hover effects inside the blocks
# Stat block title
content = content.replace(
    'className="font-black text-slate-200 text-[10px] mb-3 uppercase flex items-center gap-2"',
    'className="font-black text-slate-200 text-[10px] mb-3 uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1"'
)
# Stat block num
content = content.replace(
    'className={`text-3xl font-black ${statColor} transition-colors duration-500 drop-shadow-md`}',
    'className={`text-3xl font-black ${statColor} transition-all duration-500 drop-shadow-md group-hover:scale-105 origin-left`}'
)
# Warn block title
content = content.replace(
    'className={`font-black text-sm ${warnText} transition-colors duration-500`}',
    'className={`font-black text-sm ${warnText} transition-all duration-300 group-hover:translate-x-1`}'
)
# List block items - already have group-hover inside them, wait, the parent is now group too!
# I will rename the list items' hover group to peer or something, or it's fine.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated right sidebar widgets!")
