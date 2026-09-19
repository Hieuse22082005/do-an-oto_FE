import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def generate_title_block_hardcoded(badge_text, title_text, gradient_class, badge_bg, badge_border, badge_text_color, icon_emoji):
    # Use normal string concatenation instead of f-string to avoid brace conflicts
    return (
        '              <div className="text-center mb-10 relative">\n'
        '                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-[7rem] font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none tracking-tighter w-full overflow-hidden">\n'
        '                  ' + title_text.upper() + '\n'
        '                </div>\n'
        '                <div className="flex justify-center items-center gap-2 mb-4 relative z-10">\n'
        '                  <div className="flex items-center gap-2 ' + badge_bg + ' border ' + badge_border + ' px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">\n'
        '                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest ' + badge_text_color + '">' + icon_emoji + ' ' + badge_text + '</span>\n'
        '                  </div>\n'
        '                </div>\n'
        '                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ' + gradient_class + ' tracking-tight mb-4 drop-shadow-sm py-1 relative z-10">\n'
        '                  ' + title_text + '\n'
        '                </h1>\n'
        '                <p className="text-gray-400 text-sm sm:text-lg relative z-10">\n'
        '                  Xin chào <span className="font-bold bg-white/5 text-gray-200 px-3 py-1 rounded-full border border-white/10 ml-1">{user?.user_metadata?.display_name || user?.email || \'Khách\'}</span>\n'
        '                </p>\n'
        '              </div>'
    )

new_phat_nguoi = generate_title_block_hardcoded(
    "HỆ THỐNG CSDL CSGT TOÀN QUỐC", "Tra Cứu Phạt Nguội", "from-blue-400 via-indigo-400 to-cyan-400",
    "bg-blue-500/10", "border-blue-500/20", "text-blue-300", "🚔"
)

# PHAT NGUOI
old_phat_nguoi = """              <div className="relative z-10 text-center mb-8 mt-4">
                <h2 className="text-3xl font-black mb-2 drop-shadow-md text-white">Tra Cứu Phạt Nguội</h2>
                <p className="text-blue-400 text-xs uppercase tracking-widest font-bold">Hệ thống CSDL CSGT Toàn Quốc</p>
              </div>"""
content = content.replace(old_phat_nguoi, new_phat_nguoi)

# DANG KIEM
old_dang_kiem = """            <div className="text-center mb-8 mt-2">
              <h2 className="text-3xl font-black text-white mb-2 drop-shadow-md">Hồ Sơ Đăng Kiểm</h2>
              <p className="text-emerald-400 text-xs uppercase tracking-widest font-bold">Cục Đăng Kiểm Việt Nam (VR)</p>
            </div>"""
new_dang_kiem = generate_title_block_hardcoded(
    "CỤC ĐĂNG KIỂM VIỆT NAM (VR)", "Hồ Sơ Đăng Kiểm", "from-emerald-400 via-teal-400 to-cyan-400",
    "bg-emerald-500/10", "border-emerald-500/20", "text-emerald-300", "✅"
)
content = content.replace(old_dang_kiem, new_dang_kiem)

# MAT CAP
old_mat_cap = """            <div className="relative z-10 text-center mb-8 mt-2">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]">🚨</div>
              <h2 className="text-3xl font-black text-white mb-2 drop-shadow-md">Tra Cứu Pháp Lý / Mất Cắp</h2>
              <p className="text-red-400 text-xs uppercase tracking-widest font-bold">Dữ Liệu An Ninh Quốc Gia</p>
            </div>"""
new_mat_cap = generate_title_block_hardcoded(
    "DỮ LIỆU AN NINH QUỐC GIA", "Tra Cứu Xe Mất Cắp", "from-red-400 via-rose-400 to-orange-400",
    "bg-red-500/10", "border-red-500/20", "text-red-300", "🚨"
)
content = content.replace(old_mat_cap, new_mat_cap)

# GPLX
old_gplx = """            <div className="relative z-10 text-center mb-8 mt-4">
              <h2 className="text-3xl font-black mb-2 drop-shadow-md text-white">Tra Cứu Giấy Phép Lái Xe</h2>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Cổng Thông Tin Điện Tử - Tổng Cục Đường Bộ</p>
            </div>"""
new_gplx = generate_title_block_hardcoded(
    "TỔNG CỤC ĐƯỜNG BỘ", "Tra Cứu Bằng Lái Xe", "from-slate-300 via-gray-300 to-slate-400",
    "bg-slate-500/10", "border-slate-500/20", "text-slate-300", "💳"
)
content = content.replace(old_gplx, new_gplx)

# THI THU
old_thi_thu = """              <div>
                <h2 className="text-3xl font-black text-white mb-2">Thi Thử GPLX B2</h2>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">Bộ đề 30 câu hỏi ngẫu nhiên chuẩn Bộ GTVT. Có chấm điểm trực tiếp từng câu.</p>
                <div className="mt-4 inline-block bg-red-900/50 text-red-400 px-4 py-2 rounded-lg text-xs font-bold border border-red-800">
                  🚫 Sai 1 câu điểm liệt = TRƯỢT NGAY!
                </div>
              </div>"""
new_thi_thu = generate_title_block_hardcoded(
    "HỆ THỐNG SÁT HẠCH LÁI XE B2", "Thi Thử Bằng Lái", "from-amber-400 via-yellow-400 to-orange-400",
    "bg-amber-500/10", "border-amber-500/20", "text-amber-300", "📝"
) + """\n              <div>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed mt-4">Bộ đề 30 câu hỏi ngẫu nhiên chuẩn Bộ GTVT. Có chấm điểm trực tiếp từng câu.</p>
                <div className="mt-4 inline-block bg-red-900/50 text-red-400 px-4 py-2 rounded-lg text-xs font-bold border border-red-800">
                  🚫 Sai 1 câu điểm liệt = TRƯỢT NGAY!
                </div>
              </div>"""
content = content.replace(old_thi_thu, new_thi_thu)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated titles successfully!")
