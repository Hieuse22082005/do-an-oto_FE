import codecs
import re

# 1. Remove HomeTestimonials from AnalyticsTab
analytics_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AnalyticsTab.tsx'
analytics_content = codecs.open(analytics_path, 'r', 'utf-8').read()

analytics_content = analytics_content.replace('import { HomeTestimonials } from "../ui/home-testimonials";\n', '')
analytics_content = analytics_content.replace('<HomeTestimonials />\n', '')
analytics_content = analytics_content.replace('<HomeTestimonials />', '')

codecs.open(analytics_path, 'w', 'utf-8').write(analytics_content)


# 2. Add window.scrollTo to handleTabChange in page.tsx
page_path = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
page_content = codecs.open(page_path, 'r', 'utf-8').read()

page_content = page_content.replace(
    'const handleTabChange = (tab: string) => {\n      if (tab === "home") {',
    'const handleTabChange = (tab: string) => {\n      window.scrollTo({ top: 0, behavior: "smooth" });\n      if (tab === "home") {'
)

codecs.open(page_path, 'w', 'utf-8').write(page_content)


# 3. Add ThemeToggle to Header.tsx
header_path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
header_content = codecs.open(header_path, 'r', 'utf-8').read()

if 'import { ThemeToggle }' not in header_content:
    header_content = header_content.replace(
        "import { Icon } from '@iconify/react';",
        "import { Icon } from '@iconify/react';\nimport { ThemeToggle } from './ThemeToggle';"
    )

header_content = header_content.replace(
    "{/* <ThemeToggle /> - Commented out or hidden since OTOCHECK is full dark mode */}",
    "<ThemeToggle />"
)

codecs.open(header_path, 'w', 'utf-8').write(header_content)

print("Applied 3 fixes")
