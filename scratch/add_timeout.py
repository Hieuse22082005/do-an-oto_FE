import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Add AbortController for draft fetch
pattern = r'const draftRes = await fetch\("http://127\.0\.0\.1:8080/api/v1/transactions/evaluate/draft", \{\n\s+method: "POST",\n\s+headers: \{ "Content-Type": "application/json" \},\n\s+body: JSON\.stringify\(payloadData\),\n\s+\}\);'

replacement = """const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const draftRes = await fetch("http://127.0.0.1:8080/api/v1/transactions/evaluate/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadData),
        signal: controller.signal
      });
      clearTimeout(timeoutId);"""

content = re.sub(pattern, replacement, content)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Added timeout to EvaluateTab.tsx")
