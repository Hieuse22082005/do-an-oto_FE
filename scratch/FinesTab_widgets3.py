import codecs

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

# Normalize line endings to \n
content = content.replace('\r\n', '\n')

# 1. Update the main container classes
content = content.replace(
    'className={`lg:col-span-3 flex flex-col gap-4 h-full ${animationClass}`}',
    'className={`w-full max-w-sm lg:col-span-3 flex flex-col gap-5 h-full ${animationClass}`}'
)
content = content.replace(
    'className={`flex-[1] w-full space-y-6`}',
    'className={`flex-[0.8] w-full max-w-sm mx-auto space-y-6`}' # Make sure right widgets are narrow
)

# 2. Update widget 1 (stat)
old_w1 = '''        <div className={`flex-[1.2] flex flex-col justify-center p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border ${statBorder} ${statBg} backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-lg cursor-default group`}>
          <h3 className="font-bold text-slate-200 text-xs mb-3 uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1"><span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse shadow-[0_0_8px_currentColor]`}></span> {statTitle}</h3>
          <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">{statDesc}</p>
          <p className={`text-4xl font-bold ${statColor} transition-all duration-500 drop-shadow-md group-hover:scale-105 origin-left`}>{statNum}</p>
        </div>'''
new_w1 = '''        <div className={`flex-[1] flex flex-col justify-center p-5 rounded-3xl shadow-sm border ${statBorder} ${statBg} backdrop-blur-2xl transition-all duration-300 hover:shadow-md cursor-default group`}>
          <h3 className="font-bold text-slate-500 dark:text-slate-400 text-[10px] mb-2 uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1"><span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse shadow-[0_0_8px_currentColor]`}></span> {statTitle}</h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">{statDesc}</p>
          <p className={`text-3xl font-black ${statColor} transition-all duration-500 drop-shadow-sm group-hover:scale-105 origin-left`}>{statNum}</p>
        </div>'''
content = content.replace(old_w1, new_w1)

# 3. Update widget 2 (list)
old_w2 = '''        <div className="flex-[1.5] flex flex-col justify-center bg-black/40 backdrop-blur-2xl p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-lg cursor-default group">
          <h3 className="font-bold text-white text-xs mb-5 uppercase tracking-wider">{listTitle}</h3>
          <ul className="space-y-4">
            {listItems.map((li, i) => (
              <li key={i} className="flex justify-between items-center text-sm group cursor-default">
                <div className="flex items-center gap-3"><div className={`w-2.5 h-2.5 ${li.c} rounded-full shadow-[0_0_5px_currentColor] transition-transform duration-300 group-hover:scale-150`}></div><span className="font-bold text-slate-700 dark:text-slate-300 transition-colors duration-300 group-hover:text-white">{li.n}</span></div>
                <span className="font-bold text-slate-500 transition-colors duration-300 group-hover:text-slate-400">{li.v}</span>
              </li>
            ))}
          </ul>
        </div>'''
new_w2 = '''        <div className="flex-[1.2] flex flex-col justify-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md cursor-default group">
          <h3 className="font-bold text-slate-500 dark:text-slate-400 text-[10px] mb-4 uppercase tracking-wider">{listTitle}</h3>
          <ul className="space-y-3">
            {listItems.map((li, i) => (
              <li key={i} className="flex justify-between items-center text-xs group cursor-default">
                <div className="flex items-center gap-2"><div className={`w-2 h-2 ${li.c} rounded-full shadow-[0_0_5px_currentColor] transition-transform duration-300 group-hover:scale-150`}></div><span className="font-bold text-slate-700 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white">{li.n}</span></div>
                <span className="font-bold text-slate-500 transition-colors duration-300">{li.v}</span>
              </li>
            ))}
          </ul>
        </div>'''
content = content.replace(old_w2, new_w2)

# 4. Update widget 3 (warning)
old_w3 = '''        <div className={`flex-1 flex flex-col justify-center ${warnBg} backdrop-blur-xl p-6 rounded-xl shadow-xl border ${warnBorder} transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-lg cursor-default group`}>
          <div className="flex items-center gap-3 mb-3">
             <span className="text-2xl drop-shadow-md">{warnIcon}</span>
             <h3 className={`font-bold text-base ${warnText} transition-all duration-300 group-hover:translate-x-1`}>{warnTitle}</h3>
          </div>
          <p className={`text-sm leading-relaxed font-medium ${warnText} opacity-90 transition-colors duration-500`}>{warnDesc}</p>
        </div>'''
new_w3 = '''        <div className={`flex-[0.8] flex flex-col justify-center ${warnBg} backdrop-blur-xl p-5 rounded-2xl shadow-sm border ${warnBorder} transition-all duration-300 hover:shadow-md cursor-default group`}>
          <div className="flex items-center gap-2 mb-2">
             <span className="text-xl drop-shadow-sm">{warnIcon}</span>
             <h3 className={`font-bold text-sm ${warnText} transition-all duration-300 group-hover:translate-x-1`}>{warnTitle}</h3>
          </div>
          <p className={`text-xs leading-relaxed font-medium ${warnText} opacity-90 transition-colors duration-500`}>{warnDesc}</p>
        </div>'''
content = content.replace(old_w3, new_w3)

# Remove the white background wrapper as user requested
old_content_wrapper = '<div className="p-4 md:p-10 rounded-tl-[2rem] border-t border-l border-white/40 dark:border-slate-700 bg-white/40 dark:bg-slate-900/60 backdrop-blur-2xl flex flex-col lg:flex-row gap-8 flex-1 w-full h-full overflow-y-auto shadow-inner">'
new_content_wrapper = '<div className="p-4 md:p-10 flex flex-col lg:flex-row gap-8 flex-1 w-full h-full overflow-y-auto bg-transparent border-none">'
content = content.replace(old_content_wrapper, new_content_wrapper)

# We should also replace it if the user has a slightly different version from a previous edit
old_content_wrapper_alt = '<div className="p-4 md:p-10 rounded-tl-2xl border-t border-l border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0a0f1c] flex flex-col lg:flex-row gap-6 flex-1 w-full h-full overflow-y-auto">'
content = content.replace(old_content_wrapper_alt, new_content_wrapper)


codecs.open('components/tabs/FinesTab.tsx', 'w', 'utf-8').write(content)
