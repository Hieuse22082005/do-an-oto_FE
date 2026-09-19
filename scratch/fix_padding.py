import codecs

# Fix page.tsx
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()

old_main = "`flex-grow mx-auto px-6 pt-12 ${activeTab === 'home' ? 'pb-0' : 'pb-20'} w-full animate-[fadeInUp_0.4s_ease-out] ${(activeTab === 'home' || activeTab === 'evaluate' || activeTab === 'search' || activeTab === 'fines' || activeTab === 'admin') ? 'max-w-full px-2 md:px-6' : 'max-w-6xl'}`"

new_main = "`flex-grow mx-auto w-full animate-[fadeInUp_0.4s_ease-out] ${activeTab === 'home' ? 'p-0 max-w-full' : 'px-6 pt-12 pb-20'} ${(activeTab !== 'home' && (activeTab === 'evaluate' || activeTab === 'search' || activeTab === 'fines' || activeTab === 'admin')) ? 'max-w-full px-2 md:px-6' : (activeTab !== 'home' ? 'max-w-6xl' : '')}`"

content = content.replace(old_main, new_main)
codecs.open(page_path, 'w', 'utf-8').write(content)

# Fix HomeTab.tsx
home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
home_content = codecs.open(home_path, 'r', 'utf-8').read()

home_content = home_content.replace('min-h-[90vh] rounded-2xl', 'min-h-[calc(100vh-80px)]')

codecs.open(home_path, 'w', 'utf-8').write(home_content)
print("Fixed full screen padding and border radius")
