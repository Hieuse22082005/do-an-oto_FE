"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export default function HomeTab({ onTryNow }: { onTryNow: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [totalTx, setTotalTx] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [topContributors, setTopContributors] = useState<any[]>([]);

  // STATE CHO TIN TỨC ĐỘNG
  const [realNews, setRealNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeNewsTab, setActiveNewsTab] = useState('oto');

  const newsTabs = [
    { id: 'oto', name: '🚗 Ô tô - Xe máy', url: 'https://vnexpress.net/rss/oto-xe-may.rss' },
    { id: 'thoisu', name: '📰 Thời sự', url: 'https://vnexpress.net/rss/thoi-su.rss' },
    { id: 'tinnong', name: '🚦 Tin nóng & Giao thông', url: 'https://vnexpress.net/rss/tin-moi-nhat.rss' }
  ];

  const trendData = [
    { value: 10 }, { value: 15 }, { value: 25 }, { value: 20 }, { value: 35 }, { value: 45 }, { value: totalTx || 50 }
  ];

  useEffect(() => {
    const fetchPublicStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/transactions/stats");
        if (!response.ok) throw new Error("Lỗi API thống kê");
        const resJson = await response.json();
        
        if (resJson.status === "success") {
          const stats = resJson.data;
          setTotalTx(stats.total_tx);
          setChartData(stats.top_brands);
          setTopContributors(stats.top_contributors);
        }
      } catch (err) {
        console.error("Lỗi tải thống kê từ Backend:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchPublicStats();
  }, []);

  // GỌI API LẤY TIN TỨC KHI CHUYỂN TAB
  useEffect(() => {
    const fetchLiveNews = async () => {
      setLoadingNews(true);
      try {
        const currentTab = newsTabs.find(t => t.id === activeNewsTab);
        const rssUrl = currentTab?.url || newsTabs[0].url;
        
        // Thêm tham số chống cache để luôn lấy tin mới
        const timestamp = new Date().getTime();
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&_t=${timestamp}`);
        const data = await response.json();

        if (data.status === "ok") {
          const formattedNews = data.items.slice(0, 6).map((item: any) => {
            // ==========================================
            // NÂNG CẤP MÁY QUÉT ẢNH SIÊU MẠNH (REGEX MỚI)
            // ==========================================
            let imageUrl = item.thumbnail || (item.enclosure && item.enclosure.link);
            
            if (!imageUrl && item.description) {
              // Bắt mọi định dạng link ảnh (jpg, png, jpeg, webp) nằm trong thẻ src='...' hoặc src="..."
              const imgMatch = item.description.match(/src=["']([^"']+(?:jpg|jpeg|png|gif|webp))["']/i);
              if (imgMatch && imgMatch[1]) {
                imageUrl = imgMatch[1];
              }
            }

            // Nếu quét nát bài báo mà vẫn không có ảnh, lúc này mới đành dùng ảnh xe dự phòng
            if (!imageUrl) {
               imageUrl = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop";
            }

            // Xóa sạch rác HTML để lấy text mô tả thuần túy
            const cleanSnippet = item.description.replace(/<[^>]+>/g, '').trim();

            return {
              title: item.title,
              snippet: cleanSnippet,
              date: new Date(item.pubDate).toLocaleDateString('vi-VN'),
              image: imageUrl,
              link: item.link,
              source: "VNExpress"
            };
          });
          
          setRealNews(formattedNews);
        }
      } catch (error) {
        console.error("Lỗi kéo tin tức:", error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchLiveNews();
  }, [activeNewsTab]);

  const trafficLaws = [
    { title: "Vượt đèn đỏ / đèn vàng", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🚦", color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Quá tốc độ 10-20km/h", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "⚡", color: "bg-orange-50 text-orange-600 border-orange-100" },
    { title: "Quá tốc độ >35km/h", fine: "10 - 12 triệu", detail: "Tước GPLX 2-4 tháng", icon: "🏎️", color: "bg-red-50 text-red-700 border-red-200" },
    { title: "Nồng độ cồn (Mức 1)", fine: "6 - 8 triệu", detail: "Tước GPLX 10-12 tháng", icon: "🍻", color: "bg-purple-50 text-purple-600 border-purple-100" },
  ];

  const faqs = [
    { q: "Giá mua và giá bán khác nhau như thế nào?", a: "Giá mua là giá đại lý thu vào, giá bán là giá showroom bán ra. Luôn có sự chênh lệch do chi phí bảo dưỡng." },
    { q: "Giá trên công cụ định giá AI có chính xác không?", a: "Hệ thống phân tích dựa trên hơn 30 biến số kỹ thuật và dữ liệu thị trường thực tế." }
  ];

  return (
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-[#f4f5f7] font-sans pb-20">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none -z-10"></div>
      
      <div className="max-w-[1350px] mx-auto px-4 lg:px-8 pt-12 pb-16">
        <h1 className="text-center text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-12 drop-shadow-sm">
          PREDICTCAR
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ================= CỘT 1 (TRÁI) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tổng Lượt Định Giá</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-black">ALL TIME</span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">{loadingStats ? '...' : totalTx.toLocaleString()}</h2>
              
              <div className="h-16 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeWidth={2.5} dot={false} isAnimationActive={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-lg transition-all duration-300 flex-1 flex flex-col">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">Thị Phần Thương Hiệu</h3>
              <p className="text-xs text-gray-500 mb-6">Tỉ lệ các dòng xe được tra cứu</p>
              
              {loadingStats ? (
                 <div className="flex-1 flex justify-center items-center"><svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
              ) : chartData.length === 0 ? (
                 <div className="flex-1 flex justify-center items-center text-sm text-gray-400 font-medium">Chưa có dữ liệu</div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full h-40 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" stroke="none">
                          {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value} xe`, 'Số lượng']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 w-full">
                     {chartData.slice(0,3).map((entry, idx) => (
                       <div key={idx} className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                          {entry.name}
                       </div>
                     ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= CỘT 2 (GIỮA) ================= */}
          <div className="lg:col-span-6 flex flex-col text-center">
            <div className="mb-8 mt-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                Định Giá Xe Cũ Bằng <br/><span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Trí Tuệ Nhân Tạo</span>
              </h2>
              <p className="text-gray-500 font-medium px-4">
                Phân tích hơn 30+ thông số kỹ thuật, bảo mật dữ liệu bằng công nghệ Web3.
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100/80 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 animate-[scan_2.5s_ease-in-out_infinite] pointer-events-none z-0"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">🤖</span>
                  AI Valuation
                </h3>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full shadow-inner">Phiên bản 2.0</span>
              </div>

              <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-8 text-center border border-gray-100">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚙</div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">Kiểm tra giá trị thực của xe</h4>
                <p className="text-sm text-gray-500">Mã hóa toàn bộ lịch sử định giá lên mạng lưới Blockchain vĩnh viễn.</p>
              </div>

              <button 
                onClick={onTryNow} 
                className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-5 rounded-2xl text-lg transition-all duration-300 shadow-[0_8px_20px_rgba(29,78,216,0.3)] active:scale-95 flex items-center justify-center gap-3"
              >
                Bắt Đầu Định Giá Ngay ➔
              </button>

              <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><span className="text-emerald-500 text-lg">✓</span> Nhanh chóng</div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><span className="text-emerald-500 text-lg">✓</span> Minh bạch</div>
              </div>
            </div>
          </div>

          {/* ================= CỘT 3 (PHẢI) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phân tích Số Lượng</span>
              </div>
              
              {loadingStats ? (
                <div className="h-40 flex justify-center items-center"><svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
              ) : chartData.length === 0 ? (
                <div className="h-40 flex justify-center items-center text-sm text-gray-400 font-medium">Chưa có dữ liệu</div>
              ) : (
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#1d4ed8" : "#93c5fd"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="bg-gray-900 rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.15)] relative overflow-hidden flex-1">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                <span className="text-xl">🏆</span> Bảng Vàng
              </h3>

              <div className="space-y-3 relative z-10 mt-6">
                {loadingStats ? (
                  <p className="text-gray-500 text-xs">Đang tải...</p>
                ) : topContributors.length === 0 ? (
                  <p className="text-gray-500 text-xs italic">Chưa có ai.</p>
                ) : (
                  topContributors.map((user, idx) => {
                    const medals = ['🥇', '🥈', '🥉'];
                    const bgColors = [
                      'bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/30', 
                      'bg-gradient-to-r from-gray-400/20 to-transparent border-gray-400/30', 
                      'bg-gradient-to-r from-orange-400/20 to-transparent border-orange-400/30'
                    ];

                    return (
                      <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border ${bgColors[idx]} hover:-translate-y-1 transition-transform`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl drop-shadow-md flex-shrink-0">{medals[idx]}</span>
                          <div className="min-w-0 pr-2">
                            <p className="font-bold text-white text-xs truncate" title={user.name}>{user.name}</p>
                            <p className="text-[9px] text-gray-400 uppercase mt-0.5">VIP Dealer</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-black text-white">{user.count}</p>
                          <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Đã Định Giá</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-24 mt-4">
        
        {/* KHỐI TIN TỨC: ĐÃ FIX LỖI TÌM ẢNH */}
        <div className="pt-10 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                Tin Tức Cập Nhật (Live)
              </h2>
              <p className="text-gray-500 font-medium">Bản tin tự động đồng bộ theo thời gian thực</p>
            </div>
            <a href="https://vnexpress.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:text-blue-800 transition-colors hidden md:flex items-center gap-1 group">
              Báo VnExpress <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {newsTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveNewsTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                  activeNewsTab === tab.id
                    ? 'bg-[#1d4ed8] text-white shadow-md'
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          {loadingNews ? (
             <div className="flex justify-center py-10"><svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realNews.map((news, index) => (
                <a key={index} href={news.link} target="_blank" rel="noopener noreferrer" className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer block flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative flex-shrink-0">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      referrerPolicy="no-referrer" 
                      onError={(e) => { 
                        e.currentTarget.src = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop"; 
                      }}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-gray-900 shadow-sm">
                      MỚI NHẤT
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                      <span className="text-red-500">📰 {news.source}</span>
                      <span>•</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{news.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mt-auto">{news.snippet}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* VỀ CHÚNG TÔI */}
        <div className="pt-10 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-xl border border-gray-100 group relative">
              <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop" alt="Giới thiệu" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Về <span className="text-blue-600">PredictCar</span></h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Khởi nguồn từ sự thấu hiểu nỗi đau của người mua bán xe cũ về việc "bị hớ" giá, PredictCar tự hào là nền tảng tiên phong tại Việt Nam ứng dụng Trí tuệ nhân tạo (AI) và công nghệ Web3 Blockchain vào việc thẩm định. 
              </p>
              <ul className="space-y-3 font-semibold text-sm text-gray-700">
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">✓</span> Phân tích hơn 30+ biến số kỹ thuật</li>
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">✓</span> Chứng nhận Blockchain vĩnh viễn</li>
              </ul>
            </div>
          </div>
        </div>

        {/* LOGO BÁO CHÍ */}
        <div className="pt-10 border-t border-gray-200">
          <h2 className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">Tự hào xuất hiện trên</h2>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="text-2xl font-black font-serif cursor-pointer hover:text-[#9f224e] transition-colors">VNEXPRESS</div>
              <div className="text-2xl font-black cursor-pointer hover:text-[#008a66] transition-colors">DÂN TRÍ</div>
              <div className="text-2xl font-black font-sans italic cursor-pointer hover:text-[#d62828] transition-colors">AutoPro</div>
          </div>
        </div>

        {/* CẨM NANG LUẬT VÀ HỎI ĐÁP */}
        <div className="pt-10 border-t border-gray-200 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Cẩm nang Luật</h2>
            <div className="space-y-3">
              {trafficLaws.map((law, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{law.icon}</span>
                    <span className="font-bold text-sm text-gray-800">{law.title}</span>
                  </div>
                  <span className="font-bold text-sm text-red-500">{law.fine}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Hỏi đáp</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-left px-5 py-4 font-bold text-gray-800 flex justify-between items-center text-sm hover:bg-gray-50 transition-colors">
                    {faq.q}
                    <span className={`text-gray-400 font-mono transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>{openFaq === index ? '−' : '+'}</span>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 px-5 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-50 pt-3">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}