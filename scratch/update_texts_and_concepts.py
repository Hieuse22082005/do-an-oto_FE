import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Increase input and button sizes in Center Main
content = content.replace(
    'placeholder="VD: 30G99999" className="w-full px-6 py-4 bg-[#1e293b]/80 border border-slate-600 rounded-2xl text-center text-xl',
    'placeholder="VD: 30G99999" className="w-full px-6 py-5 bg-[#1e293b]/80 border border-slate-600 rounded-2xl text-center text-2xl'
)
content = content.replace(
    'className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-sm',
    'className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-base'
)

content = content.replace(
    'placeholder="Biển số xe" className="px-5 py-3.5 bg-[#1e293b]/80 border border-slate-600 rounded-xl text-center text-sm',
    'placeholder="Biển số xe" className="px-6 py-4 bg-[#1e293b]/80 border border-slate-600 rounded-xl text-center text-lg'
)
content = content.replace(
    'placeholder="Số Tem/GCN" className="px-5 py-3.5 bg-[#1e293b]/80 border border-slate-600 rounded-xl text-center text-sm',
    'placeholder="Số Tem/GCN" className="px-6 py-4 bg-[#1e293b]/80 border border-slate-600 rounded-xl text-center text-lg'
)
content = content.replace(
    'className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-4 rounded-xl font-black text-sm',
    'className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-5 rounded-xl font-black text-base'
)

content = content.replace(
    'placeholder="Nhập Số Khung hoặc Biển Số" className="w-full px-6 py-4 bg-black/40 border border-red-900/50 rounded-2xl text-center text-lg',
    'placeholder="Nhập Số Khung hoặc Biển Số" className="w-full px-6 py-5 bg-black/40 border border-red-900/50 rounded-2xl text-center text-xl'
)
content = content.replace(
    'className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-black text-sm',
    'className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-2xl font-black text-base'
)

content = content.replace(
    'placeholder="Nhập Mã GPLX" className="w-full px-5 py-4 bg-[#1e293b]/80 border border-slate-600 rounded-2xl text-center text-sm',
    'placeholder="Nhập Mã GPLX" className="w-full px-6 py-4 bg-[#1e293b]/80 border border-slate-600 rounded-2xl text-center text-lg'
)
content = content.replace(
    'className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-2xl font-black text-sm',
    'className="w-full bg-slate-700 hover:bg-slate-600 text-white py-5 rounded-2xl font-black text-base'
)

# 2. Add concept (khái niệm) boxes for dang-kiem, mat-cap, gplx
# DANG-KIEM
dk_old = """          {hasResult && results.registry && ("""
dk_new = """          {!hasResult ? (
            <div className="bg-[#0f172a]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-900/50 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-black">?</div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">Tra Cứu Đăng Kiểm Là Gì?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Kiểm tra tính hợp lệ và thời hạn kiểm định kỹ thuật của phương tiện cơ giới đường bộ. Tránh bị phạt khi tham gia giao thông với tem đã hết hạn hoặc bị từ chối cấp do chưa nộp phạt nguội.</p>
              </div>
            </div>
          ) : (hasResult && results.registry && ("""
content = content.replace(dk_old, dk_new)

# MAT-CAP
mc_old = """          {hasResult && results.stolen && ("""
mc_new = """          {!hasResult ? (
            <div className="bg-[#0f172a]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl flex items-start gap-4">
              <div className="w-12 h-12 bg-red-900/50 text-red-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-black">?</div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">Tra Cứu Phản Ánh Mất Cắp Là Gì?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Kiểm tra phương tiện có nằm trong danh sách tang vật vụ án, xe bị lấy cắp hoặc đang bị cầm cố/thế chấp ngân hàng không. Tránh rủi ro pháp lý khi mua bán xe cũ.</p>
              </div>
            </div>
          ) : (hasResult && results.stolen && ("""
content = content.replace(mc_old, mc_new)

# GPLX
gplx_old = """          {hasResult && results.license && ("""
gplx_new = """          {!hasResult ? (
            <div className="bg-[#0f172a]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800/50 text-slate-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-black">?</div>
              <div>
                <h3 className="font-bold text-white text-base mb-1">Tra Cứu Giấy Phép Lái Xe Là Gì?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Xác minh thông tin, hạng bằng và thời hạn của Giấy Phép Lái Xe trên hệ thống thật. Phát hiện bằng giả, hoặc kiểm tra lịch sử tước bằng, vi phạm giao thông.</p>
              </div>
            </div>
          ) : (hasResult && results.license && ("""
content = content.replace(gplx_old, gplx_new)

# Upgrade text sizes for phat-nguoi concept box too
content = content.replace('className="font-bold text-white text-sm mb-1">Tra C', 'className="font-bold text-white text-base mb-1">Tra C')
content = content.replace('className="text-slate-400 text-xs leading-relaxed">H', 'className="text-slate-400 text-sm leading-relaxed">H')
content = content.replace('shrink-0 text-xl font-black">?', 'shrink-0 text-2xl font-black">?')

# 3. Right Sidebar text sizes
content = content.replace('className="font-black text-slate-200 text-[10px]', 'className="font-black text-slate-200 text-xs')
content = content.replace('className="text-[10px] text-slate-400 font-bold mb-1', 'className="text-xs text-slate-400 font-bold mb-1')
content = content.replace('className={`text-3xl font-black', 'className={`text-4xl font-black')
content = content.replace('className="font-black text-white text-[10px]', 'className="font-black text-white text-xs')
content = content.replace('items-center text-xs group cursor-default"', 'items-center text-sm group cursor-default"')
content = content.replace('className={`font-black text-sm ${warnText}', 'className={`font-black text-base ${warnText}')
content = content.replace('className={`text-xs leading-relaxed font-medium ${warnText}', 'className={`text-sm leading-relaxed font-medium ${warnText}')
content = content.replace('className="font-black text-blue-300 text-sm mb-2', 'className="font-black text-blue-300 text-base mb-2')
content = content.replace('className="text-[10px] text-blue-200/70 mb-5', 'className="text-xs text-blue-200/70 mb-5')
content = content.replace('className="font-black text-white text-sm mb-2', 'className="font-black text-white text-base mb-2')
content = content.replace('className="text-[10px] text-slate-400 mb-0', 'className="text-xs text-slate-400 mb-0')


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated text sizes and concept boxes!")
