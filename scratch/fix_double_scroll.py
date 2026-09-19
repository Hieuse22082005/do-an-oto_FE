import codecs

home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(home_path, 'r', 'utf-8').read()
content = content.replace('className="min-h-screen overflow-x-hidden text-slate-50 antialiased selection:bg-[#00f2fe] selection:text-[#030712] w-full"', 'className="min-h-screen text-slate-50 antialiased selection:bg-[#00f2fe] selection:text-[#030712]"')
codecs.open(home_path, 'w', 'utf-8').write(content)
print('Removed overflow-x-hidden and w-full')
