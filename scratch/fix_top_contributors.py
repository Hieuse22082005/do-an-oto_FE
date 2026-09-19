import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\HomeTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'\.map\(\(\[email, tx_count\]\) => \(\{ email, tx_count \}\)\)'
replacement = ".map(([email, tx_count]) => ({ name: email.split('@')[0], count: tx_count }))"

content = re.sub(pattern, replacement, content)

pattern2 = r'\.sort\(\(a, b\) => b\.tx_count - a\.tx_count\)'
replacement2 = ".sort((a, b) => b.count - a.count)"
content = re.sub(pattern2, replacement2, content)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print("Updated topContributors structure")
