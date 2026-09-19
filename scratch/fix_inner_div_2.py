import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Instead of relying on exact spacing, just append it before );
content = re.sub(r'(\s*</div>\s*);\s*}$', r'\1\n    </div>\n  );\n}', content)

# Or better yet, just insert </div> right before {qrModal && (
# Because qrModal can safely be outside the max-w container.
content = content.replace(
    '      {qrModal && (',
    '      </div>\n\n      {qrModal && ('
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)
