import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\EvaluateTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'const payloadData = \{ \n\s+\.\.\.formData, \n\s+user_email: user\?\.email,\n\s+txhash: "draft_mode_pending" \n\s+\};'
replacement = """const payloadData = { 
          ...formData, 
          user_email: user?.email,
          user_signature: signatureData,
          txhash: "draft_mode_pending" 
      };"""

content = re.sub(pattern, replacement, content)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Updated payloadData in EvaluateTab.tsx")
