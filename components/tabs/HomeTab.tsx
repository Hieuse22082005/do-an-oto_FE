"use client";
import { useState } from "react";

export default function HomeTab({ onTryNow }: { onTryNow: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const trafficLaws = [
    { title: "Vượt đèn đỏ / đèn vàng", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🚦", color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Quá tốc độ 10-20km/h", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "⚡", color: "bg-orange-50 text-orange-600 border-orange-100" },
    { title: "Quá tốc độ >35km/h", fine: "10 - 12 triệu", detail: "Tước GPLX 2-4 tháng", icon: "🏎️", color: "bg-red-50 text-red-700 border-red-200" },
    { title: "Nồng độ cồn (Mức 1)", fine: "6 - 8 triệu", detail: "Tước GPLX 10-12 tháng", icon: "🍻", color: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: "Đi sai làn đường", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🛣️", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "Đi ngược chiều", fine: "4 - 6 triệu", detail: "Tước GPLX 2-4 tháng", icon: "⛔", color: "bg-rose-50 text-rose-600 border-rose-100" },
    { title: "Không thắt dây an toàn", fine: "800k - 1 triệu", detail: "Phạt người lái & ghế phụ", icon: "💺", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { title: "Dùng điện thoại khi lái", fine: "2 - 3 triệu", detail: "Tước GPLX 1-3 tháng", icon: "📱", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
    { title: "Vượt phải sai quy định", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🚙", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    { title: "Dừng, đỗ xe sai quy định", fine: "800k - 1 triệu", detail: "Phạt tiền, cẩu xe", icon: "🅿️", color: "bg-gray-100 text-gray-700 border-gray-200" },
    { title: "Chuyển làn không xi-nhan", fine: "400k - 600k", detail: "Phạt tiền trực tiếp", icon: "↔️", color: "bg-lime-50 text-lime-700 border-lime-100" },
    { title: "Hết hạn đăng kiểm (< 1 tháng)", fine: "2 - 3 triệu", detail: "Tước GPLX 1-3 tháng", icon: "📋", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { title: "Không nhường xe ưu tiên", fine: "6 - 8 triệu", detail: "Tước GPLX 2-4 tháng", icon: "🚑", color: "bg-pink-50 text-pink-600 border-pink-100" },
    { title: "Không có GPLX", fine: "10 - 12 triệu", detail: "Tạm giữ xe 7 ngày", icon: "🪪", color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Lùi xe trên cao tốc", fine: "16 - 18 triệu", detail: "Tước GPLX 5-7 tháng", icon: "🔙", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { title: "Không bảo hiểm TNDS", fine: "400k - 600k", detail: "Phạt tiền trực tiếp", icon: "🛡️", color: "bg-teal-50 text-teal-600 border-teal-100" }
  ];

  const magazineArticles = [
    { category: "Động cơ", items: [
      { title: "Bộ chế hòa khí ô tô là gì?", snippet: "Ô tô có vận hành được nếu thiếu bộ chế hòa khí...", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=250&fit=crop" },
      { title: "Vè, lòng dè ô tô là gì?", snippet: "Vè ô tô tại garage hay nói tới là gì? Cùng tìm hiểu...", img: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400&h=250&fit=crop" }
    ]},
    { category: "Nội thất", items: [
      { title: "\"Con ngựa\" ô tô là gì?", snippet: "Thuật ngữ \"con ngựa\" tại garage hay nói tới là gì?", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop" },
      { title: "Trần thụng là gì?", snippet: "Trần thụng tại garage hay nói tới là gì? Nguyên nhân do đâu?", img: "https://images.unsplash.com/photo-1503376710342-9b2f676231bd?w=400&h=250&fit=crop" }
    ]}
  ];

  const faqs = [
    { q: "Giá mua và giá bán khác nhau như thế nào?", a: "Giá mua là giá đại lý thu vào, giá bán là giá showroom bán ra. Luôn có sự chênh lệch do chi phí bảo dưỡng." },
    { q: "Giá trên công cụ định giá AI có chính xác không?", a: "Hệ thống phân tích dựa trên hơn 30 biến số kỹ thuật và dữ liệu thị trường thực tế." },
    { q: "Dữ liệu công cụ được lấy từ đâu?", a: "Dữ liệu được thu thập và tổng hợp từ hàng trăm ngàn tin đăng bán xe trên các sàn thương mại điện tử, showroom lớn trên toàn quốc." },
    { q: "Kết quả định giá có được cập nhật không?", a: "Có. Trọng số của mô hình AI sẽ được tính toán và cập nhật theo từng chu kỳ biến động của thị trường." }
  ];

  return (
    <div className="space-y-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">Có gì ở <span className="text-blue-600">PredictCar</span>? ⚡</h1>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">Định giá bằng AI <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-3 animate-pulse">MỚI</span></h3>
              <p className="text-gray-500">Biết chiếc xe của bạn đáng giá bao nhiêu theo dữ liệu thị trường thực tế.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Minh bạch qua Blockchain</h3>
              <p className="text-gray-500">Chứng nhận định giá được cấp mộc điện tử và có thể xuất file PDF bất cứ lúc nào.</p>
            </div>
          </div>
          <button onClick={onTryNow} className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-2 group">
            Dùng thử Định Giá Ngay <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
        {/* THẺ CARD TRÔI NỔI CÓ ANIMATION AI QUÉT */}
        <div className="relative flex justify-center items-center h-full mt-10 md:mt-0">
          {/* Vầng sáng nền phía sau */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[80px] animate-pulse pointer-events-none"></div>

          <div className="relative bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 w-full max-w-sm transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden group">
            
            {/* 🔴 Tia Laser quét từ trên xuống dưới */}
            <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 animate-[scan_2.5s_ease-in-out_infinite] pointer-events-none z-20 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>

            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4 relative z-10">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 shadow-inner border border-gray-100">🚗</div>
              <div className="bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-md">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(74,222,128,0.8)]"></span>
                Web3 AI
              </div>
            </div>
            
            <h4 className="font-black text-2xl text-gray-900 mb-1 relative z-10 tracking-tight">Giá Trị Ước Tính</h4>
            <p className="text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest relative z-10">Đã cấp mộc Blockchain</p>
            
            {/* 🔴 CÁC DÒNG SKELETON CHẠY HIỆU ỨNG LƯỚT SÁNG (SHIMMER) */}
            <div className="space-y-4 relative z-10">
              {/* Dòng 1: Đang load giá */}
              <div className="relative overflow-hidden h-5 bg-gray-100 rounded-lg w-full shadow-inner">
                <div className="shimmer-line absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
              </div>
              
              {/* Dòng 2: Phân tích thông số (Ngắn hơn) */}
              <div className="relative overflow-hidden h-4 bg-gray-100 rounded-md w-4/5 shadow-inner">
                <div className="shimmer-line absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite_0.2s]"></div>
              </div>

              {/* Dòng 3: Cấp mộc Web3 (Ngắn nhất) */}
              <div className="relative overflow-hidden h-4 bg-gray-100 rounded-md w-3/5 shadow-inner">
                <div className="shimmer-line absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite_0.4s]"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="pt-16 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group relative cursor-pointer">
            <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop" alt="Giới thiệu" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-white font-black text-xl tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Thấu hiểu giá trị, Minh bạch niềm tin.</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Về <span className="text-blue-600">PredictCar</span></h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Khởi nguồn từ sự thấu hiểu nỗi đau của người mua bán xe cũ về việc "bị hớ" giá, PredictCar tự hào là nền tảng tiên phong tại Việt Nam ứng dụng Trí tuệ nhân tạo (AI) và công nghệ Web3 Blockchain vào việc thẩm định. 
              <br/><br/>
              Sứ mệnh của chúng tôi là chuẩn hóa và minh bạch hóa thị trường xe cũ, giúp người mua và người bán kết nối với nhau dựa trên dữ liệu thực tế và sự tin tưởng tuyệt đối.
            </p>
            <ul className="space-y-4 font-medium text-gray-700">
              <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"><span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full shadow-sm text-sm">✓</span> Phân tích hơn 30+ biến số kỹ thuật</li>
              <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"><span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full shadow-sm text-sm">✓</span> Cập nhật dữ liệu thị trường theo thời gian thực</li>
              <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"><span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full shadow-sm text-sm">✓</span> Chứng nhận Blockchain vĩnh viễn, không thể làm giả</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-16 border-t border-gray-200">
        <h2 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Được tin tưởng & nhắc đến bởi</h2>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            <div className="text-3xl font-black font-serif tracking-tighter text-gray-400 hover:text-[#9f224e] hover:scale-110 transition-all duration-500 cursor-pointer">VNEXPRESS</div>
            <div className="text-3xl font-black text-gray-400 hover:text-[#008a66] hover:scale-110 tracking-tighter transition-all duration-500 cursor-pointer">DÂN TRÍ</div>
            <div className="text-3xl font-black text-gray-400 hover:text-[#d62828] hover:scale-110 font-sans italic tracking-tighter transition-all duration-500 cursor-pointer">AutoPro</div>
            <div className="text-3xl font-black text-gray-400 hover:text-[#005ea8] hover:scale-110 tracking-tighter transition-all duration-500 cursor-pointer">TUỔI TRẺ</div>
            <div className="text-3xl font-black text-gray-400 hover:text-gray-900 hover:scale-110 tracking-tighter transition-all duration-500 cursor-pointer">Znews</div>
        </div>
      </div>

      <div className="pt-16 border-t border-gray-200">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 uppercase tracking-tight">GIẢI MÃ NGÔN NGỮ "NGHỀ" CHO Ô TÔ</h2>
            <p className="text-gray-500 mt-1">Những từ ngữ chủ garage, cò lái mua bán xe ô tô cũ thường dùng</p>
          </div>
        </div>
        {magazineArticles.map((cat, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-3">
              <h3 className="text-2xl font-bold text-gray-900">{cat.category}</h3>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 group">Xem thêm <span className="transform group-hover:translate-x-1 transition-transform">→</span></a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {cat.items.map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl mb-4 aspect-video shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{item.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3"><span className="text-4xl animate-bounce">🚨</span> Cẩm nang Lỗi vi phạm 24/7</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {trafficLaws.map((law, index) => (
            <div key={index} className={`p-4 rounded-2xl border ${law.color} bg-opacity-30 hover:bg-opacity-100 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-lg`}>
              <div>
                <div className="text-3xl mb-3 transform hover:scale-110 transition-transform">{law.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-xs leading-tight line-clamp-3">{law.title}</h3>
              </div>
              <div>
                <p className="text-sm font-black mb-1">{law.fine}</p>
                <p className="text-[10px] font-semibold opacity-70 line-clamp-2 leading-tight">{law.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-16 border-t border-gray-200 pb-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1"><h2 className="text-3xl font-extrabold text-gray-800 sticky top-24">Câu hỏi thường gặp</h2></div>
          <div className="md:col-span-2 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`bg-white rounded-2xl border ${openFaq === index ? 'border-blue-300 shadow-md ring-4 ring-blue-50' : 'border-gray-100 hover:border-gray-300'} overflow-hidden transition-all duration-300`}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-left px-6 py-5 font-bold text-gray-900 flex justify-between items-center focus:outline-none">
                  <span className="text-lg">{faq.q}</span>
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 ${openFaq === index ? 'bg-blue-100 text-blue-600 rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                </button>
                <div className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}