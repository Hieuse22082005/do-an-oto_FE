import codecs
text = codecs.open('components/tabs/FinesTab.tsx', 'r', 'utf-8').read()
idx = text.find("if (activeMenu === 'phat-nguoi')")
codecs.open('scratch/center.txt', 'w', 'utf-8').write(text[idx:idx+1500])
