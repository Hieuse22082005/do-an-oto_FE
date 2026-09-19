import codecs
import os

# 1. Restore HomeTab.tsx
filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AnalyticsTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()
content = content.replace('export default function AnalyticsTab', 'export default function HomeTab')
codecs.open(r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx', 'w', 'utf-8').write(content)

os.remove(filepath)

# 2. Revert Header.tsx
header_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
header_content = codecs.open(header_path, 'r', 'utf-8').read()
header_content = header_content.replace("{ id: 'analytics', label: 'Tin tức & Phân tích' },", "")
codecs.open(header_path, 'w', 'utf-8').write(header_content)

# 3. Revert page.tsx
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
page_lines = codecs.open(page_path, 'r', 'utf-8').readlines()
new_page_lines = []
for line in page_lines:
    if 'import AnalyticsTab' in line:
        continue
    if '{activeTab === "analytics"' in line:
        continue
    new_page_lines.append(line)
codecs.open(page_path, 'w', 'utf-8').writelines(new_page_lines)

print('Reverted all changes.')
