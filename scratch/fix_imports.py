import codecs

files = [
    r'c:\Users\Hieu\Desktop\do an oto_FE\components\ThemeToggle.tsx',
    r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\glowy-waves-hero-shadcnui.tsx',
    r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\home-testimonials.tsx'
]

for filepath in files:
    try:
        content = codecs.open(filepath, 'r', 'utf-8').read()
        if 'import { useTheme } from "next-themes";' in content:
            content = content.replace('import { useTheme } from "next-themes";', 'import { useTheme } from "@/components/ThemeProvider";')
            codecs.open(filepath, 'w', 'utf-8').write(content)
            print('Updated', filepath)
    except Exception as e:
        print('Error on', filepath, e)
