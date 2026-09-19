import codecs

page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()

old_class = "(activeTab === 'evaluate' || activeTab === 'search' || activeTab === 'fines' || activeTab === 'admin')"
new_class = "(activeTab === 'home' || activeTab === 'evaluate' || activeTab === 'search' || activeTab === 'fines' || activeTab === 'admin')"

content = content.replace(old_class, new_class)
codecs.open(page_path, 'w', 'utf-8').write(content)
print('Updated page.tsx width for home tab')
