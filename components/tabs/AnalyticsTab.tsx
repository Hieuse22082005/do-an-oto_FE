"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from 'recharts';
import { HomeTestimonials } from "../ui/home-testimonials";
import { GlowyWavesHero } from '@/components/ui/glowy-waves-hero-shadcnui'; 
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export default function AnalyticsTab({ onTryNow }: { onTryNow: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [totalTx, setTotalTx] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [topContributors, setTopContributors] = useState<any[]>([]);

  const [realNews, setRealNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeNewsTab, setActiveNewsTab] = useState('oto');
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const newsTabs = [
    { id: 'oto', name: '🚗 Ô tô - Xe máy', url: 'https://vnexpress.net/rss/oto-xe-may.rss' },
    { id: 'thoisu', name: '📰 Thời sự', url: 'https://vnexpress.net/rss/thoi-su.rss' },
    { id: 'tinnong', name: '🚦 Tin nóng & Giao thông', url: 'https://vnexpress.net/rss/tin-moi-nhat.rss' }
  ];

  const trendData = [
    { time: 'T2', value: 10 }, { time: 'T3', value: 15 }, { time: 'T4', value: 25 }, 
    { time: 'T5', value: 20 }, { time: 'T6', value: 35 }, { time: 'T7', value: 45 }, 
    { time: 'CN', value: totalTx || 50 }
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

  useEffect(() => {
    const fetchLiveNews = async () => {
      setLoadingNews(true);
      try {
        const currentTab = newsTabs.find(t => t.id === activeNewsTab);
        const rssUrl = currentTab?.url || newsTabs[0].url;
        const timestamp = new Date().getTime();
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&_t=${timestamp}`);
        const data = await response.json();

        if (data.status === "ok") {
          const formattedNews = data.items.slice(0, 6).map((item: any) => {
            let imageUrl = item.thumbnail || (item.enclosure && item.enclosure.link);
            if (!imageUrl && item.description) {
              const imgMatch = item.description.match(/src=["']([^"']+)["']/i);
              if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
            }
            if (imageUrl) {
              imageUrl = imageUrl.replace(/&amp;/g, '&');
            }
            if (!imageUrl) imageUrl = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop";
            
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

  const processSteps = [
    { title: "Bước 1: Quét Dữ Liệu AI", desc: "AI phân tích 30+ thông số xe dựa trên dữ liệu lịch sử và thị trường thực tế.", icon: "🧠", color: "text-blue-700 dark:text-blue-400" },
    { title: "Bước 2: Đối Chiếu Thuật Toán", desc: "Mô hình Machine Learning tự động tính toán tỷ lệ khấu hao và tính thanh khoản.", icon: "⚙️", color: "text-emerald-700 dark:text-emerald-400" },
    { title: "Bước 3: Lưu Trữ Web3", desc: "Mã hóa kết quả và đóng mộc lên Smart Contract để đảm bảo tính minh bạch 100%.", icon: "⛓️", color: "text-purple-700 dark:text-purple-400" },
    { title: "Bước 4: Xuất Chứng Nhận", desc: "Báo cáo chi tiết giá mua, giá bán kèm mã Hash Blockchain không thể giả mạo.", icon: "📄", color: "text-yellow-700 dark:text-yellow-400" },
  ];

  const coreValues = [
    { q: "Dữ liệu AI được cập nhật như thế nào?", a: "Hệ thống tự động crawl dữ liệu từ các sàn giao dịch xe cũ lớn nhất Việt Nam mỗi 24h, đảm bảo mức giá luôn bám sát thị trường thực." },
    { q: "Chứng nhận Blockchain có tác dụng gì?", a: "Smart Contract giúp minh bạch hóa lịch sử định giá, hoàn toàn không thể bị chỉnh sửa hay làm giả bởi bất kỳ bên thứ ba nào." },
    { q: "Quyền lợi đặc biệt của VIP Dealer?", a: "Tài khoản VIP sẽ được miễn phí 100% Gas Fee mạng lưới, định giá không giới hạn và được mở khóa biểu đồ dự báo xu hướng rớt giá 12 tháng tới." }
  ];

  return (
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-transparent text-slate-900 dark:text-white font-sans pb-20 overflow-x-hidden -mt-12">
      
      <style dangerouslySetInnerHTML={{__html: `
        .reveal-on-scroll { transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .analytic-grid line { stroke: rgba(255,255,255,0.05); stroke-dasharray: 4 4; }
        .analytic-axis text { fill: #6b7280; font-size: 10px; font-weight: 600; font-family: monospace; }
      `}} />

      <GlowyWavesHero onTryNow={onTryNow} />
      
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-20 pb-16">
        
        {/* OVERVIEW SECTION */}
        

        {/* DATA ANALYSIS SECTION */}
        <motion.div 
          id="dinh-gia"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/10 dark:border-white/10 pb-6"
        >
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Phân Tích Dữ Liệu Thị Trường
            </h2>
            <p className="text-gray-700 dark:text-gray-500 font-mono text-xs mt-2 uppercase tracking-[0.2em]">Real-time Market Analytics Dashboard</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0 font-mono text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2 bg-white dark:bg-[#111] px-4 py-2 rounded-lg border border-black/5 dark:border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-[#111] px-4 py-2 rounded-lg border border-black/5 dark:border-white/5">
              LAST UPDATE: {new Date().toLocaleTimeString('vi-VN')}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div 
              className="bg-white dark:bg-[#0a0a0c] rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <span className="text-[10px] font-black text-gray-700 dark:text-gray-500 uppercase tracking-[0.2em] font-mono">Lưu lượng truy vấn</span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{loadingStats ? '...' : totalTx.toLocaleString()}</h2>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                      12.5%
                    </span>
                  </div>
                </div>
                <span className="text-[9px] bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-black border border-blue-500/20 uppercase tracking-widest font-mono">Tuần này</span>
              </div>
              
              <div className="h-32 w-full mt-4 relative z-10 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart key={chartKey} data={trendData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} className="analytic-grid" />
                    <XAxis dataKey="time" className="analytic-axis" axisLine={false} tickLine={false} />
                    <YAxis className="analytic-axis" axisLine={false} tickLine={false} tickFormatter={(val) => `${val}`} width={30} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace' }} 
                      itemStyle={{ color: '#60a5fa' }} 
                      cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" isAnimationActive={true} animationDuration={2000} animationEasing="ease-out" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-[#0a0a0c] rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-2xl flex-1 flex flex-col relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[10px] font-black text-gray-700 dark:text-gray-500 uppercase tracking-[0.2em] font-mono">Thị Phần Thương Hiệu</h3>
                  <p className="text-[10px] text-gray-600 mt-1">Phân bổ truy vấn định giá</p>
                </div>
              </div>
              
              {loadingStats ? (
                 <div className="flex-1 flex justify-center items-center"><svg className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
              ) : chartData.length === 0 ? (
                 <div className="flex-1 flex justify-center items-center text-sm text-gray-700 dark:text-gray-500 font-mono">NO DATA</div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <div className="w-full h-44 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart key={chartKey}>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="#0a0a0c" strokeWidth={3} isAnimationActive={true} animationDuration={2000} animationEasing="ease-out">
                          {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace' }} itemStyle={{ color: '#fff' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                     {chartData.map((entry, idx) => (
                       <div key={idx} className="flex justify-between items-center bg-white dark:bg-[#111] px-3 py-2 rounded-lg border border-black/5 dark:border-white/5">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700 dark:text-gray-300 font-mono uppercase truncate">
                            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                            <span className="truncate max-w-[80px]">{entry.name}</span>
                          </div>
                          <span className="text-[10px] font-black text-slate-900 dark:text-white font-mono">{entry.value}</span>
                       </div>
                     ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white dark:bg-[#0a0a0c] rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[10px] font-black text-gray-700 dark:text-gray-500 uppercase tracking-[0.2em] font-mono">Phân tích Số Lượng</h3>
                    <p className="text-[10px] text-gray-600 mt-1">Lượt tra cứu theo hãng</p>
                  </div>
                  <span className="text-[9px] bg-purple-500/10 text-purple-700 dark:text-purple-400 px-2 py-1 rounded font-black border border-purple-500/20 uppercase tracking-widest font-mono">Vol</span>
                </div>
                
                {loadingStats ? (
                  <div className="h-48 flex justify-center items-center"><svg className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
                ) : chartData.length === 0 ? (
                  <div className="h-48 flex justify-center items-center text-sm text-gray-700 dark:text-gray-500 font-mono">NO DATA</div>
                ) : (
                  <div className="h-48 w-full -ml-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart key={chartKey} data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} className="analytic-grid" />
                        <XAxis dataKey="name" className="analytic-axis" axisLine={false} tickLine={false} />
                        <YAxis className="analytic-axis" axisLine={false} tickLine={false} width={30} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace' }}
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="url(#colorBar)" maxBarSize={30} isAnimationActive={true} animationDuration={2000} animationEasing="ease-out" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </motion.div>

              <motion.div 
                className="bg-white dark:bg-[#0a0a0c] rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[10px] font-black text-amber-500/80 uppercase tracking-[0.2em] font-mono">Top Dealer VIP</h3>
                    <p className="text-[10px] text-gray-600 mt-1">Bảng xếp hạng đóng góp</p>
                  </div>
                  <span className="text-lg">🏆</span>
                </div>

                <div className="space-y-2 mt-4">
                  {loadingStats ? (
                    <p className="text-gray-700 dark:text-gray-500 text-xs font-mono">Loading...</p>
                  ) : topContributors.length === 0 ? (
                    <p className="text-gray-700 dark:text-gray-500 text-xs italic font-mono">No data.</p>
                  ) : (
                    topContributors.map((user, idx) => {
                      const medals = ['🥇', '🥈', '🥉'];
                      const medalColors = ['text-amber-400', 'text-slate-700 dark:text-gray-300', 'text-orange-700 dark:text-orange-400'];
                      return (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 hover:border-white/10 transition-colors group/item">
                          <div className="flex items-center gap-3">
                            <span className="text-lg opacity-80 group-hover/item:opacity-100 transition-opacity">{medals[idx]}</span>
                            <div>
                              <p className={`font-bold text-xs font-mono truncate max-w-[120px] ${idx === 0 ? 'text-amber-400' : 'text-slate-700 dark:text-gray-300'}`}>{user.name}</p>
                              <p className="text-[8px] text-gray-600 uppercase tracking-[0.2em] mt-0.5 font-bold">Dealer VIP</p>
                            </div>
                          </div>
                          <div className={`font-black text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-black border border-black/5 dark:border-white/5 shadow-inner ${medalColors[idx]}`}>{user.count} TX</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="bg-white dark:bg-[#0a0a0c] rounded-2xl p-10 border border-black/10 dark:border-white/10 shadow-2xl flex-1 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-1000"></div>
              
              <div className="relative z-10 text-left max-w-lg mb-6 md:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center text-xl border border-blue-500/20">
                    ⚛️
                  </motion.div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    AI Valuation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-blue-400 to-purple-600 dark:to-purple-400">2.0</span>
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-mono">
                  Hệ thống định giá xe hơi thông minh tích hợp hơn 30+ biến số kỹ thuật. Mọi truy vấn được lưu vết trên Web3 Blockchain để đảm bảo tính minh bạch.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onTryNow} 
                className="relative z-10 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-8 rounded-xl transition-all duration-300 w-full md:w-auto whitespace-nowrap border border-blue-500 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                Kích Hoạt Công Cụ 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </motion.button>
            </motion.div>

          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-24 mt-4" id="thu-vien">
        
        <motion.div 
          className="pt-10 border-t border-black/10 dark:border-white/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                Tin Tức Cập Nhật (Live)
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Bản tin tự động đồng bộ theo thời gian thực</p>
            </div>
            <a href="https://vnexpress.net" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 font-bold hover:text-blue-700 dark:text-blue-300 transition-colors hidden md:flex items-center gap-1 group">
              Báo VnExpress <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {newsTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveNewsTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap border ${
                  activeNewsTab === tab.id
                    ? 'bg-white text-black border-white'
                    : 'bg-white dark:bg-[#111] text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          {loadingNews ? (
             <div className="flex justify-center py-10"><span className="text-gray-700 dark:text-gray-500">Đang tải tin tức...</span></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realNews.map((news, index) => (
                <a key={index} href={news.link} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-[#111] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 hover:-translate-y-2 transition-all duration-300 group cursor-pointer block flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative flex-shrink-0">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute top-4 left-4 bg-slate-100 dark:bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 px-3 py-1 rounded-full text-[10px] font-black text-slate-900 dark:text-white shadow-sm">
                      MỚI NHẤT
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-500 mb-3 uppercase tracking-widest">
                      <span className="text-red-700 dark:text-red-400">📰 {news.source}</span>
                      <span>•</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3 group-hover:text-blue-700 dark:text-blue-400 transition-colors line-clamp-2 leading-snug">{news.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mt-auto">{news.snippet}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          className="pt-10 border-t border-black/10 dark:border-white/10 grid lg:grid-cols-2 gap-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Quy Trình Định Giá Web3</h2>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={index} className="bg-white dark:bg-[#111] p-5 rounded-2xl border border-black/10 dark:border-white/10 flex items-start gap-4 hover:border-black/20 dark:hover:border-white/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg hover:shadow-white/5">
                  <div className={`text-3xl bg-slate-100 dark:bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform ${step.color}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Tại Sao Chọn OTOCHECK?</h2>
            <div className="space-y-4">
              {coreValues.map((val, index) => (
                <div key={index} className="bg-white dark:bg-[#111] rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-lg">
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-left px-6 py-5 font-bold text-slate-900 dark:text-white flex justify-between items-center text-sm hover:bg-slate-100 dark:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    {val.q}
                    <span className={`text-blue-600 dark:text-blue-500 font-mono text-xl transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>{openFaq === index ? '−' : '+'}</span>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 px-6 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">{val.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}