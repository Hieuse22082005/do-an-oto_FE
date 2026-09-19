import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('const isDarkMode = activeTab === "home" || activeTab === "evaluate" || activeTab === "search" || activeTab === "fines" || activeTab === "admin";', '')
content = content.replace("{isDarkMode ? 'text-white/[0.02]' : 'text-gray-200/80'}", "text-gray-200/80 dark:text-white/[0.02]")
content = content.replace("${isDarkMode ? 'bg-[#0a0a0c] border-black/10 dark:border-white/10' : 'bg-white border-gray-200'}", "bg-slate-50 dark:bg-[#0a0a0c] border-gray-200 dark:border-white/10")
content = content.replace("${isDarkMode ? 'text-slate-900 dark:text-white' : 'text-gray-900'}", "text-gray-900 dark:text-white")
content = content.replace("${isDarkMode ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-gray-500'}", "text-gray-600 dark:text-gray-400")
content = content.replace("${isDarkMode ? 'text-gray-700 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}", "text-gray-500 dark:text-gray-500")

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print('Fixed page.tsx!')
