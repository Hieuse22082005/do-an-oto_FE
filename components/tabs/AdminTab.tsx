"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';


// Mock Data for Top Brands
const topBrandsData = [
  { name: 'Toyota', value: 450 },
  { name: 'Honda', value: 320 },
  { name: 'Ford', value: 210 },
  { name: 'Hyundai', value: 180 },
];
const BRAND_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
const REVENUE_COLORS = ['#f59e0b', '#3b82f6', '#10b981'];
const revenueSources = [
  { name: 'Gói VIP', value: 1.5 },
  { name: 'Phí Gas Web3', value: 0.6 },
  { name: 'Khác', value: 0.3 }
];

// Mock Data for Main Bar Chart (Monthly)
const monthlyData = [
  { name: 'Thg 1', value: 1200 },
  { name: 'Thg 2', value: 2100 },
  { name: 'Thg 3', value: 800 },
  { name: 'Thg 4', value: 1600 },
  { name: 'Thg 5', value: 900 },
  { name: 'Thg 6', value: 1100 },
  { name: 'Thg 7', value: 2500 },
];



// Mock Data for CMS
const mockCmsArticles = [
  { id: 1, title: 'Lỗi Vượt Đèn Đỏ', category: 'Phạt Nguội', fine: '4,000,000 - 6,000,000 VNĐ' },
  { id: 2, title: 'Đi sai làn đường', category: 'Phạt Nguội', fine: '3,000,000 - 5,000,000 VNĐ' },
  { id: 3, title: 'Quá hạn đăng kiểm', category: 'Đăng Kiểm', fine: '2,000,000 - 3,000,000 VNĐ' },
];

