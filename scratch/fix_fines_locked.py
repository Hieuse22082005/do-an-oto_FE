import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# 1. Update the isLocked definition
content = content.replace(
    "const isLocked = activeMenu === 'thi-thu' && user?.tier !== 'vip';",
    "const currentMenuObj = menus.find(m => m.id === activeMenu);\n    const isLocked = currentMenuObj && !currentMenuObj.isFree && user?.tier !== 'vip';"
)

# 2. Find the if (isLocked) return block and move it
lock_block_pattern = r"if \(isLocked\) return \(\n\s*<div key=\{activeMenu\}.*?Nng cp ngay</button>\n\s*</div>\n\s*\);"
lock_block_match = re.search(lock_block_pattern, content, re.DOTALL)

if lock_block_match:
    lock_block = lock_block_match.group(0)
    # Genericize the text inside the block
    lock_block = re.sub(
        r'<p className="[^"]*">B  thi trc nghim B2.*?</p>',
        '<p className="text-slate-700 dark:text-slate-300 text-sm mb-8 text-center max-w-sm relative z-10">Tnh nng ny dnh ring cho ti khon VIP. Vui lng nng cp ti khon s dng khng gii hn tt c cc tnh nng cao cp.</p>',
        lock_block
    )
    # Delete from original place
    content = content.replace(lock_block_match.group(0), '')
    
    # Insert right after animationClass
    insert_point = 'const animationClass = "";'
    content = content.replace(
        insert_point,
        insert_point + '\n\n    ' + lock_block
    )
    
    codecs.open(filepath, 'w', 'utf-8').write(content)
    print('Updated FinesTab.tsx')
else:
    print('Could not find lock block')
