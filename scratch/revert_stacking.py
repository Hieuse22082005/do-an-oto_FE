import codecs

# 1. Revert page.tsx
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()
content = content.replace('${activeTab === "home" ? "" : "animate-[fadeInUp_0.4s_ease-out]"}', 'animate-[fadeInUp_0.4s_ease-out]')
codecs.open(page_path, 'w', 'utf-8').write(content)

# 2. Revert HomeTab.tsx
home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()
content = content.replace('className="min-h-screen overflow-x-hidden text-slate-50', 'className="min-h-screen overflow-x-hidden bg-[#030712]/30 backdrop-blur-md text-slate-50')
codecs.open(home_path, 'w', 'utf-8').write(content)
print('Reverted stacking context changes')
