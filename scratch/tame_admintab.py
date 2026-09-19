import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Remove mouse tracking radial background completely
content = re.sub(r'\{/\* Animated Radial Glow Background \*/\}.*?<div className="relative z-10">', '<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">', content, flags=re.DOTALL)
# Also need to make sure the main container is not min-h-screen relative overflow-hidden etc.
content = content.replace(
    'className="w-full mx-auto relative min-h-screen bg-[#020617] font-sans text-white pb-12 overflow-hidden transition-colors duration-500"',
    'className="w-full mx-auto relative min-h-screen bg-[#0f172a] font-sans text-slate-200 pb-12"'
)
content = content.replace('onMouseMove={handleMouseMove}', '')
# Remove handleMouseMove function
content = re.sub(r'const handleMouseMove = \(.*?setMousePos\(\{ x, y \}\);\s*\};', '', content, flags=re.DOTALL)
content = re.sub(r'const \[mousePos, setMousePos\] = useState\(\{ x: 50, y: 200 \}\);', '', content)


# 2. Tame the cards
content = content.replace('bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500', 'bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm')
content = content.replace('bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500', 'bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm')
content = content.replace('bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-white/30 transition-all duration-300 group cursor-default', 'bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm')
content = content.replace('bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300', 'bg-slate-900 rounded-xl border border-slate-800 shadow-sm flex flex-col')

# 3. Tame the Tabs header
content = content.replace('bg-[#020617]/80 backdrop-blur-md', 'bg-slate-900/90 backdrop-blur-sm border-slate-800')
content = content.replace('shadow-[0_0_15px_rgba(59,130,246,1)]', 'shadow-sm')
content = content.replace('bg-blue-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out', 'bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200')

# 4. Tame Buttons
content = content.replace('bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md text-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-blue-400/50', 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors border border-transparent')
content = content.replace('text-sm font-bold border border-white/20 hover:border-white/60 hover:bg-white/10 text-white px-4 py-1.5 rounded-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-sm', 'text-sm font-medium border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-md transition-colors')
content = content.replace('bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300', 'bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-md text-sm font-semibold transition-colors')
content = content.replace('bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]', 'bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors')
content = content.replace('bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 hover:shadow-[0_0_10px_rgba(249,115,22,0.5)]', 'bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors')

# 5. Tame the Hacker Modal
content = content.replace('bg-[#020617] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] w-full max-w-lg overflow-hidden border border-white/10', 'bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-800')
content = content.replace('bg-[#0a0f1c] text-green-400 font-mono text-xs leading-relaxed', 'bg-slate-950 text-slate-300 font-mono text-xs leading-relaxed')

# 6. Inputs & Tables
content = content.replace('bg-[#0a0f1c] px-3 py-2 rounded-md text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300', 'bg-slate-950 border-slate-800 px-3 py-2 rounded-md text-sm text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors')
content = content.replace('bg-[#020617]/95 backdrop-blur-md', 'bg-slate-900')
content = content.replace('border-white/10', 'border-slate-800')

# 7. Badges
content = content.replace('bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(37,99,235,0.2)]', 'bg-blue-900/30 text-blue-400 border border-blue-800/50 px-3 py-1 rounded-full text-xs font-medium')
content = content.replace('bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold border border-green-500/30 shadow-[0_0_5px_rgba(34,197,94,0.2)]', 'bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium border border-emerald-800/50')
content = content.replace('bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full text-xs font-bold border border-gray-500/30', 'bg-slate-800 text-slate-400 px-2 py-1 rounded-full text-xs font-medium border border-slate-700')


# 8. Pie Chart Shadows
content = content.replace('className="hover:opacity-80 transition-opacity duration-300 drop-shadow-md cursor-pointer outline-none"', 'className="hover:opacity-80 transition-opacity duration-200 cursor-pointer outline-none"')

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Tamed AdminTab styles!")
