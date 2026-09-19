import codecs

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Make a series of targeted string replacements to convert the dark theme back to light theme.

replacements = {
    'className="w-full py-24 px-6 md:px-10 lg:px-20 bg-[#0a0a0a]"': 'className="w-full py-24 px-6 md:px-10 lg:px-20 bg-slate-50"',
    'text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-4 block': 'text-blue-900 font-bold uppercase tracking-[0.2em] text-xs mb-4 block',
    'text-4xl md:text-5xl font-serif text-white': 'text-4xl md:text-5xl font-serif text-slate-800',
    'text-amber-500 hover:text-amber-400 font-bold tracking-widest uppercase text-xs transition-colors flex items-center gap-2': 'text-blue-900 hover:text-red-600 font-bold tracking-widest uppercase text-xs transition-colors flex items-center gap-2',
    
    # Tabs
    "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]": "bg-blue-900 text-white border-blue-900 shadow-md",
    "bg-transparent text-white/70 border-white/20 hover:border-amber-500 hover:text-amber-500": "bg-white text-slate-600 border-slate-200 hover:border-blue-900 hover:text-blue-900",
    
    # Empty text
    'className="text-white/50 italic col-span-full py-10"': 'className="text-slate-500 italic col-span-full py-10"',
    
    # Card
    'className="bg-[#141414] rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all group flex flex-col relative"': 'className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-900/30 transition-all group flex flex-col relative"',
    'text-white/50 hover:text-amber-500 transition-colors': 'text-white/80 hover:text-red-500 transition-colors drop-shadow-md',
    'bg-gradient-to-t from-[#141414] via-transparent to-transparent': 'bg-gradient-to-t from-black/50 via-transparent to-transparent',
    'bg-red-600/90 text-white font-black text-xl tracking-widest uppercase -rotate-12 border border-red-500 shadow-2xl': 'bg-red-600 text-white font-black text-xl tracking-widest uppercase -rotate-12 border-4 border-red-600 shadow-2xl',
    
    # Info block
    'font-bold text-xl text-white tracking-wide': 'font-black text-xl text-slate-800 tracking-tight',
    'font-bold text-amber-500 text-lg': 'font-bold text-red-600 text-lg',
    'text-white/60 text-[11px] font-medium uppercase tracking-wider py-4 border-b border-white/10': 'text-slate-500 text-[11px] font-bold uppercase tracking-wider py-4 border-b border-slate-100',
    'Settings size={14} className="text-amber-500"': 'Settings size={14} className="text-blue-900"',
    'Gauge size={14} className="text-amber-500"': 'Gauge size={14} className="text-blue-900"',
    'Users size={14} className="text-amber-500"': 'Users size={14} className="text-blue-900"',
    
    # Footer button
    'isSold \n                                ? \'text-white/30 cursor-not-allowed\'\n                                : \'text-amber-500 hover:text-amber-400 group-hover:text-amber-400\'': 'isSold \n                                ? \'text-slate-400 cursor-not-allowed\'\n                                : \'text-blue-900 hover:text-red-600 group-hover:text-red-600\'',
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Special fix for the footer button multi-line replacing
content = content.replace("text-white/30 cursor-not-allowed", "text-slate-300 cursor-not-allowed")
content = content.replace("text-amber-500 hover:text-amber-400 group-hover:text-amber-400", "text-blue-900 hover:text-red-600 group-hover:text-red-600")


with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Switched to light theme!")
