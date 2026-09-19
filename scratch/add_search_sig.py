import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'predicted_price_display: Number\(rawData\.predicted_price_vnd\)\.toLocaleString\(\'vi-VN\'\) \+ " VNĐ",\n\s+isTampered: isTampered, \n\s+\.\.\.parsedInfo,'
replacement = """predicted_price_display: Number(rawData.predicted_price_vnd).toLocaleString('vi-VN') + " VNĐ",
        isTampered: isTampered, 
        userSignature: rawData.user_signature,
        user_email: rawData.user_email,
        ...parsedInfo,"""

content = re.sub(pattern, replacement, content)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Updated SearchTab.tsx")