export default function AdminTab() {
  const [logs, setLogs] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  

  

  const [transactions, setTransactions] = useState<any[]>([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', amount: '+0.15 ETH', avatar: 'N' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', amount: '+0.05 ETH', avatar: 'T' },
    { id: 3, name: 'Lê Hoàng C', email: 'lehoangc@email.com', amount: '+0.20 ETH', avatar: 'L' },
    { id: 4, name: 'Phạm Minh D', email: 'phamminhd@email.com', amount: '+0.05 ETH', avatar: 'P' },
    { id: 5, name: 'Dương Xuân H', email: 'duongxuanhieu22082005@gmail.com', amount: '+0.50 ETH', avatar: 'D' },
  ]);

  const [stats, setStats] = useState({ evaluate: 0, legal: 0, searchHash: 0, users: 0, total: 0 });
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'cms' | 'logs' | 'bookings'>('overview');

  // Animated Chart Data Trigger
  const [chartData, setChartData] = useState({ bar: [] as any[], rev: [] as any[], brand: [] as any[] });
  useEffect(() => {
    if (activeTab === 'overview') {
      setChartData({ bar: [], rev: [], brand: [] });
      const t = setTimeout(() => {
        setChartData({ bar: monthlyData, rev: revenueSources, brand: topBrandsData });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [activeTab]);

  // Logs Filtering
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterAction, setFilterAction] = useState<string>('');
  const [filterEmail, setFilterEmail] = useState<string>('');
  const [selectedJson, setSelectedJson] = useState<any>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('user_activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(300);
      
      if (filterDate) {
        const startOfDay = new Date(`${filterDate}T00:00:00`);
        const endOfDay = new Date(`${filterDate}T23:59:59.999`);
        query = query.gte('created_at', startOfDay.toISOString()).lte('created_at', endOfDay.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      const realData = data || [];
      setLogs(realData);

      let evalCount = 0; let legalCount = 0; let hashCount = 0;
      const uniqueUsers = new Set();

      realData.forEach(log => {
        if (log.email) uniqueUsers.add(log.email);
        if (log.action_type === 'EVALUATE_CAR') evalCount++;
        else if (['TRA_CUU_PHAT_NGUOI', 'TRA_CUU_DANG_KIEM', 'SEARCH_FINES'].includes(log.action_type)) legalCount++;
        else if (log.action_type === 'SEARCH_HASH') hashCount++;
      });

      setStats({
        evaluate: evalCount,
        legal: legalCount,
        searchHash: hashCount,
        users: uniqueUsers.size,
        total: realData.length
      });

      
      // Fetch Bookings
      try {
        const { data: bData, error: bError } = await supabase.from('car_bookings').select('*').order('created_at', { ascending: false });
        if (!bError && bData) setBookings(bData);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }

      // Fetch Real Users
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const usersData = await res.json();
          setRealUsers(usersData);

      // Thử đồng bộ dữ liệu giao dịch thật từ bảng (nếu có)
      // Ví dụ: bảng 'transactions' hoặc 'vip_upgrades'
      try {
        const { data: txData, error: txError } = await supabase
          .from('transactions') // Thay tên bảng thực tế vào đây
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (!txError && txData && txData.length > 0) {
           const formattedTx = txData.map((tx: any) => ({
             id: tx.id,
             name: tx.user_email ? tx.user_email.split('@')[0] : 'Khách',
             email: tx.user_email || 'Ẩn danh',
             amount: tx.predicted_price ? `$${tx.predicted_price.toLocaleString()}` : 'N/A',
             avatar: (tx.user_email || 'K').charAt(0).toUpperCase()
           }));
           // Nếu có dữ liệu thật thì ghi đè dữ liệu mẫu
           setTransactions(formattedTx);
        }
      } catch (err) {
        console.log("Chưa có bảng transactions, dùng dữ liệu mẫu.");
      }

        }
      } catch (err) {
        console.error("Lỗi lấy danh sách user", err);
      }

    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();

    const subscription = supabase
      .channel('user_activity_logs_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_activity_logs' },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchAdminData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [filterDate]);

  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const getActionBadge = (type: string) => {
    switch (type) {
      case 'EVALUATE_CAR': return <span className="text-blue-600 font-semibold">Định giá</span>;
      case 'TRA_CUU_PHAT_NGUOI': return <span className="text-orange-600 font-semibold">Pháp lý</span>;
      case 'SEARCH_HASH': return <span className="text-indigo-600 font-semibold">Blockchain</span>;
      case 'BOOK_CAR': return <span className="text-amber-600 font-semibold">Đặt Lịch</span>;
      default: return <span className="text-gray-600 dark:text-gray-400 font-semibold">{type}</span>;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchAction = filterAction ? log.action_type === filterAction : true;
    const matchEmail = filterEmail ? log.email.toLowerCase().includes(filterEmail.toLowerCase()) : true;
    return matchAction && matchEmail;
  });

  return (
    <div 
      className="w-full mx-auto relative min-h-screen font-sans text-slate-800 dark:text-slate-200 pb-12"
      
    >
      <div className="relative z-10 w-full mx-auto px-2 sm:px-4 lg:px-6 pt-4">
      
      {/* HEADER TABS Lấy cảm hứng từ ảnh mẫu */}
      <div className="border-b border-black/10 dark:border-white/10 sticky top-20 z-40 bg-white/60 dark:bg-black/40 backdrop-blur-2xl -mt-16 mb-8" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="w-full max-w-[1600px] mx-auto px-8 md:px-14 flex gap-8 items-center h-14">
          {['overview', 'users', 'cms', 'logs'].map((tabKey) => {
            const labels: any = { overview: 'Tổng Quan', users: 'Người Dùng', bookings: 'Đặt Lịch Xe', cms: 'Sản Phẩm (CMS)', logs: 'Logs Hệ Thống' };
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey as any)}
                className={`relative h-full px-4 text-sm font-bold transition-all duration-300 ease-out active:scale-95 flex items-center justify-center group overflow-hidden ${activeTab === tabKey ? 'text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <span className="relative z-10">{labels[tabKey]}</span>
                {activeTab === tabKey && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-sm" />
                )}
                <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-8 pt-8">
        
        {/* Tiêu đề & Nút thao tác góc phải */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="animate-[fadeInUp_0.5s_ease-out]">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 4 CARDS Y HỆT MẪU */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng Doanh Thu</p>
                      <span className="text-gray-600 dark:text-gray-400 font-bold">$</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">2.4 ETH</h3>
                    <p className="text-xs text-gray-700 dark:text-gray-500 font-medium">+20.1% so với tháng trước</p>
                  </div>
                  
                  <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đăng ký VIP</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400 group-hover:text-black group-hover:scale-110 transition-transform duration-300"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">+{stats.users}</h3>
                    <p className="text-xs text-gray-700 dark:text-gray-500 font-medium">+180.1% so với tháng trước</p>
                  </div>

                  <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Định Giá Xe (AI)</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400 group-hover:text-black group-hover:scale-110 transition-transform duration-300"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">+{stats.evaluate}</h3>
                    <p className="text-xs text-gray-700 dark:text-gray-500 font-medium">+19% so với tháng trước</p>
                  </div>

                  <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Kiểm Chứng TxHash</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400 group-hover:text-black group-hover:scale-110 transition-transform duration-300"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">+{stats.searchHash}</h3>
                    <p className="text-xs text-gray-700 dark:text-gray-500 font-medium">+201 từ giờ trước</p>
                  </div>
                </div>

                {/* CHARTS & SALES HỆT MẪU */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                  {/* Cột Biểu đồ cột */}
                  <div className="lg:col-span-4 bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Tổng Quan Lượt Sử Dụng</h3>
                    <div className="flex-1 w-full min-h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.bar} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                              <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                          <YAxis tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}`} />
                          <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 'bold', color: '#fff', backgroundColor: '#020617' }} />
                          <Bar dataKey="value" fill="url(#colorBar)" radius={[4, 4, 0, 0]} maxBarSize={80} isAnimationActive={true} animationBegin={100} animationDuration={2000} animationEasing="ease-out" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Cột Danh sách Giao dịch Gần đây */}
                  <div className="lg:col-span-3 bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="mb-6">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Giao dịch Gần đây</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-500 mt-1">Hệ thống có {stats.searchHash} giao dịch trong tháng này.</p>
                    </div>
                    
                    <div className="space-y-6">
                      {transactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-gray-600 dark:text-gray-400 border border-slate-200 dark:border-slate-800">
                              {tx.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{tx.name}</p>
                              <p className="text-xs text-gray-700 dark:text-gray-500">{tx.email}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{tx.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PIE CHARTS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Doanh thu */}
                  <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Nguồn Doanh Thu (ETH)</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData.rev}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={130}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={true}
                            animationBegin={400}
                            animationDuration={1500}
                            animationEasing="ease-out"
                          >
                            {revenueSources.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} className="hover:opacity-80 transition-opacity duration-200 cursor-pointer outline-none" />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 'bold', color: '#fff', backgroundColor: '#020617' }} 
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => `${value} ETH`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      {revenueSources.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: REVENUE_COLORS[index % REVENUE_COLORS.length] }}></span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Brands */}
                  <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Thị Hiếu Hãng Xe (Lượt Định Giá)</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData.brand}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={130}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={true}
                            animationBegin={600}
                            animationDuration={1500}
                            animationEasing="ease-out"
                          >
                            {topBrandsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} className="hover:opacity-80 transition-opacity duration-200 cursor-pointer outline-none" />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 'bold', color: '#fff', backgroundColor: '#020617' }} 
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => `${value} lượt`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      {topBrandsData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: BRAND_COLORS[index % BRAND_COLORS.length] }}></span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: USERS & REVENUE */}
            {activeTab === 'users' && (
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[700px]">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Danh Sách Tài Khoản</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-500 mt-1">Quản lý người dùng, phân quyền VIP và trạng thái hoạt động.</p>
                  </div>
                </div>
                <div className="overflow-auto flex-1 p-6 pt-0">
                  <table className="w-full text-left">
                    <thead className="border-b-2 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0a0f1c]/50">
                      <tr><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm">Tài Khoản</th><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm text-center">Gói Sử Dụng</th><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm text-center">Trạng Thái</th><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm text-right">Quản Trị</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {realUsers.map(u => (
                        <tr key={u.id} className="hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 group">
                          <td className="px-4 py-4">
                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200 inline-block">{u.email}</p>
                            <p className="text-xs text-gray-700 dark:text-gray-500 mt-1">Ngày tham gia: {u.joined}</p>
                          </td>
                          <td className="px-4 py-4 text-center">
                            {u.tier === 'VIP' ? <span className="text-xs font-bold text-black border border-black bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white px-3 py-1 rounded-full uppercase">VIP Dealer</span> : <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white px-3 py-1 rounded-full uppercase">Miễn Phí</span>}
                          </td>
                                                    <td className="px-4 py-4 text-center">
                            <div className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang hoạt động</span></div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-xs font-bold text-red-500 bg-red-50 border border-red-100 hover:bg-red-500 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded transition-all shadow-sm">Khóa (Ban)</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: CMS */}
            {activeTab === 'cms' && (
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quản Lý Nội Dung</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-500 mt-1">Cập nhật cẩm nang pháp lý, tra cứu phạt nguội.</p>
                  </div>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                    Thêm Bài Viết
                  </button>
                </div>
                <div className="overflow-x-auto p-6 pt-0">
                  <table className="w-full text-left">
                    <thead className="border-b-2 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0a0f1c]/50">
                      <tr><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm">Tiêu Đề</th><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm">Danh Mục</th><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm">Mức Phạt</th><th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm text-right">Thao Tác</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {mockCmsArticles.map(art => (
                        <tr key={art.id} className="hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200">
                          <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-white">{art.title}</td>
                          <td className="px-4 py-4"><span className="bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-800/50 px-3 py-1 rounded-full text-xs font-medium">{art.category}</span></td>
                          <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">{art.fine}</td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-blue-700 dark:text-blue-400 hover:text-blue-700 dark:text-blue-300 font-bold text-sm hover:underline mr-4 transition-colors">Sửa</button>
                            <button className="text-red-700 dark:text-red-400 hover:text-red-700 dark:text-red-300 font-bold text-sm hover:underline transition-colors">Xoá</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            
              {/* TAB: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[700px]">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quản Lý Đặt Lịch Xem Xe</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-500 mt-1">Danh sách khách hàng yêu cầu xem xe và trạng thái xử lý.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Tổng cộng: {bookings.length}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-0">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Khách Hàng</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Liên Hệ</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Mẫu Xe</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Lịch Hẹn</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Trạng Thái</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">Ngày Đặt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                        {bookings.map((b: any) => (
                          <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                            <td className="p-4">
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{b.customer_name}</p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-slate-900 dark:text-slate-300">{b.phone}</p>
                              <p className="text-xs text-slate-500">{b.email}</p>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-semibold">{b.car_model}</span>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-slate-900 dark:text-white">{b.booking_date}</p>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-slate-500">{new Date(b.created_at).toLocaleDateString('vi-VN')}</p>
                            </td>
                          </tr>
                        ))}
                        {bookings.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500">Không có dữ liệu đặt lịch.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: LOGS */}
            {activeTab === 'logs' && (
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[700px]">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border border-black/20 dark:border-white/20 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
                    <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="border border-black/20 dark:border-white/20 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors min-w-[150px]">
                      <option value="">Tất cả thao tác</option>
                      <option value="EVALUATE_CAR">Định giá xe</option>
                      <option value="TRA_CUU_PHAT_NGUOI">Pháp lý</option>
                      <option value="SEARCH_HASH">Kiểm chứng Hash</option>
                    </select>
                    <input type="text" placeholder="Tìm theo email..." value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} className="border border-black/20 dark:border-white/20 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors w-64" />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors border border-transparent flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Xuất CSV
                  </button>
                </div>
                
                <div className="overflow-auto flex-1 custom-scrollbar p-6 pt-0">
                  <table className="w-full text-left border-collapse">
                    <thead className="border-b-2 border-slate-200 dark:border-slate-800 sticky top-0 bg-white/60 dark:bg-black/40 backdrop-blur-2xl z-10">
                      <tr>
                        <th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm">Thời Gian</th>
                        <th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm">Email Người Dùng</th>
                        <th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm">Loại Sự Kiện</th>
                        <th className="px-4 py-4 font-bold text-gray-700 dark:text-gray-500 text-sm text-right">Chi Tiết (JSON)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredLogs.length === 0 ? (
                        <tr><td colSpan={4} className="px-4 text-center py-12 text-gray-700 dark:text-gray-500 text-sm font-medium">Không có dữ liệu phù hợp.</td></tr>
                      ) : (
                        filteredLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 group">
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-500">{formatTime(log.created_at)}</td>
                            <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200 inline-block">{log.email}</td>
                            <td className="px-4 py-4">{getActionBadge(log.action_type)}</td>
                            <td className="px-4 py-4 text-right">
                              <button onClick={() => setSelectedJson(log.action_details)} className="text-sm font-medium border border-slate-300 dark:border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-md transition-colors">
                                Xem Data
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* JSON MODAL */}
        {selectedJson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-[fadeIn_0.1s_ease-out]">
            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[80vh]">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white">Chi Tiết Payload</h3>
                <button onClick={() => setSelectedJson(null)} className="text-gray-600 dark:text-gray-400 hover:text-black transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="p-4 overflow-auto bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-mono text-xs leading-relaxed">
                <pre>{JSON.stringify(selectedJson, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}
