import codecs
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
lines = codecs.open(page_path, 'r', 'utf-8').readlines()
new_lines = []
for line in lines:
    if 'import HomeTab' in line:
        new_lines.append(line)
        new_lines.append('import AnalyticsTab from "@/components/tabs/AnalyticsTab";\n')
        continue
    
    if '{activeTab === "home" && <HomeTab' in line:
        new_lines.append(line)
        new_lines.append('          {activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />}\n')
        continue
    
    if "activeTab === 'evaluate'" in line and "activeTab === 'search'" in line:
        line = line.replace("activeTab === 'evaluate'", "activeTab === 'home' || activeTab === 'evaluate'")
        new_lines.append(line)
        continue

    new_lines.append(line)

codecs.open(page_path, 'w', 'utf-8').writelines(new_lines)
print('Applied safe page.tsx changes')
