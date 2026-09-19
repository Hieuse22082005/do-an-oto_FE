import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace general wrapper
content = content.replace('bg-slate-50 dark:bg-[#020617]', 'bg-[#050505]')
content = content.replace('bg-blue-500/10 rounded-full blur-[100px]', 'bg-green-900/20 rounded-full blur-[120px]')

# Inject Hacker Grid and Scan Line
grid_decor = """
      {/* Matrix / Hacker Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/70 shadow-[0_0_15px_#22c55e] animate-scan-vertical -z-10 pointer-events-none opacity-60"></div>
"""
content = content.replace('      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-900/20 rounded-full blur-[120px] pointer-events-none"></div>', '      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-900/20 rounded-full blur-[120px] pointer-events-none"></div>\n' + grid_decor)

# Header
content = content.replace('bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-3xl border border-gray-100 dark:border-slate-800', 'bg-black/80 backdrop-blur-md p-4 rounded-xl border border-green-900/50 shadow-[0_0_15px_rgba(0,255,0,0.1)] font-mono')
content = content.replace('text-2xl font-black text-gray-900 dark:text-white', 'text-2xl font-black text-green-500 animate-pulse-neon tracking-widest uppercase')
content = content.replace('TRUNG TÂM QUẢN TRỊ', 'SYSTEM_ADMIN_ROOT')
content = content.replace('Phiên bản Admin Dashboard V2.0', 'Kernel v2.0 - Access Granted')
content = content.replace('text-gray-500 font-medium', 'text-green-700 font-bold')

# Buttons Navigation
content = content.replace('bg-gray-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-gray-200 dark:border-slate-700', 'bg-black p-1 rounded-lg border border-green-900/50')
content = content.replace("activeTab === 'overview' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'", "activeTab === 'overview' ? 'bg-green-900/30 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(0,255,0,0.2)]' : 'text-green-800 hover:text-green-500'")
content = content.replace("activeTab === 'users' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'", "activeTab === 'users' ? 'bg-green-900/30 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(0,255,0,0.2)]' : 'text-green-800 hover:text-green-500'")
content = content.replace("activeTab === 'cms' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'", "activeTab === 'cms' ? 'bg-green-900/30 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(0,255,0,0.2)]' : 'text-green-800 hover:text-green-500'")
content = content.replace("activeTab === 'logs' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'", "activeTab === 'logs' ? 'bg-green-900/30 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(0,255,0,0.2)]' : 'text-green-800 hover:text-green-500'")

# Top Cards
content = content.replace('bg-gradient-to-br from-blue-500 to-blue-600', 'bg-black border border-green-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]')
content = content.replace('bg-gradient-to-br from-red-500 to-rose-600', 'bg-black border border-green-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]')
content = content.replace('bg-gradient-to-br from-purple-500 to-indigo-600', 'bg-black border border-green-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]')
content = content.replace('bg-gradient-to-br from-emerald-500 to-teal-600', 'bg-black border border-green-900 shadow-[0_0_15px_rgba(0,255,0,0.1)]')
content = content.replace('text-blue-100', 'text-green-600 font-mono')
content = content.replace('text-red-100', 'text-green-600 font-mono')
content = content.replace('text-purple-100', 'text-green-600 font-mono')
content = content.replace('text-emerald-100', 'text-green-600 font-mono')
content = content.replace('bg-white/20', 'bg-green-900/50 text-green-400')
content = content.replace('text-white', 'text-green-400 font-mono')
content = content.replace('rounded-[2rem]', 'rounded-none')

# Charts
content = content.replace('bg-white dark:bg-slate-900', 'bg-black')
content = content.replace('rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800', 'p-6 border border-green-900 shadow-[0_0_15px_rgba(0,255,0,0.05)]')
content = content.replace('text-gray-900 dark:text-white', 'text-green-500 uppercase tracking-widest')
content = content.replace('stroke="#3b82f6"', 'stroke="#22c55e"')
content = content.replace('stopColor="#3b82f6"', 'stopColor="#22c55e"')
content = content.replace('fill="#64748b"', 'fill="#166534"')
content = content.replace('bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30', 'bg-black rounded-none border border-red-900/50')
content = content.replace('text-red-600 dark:text-red-400', 'text-red-500 animate-pulse')

# Users & CMS Table
content = content.replace('bg-gray-50 dark:bg-slate-800 text-[11px] uppercase tracking-wider text-gray-500 sticky top-0', 'bg-black text-[11px] uppercase tracking-wider text-green-700 sticky top-0 border-b border-green-900')
content = content.replace('divide-gray-100 dark:divide-slate-800', 'divide-green-900/50')
content = content.replace('hover:bg-gray-50 dark:hover:bg-slate-800/50', 'hover:bg-green-900/20')
content = content.replace('text-gray-800 dark:text-gray-200', 'text-green-400')
content = content.replace('text-gray-400', 'text-green-800')
content = content.replace('text-gray-900 dark:text-gray-200', 'text-green-400')

# Status labels
content = content.replace('bg-amber-100 text-amber-700', 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50')
content = content.replace('bg-gray-100 text-gray-600', 'bg-green-900/20 text-green-600 border border-green-800/50')
content = content.replace('text-emerald-500', 'text-green-500 drop-shadow-[0_0_5px_#22c55e]')
content = content.replace('bg-emerald-100 text-emerald-700', 'bg-green-900/30 text-green-500 border border-green-700/50')
content = content.replace('bg-red-100 text-red-700', 'bg-red-900/30 text-red-500 border border-red-700/50')
content = content.replace('text-blue-600 dark:text-blue-400', 'text-green-500')
content = content.replace('bg-blue-600 hover:bg-blue-700 text-white', 'bg-black hover:bg-green-900 text-green-500 border border-green-500')

# Filter Inputs
content = content.replace('bg-gray-50/50 dark:bg-slate-900/50', 'bg-black border-b border-green-900')
content = content.replace('bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-white', 'bg-black border border-green-900 px-3 py-2 rounded-none text-sm text-green-500 font-mono focus:border-green-500 focus:shadow-[0_0_10px_#22c55e]')

# Action Badges
content = content.replace('bg-blue-100 text-blue-700 px-3 py-1 rounded-full', 'bg-black text-green-400 border border-green-800 px-3 py-1 rounded-none')
content = content.replace('bg-red-100 text-red-700 px-3 py-1 rounded-full', 'bg-black text-red-400 border border-red-800 px-3 py-1 rounded-none')
content = content.replace('bg-purple-100 text-purple-700 px-3 py-1 rounded-full', 'bg-black text-yellow-400 border border-yellow-800 px-3 py-1 rounded-none')
content = content.replace('bg-gray-100 text-gray-700 px-3 py-1 rounded-full', 'bg-black text-green-600 border border-green-900 px-3 py-1 rounded-none')

# Logs Modal
content = content.replace('bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors', 'bg-black hover:bg-green-900/50 text-green-500 border border-green-800 px-3 py-1.5 rounded-none text-xs font-mono transition-colors')
content = content.replace('bg-gray-900/60 backdrop-blur-sm', 'bg-black/90 backdrop-blur-sm')
content = content.replace('bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-slate-700', 'bg-black rounded-none shadow-[0_0_30px_rgba(0,255,0,0.2)] w-full max-w-2xl overflow-hidden border border-green-500 font-mono')
content = content.replace('bg-gray-50 dark:bg-slate-900', 'bg-black')
content = content.replace('text-emerald-400 font-mono', 'text-green-500 font-mono')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("AdminTab.tsx hacker style applied!")
