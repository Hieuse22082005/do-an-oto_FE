import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Left Menu
content = content.replace(
    '<div className="bg-[#111827] p-4 rounded-xl shadow-lg border border-gray-800 h-full flex flex-col">',
    '<div className="bg-black/40 backdrop-blur-2xl p-4 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 h-full flex flex-col">'
)

# 2. Center Main - Lock Screen
content = content.replace(
    'className={`lg:col-span-6 bg-slate-900 rounded-xl p-10 flex flex-col items-center justify-center min-h-[500px] border border-slate-700/60 shadow-lg relative overflow-hidden ${animationClass}`}',
    'className={`lg:col-span-6 bg-black/40 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col items-center justify-center min-h-[500px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden ${animationClass}`}'
)

# 3. Center Main - Form Screen
content = content.replace(
    'className={`lg:col-span-6 bg-slate-900 rounded-xl p-6 sm:p-8 flex flex-col items-center min-h-[500px] border border-slate-700/60 shadow-lg relative overflow-hidden ${animationClass}`}',
    'className={`lg:col-span-6 bg-black/40 backdrop-blur-2xl rounded-[2rem] p-6 sm:p-8 flex flex-col items-center min-h-[500px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden ${animationClass}`}'
)

# 4. Right Widgets - Middle List widget
content = content.replace(
    'className="flex-[1.5] flex flex-col justify-center bg-slate-900/80 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-slate-700/60 transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-lg cursor-default group"',
    'className="flex-[1.5] flex flex-col justify-center bg-black/40 backdrop-blur-2xl p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-lg cursor-default group"'
)

# 5. Right Widgets - Top Stat Widget
content = content.replace(
    'className={`flex-[1.2] flex flex-col justify-center p-6 rounded-xl shadow-xl border ${statBorder} ${statBg} backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-lg cursor-default group`}',
    'className={`flex-[1.2] flex flex-col justify-center p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border ${statBorder} ${statBg} backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-lg cursor-default group`}'
)

# 6. Right Widgets - Bottom Warning Widget
content = content.replace(
    'className={`mt-auto p-5 rounded-xl border ${warnBorder} ${warnBg} flex gap-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] cursor-default relative overflow-hidden group`}',
    'className={`mt-auto p-5 rounded-[2rem] border ${warnBorder} ${warnBg} flex gap-4 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] cursor-default relative overflow-hidden group`}'
)

# 7. Right Widgets - Agent Widget
content = content.replace(
    'className="mt-4 p-5 rounded-xl border border-blue-500/30 bg-blue-900/20 backdrop-blur-xl flex flex-col justify-center items-center gap-3 transition-all duration-300 hover:scale-[1.02] cursor-default relative overflow-hidden group"',
    'className="mt-4 p-5 rounded-[2rem] border border-blue-500/30 bg-blue-900/20 backdrop-blur-2xl flex flex-col justify-center items-center gap-3 transition-all duration-300 hover:scale-[1.02] cursor-default relative overflow-hidden group"'
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Applied glassmorphism classes to FinesTab.tsx")
