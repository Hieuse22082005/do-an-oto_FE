import codecs

content = """\"use client\";
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock Data for Line Chart
const weeklyTrafficData = [
  { name: 'T2', value: 400 },
  { name: 'T3', value: 300 },
  { name: 'T4', value: 550 },
  { name: 'T5', value: 450 },
  { name: 'T6', value: 700 },
  { name: 'T7', value: 900 },
  { name: 'CN', value: 1200 },
];

// Mock Data for Users
const mockUsers = [
  { id: 1, email: 'duongxuanhieu22082005@gmail.com', tier: 'VIP', status: 'Active', joined: '2023-10-01' },
  { id: 2, email: 'nguyenvana@example.com', tier: 'Standard', status: 'Active', joined: '2023-11-15' },
  { id: 3, email: 'tranthib@example.com', tier: 'Standard', status: 'Banned', joined: '2023-12-05' },
  { id: 4, email: 'lehoangc@example.com', tier: 'VIP', status: 'Active', joined: '2024-01-20' },
];

// Mock Data for Transactions
const mockTransactions = [
  { id: 'tx_1', hash: '0x1a2b...3c4d', amount: '0.05 ETH', user: 'duongxuanhieu...', date: '2024-03-01 14:30', status: 'Success' },
  { id: 'tx_2', hash: '0x5e6f...7g8h', amount: '0.1 ETH', user: 'lehoangc...', date: '2024-03-02 09:15', status: 'Success' },
  { id: 'tx_3', hash: '0x9i0j...1k2l', amount: '0.05 ETH', user: 'nguyenvana...', date: '2024-03-05 16:45', status: 'Failed' },
];

// Mock Data for Errors
const mockErrors = [
  { id: 1, type: 'AI_TIMEOUT', desc: 'Lỗi timeout khi nhận diện ảnh biển số.', time: '10 phút trước' },
  { id: 2, type: 'RPC_ERROR', desc: 'Mất kết nối với Sepolia Testnet.', time: '1 giờ trước' },
  { id: 3, type: 'DB_WRITE_FAIL', desc: 'Lỗi ghi log người dùng vào Supabase.', time: '3 giờ trước' },
];

// Mock Data for CMS
const mockCmsArticles = [
  { id: 1, title: 'Lỗi Vượt Đèn Đỏ', category: 'Phạt Nguội', fine: '4,000,000 - 6,000,000 VNĐ' },
  { id: 2, title: 'Đi sai làn đường', category: 'Phạt Nguội', fine: '3,000,000 - 5,000,000 VNĐ' },
  { id: 3, title: 'Quá hạn đăng kiểm', category: 'Đăng Kiểm', fine: '2,000,000 - 3,000,000 VNĐ' },
];

export default function AdminTab() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ evaluate: 0, legal: 0, searchHash: 0, users: 0, total: 0 });
  const [topBrands, setTopBrands] = useState<any[]>([]);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'cms' | 'logs'>('overview');

  // Logs Filtering & Modal State
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
        .limit(200);
      
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
      const brandMap: any = {};
      const uniqueUsers = new Set();

      realData.forEach(log => {
        if (log.email) uniqueUsers.add(log.email);
        if (log.action_type === 'EVALUATE_CAR') {
          evalCount++;
          if (log.action_details?.make) {
            const brand = log.action_details.make;
            brandMap[brand] = (brandMap[brand] || 0) + 1;
          }
        } else if (log.action_type === 'TRA_CUU_PHAT_NGUOI') {
          legalCount++;
        } else if (log.action_type === 'TRA_CUU_HASH') {
          hashCount++;
        }
      });

      setStats({
        evaluate: evalCount,
        legal: legalCount,
        searchHash: hashCount,
        users: uniqueUsers.size,
        total: realData.length
      });

      const brandColors = ['from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500', 'from-orange-500 to-amber-500', 'from-purple-500 to-pink-500'];
      const sortedBrands = Object.entries(brandMap)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count], index) => ({
          name,
          count,
          percent: evalCount > 0 ? Math.round(((count as number) / evalCount) * 100) : 0,
          color: brandColors[index % brandColors.length]
        }));
      setTopBrands(sortedBrands);

    } catch (error) {
      console.error('Lỗi khi tải dữ liệu admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [filterDate]);

  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const getActionBadge = (type: string) => {
    switch (type) {
      case 'EVALUATE_CAR': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">ĐỊNH GIÁ XE</span>;
      case 'TRA_CUU_PHAT_NGUOI': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">TRA CỨU LUẬT</span>;
      case 'TRA_CUU_HASH': return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">TRA CỨU HASH</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">{type}</span>;
    }
  };

  const exportToCSV = () => {
    const headers = ['Thời gian', 'Email', 'Hành động', 'Chi tiết (JSON)'];
    const rows = logs.map(log => [
      new Date(log.created_at).toLocaleString('vi-VN'),
      log.email,
      log.action_type,
      JSON.stringify(log.action_details).replace(/"/g, '""')
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => `"${r.join('","')}"`)].join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `he_thong_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lọc Log cục bộ
  const filteredLogs = logs.filter(log => {
    const matchAction = filterAction ? log.action_type === filterAction : true;
    const matchEmail = filterEmail ? log.email.toLowerCase().includes(filterEmail.toLowerCase()) : true;
    return matchAction && matchEmail;
  });

  return (
    <div className="w-full mx-auto relative min-h-[700px] font-sans pb-10">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#020617] -z-10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* HEADER & NAV */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative z-10">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-3xl">⚙️</span> TRUNG TÂM QUẢN TRỊ
          </h2>
          <p className="text-sm text-gray-500 font-medium">Phiên bản Admin Dashboard V2.0</p>
        </div>
        <div className="flex bg-gray-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-gray-200 dark:border-slate-700">
          <button onClick={() => setActiveTab('overview')} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Tổng quan</button>
          <button onClick={() => setActiveTab('users')} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Tài khoản & Doanh thu</button>
          <button onClick={() => setActiveTab('cms')} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'cms' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Nội dung (CMS)</button>
          <button onClick={() => setActiveTab('logs')} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'logs' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Log Hệ thống</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="relative z-10 animate-[fadeIn_0.5s_ease-out]">
          
          {/* TAB: TỔNG QUAN */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* TOP CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-7xl opacity-20 group-hover:scale-110 transition-transform">🚗</div>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">LƯỢT ĐỊNH GIÁ AI</p>
                  <div className="flex items-end gap-3"><h3 className="text-4xl font-black">{stats.evaluate}</h3><span className="text-sm bg-white/20 px-2 py-0.5 rounded-full mb-1">▲ 15%</span></div>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-7xl opacity-20 group-hover:scale-110 transition-transform">🛡️</div>
                  <p className="text-red-100 text-xs font-bold uppercase tracking-wider mb-2">TRA CỨU PHÁP LÝ</p>
                  <div className="flex items-end gap-3"><h3 className="text-4xl font-black">{stats.legal}</h3><span className="text-sm bg-white/20 px-2 py-0.5 rounded-full mb-1">▼ 3%</span></div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-7xl opacity-20 group-hover:scale-110 transition-transform">🔗</div>
                  <p className="text-purple-100 text-xs font-bold uppercase tracking-wider mb-2">KIỂM CHỨNG TXHASH</p>
                  <div className="flex items-end gap-3"><h3 className="text-4xl font-black">{stats.searchHash}</h3><span className="text-sm bg-white/20 px-2 py-0.5 rounded-full mb-1">▲ 24%</span></div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-7xl opacity-20 group-hover:scale-110 transition-transform">💎</div>
                  <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">TỔNG DOANH THU</p>
                  <div className="flex items-end gap-3"><h3 className="text-4xl font-black">2.4<span className="text-lg">ETH</span></h3><span className="text-sm bg-white/20 px-2 py-0.5 rounded-full mb-1">▲ 8%</span></div>
                </div>
              </div>

              {/* CHARTS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Lưu lượng truy cập hệ thống (7 Ngày)</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyTrafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                        <RechartsTooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Lỗi Hệ Thống Gần Đây</h3>
                    <div className="space-y-3">
                      {mockErrors.map(err => (
                        <div key={err.id} className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-red-600 dark:text-red-400">{err.type}</span>
                            <span className="text-[10px] text-gray-500">{err.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{err.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Tỉ Lệ Tương Tác</h3>
                    <div className="w-full h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden flex mb-4">
                      <div className="bg-blue-500 h-full" style={{ width: `${stats.total > 0 ? (stats.evaluate/stats.total)*100 : 0}%` }}></div>
                      <div className="bg-red-500 h-full" style={{ width: `${stats.total > 0 ? (stats.legal/stats.total)*100 : 0}%` }}></div>
                      <div className="bg-purple-500 h-full" style={{ width: `${stats.total > 0 ? (stats.searchHash/stats.total)*100 : 0}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-gray-500">
                      <span><span className="text-blue-500">■</span> Định Giá</span>
                      <span><span className="text-red-500">■</span> Pháp Lý</span>
                      <span><span className="text-purple-500">■</span> Hash</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: USERS & REVENUE */}
          {activeTab === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col h-[600px]">
                <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Quản Lý Người Dùng</h3>
                </div>
                <div className="overflow-auto flex-1">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-[11px] uppercase tracking-wider text-gray-500 sticky top-0">
                      <tr><th className="p-4">Tài khoản</th><th className="p-4 text-center">Gói</th><th className="p-4 text-center">Trạng thái</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                      {mockUsers.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                          <td className="p-4"><p className="text-sm font-bold text-gray-900 dark:text-gray-200">{u.email}</p><p className="text-xs text-gray-400">Tham gia: {u.joined}</p></td>
                          <td className="p-4 text-center">
                            {u.tier === 'VIP' ? <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-xs font-bold">VIP</span> : <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold">Standard</span>}
                          </td>
                          <td className="p-4 text-center">
                            {u.status === 'Active' ? <span className="text-emerald-500 font-bold text-xs">Hoạt động</span> : <span className="text-red-500 font-bold text-xs">Bị khoá</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col h-[600px]">
                <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Lịch Sử Nâng Cấp VIP (Doanh Thu)</h3>
                </div>
                <div className="overflow-auto flex-1">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-[11px] uppercase tracking-wider text-gray-500 sticky top-0">
                      <tr><th className="p-4">TxHash / Thời gian</th><th className="p-4">Số tiền</th><th className="p-4 text-center">Trạng thái</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                      {mockTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                          <td className="p-4">
                            <p className="text-sm font-mono text-blue-600 dark:text-blue-400 font-bold">{tx.hash}</p>
                            <p className="text-xs text-gray-400">{tx.date} • {tx.user}</p>
                          </td>
                          <td className="p-4 font-black text-gray-900 dark:text-white">{tx.amount}</td>
                          <td className="p-4 text-center">
                            {tx.status === 'Success' ? <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">Thành công</span> : <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold">Thất bại</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CMS */}
          {activeTab === 'cms' && (
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Hệ Thống Quản Trị Nội Dung (CMS)</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md">
                  + Thêm Bài Viết Mới
                </button>
              </div>
              <div className="overflow-x-auto border border-gray-200 dark:border-slate-800 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-slate-800 text-[11px] uppercase tracking-wider text-gray-500">
                    <tr><th className="p-4">Tiêu đề bài viết</th><th className="p-4">Danh mục</th><th className="p-4">Mức phạt</th><th className="p-4 text-center">Thao tác</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {mockCmsArticles.map(art => (
                      <tr key={art.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                        <td className="p-4 font-bold text-gray-900 dark:text-white">{art.title}</td>
                        <td className="p-4"><span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-xs font-bold text-slate-600 dark:text-slate-300">{art.category}</span></td>
                        <td className="p-4 text-red-500 font-medium text-sm">{art.fine}</td>
                        <td className="p-4 text-center space-x-2">
                          <button className="text-blue-500 hover:text-blue-700 text-sm font-bold">Sửa</button>
                          <button className="text-red-500 hover:text-red-700 text-sm font-bold">Xoá</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: LOGS */}
          {activeTab === 'logs' && (
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[700px]">
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50 dark:bg-slate-900/50">
                <div className="flex gap-4 items-center flex-wrap">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1">Lọc theo ngày</label>
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-white outline-none" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1">Loại thao tác</label>
                    <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-white outline-none min-w-[150px]">
                      <option value="">Tất cả</option>
                      <option value="EVALUATE_CAR">Định giá xe</option>
                      <option value="TRA_CUU_PHAT_NGUOI">Tra cứu pháp lý</option>
                      <option value="TRA_CUU_HASH">Kiểm chứng TxHash</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1">Tìm Email</label>
                    <input type="text" placeholder="Nhập email..." value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-white outline-none" />
                  </div>
                </div>
                
                <button onClick={exportToCSV} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
                  📥 Xuất Excel/CSV
                </button>
              </div>
              
              <div className="overflow-auto flex-1 custom-scrollbar relative">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10 border-b border-gray-200 dark:border-slate-700">
                    <tr className="text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-widest">
                      <th className="px-6 py-4 font-black">Thời gian</th>
                      <th className="px-6 py-4 font-black">Tài khoản (Email)</th>
                      <th className="px-6 py-4 font-black text-center">Hành động</th>
                      <th className="px-6 py-4 font-black text-center">Dữ liệu bóc tách</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {filteredLogs.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-12 text-gray-500 font-medium">Không tìm thấy dữ liệu.</td></tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-xs font-bold text-gray-500">{formatTime(log.created_at)}</td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-800 dark:text-gray-200">{log.email}</td>
                          <td className="px-6 py-4 text-center">{getActionBadge(log.action_type)}</td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => setSelectedJson(log.action_details)} className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                              👁️ Xem chi tiết
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900">
              <h3 className="font-black text-gray-900 dark:text-white">Chi Tiết Payload (JSON)</h3>
              <button onClick={() => setSelectedJson(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 rounded-full w-8 h-8 flex items-center justify-center font-bold transition-colors">✕</button>
            </div>
            <div className="p-6 overflow-auto bg-slate-950 text-emerald-400 font-mono text-sm leading-relaxed custom-scrollbar">
              <pre>{JSON.stringify(selectedJson, null, 2)}</pre>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 text-right">
              <button onClick={() => setSelectedJson(null)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md transition-colors">Đóng</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
"""

import codecs
file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("AdminTab.tsx has been completely rebuilt with new features!")
