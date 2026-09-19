import codecs

page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()

# Fix the broken syntax from previous regex
content = content.replace(
    '{activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />} />}',
    '{activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />}'
)

# Also check for double analytics tab again just in case
if content.count('activeTab === "analytics"') > 1:
    lines = content.split('\n')
    new_lines = []
    found_analytics = False
    for line in lines:
        if 'activeTab === "analytics"' in line:
            if not found_analytics:
                new_lines.append(line)
                found_analytics = True
        else:
            new_lines.append(line)
    content = '\n'.join(new_lines)

codecs.open(page_path, 'w', 'utf-8').write(content)
print("Fixed page.tsx")
