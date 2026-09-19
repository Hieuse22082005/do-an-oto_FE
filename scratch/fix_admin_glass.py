import codecs

# 1. Update AdminTab.tsx
file_path_admin = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path_admin, "r", "utf-8") as f:
    content_admin = f.read()

content_admin = content_admin.replace(
    'className="w-full mx-auto relative min-h-screen bg-[#0f172a] font-sans text-slate-200 pb-12"',
    'className="w-full mx-auto relative min-h-screen font-sans text-slate-200 pb-12"'
)

content_admin = content_admin.replace(
    'className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"',
    'className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4"'
)

content_admin = content_admin.replace('bg-slate-900', 'bg-black/40 backdrop-blur-2xl')

with codecs.open(file_path_admin, "w", "utf-8") as f:
    f.write(content_admin)

print("AdminTab.tsx updated!")

# 2. Update page.tsx
file_path_page = r"c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx"
with codecs.open(file_path_page, "r", "utf-8") as f:
    content_page = f.read()

content_page = content_page.replace(
    "{activeTab === 'fines' && (",
    "{(activeTab === 'fines' || activeTab === 'admin') && ("
)

with codecs.open(file_path_page, "w", "utf-8") as f:
    f.write(content_page)

print("page.tsx updated!")
