"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminTab() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ evaluate: 0, legal: 0, searchHash: 0, users: 0, total: 0 });
  const [topBrands, setTopBrands] = useState<any[]>([]);
  
  // STATE MỚI: Lọc theo ngày
  const [filterDate, setFilterDate] = useState<string>('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. TẠO QUERY CƠ BẢN
      let query = supabase
        .from('user_activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200); // Tăng limit lên 200 để lấy được nhiều dữ liệu hơn trong 1 ngày
      
      // 2. NẾU CÓ CHỌN NGÀY -> ÁP DỤNG BỘ LỌC TỪ 00:00:00 ĐẾN 23:59:59 CỦA NGÀY ĐÓ
      if (filterDate) {
        const startOfDay = new Date(`${filterDate}T00:00:00`);
        const endOfDay = new Date(`${filterDate}T23:59:59.999`);
        
        query = query
          .gte('created_at', startOfDay.toISOString())
          .lte('created_at', endOfDay.toISOString());
      }

      // 3. GỌI API SUPABASE
      const { data, error } = await query;
      
      if (error) throw error;
      const realData = data || [];
      setLogs(realData);

      // 4. TÍNH TOÁN LẠI CHỈ SỐ THỐNG KÊ (Chỉ tính những log của ngày đang chọn)
      let evalCount = 0;
      let legalCount = 0;
      let hashCount = 0;
      const brandMap: any = {};
      const uniqueUsers = new Set();

      realData.forEach(log => {
        if (log.email) uniqueUsers.add(log.email);

        if (log.action_type === 'EVALUATE_CAR') evalCount++;
        else if (log.action_type === 'CHECK_FINES' || log.action_type === 'CHECK_REGISTRY') legalCount++;
        else if (log.action_type === 'SEARCH_HASH') hashCount++;

        if (log.action_type === 'EVALUATE_CAR' && log.action_details?.brand) {
          const b = log.action_details.brand;
          brandMap[b] = (brandMap[b] || 0) + 1;
        }
      });

      setStats({ 
        evaluate: evalCount, 
        legal: legalCount, 
        searchHash: hashCount,
        users: uniqueUsers.size,
        total: evalCount + legalCount + hashCount
      });

      const brandArray = Object.keys(brandMap).map(key => ({
        name: key,
        count: brandMap[key],
        percent: evalCount > 0 ? Math.round((brandMap[key] / evalCount) * 100) : 0,
        color: ['from-blue-500 to-cyan-400', 'from-red-500 to-orange-400', 'from-green-500 to-emerald-400', 'from-purple-500 to-indigo-400'][Math.floor(Math.random() * 4)]
      })).sort((a, b) => b.count - a.count).slice(0, 4);

      setTopBrands(brandArray);

    } catch (err) {
      console.error('Lỗi khi tải data Admin:', err);
    } finally {
      setLoading(false);
    }
  };

  // Tự động fetch lại data mỗi khi thay đổi ngày
  useEffect(() => {
    fetchAdminData();
  }, [filterDate]);

  // FIX LỖI XUỐNG DÒNG: Thêm whitespace-nowrap và inline-block vào TẤT CẢ các Badge
  const getActionBadge = (action: string) => {
    const baseClass = "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap inline-block text-center";
    switch (action) {
      case 'EVALUATE_CAR': return <span className={`${baseClass} bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`}>ĐỊNH GIÁ AI</span>;
      case 'CHECK_FINES': return <span className={`${baseClass} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`}>PHẠT NGUỘI</span>;
      case 'CHECK_REGISTRY': return <span className={`${baseClass} bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400`}>ĐĂNG KIỂM</span>;
      case 'SEARCH_HASH': return <span className={`${baseClass} bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400`}>TRA CỨU HASH</span>;
      case 'LOGIN': return <span className={`${baseClass} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400`}>ĐĂNG NHẬP</span>;
      case 'LOGOUT': return <span className={`${baseClass} bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-400`}>ĐĂNG XUẤT</span>;
      default: return <span className={`${baseClass} bg-gray-100 text-gray-700`}>{action}</span>;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="w-full bg-transparent pb-20 font-sans transition-colors duration-300 relative">
      
      <div className="absolute top-0 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* HEADER BẢNG ĐIỀU KHIỂN & BỘ LỌC */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 animate-[fadeInDown_0.5s_ease-out]">
        <div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-indigo-100/50 dark:border-indigo-800/30 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping relative"><span className="absolute inset-0 rounded-full bg-indigo-500"></span></span> 
            LIVE DASHBOARD SUPABASE
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Trung Tâm <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Quản Trị</span></h1>
        </div>
        
        {/* KHU VỰC CÔNG CỤ (DATE PICKER & BUTTON) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-9 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 shadow-[0_8px_20px_rgb(0,0,0,0.04)] outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer"
            />
            {filterDate && (
              <button onClick={() => setFilterDate('')} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-sm hover:scale-110 transition-transform" title="Xóa bộ lọc">✕</button>
            )}
          </div>

          <button 
            onClick={fetchAdminData} 
            disabled={loading}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 font-bold px-6 py-3 rounded-xl text-sm shadow-[0_8px_20px_rgb(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 group"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-4 h-4 text-indigo-600 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            )}
            Đồng bộ
          </button>
        </div>
      </div>

      {/* 4 THẺ THỐNG KÊ (CẬP NHẬT THEO NGÀY CHỌN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-[fadeInUp_0.5s_ease-out]">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-[1.5rem] shadow-lg shadow-blue-500/20 text-white relative overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg></div>
          <p className="text-blue-100 font-bold text-sm mb-1 relative z-10 uppercase tracking-wider">Lượt Định Giá AI</p>
          <h3 className="text-4xl font-black relative z-10">{stats.evaluate}</h3>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-red-600 p-6 rounded-[1.5rem] shadow-lg shadow-red-500/20 text-white relative overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg></div>
          <p className="text-red-100 font-bold text-sm mb-1 relative z-10 uppercase tracking-wider">Tra Cứu Pháp Lý</p>
          <h3 className="text-4xl font-black relative z-10">{stats.legal}</h3>
        </div>

        <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 p-6 rounded-[1.5rem] shadow-lg shadow-purple-500/20 text-white relative overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -right-4 -top-4 text-white/10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500"><svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg></div>
          <p className="text-purple-100 font-bold text-sm mb-1 relative z-10 uppercase tracking-wider">Kiểm Chứng TxHash</p>
          <h3 className="text-4xl font-black relative z-10">{stats.searchHash}</h3>
        </div>

        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-6 rounded-[1.5rem] shadow-lg shadow-emerald-500/20 text-white relative overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -right-2 top-0 text-white/10 group-hover:scale-110 transition-transform duration-500"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
          <p className="text-emerald-100 font-bold text-sm mb-1 relative z-10 uppercase tracking-wider">Người Dùng Thực</p>
          <h3 className="text-4xl font-black relative z-10">{stats.users}</h3>
        </div>
      </div>

      {/* LƯỚI NỘI DUNG CHÍNH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-[fadeInUp_0.6s_ease-out]">
        
        {/* BẢNG LOGS */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 z-10">
            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">📝</span> Dòng Thời Gian Hệ Thống
            </h3>
            <span className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
              {filterDate ? `Ngày ${filterDate.split('-').reverse().join('/')}` : 'Tất cả thời gian'} ({logs.length})
            </span>
          </div>
          
          <div className="overflow-auto max-h-[500px] custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md z-10 border-b border-gray-200 dark:border-slate-700">
                <tr className="text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-widest">
                  <th className="px-6 py-4 font-black">Thời gian</th>
                  <th className="px-6 py-4 font-black">Tài khoản (Email)</th>
                  <th className="px-6 py-4 font-black text-center">Hành động</th>
                  <th className="px-6 py-4 font-black">Dữ liệu bóc tách (JSON)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                {logs.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-gray-500 font-medium">Không có dữ liệu trong khoảng thời gian này.</td></tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 whitespace-nowrap group-hover:text-blue-500 transition-colors">
                        {formatTime(log.created_at)}
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-800 dark:text-gray-200">
                        {log.email}
                      </td>
                      <td className="px-6 py-5 text-center">
                        {getActionBadge(log.action_type)}
                      </td>
                      <td className="px-6 py-5">
                        <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700 p-2.5 rounded-xl max-w-[250px]">
                          <pre className="text-[11px] text-gray-600 dark:text-gray-300 font-mono overflow-x-auto custom-scrollbar leading-relaxed">
                            {JSON.stringify(log.action_details, null, 2)}
                          </pre>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* THỐNG KÊ CHI TIẾT */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Tỉ Lệ Tương Tác</h3>
            
            <div className="w-full h-4 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden flex mb-6 shadow-inner">
              <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${stats.total > 0 ? (stats.evaluate/stats.total)*100 : 0}%` }}></div>
              <div className="bg-red-500 h-full transition-all duration-1000" style={{ width: `${stats.total > 0 ? (stats.legal/stats.total)*100 : 0}%` }}></div>
              <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${stats.total > 0 ? (stats.searchHash/stats.total)*100 : 0}%` }}></div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="font-bold text-gray-700 dark:text-gray-300">Định Giá Xe</span></div>
                <span className="font-black text-gray-900 dark:text-white">{stats.total > 0 ? Math.round((stats.evaluate/stats.total)*100) : 0}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="font-bold text-gray-700 dark:text-gray-300">Tra Cứu Luật/Phạt</span></div>
                <span className="font-black text-gray-900 dark:text-white">{stats.total > 0 ? Math.round((stats.legal/stats.total)*100) : 0}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span><span className="font-bold text-gray-700 dark:text-gray-300">Kiểm Chứng Hash</span></div>
                <span className="font-black text-gray-900 dark:text-white">{stats.total > 0 ? Math.round((stats.searchHash/stats.total)*100) : 0}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Top Xe Định Giá Nhiều Nhất</h3>
            <div className="space-y-6">
              {topBrands.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                  <span className="text-2xl mb-2 block opacity-50">🚙</span>
                  <p className="text-sm font-medium text-gray-500">Chưa có dữ liệu định giá.</p>
                </div>
              ) : (
                topBrands.map((brand, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-black text-gray-700 dark:text-gray-200 group-hover:text-indigo-500 transition-colors">{brand.name}</span>
                      <span className="text-gray-500 font-bold bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">{brand.percent}% ({brand.count})</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                      <div className={`h-full rounded-full bg-gradient-to-r ${brand.color} transition-all duration-1000 ease-out`} style={{ width: `${brand.percent}%` }}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}