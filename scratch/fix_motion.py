import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Add Variants import
if 'import { motion }' in content:
    content = content.replace("import { motion } from 'framer-motion';", "import { motion, Variants } from 'framer-motion';")

# Type the variants
content = content.replace("const floatVariant =", "const floatVariant: Variants =")
content = content.replace("const hoverFloat =", "const hoverFloat: Variants =")
content = content.replace("const staggerContainer =", "const staggerContainer: Variants =")

codecs.open(filepath, 'w', 'utf-8').write(content)
print("Added Variants types")
