import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

target = "    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-[#09090b]' : 'bg-[#F3F4F6]'} text-gray-800 font-sans selection:bg-blue-200 relative z-0`}>"

new_bg = """    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-[#09090b]' : 'bg-[#F3F4F6]'} text-gray-800 font-sans selection:bg-blue-200 relative z-0`}>
      {/* GLOBAL BACKGROUND FOR FINES TAB */}
      {activeTab === 'fines' && (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.25]"></div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/30 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
        </div>
      )}"""

if target in content:
    content = content.replace(target, new_bg)
    print("Injected global background!")
else:
    print("Target not found in page.tsx")

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)
