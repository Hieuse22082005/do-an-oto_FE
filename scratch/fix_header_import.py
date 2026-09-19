import codecs

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

import_stmt = 'import ThemeToggle from "./ThemeToggle";\n'
content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\n" + import_stmt)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)
