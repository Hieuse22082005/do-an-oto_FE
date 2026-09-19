import codecs
import os

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\app\layout.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

if 'ThemeProvider' not in content:
    import_statement = 'import { ThemeProvider } from "@/components/ThemeProvider";\n'
    content = content.replace('import "./globals.css";', 'import "./globals.css";\n' + import_statement)
    
    body_start = '<body className="bg-white text-gray-800 m-0 p-0 overflow-x-hidden">'
    if body_start in content:
        # NOTICE: attribute="data-theme"
        content = content.replace(body_start, body_start + '\n        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>')
        content = content.replace('</body>', '        </ThemeProvider>\n      </body>')
        with codecs.open(file_path, "w", "utf-8") as f:
            f.write(content)
        print("layout.tsx updated with ThemeProvider!")
    else:
        print("body start not found in layout.tsx")
else:
    print("ThemeProvider already in layout.tsx")
