import codecs

content = """\"use client\";
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

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

// Mock Data for Recent Transactions
const recentTransactions = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', amount: '+0.15 ETH', avatar: 'N' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', amount: '+0.05 ETH', avatar: 'T' },
  { id: 3, name: 'Lê Hoàng C', email: 'lehoangc@email.com', amount: '+0.20 ETH', avatar: 'L' },
  { id: 4, name: 'Phạm Minh D', email: 'phamminhd@email.com', amount: '+0.05 ETH', avatar: 'P' },
  { id: 5, name: 'Dương Xuân H', email: 'duongxuanhieu22082005@gmail.com', amount: '+0.50 ETH', avatar: 'D' },
];

// Mock Data for CMS
const mockCmsArticles = [
  { id: 1, title: 'Lỗi Vượt Đèn Đỏ', category: 'Phạt Nguội', fine: '4,000,000 - 6,000,000 VNĐ' },
  { id: 2, title: 'Đi sai làn đường', category: 'Phạt Nguội', fine: '3,000,000 - 5,000,000 VNĐ' },
  { id: 3, title: 'Quá hạn đăng kiểm', category: 'Đăng Kiểm', fine: '2,000,000 - 3,000,000 VNĐ' },
];

export default function AdminTab() {
  const [logs, setLogs] = useState<any[]>([]);
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ evaluate: 0, legal: 0, searchHash: 0, users: 0, total: 0 });
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'cms' | 'logs'>('overview');

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

      // Fetch Real Users
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const usersData = await res.json();
          setRealUsers(usersData);
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
      default: return <span className="text-gray-600 font-semibold">{type}</span>;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchAction = filterAction ? log.action_type === filterAction : true;
    const matchEmail = filterEmail ? log.email.toLowerCase().includes(filterEmail.toLowerCase()) : true;
    return matchAction && matchEmail;
  });

  return (
    <div className="w-full mx-auto relative min-h-screen bg-white font-sans text-gray-900 pb-12">
      
      {/* HEADER TABS Lấy cảm hứng từ ảnh mẫu */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 flex gap-8 items-center h-14">
          <button onClick={() => setActiveTab('overview')} className={`h-full text-sm font-semibold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Tổng Quan</button>
          <button onClick={() => setActiveTab('users')} className={`h-full text-sm font-semibold border-b-2 transition-colors ${activeTab === 'users' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Người Dùng</button>
          <button onClick={() => setActiveTab('cms')} className={`h-full text-sm font-semibold border-b-2 transition-colors ${activeTab === 'cms' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Sản Phẩm (CMS)</button>
          <button onClick={() => setActiveTab('logs')} className={`h-full text-sm font-semibold border-b-2 transition-colors ${activeTab === 'logs' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Logs Hệ Thống</button>
        </div>
      </div>

      <div className="px-8 pt-8">
        
        {/* Tiêu đề & Nút thao tác góc phải */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-4">
            <button className="border border-gray-300 bg-white text-sm font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Jan 20, 2024 - Feb 09, 2024
            </button>
            <button className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm">
              Download
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 4 CARDS Y HỆT MẪU */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600">Tổng Doanh Thu</p>
                      <span className="text-gray-400 font-bold">$</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">2.4 ETH</h3>
                    <p className="text-xs text-gray-500 font-medium">+20.1% so với tháng trước</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600">Đăng ký VIP</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">+{stats.users}</h3>
                    <p className="text-xs text-gray-500 font-medium">+180.1% so với tháng trước</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600">Định Giá Xe (AI)</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">+{stats.evaluate}</h3>
                    <p className="text-xs text-gray-500 font-medium">+19% so với tháng trước</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600">Kiểm Chứng TxHash</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-1 tracking-tight">+{stats.searchHash}</h3>
                    <p className="text-xs text-gray-500 font-medium">+201 từ giờ trước</p>
                  </div>
                </div>

                {/* CHARTS & SALES HỆT MẪU */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                  {/* Cột Biểu đồ cột */}
                  <div className="lg:col-span-4 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-base font-bold text-gray-900 mb-6">Tổng Quan Lượt Sử Dụng</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                          <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}`} />
                          <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', fontWeight: 'bold', color: '#000' }} />
                          <Bar dataKey="value" fill="#111827" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Cột Danh sách Giao dịch Gần đây */}
                  <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="mb-6">
                      <h3 className="text-base font-bold text-gray-900">Giao dịch Gần đây</h3>
                      <p className="text-sm text-gray-500 mt-1">Hệ thống có {stats.searchHash} giao dịch trong tháng này.</p>
                    </div>
                    
                    <div className="space-y-6">
                      {recentTransactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 border border-gray-200">
                              {tx.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{tx.name}</p>
                              <p className="text-xs text-gray-500">{tx.email}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{tx.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: USERS & REVENUE */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[700px]">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Danh Sách Tài Khoản</h3>
                    <p className="text-sm text-gray-500 mt-1">Quản lý người dùng, phân quyền VIP và trạng thái hoạt động.</p>
                  </div>
                </div>
                <div className="overflow-auto flex-1 p-6 pt-0">
                  <table className="w-full text-left">
                    <thead className="border-b-2 border-gray-100">
                      <tr><th className="py-4 font-bold text-gray-500 text-sm">Tài Khoản</th><th className="py-4 font-bold text-gray-500 text-sm text-center">Gói Sử Dụng</th><th className="py-4 font-bold text-gray-500 text-sm text-center">Trạng Thái</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {realUsers.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="py-4">
                            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{u.email}</p>
                            <p className="text-xs text-gray-500 mt-1">Ngày tham gia: {u.joined}</p>
                          </td>
                          <td className="py-4 text-center">
                            {u.tier === 'VIP' ? <span className="text-xs font-bold text-black border border-black bg-gray-100 px-3 py-1 rounded-full uppercase">VIP Dealer</span> : <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase">Miễn Phí</span>}
                          </td>
                          <td className="py-4 text-center">
                            <div className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-sm font-medium text-gray-600">Đang hoạt động</span></div>
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
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Quản Lý Nội Dung</h3>
                    <p className="text-sm text-gray-500 mt-1">Cập nhật cẩm nang pháp lý, tra cứu phạt nguội.</p>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm">
                    Thêm Bài Viết
                  </button>
                </div>
                <div className="overflow-x-auto p-6 pt-0">
                  <table className="w-full text-left">
                    <thead className="border-b-2 border-gray-100">
                      <tr><th className="py-4 font-bold text-gray-500 text-sm">Tiêu Đề</th><th className="py-4 font-bold text-gray-500 text-sm">Danh Mục</th><th className="py-4 font-bold text-gray-500 text-sm">Mức Phạt</th><th className="py-4 font-bold text-gray-500 text-sm text-right">Thao Tác</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockCmsArticles.map(art => (
                        <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 text-sm font-bold text-gray-900">{art.title}</td>
                          <td className="py-4"><span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">{art.category}</span></td>
                          <td className="py-4 text-sm text-gray-600 font-medium">{art.fine}</td>
                          <td className="py-4 text-right">
                            <button className="text-gray-900 font-bold text-sm hover:underline mr-4">Sửa</button>
                            <button className="text-red-600 font-bold text-sm hover:underline">Xoá</button>
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
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[700px]">
                <div className="p-6 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 outline-none focus:border-black" />
                    <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 outline-none focus:border-black min-w-[150px]">
                      <option value="">Tất cả thao tác</option>
                      <option value="EVALUATE_CAR">Định giá xe</option>
                      <option value="TRA_CUU_PHAT_NGUOI">Pháp lý</option>
                      <option value="SEARCH_HASH">Kiểm chứng Hash</option>
                    </select>
                    <input type="text" placeholder="Tìm theo email..." value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} className="border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 outline-none focus:border-black w-64" />
                  </div>
                  <button className="border border-gray-300 hover:bg-gray-50 text-black px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-colors">
                    Xuất CSV
                  </button>
                </div>
                
                <div className="overflow-auto flex-1 custom-scrollbar p-6 pt-0">
                  <table className="w-full text-left border-collapse">
                    <thead className="border-b-2 border-gray-100 sticky top-0 bg-white z-10">
                      <tr>
                        <th className="py-4 font-bold text-gray-500 text-sm">Thời Gian</th>
                        <th className="py-4 font-bold text-gray-500 text-sm">Email Người Dùng</th>
                        <th className="py-4 font-bold text-gray-500 text-sm">Loại Sự Kiện</th>
                        <th className="py-4 font-bold text-gray-500 text-sm text-right">Chi Tiết (JSON)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredLogs.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-12 text-gray-500 text-sm font-medium">Không có dữ liệu phù hợp.</td></tr>
                      ) : (
                        filteredLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="py-4 text-sm font-medium text-gray-500">{formatTime(log.created_at)}</td>
                            <td className="py-4 text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{log.email}</td>
                            <td className="py-4">{getActionBadge(log.action_type)}</td>
                            <td className="py-4 text-right">
                              <button onClick={() => setSelectedJson(log.action_details)} className="text-sm font-bold text-black border border-gray-200 hover:border-black bg-white px-3 py-1.5 rounded-md transition-colors">
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
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 flex flex-col max-h-[80vh]">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Chi Tiết Payload</h3>
                <button onClick={() => setSelectedJson(null)} className="text-gray-400 hover:text-black transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="p-4 overflow-auto bg-gray-50 text-gray-800 font-mono text-xs leading-relaxed">
                <pre>{JSON.stringify(selectedJson, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
"""

import codecs
file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("AdminTab.tsx updated to EXACT Analyst Design using Vietnamese!")
