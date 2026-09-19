import codecs
import re

# 1. Update Header.tsx
header_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
header_content = codecs.open(header_path, 'r', 'utf-8').read()

# Fix the unicode and update mainTabs/dropdownTabs
header_content = header_content.replace(
    "const mainTabs = [\n    { id: 'home', label: 'Trang ch\\u1ee7' },\n    { id: 'evaluate', label: '\\u0110\\u1ecbnh gi\\u00e1 AI' },\n  ];",
    "const mainTabs = [\n    { id: 'home', label: 'Trang chủ' },\n    { id: 'analytics', label: 'Báo chí và thống kê' },\n    { id: 'evaluate', label: 'Định giá AI' },\n  ];"
)

header_content = header_content.replace(
    "const dropdownTabs = [\n    { id: 'analytics', label: 'Th\\u1ed1ng k\\u00ea Th\\u1ecb tr\\u01b0\\u1eddng' },\n    { id: 'search', label: 'T\\u00ecm ki\\u1ebfm th\\u00f4ng tin' },\n    { id: 'fines', label: 'Tra ph\\u1ea1t ngu\\u1ed9i' },\n    { id: 'penalty', label: 'T\\u00ednh ph\\u1ea1t l\\u00e3i' },\n  ];",
    "const dropdownTabs = [\n    { id: 'search', label: 'Tìm kiếm thông tin' },\n    { id: 'fines', label: 'Tra phạt nguội' },\n    { id: 'penalty', label: 'Tính phạt lãi' },\n  ];"
)

header_content = header_content.replace(
    "T\\u00ednh n\\u0103ng kh\\u00e1c",
    "Các chức năng khác"
)
header_content = header_content.replace(
    "\\u265B VIP Dealer",
    "👑 VIP Dealer"
)
header_content = header_content.replace(
    "Mi\\u1ec5n ph\\u00ed",
    "Miễn phí"
)
header_content = header_content.replace(
    "B\\u1ea3ng Qu\\u1ea3n tr\\u1ecb vi\\u00ean",
    "Bảng Quản trị viên"
)
header_content = header_content.replace(
    "N\\u00e2ng c\\u1ea5p VIP",
    "Nâng cấp VIP"
)
header_content = header_content.replace(
    "\\u0110\\u0103ng Nh\\u1eadp",
    "Đăng Nhập"
)

codecs.open(header_path, 'w', 'utf-8').write(header_content)


# 2. Update HomeTab.tsx
home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
home_content = codecs.open(home_path, 'r', 'utf-8').read()

# Remove absolute top-0 left-0
home_content = home_content.replace(
    'w-full absolute top-0 left-0">',
    'w-full">'
)

# Remove the footer
footer_pattern = r'<footer.*?<\/footer>'
home_content = re.sub(footer_pattern, '', home_content, flags=re.DOTALL)

codecs.open(home_path, 'w', 'utf-8').write(home_content)


# 3. Update page.tsx
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
page_content = codecs.open(page_path, 'r', 'utf-8').read()

# Remove duplicated analytics tab
page_content = page_content.replace(
    '{activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />}\n            {activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />}',
    '{activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />}'
)
# Make sure we got it even with different whitespace
page_content = re.sub(
    r'\{activeTab === "analytics".*?\}\s*\{activeTab === "analytics".*?\}',
    r'{activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />}',
    page_content
)

codecs.open(page_path, 'w', 'utf-8').write(page_content)

print("Applied fixes for header, hometab, and page")
