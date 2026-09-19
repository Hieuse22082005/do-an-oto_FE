import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()
content = content.replace('className="min-h-screen overflow-x-hidden bg-[#030712] text-slate-50', 'className="min-h-screen overflow-x-hidden text-slate-50')
codecs.open(home_path, 'w', 'utf-8').write(content)
print('Removed solid background from root div')
