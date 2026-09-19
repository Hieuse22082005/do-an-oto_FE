import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

# Create renderLeftAds
render_ads = """
  // ================= LAYOUT WIDGET QUẢNG CÁO =================
  const renderLeftAds = () => (
    <div className="hidden xl:flex flex-col gap-6 w-full animate-[fadeInLeft_0.5s_ease-out]">
      <div className="bg-gradient-to-b from-blue-600 to-indigo-800 rounded-3xl p-6 shadow-2xl border border-blue-400/30 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transition-transform duration-700 group-hover:rotate-45 group-hover:scale-150">
          <span className="text-8xl">💎</span>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm animate-bounce">
            Ưu Đãi Đặc Quyền
          </div>
          <h4 className="text-white font-bold text-xl mb-3 drop-shadow-md">Nâng Cấp VIP</h4>
          <p className="text-blue-100 text-sm mb-6 leading-relaxed opacity-90">Tra cứu không giới hạn. Mở khóa tính năng xe mất cắp, cầm cố và nhận thông báo phạt nguội qua Zalo 24/7.</p>
          <button className="w-full bg-white hover:bg-yellow-400 text-blue-900 font-bold py-3 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 hover:-translate-y-1 active:scale-95">
            Đăng Ký Ngay
          </button>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl text-center group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
        <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
          🛡️
        </div>
        <h4 className="text-slate-900 dark:text-white font-bold mb-2">Bảo Mật Tuyệt Đối</h4>
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Thông tin tra cứu được mã hóa hai chiều chuẩn ngân hàng.</p>
      </div>
    </div>
  );
"""

# Insert renderLeftAds before the main return
content = content.replace('  return (', render_ads + '\n  return (')

# Modify the grid structure
old_grid = """<div className="grid grid-cols-1 xl:grid-cols-9 gap-6 items-start">
            {/* CỘT GIỮA (MAIN CONTENT) - Chiếm 6 cột trên xl */}
            <div className="xl:col-span-6 flex flex-col gap-6">
              {renderCenterMain()}
            </div>
            
            {/* CỘT PHẢI (WIDGETS) - Chiếm 3 cột trên xl */}
            <div className="xl:col-span-3 flex flex-col gap-6">
              {renderRightWidgets()}
            </div>
          </div>"""

new_grid = """<div className="grid grid-cols-1 xl:grid-cols-11 gap-6 items-start w-full">
            {/* CỘT QUẢNG CÁO TRÁI - Chiếm 2 cột trên xl */}
            <div className="xl:col-span-2 hidden xl:block">
              {renderLeftAds()}
            </div>

            {/* CỘT GIỮA (MAIN CONTENT) - Chiếm 6 cột trên xl */}
            <div className="xl:col-span-6 flex flex-col gap-6">
              {renderCenterMain()}
            </div>
            
            {/* CỘT PHẢI (WIDGETS) - Chiếm 3 cột trên xl */}
            <div className="xl:col-span-3 flex flex-col gap-6">
              {renderRightWidgets()}
            </div>
          </div>"""

content = content.replace(old_grid, new_grid)

# Ensure max width is huge enough
content = content.replace('max-w-[1400px]', 'max-w-[1600px]')

codecs.open(filepath, 'w', 'utf-8').write(content)
print('Added ads sidebar')
