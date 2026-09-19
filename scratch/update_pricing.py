import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

# Replace the Standard List
old_standard = r'<ul className="space-y-4 mb-8 flex-1 text-sm font-medium texttext-gray-600">.*?</ul>'
new_standard = """<ul className="space-y-4 mb-8 flex-1 text-sm font-medium text-slate-600 dark:text-gray-400">
                  <li className="flex items-center gap-3 text-slate-900 dark:text-white font-bold"><span className="text-amber-500 text-xl w-5 text-center">⚡</span> Giới hạn 3 lượt định giá / ngày</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-xl w-5 text-center">✓</span> Phân tích AI 30+ trường dữ liệu</li>
                  <li className="flex items-center gap-3 opacity-60"><span className="text-slate-400 text-xl w-5 text-center">💸</span> Tự chi trả phí Gas Web3 tạo TxHash</li>
                  <li className="flex items-center gap-3 opacity-50"><span className="text-slate-400 text-lg w-5 text-center">🔒</span> Tính năng Dự báo rớt giá bị khóa</li>
                  <li className="flex items-center gap-3 opacity-50"><span className="text-slate-400 text-lg w-5 text-center">🎧</span> Hỗ trợ cộng đồng cơ bản</li>
                </ul>"""
content = re.sub(old_standard, new_standard, content, flags=re.DOTALL)


# Replace the VIP List
old_vip = r'<ul className="space-y-4 mb-8 flex-1 text-sm font-bold text-gray-800">.*?</ul>'
new_vip = """<ul className="space-y-4 mb-8 flex-1 text-sm font-bold text-slate-800 dark:text-gray-200">
                  <li className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400"><span className="text-emerald-500 text-xl w-5 text-center">∞</span> <strong>Không giới hạn</strong> lượt định giá / ngày</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-xl w-5 text-center">✓</span> Phân tích AI 30+ trường dữ liệu</li>
                  <li className="flex items-center gap-3 text-blue-600 dark:text-blue-400"><span className="text-blue-500 text-xl w-5 text-center">🚀</span> <strong>Miễn phí 100%</strong> phí Gas Web3 TxHash</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-xl w-5 text-center">🔓</span> <strong>Mở khóa</strong> Dự báo rớt giá 12 tháng</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-xl w-5 text-center">⭐</span> <strong>Ưu tiên</strong> hỗ trợ chuyên sâu 24/7</li>
                </ul>"""
content = re.sub(old_vip, new_vip, content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print('Updated!')
