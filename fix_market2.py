# -*- coding: utf-8 -*-
import sys
import re

with open('components/tabs/MarketplaceTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import for WorksWheel
if 'WorksWheel' not in content:
    import_match = re.search(r'import\s+.*?from\s+[\'"]lucide-react[\'"];?\n', content)
    if import_match:
        content = content[:import_match.end()] + 'import { WorksWheel } from "../ui/works-wheel";\n' + content[import_match.end():]

pattern = r'\{\/\*\s*1\.5\s*CATEGORIES & COUNTRIES.*?\*\/\}.*?<\/section>'

new_section = '''{/* 1.5 CATEGORIES & COUNTRIES (WHEEL LAYOUT) */}
      <WorksWheel 
        label="Thế Giới Xe"
        items={[
          { title: 'Đức', image: 'https://flagcdn.com/w80/de.png', href: '#' },
          { title: 'Nhật Bản', image: 'https://flagcdn.com/w80/jp.png', href: '#' },
          { title: 'Mỹ', image: 'https://flagcdn.com/w80/us.png', href: '#' },
          { title: 'Ý', image: 'https://flagcdn.com/w80/it.png', href: '#' },
          { title: 'Anh Quốc', image: 'https://flagcdn.com/w80/gb.png', href: '#' },
          { title: 'Pháp', image: 'https://flagcdn.com/w80/fr.png', href: '#' },
          { title: 'Hàn Quốc', image: 'https://flagcdn.com/w80/kr.png', href: '#' },
          { title: 'Thụy Điển', image: 'https://flagcdn.com/w80/se.png', href: '#' },
          { title: 'Việt Nam', image: 'https://flagcdn.com/w80/vn.png', href: '#' },
          { title: 'Mercedes', image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg', href: '#' },
          { title: 'BMW', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg', href: '#' },
          { title: 'Audi', image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg', href: '#' },
          { title: 'Porsche', image: 'https://cdn.worldvectorlogo.com/logos/porsche-6.svg', href: '#' },
          { title: 'Lexus', image: 'https://cdn.worldvectorlogo.com/logos/lexus-2.svg', href: '#' },
          { title: 'Toyota', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg', href: '#' },
          { title: 'Ford', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg', href: '#' },
        ]}
      />'''

content = re.sub(pattern, new_section, content, flags=re.DOTALL)

with open('components/tabs/MarketplaceTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced!")
