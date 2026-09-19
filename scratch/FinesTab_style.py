import codecs

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

content = content.replace(
    '<div className="w-full h-screen font-sans -mt-24 pt-24 flex flex-col">\n      {/* FULL SCREEN LAYOUT */}\n      <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 overflow-hidden">',
    '<div className="w-full h-screen font-sans flex flex-col -mt-24">\n      {/* FULL SCREEN LAYOUT */}\n      <div className="flex flex-col md:flex-row bg-transparent w-full flex-1 overflow-hidden pt-28">'
)

content = content.replace(
    '<div className="p-4 md:p-10 rounded-tl-2xl border-t border-l border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0a0f1c] flex flex-col lg:flex-row gap-6 flex-1 w-full h-full overflow-y-auto">',
    '<div className="p-4 md:p-10 rounded-tl-[2rem] border-t border-l border-white/40 dark:border-slate-700 bg-white/40 dark:bg-slate-900/60 backdrop-blur-2xl flex flex-col lg:flex-row gap-8 flex-1 w-full h-full overflow-y-auto shadow-inner">'
)

content = content.replace(
    'className={`flex-[2] w-full flex flex-col gap-6 ${animationClass}`}',
    'className={`flex-[2] w-full max-w-4xl mx-auto flex flex-col gap-8 ${animationClass}`}'
)

codecs.open('components/tabs/FinesTab.tsx', 'w', 'utf-8').write(content)
