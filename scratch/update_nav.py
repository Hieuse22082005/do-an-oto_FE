import codecs

# 1. Update Header.tsx
filepath_header = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
content_header = codecs.open(filepath_header, 'r', 'utf-8').read()

content_header = content_header.replace(
    "{ id: 'home', label: 'Trang chủ' },",
    "{ id: 'home', label: 'Trang chủ' },\n      { id: 'analytics', label: 'Tin tức & Phân tích' },"
)
codecs.open(filepath_header, 'w', 'utf-8').write(content_header)

# 2. Update page.tsx
filepath_page = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
lines_page = codecs.open(filepath_page, 'r', 'utf-8').readlines()

lines_page.insert(7, "import AnalyticsTab from \"@/components/tabs/AnalyticsTab\";\n")

for i, line in enumerate(lines_page):
    if '{activeTab === "home" && <HomeTab onTryNow={() => handleTabChange("evaluate")} />}' in line:
        lines_page.insert(i+1, "          {activeTab === \"analytics\" && <AnalyticsTab onTryNow={() => handleTabChange(\"evaluate\")} />}\n")
        break

codecs.open(filepath_page, 'w', 'utf-8').writelines(lines_page)

print("Updated page.tsx and Header.tsx")
