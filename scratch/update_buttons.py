import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_button = """            {menuItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveMenu(item.id); setResults({ fines: null, registry: null, stolen: null, license: null }); }}
                className={`w-full flex-1 flex items-center gap-3 px-3 py-3 rounded-2xl font-bold text-left transition-all duration-200 relative overflow-hidden group ${activeMenu === item.id ? `${item.bg} text-white shadow-lg` : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white hover:translate-x-1'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-transform duration-300 ease-out ${activeMenu === item.id ? 'bg-black/20' : 'bg-gray-800 text-gray-300 group-hover:rotate-12'}`}>{item.icon}</div>
                <div className="flex-1">
                   <span className="block text-[11px] tracking-wider uppercase">{item.title}</span>
                   {!item.isFree && <span className={`text-[8px] font-black uppercase mt-0.5 tracking-widest transition-colors duration-300 ${activeMenu === item.id ? 'text-yellow-300' : 'text-amber-500 group-hover:text-yellow-400'}`}>★ Dành cho VIP</span>}
                </div>
              </button>
            ))}"""

new_button = """            {menuItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveMenu(item.id); setResults({ fines: null, registry: null, stolen: null, license: null }); }}
                className={`w-full flex-1 flex items-center gap-5 px-5 py-4 rounded-[1.5rem] font-bold text-left transition-all duration-300 relative overflow-hidden group active:scale-95 ${activeMenu === item.id ? `${item.bg} text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-[1.02] translate-x-2` : 'bg-transparent text-gray-400 hover:bg-gray-800/80 hover:text-white hover:translate-x-3 hover:shadow-lg'}`}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite] ${activeMenu === item.id ? 'hidden' : 'block'}`}></div>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ease-out shadow-inner ${activeMenu === item.id ? 'bg-black/30 scale-110 shadow-black/50' : 'bg-gray-800/80 text-gray-400 group-hover:scale-110 group-hover:-rotate-12 group-hover:text-white group-hover:bg-gray-700'}`}>
                  {item.icon}
                </div>
                
                <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                   <span className="block text-sm tracking-[0.1em] uppercase drop-shadow-sm">{item.title}</span>
                   {!item.isFree && <span className={`block text-[9px] font-black uppercase mt-1.5 tracking-widest transition-colors duration-300 ${activeMenu === item.id ? 'text-yellow-300 drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]' : 'text-amber-500/70 group-hover:text-yellow-400'}`}>★ Dành cho VIP</span>}
                </div>
              </button>
            ))}"""

# Because of encoding, we should replace it safely with regex, ignoring the '★ Dành cho VIP' part since it has weird chars in the file.
import re

pattern = r'\{menuItems\.map\(\(item\) => \(\s*<button key=\{item\.id\}.*?setActiveMenu.*?\n.*?className=\{`w-full flex-1 flex items-center gap-3 px-3 py-3 rounded-2xl font-bold text-left transition-all duration-200 relative overflow-hidden group.*?\n.*?\n.*?<div className=\{`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-transform duration-300 ease-out.*?\n.*?<div className="flex-1">.*?\n.*?\n.*?\n.*?</button>\n\s*\)\)\}'

# Actually, the file has some encoded characters.
# Let's search by the lines specifically.
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "{menuItems.map((item) => (" in line:
        start_idx = i
    if start_idx != -1 and "          </div>" in line and end_idx == -1: # The closing div of the map
        end_idx = i - 1

if start_idx != -1 and end_idx != -1:
    lines = lines[:start_idx] + [new_button + "\n"] + lines[end_idx+1:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print("Updated button size and animations!")
else:
    print("Could not find the map block.")
