import codecs
import re

file_path = 'components/tabs/MarketplaceTab.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Add Car, Globe if not present
if "import { ChevronRight" in content:
    content = content.replace("import { ChevronRight, Settings", "import { ChevronRight, Car, Globe, Settings")

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Fixed imports in MarketplaceTab.tsx!")
