import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\app\page.tsx'
content = codecs.open(filepath, 'r', 'utf-8').read()

pattern = r'<div className="grid md:grid-cols-2 p-6 md:p-10 gap-8 bg-white">.*?<Header'

new_grid = """<div className="grid md:grid-cols-2 p-6 md:p-10 gap-8 bg-white">
              
              {/* Cột 1: Standard */}
              <div className="p-8 rounded-[2rem] border border-slate-200 bg-slate-50 flex flex-col relative">
                <div className="flex items-center gap-3 mb-4 text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold">Người dùng Tiêu chuẩn</h3>
                </div>
                
                <div className="mb-6 flex items-baseline gap-2">
                  <p className="text-4xl font-black text-slate-900">Miễn phí</p>
                </div>
                
                <div className="mb-8 flex gap-2">
                   <button onClick={() => setShowPricingModal(false)} className="flex-1 py-3.5 rounded-full font-bold text-slate-500 bg-slate-200 cursor-not-allowed hover:bg-slate-300 transition-colors">Đang sử dụng</button>
                </div>
                
                <div className="mb-8">
                   <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Sản phẩm trong gói</h4>
                   <ul className="space-y-3 text-sm text-slate-700">
                     <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 bg-slate-400 rounded-full shrink-0"></span> Công cụ Định giá xe AI (30+ thông số)</li>
                     <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 bg-slate-400 rounded-full shrink-0"></span> Lịch sử kiểm định Blockchain cơ bản</li>
                   </ul>
                </div>
                
                <div className="flex-1">
                   <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Quyền lợi</h4>
                   <ul className="space-y-4 text-sm font-medium text-slate-700">
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Sở hữu công cụ phân tích dữ liệu AI cơ bản</li>
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Cấp mộc chứng nhận Blockchain (TxHash)</li>
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Cá nhân hóa lịch sử giao dịch Web3</li>
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Giới hạn 3 lượt định giá / ngày</li>
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Tự chi trả phí Gas tạo TxHash (0.001 ETH)</li>
                   </ul>
                </div>
              </div>

              {/* Cột 2: VIP */}
              <div className="p-8 rounded-[2rem] border-2 border-yellow-400 bg-gradient-to-b from-yellow-50 to-white flex flex-col relative shadow-2xl shadow-yellow-500/10 mt-6 md:mt-0">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-yellow-400 text-slate-900 text-[11px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest shadow-md whitespace-nowrap">Lựa chọn phổ biến</span>
                </div>
                
                <div className="flex items-center gap-3 mb-4 text-yellow-700 mt-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-xl pb-1">
                    👑
                  </div>
                  <h3 className="text-xl font-black">Tài khoản VIP (Dealer)</h3>
                </div>
                
                <div className="mb-6 flex items-baseline gap-2">
                  <p className="text-4xl font-black text-slate-900">0.05 <span className="text-xl text-slate-500 font-bold">ETH</span></p>
                  <p className="text-sm text-slate-500 font-medium">/ tháng</p>
                </div>
                
                <div className="mb-8 flex gap-2">
                   <button 
                     onClick={processVIPUpgrade} 
                     disabled={isProcessingPayment}
                     className={`flex-1 py-3.5 rounded-full font-black text-slate-900 transition-all duration-300 flex items-center justify-center gap-2 ${isProcessingPayment ? "bg-yellow-200 cursor-wait" : "bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-400/30 active:scale-95"}`}
                   >
                     {isProcessingPayment ? "Đang xử lý..." : "Thanh Toán bằng Crypto"}
                   </button>
                </div>
                
                <div className="mb-8">
                   <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Sản phẩm trong gói</h4>
                   <ul className="space-y-3 text-sm text-slate-700">
                     <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 bg-slate-400 rounded-full shrink-0"></span> Hệ thống Định giá xe AI (30+ thông số)</li>
                     <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 bg-slate-400 rounded-full shrink-0"></span> Gói tiện ích giao dịch Web3 chuyên nghiệp</li>
                   </ul>
                </div>
                
                <div className="flex-1">
                   <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Quyền lợi</h4>
                   <ul className="space-y-4 text-sm font-bold text-slate-800">
                      <li className="flex items-center gap-3 font-medium text-slate-700"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Sở hữu công cụ phân tích dữ liệu AI cơ bản</li>
                      <li className="flex items-center gap-3 font-medium text-slate-700"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Cấp mộc chứng nhận Blockchain (TxHash)</li>
                      <li className="flex items-center gap-3 font-medium text-slate-700"><span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">✓</span> Cá nhân hóa lịch sử giao dịch Web3</li>
                      
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px] shrink-0">✓</span> <span><span className="text-blue-600">Không giới hạn</span> lượt định giá mỗi ngày</span></li>
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px] shrink-0">✓</span> <span><span className="text-blue-600">Tài trợ 100%</span> phí Gas Web3 (TxHash)</span></li>
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px] shrink-0">✓</span> <span><span className="text-yellow-600">Mở khóa</span> Biểu đồ Dự báo rớt giá 12 tháng</span></li>
                      <li className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px] shrink-0">✓</span> <span>Ưu tiên hỗ trợ chuyên sâu 24/7 trực tiếp</span></li>
                   </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <Header"""

content = re.sub(pattern, new_grid, content, flags=re.DOTALL)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print('Updated successfully!')
