import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

# Normalize CRLF
content = content.replace('\r\n', '\n')

# Fix text colors for titles (Tra Cứu Phạt Nguội, v.v.)
# Before: text-white
# After: text-slate-800 dark:text-white
content = re.sub(
    r'<h1 className="([^"]*)text-white([^"]*)">',
    r'<h1 className="\1text-slate-800 dark:text-white\2">',
    content
)

# Fix text colors for "Xin chào"
# Before: text-gray-400
# After: text-slate-600 dark:text-gray-400
content = re.sub(
    r'<p className="([^"]*)text-gray-400([^"]*)">\s*Xin chào',
    r'<p className="\1text-slate-600 dark:text-gray-400\2">\n              Xin chào',
    content
)

# Fix text colors for username span
# Before: text-gray-200
# After: text-slate-800 dark:text-gray-200
content = re.sub(
    r'<span className="([^"]*)text-gray-200([^"]*)">(\{user\?\.user_metadata\?\.display_name)',
    r'<span className="\1text-slate-800 dark:text-gray-200\2">\3',
    content
)

codecs.open(file_path, 'w', 'utf-8').write(content)
