import codecs
import re

# 1. Fix page.tsx to ALWAYS show Header and Footer
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(page_path, 'r', 'utf-8').read()
content = content.replace('{activeTab !== "home" && (\n', '')
content = content.replace('/>\n)}', '/>')
content = content.replace('</footer>\n)}', '</footer>')
codecs.open(page_path, 'w', 'utf-8').write(content)

# 2. Fix HomeTab.tsx
home_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
home_content = codecs.open(home_path, 'r', 'utf-8').read()

# Remove the Celestia nav
home_content = re.sub(r'<nav ref=\{navRef\} id="navbar".*?</nav>', '', home_content, flags=re.DOTALL)

# Remove the Celestia footer
home_content = re.sub(r'<footer className="border-t border-slate-800 bg-\[#03050a\].*?</footer>', '', home_content, flags=re.DOTALL)

# Remove absolute positioning from root div
home_content = home_content.replace('w-full absolute top-0 left-0', 'w-full')

# Fix min-h-screen of header so it fits under the global Header properly (e.g., h-[90vh])
home_content = home_content.replace('<header className="relative flex min-h-screen', '<header className="relative flex min-h-[90vh] rounded-2xl')

codecs.open(home_path, 'w', 'utf-8').write(home_content)
print("Done fixing layout")
