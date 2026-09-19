import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

if 'ThemeToggle' not in content:
    import_stmt = 'import ThemeToggle from "./ThemeToggle";\n'
    content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\n" + import_stmt)
    
    target = '<div className="flex items-center gap-3">'
    replacement = '<div className="flex items-center gap-3">\n          <ThemeToggle />'
    content = content.replace(target, replacement)
    
    with codecs.open(file_path, "w", "utf-8") as f:
        f.write(content)
    print("Header.tsx updated with ThemeToggle!")
else:
    print("ThemeToggle already in Header.tsx")
