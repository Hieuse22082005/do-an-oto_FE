import codecs

path = r'c:\Users\Hieu\Desktop\do an oto_FE\components\Header.tsx'
content = codecs.open(path, 'r', 'utf-8').read()
content = content.replace("import { ThemeToggle } from './ThemeToggle';", "")
content = content.replace("const timeoutRef = useRef<NodeJS.Timeout>();", "const timeoutRef = useRef<NodeJS.Timeout | null>(null);")
codecs.open(path, 'w', 'utf-8').write(content)
print("Fixed TS errors")
