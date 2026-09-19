import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\SearchTab.tsx'
lines = codecs.open(filepath, 'r', 'utf-8').readlines()

for i, line in enumerate(lines):
    if 'id="holo-search-tx"' in line:
        lines[i] = """<input
  type="text"
  placeholder="Nhập mã TxHash (VD: 0x123abc...)"
  value={searchTx}
  onChange={(e) => setSearchTx(e.target.value)}
  className="w-full bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-transparent focus:border-indigo-500/50 pl-14 pr-6 py-4 rounded-xl outline-none focus:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all font-mono text-base text-slate-800 dark:text-gray-200 placeholder:text-gray-500"
/>\n"""

codecs.open(filepath, 'w', 'utf-8').writelines(lines)
print('Reverted SearchTab inputs')
