import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

start = -1
for i, line in enumerate(lines):
    if 'if (isLocked) return (' in line:
        start = i
        break

if start != -1:
    end = -1
    for i in range(start, start + 30):
        if 'Nng cp ngay</button>' in lines[i].encode('ascii', 'ignore').decode('ascii') or 'Nâng cấp ngay</button>' in lines[i]:
            end = i + 2
            break
            
    if end != -1:
        lock_block_lines = lines[start:end]
        
        # Replace the paragraph text
        for i, line in enumerate(lock_block_lines):
            if '<p className="text-slate-700 dark:text-slate-300' in line:
                lock_block_lines[i] = '          <p className="text-slate-700 dark:text-slate-300 text-sm mb-8 text-center max-w-sm relative z-10">Tính năng này dành riêng cho tài khoản VIP. Vui lòng nâng cấp tài khoản để sử dụng không giới hạn tất cả các tính năng cao cấp.</p>\n'
        
        del lines[start:end]
        
        # Find where to insert it: right after `const animationClass = "";`
        insert_idx = -1
        for i, line in enumerate(lines):
            if 'const animationClass =' in line:
                insert_idx = i + 1
                break
                
        if insert_idx != -1:
            for l in reversed(lock_block_lines):
                lines.insert(insert_idx, l)
                
            # Also fix the `isLocked` definition to work for ALL non-free menus
            for i, line in enumerate(lines):
                if "const isLocked = activeMenu === 'thi-thu' && user?.tier !== 'vip';" in line:
                    lines[i] = "    const currentMenuObj = menus.find(m => m.id === activeMenu);\n    const isLocked = currentMenuObj && !currentMenuObj.isFree && user?.tier !== 'vip';\n"
                    break
                    
            with codecs.open(filepath, 'w', 'utf-8') as f:
                f.writelines(lines)
            print('Success')
        else:
            print('Could not find insert point')
    else:
        print('Could not find end of lock block')
else:
    print('Could not find lock block')
