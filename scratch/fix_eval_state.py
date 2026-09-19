import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'const \[result, setResult\] = useState<any>\(null\);'
replacement = """const [result, setResult] = useState<any>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);"""

content = re.sub(pattern, replacement, content)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Added state")
