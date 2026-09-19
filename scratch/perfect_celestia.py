import codecs

# 1. Update page.tsx
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
lines = codecs.open(page_path, 'r', 'utf-8').readlines()
new_lines = []

has_analytics = any('AnalyticsTab' in line for line in lines)

for i, line in enumerate(lines):
    # Add AnalyticsTab import
    if 'import HomeTab' in line and not has_analytics:
        new_lines.append(line)
        new_lines.append('import AnalyticsTab from "@/components/tabs/AnalyticsTab";\n')
        continue

    # Hide Header
    if line.strip().startswith('<Header'):
        new_lines.append('{activeTab !== "home" && (\n')
        new_lines.append(line)
        continue
    
    if line.strip() == '/>' and 280 < i < 300:
        new_lines.append(line)
        new_lines.append(')}\n')
        continue

    # Add AnalyticsTab render and pass onTabChange to HomeTab
    if '{activeTab === "home" && <HomeTab' in line:
        line = line.replace('<HomeTab onTryNow={() => handleTabChange("evaluate")} />', '<HomeTab onTryNow={() => handleTabChange("evaluate")} onTabChange={handleTabChange} />')
        new_lines.append(line)
        if not has_analytics:
            new_lines.append('          {activeTab === "analytics" && <AnalyticsTab onTryNow={() => handleTabChange("evaluate")} />}\n')
        continue

    # Expand width
    if "activeTab === 'evaluate'" in line and "activeTab === 'search'" in line:
        line = line.replace("activeTab === 'evaluate'", "activeTab === 'home' || activeTab === 'evaluate'")
        new_lines.append(line)
        continue

    # Hide Footer
    if line.strip().startswith('<footer className="no-print'):
        new_lines.append('{activeTab !== "home" && (\n')
        new_lines.append(line)
        continue

    if line.strip() == '</footer>':
        new_lines.append(line)
        new_lines.append(')}\n')
        continue

    new_lines.append(line)

codecs.open(page_path, 'w', 'utf-8').writelines(new_lines)


# 2. Update HomeTab.tsx
home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
home_content = codecs.open(home_path, 'r', 'utf-8').read()

# Update signature
home_content = home_content.replace('export default function HomeTab({ onTryNow }: { onTryNow: () => void })', 'export default function HomeTab({ onTryNow, onTabChange }: { onTryNow: () => void; onTabChange: (t: string) => void })')

# Update Celestia nav links
old_nav_links = '''<div className="hidden items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-400 md:flex">
            <a href="#mission" className="transition-colors hover:text-[#00f2fe]">Tầm Nhìn</a>
            <a href="#technology" className="transition-colors hover:text-[#00f2fe]">Công Nghệ</a>
            <a href="#data" className="transition-colors hover:text-[#00f2fe]">Thống Kê</a>
            <a href="#explore" className="transition-colors hover:text-[#00f2fe]">Tra Cứu</a>
          </div>'''

new_nav_links = '''<div className="hidden items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-400 md:flex">
            <button onClick={() => onTabChange('analytics')} className="transition-colors hover:text-[#00f2fe]">Tin Tức & Phân Tích</button>
            <button onClick={() => onTabChange('evaluate')} className="transition-colors hover:text-[#00f2fe]">Định Giá AI</button>
            <button onClick={() => onTabChange('fines')} className="transition-colors hover:text-[#00f2fe]">Tra Phạt Nguội</button>
            <a href="#mission" className="transition-colors hover:text-[#00f2fe]">Giới Thiệu</a>
          </div>'''

home_content = home_content.replace(old_nav_links, new_nav_links)

# Update Celestia footer links
old_footer_links = '''<ul className="space-y-3 text-xs text-slate-500">
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Định giá AI</button></li>
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Tra Phạt nguội</button></li>
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Đăng kiểm</button></li>
              <li><button onClick={onTryNow} className="transition-colors hover:text-[#00f2fe]">Hồ sơ Blockchain</button></li>
            </ul>'''

new_footer_links = '''<ul className="space-y-3 text-xs text-slate-500">
              <li><button onClick={() => onTabChange('evaluate')} className="transition-colors hover:text-[#00f2fe]">Định giá AI</button></li>
              <li><button onClick={() => onTabChange('fines')} className="transition-colors hover:text-[#00f2fe]">Tra Phạt nguội</button></li>
              <li><button onClick={() => onTabChange('search')} className="transition-colors hover:text-[#00f2fe]">Đăng kiểm</button></li>
              <li><button onClick={() => onTabChange('analytics')} className="transition-colors hover:text-[#00f2fe]">Tin Tức & Phân Tích</button></li>
            </ul>'''

home_content = home_content.replace(old_footer_links, new_footer_links)

codecs.open(home_path, 'w', 'utf-8').write(home_content)
print("Updated page.tsx and HomeTab.tsx successfully")
