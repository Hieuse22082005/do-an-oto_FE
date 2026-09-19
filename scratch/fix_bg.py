import codecs

page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()
content = content.replace("{(activeTab === 'home' || activeTab === 'fines' || activeTab === 'admin' || activeTab === 'evaluate') && (", "{(activeTab === 'fines' || activeTab === 'admin' || activeTab === 'evaluate') && (")

# Also let's make the background of page.tsx transparent if activeTab === 'home'
content = content.replace("className={`min-h-screen flex flex-col ${'bg-[#F3F4F6] dark:bg-[#09090b]'} text-gray-800 font-sans selection:bg-blue-200 relative z-0`}", "className={`min-h-screen flex flex-col ${activeTab === 'home' ? 'bg-black' : 'bg-[#F3F4F6] dark:bg-[#09090b]'} text-gray-800 font-sans selection:bg-blue-200 relative z-0`}")

codecs.open(page_path, 'w', 'utf-8').write(content)
print('Fixed global background for home')
