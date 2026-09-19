import codecs

content = """\"use client\";
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// Mock Data for Line Chart
const weeklyTrafficData = [
  { name: '10/09', value: 420 },
  { name: '11/09', value: 380 },
  { name: '12/09', value: 650 },
  { name: '13/09', value: 550 },
  { name: '14/09', value: 890 },
  { name: '15/09', value: 1050 },
  { name: '16/09', value: 1320 },
];

const revenueData = [
  { name: 'T1', value: 1.2 },
  { name: 'T2', value: 1.5 },
  { name: 'T3', value: 2.1 },
  { name: 'T4', value: 1.8 },
  { name: 'T5', value: 2.4 },
];

// Mock Data for Transactions
const mockTransactions = [
  { id: 'tx_1', hash: '0x1a2b...3c4d', amount: '0.05 ETH', user: 'duongxuanhieu...', date: '2024-03-01 14:30', status: 'Success' },
  { id: 'tx_2', hash: '0x5e6f...7g8h', amount: '0.1 ETH', user: 'lehoangc...', date: '2024-03-02 09:15', status: 'Success' },
  { id: 'tx_3', hash: '0x9i0j...1k2l', amount: '0.05 ETH', user: 'nguyenvana...', date: '2024-03-05 16:45', status: 'Failed' },
];

// Mock Data for Errors
const mockErrors = [
  { id: 1, type: 'API_TIMEOUT', desc: 'Latency spike in AI model prediction endpoint.', time: '10m ago' },
  { id: 2, type: 'RPC_ERROR', desc: 'Sepolia Testnet WebSocket disconnected.', time: '1h ago' },
  { id: 3, type: 'AUTH_FAIL', desc: 'Invalid JWT signature detected.', time: '3h ago' },
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
  const [topBrands, setTopBrands] = useState<any[]>([]);
  
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
        } else if (['TRA_CUU_PHAT_NGUOI', 'TRA_CUU_DANG_KIEM', 'SEARCH_FINES'].includes(log.action_type)) {
          legalCount++;
        } else if (log.action_type === 'SEARCH_HASH') {
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

      // Fetch Real Users
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const usersData = await res.json();
          setRealUsers(usersData);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }

    } catch (error) {
      console.error('Data load error:', error);
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
      case 'EVALUATE_CAR': return <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Định giá</span>;
      case 'TRA_CUU_PHAT_NGUOI': return <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Pháp lý</span>;
      case 'SEARCH_HASH': return <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Blockchain</span>;
      default: return <span className="bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">{type}</span>;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchAction = filterAction ? log.action_type === filterAction : true;
    const matchEmail = filterEmail ? log.email.toLowerCase().includes(filterEmail.toLowerCase()) : true;
    return matchAction && matchEmail;
  });

  return (
    <div className="w-full mx-auto relative min-h-screen bg-slate-50/50 font-sans pb-12">
      
      {/* HEADER & NAV - Professional SaaS Style */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
              Workspace Analytics
            </h2>
          </div>
          <div className="flex gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/60">
            <button onClick={() => setActiveTab('overview')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>Overview</button>
            <button onClick={() => setActiveTab('users')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>Audience & Rev</button>
            <button onClick={() => setActiveTab('cms')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'cms' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>Content (CMS)</button>
            <button onClick={() => setActiveTab('logs')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'logs' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>Event Logs</button>
          </div>
        </div>
      </div>

      <div className="p-4 lg:px-8 pt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* METRIC CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
                    <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-1">AI Valuations</p>
                    <div className="flex justify-between items-end">
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stats.evaluate}</h3>
                      <span className="text-emerald-600 bg-emerald-50 text-[11px] px-2 py-0.5 rounded font-semibold flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg> 15.2%</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
                    <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Legal Queries</p>
                    <div className="flex justify-between items-end">
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stats.legal}</h3>
                      <span className="text-rose-600 bg-rose-50 text-[11px] px-2 py-0.5 rounded font-semibold flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M19 12l-7 7-7-7"/></svg> 3.1%</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
                    <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-1">TxHash Verified</p>
                    <div className="flex justify-between items-end">
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stats.searchHash}</h3>
                      <span className="text-emerald-600 bg-emerald-50 text-[11px] px-2 py-0.5 rounded font-semibold flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg> 24.8%</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
                    <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Gross Revenue</p>
                    <div className="flex justify-between items-end">
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">2.4<span className="text-sm font-medium text-slate-500 ml-1">ETH</span></h3>
                      <span className="text-emerald-600 bg-emerald-50 text-[11px] px-2 py-0.5 rounded font-semibold flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg> 8.4%</span>
                    </div>
                  </div>
                </div>

                {/* CHARTS ROW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Chart */}
                  <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-bold text-slate-900">System Traffic (7D)</h3>
                      <button className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 border border-slate-200 px-2 py-1 rounded">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Export
                      </button>
                    </div>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyTrafficData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 11}} axisLine={false} tickLine={false} dy={10} />
                          <YAxis tick={{fill: '#64748b', fontSize: 11}} axisLine={false} tickLine={false} />
                          <RechartsTooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} 
                            cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                          />
                          <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Side Column */}
                  <div className="space-y-6">
                    {/* Bar Chart Revenue */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-900 mb-4">Revenue (ETH)</h3>
                      <div className="h-[120px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                            <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 10}} axisLine={false} tickLine={false} />
                            <YAxis tick={{fill: '#64748b', fontSize: 10}} axisLine={false} tickLine={false} />
                            <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ fontSize: '11px', borderRadius: '4px' }}/>
                            <Bar dataKey="value" fill="#0f172a" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Alerts / Logs */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-900 mb-4 flex justify-between">
                        System Anomalies <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px]">3 Active</span>
                      </h3>
                      <div className="space-y-3">
                        {mockErrors.map(err => (
                          <div key={err.id} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-0.5">
                              <span className="text-[11px] font-bold text-slate-800">{err.type}</span>
                              <span className="text-[10px] text-slate-400">{err.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">{err.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: USERS & REVENUE */}
            {activeTab === 'users' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
                  <div className="p-4 lg:p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                    <h3 className="text-sm font-bold text-slate-900">Registered Audience</h3>
                    <span className="text-xs font-semibold text-slate-500">{realUsers.length} Users</span>
                  </div>
                  <div className="overflow-auto flex-1">
                    <table className="w-full text-left">
                      <thead className="bg-white text-[10px] uppercase tracking-wider text-slate-500 sticky top-0 border-b border-slate-200 z-10 shadow-sm">
                        <tr><th className="px-5 py-3 font-semibold">Account Details</th><th className="px-5 py-3 font-semibold text-center">Plan</th><th className="px-5 py-3 font-semibold text-center">Status</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {realUsers.map(u => (
                          <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-3">
                              <p className="text-xs font-semibold text-slate-800">{u.email}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Joined: {u.joined}</p>
                            </td>
                            <td className="px-5 py-3 text-center">
                              {u.tier === 'VIP' ? <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase">Pro</span> : <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase">Free</span>}
                            </td>
                            <td className="px-5 py-3 text-center">
                              <div className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span className="text-[10px] font-medium text-slate-600">Active</span></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
                  <div className="p-4 lg:p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                    <h3 className="text-sm font-bold text-slate-900">Revenue Ledger (Smart Contract)</h3>
                  </div>
                  <div className="overflow-auto flex-1">
                    <table className="w-full text-left">
                      <thead className="bg-white text-[10px] uppercase tracking-wider text-slate-500 sticky top-0 border-b border-slate-200 z-10 shadow-sm">
                        <tr><th className="px-5 py-3 font-semibold">Transaction Info</th><th className="px-5 py-3 font-semibold">Net Amt</th><th className="px-5 py-3 font-semibold text-center">Status</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {mockTransactions.map(tx => (
                          <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-3">
                              <p className="text-[11px] font-mono text-blue-600 font-medium">{tx.hash}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{tx.date}</p>
                            </td>
                            <td className="px-5 py-3 text-xs font-bold text-slate-900">{tx.amount}</td>
                            <td className="px-5 py-3 text-center">
                              {tx.status === 'Success' ? <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">Settled</span> : <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase">Failed</span>}
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
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                  <h3 className="text-sm font-bold text-slate-900">Content Management</h3>
                  <button className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-sm">
                    + New Entry
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                      <tr><th className="px-5 py-3 font-semibold">Title</th><th className="px-5 py-3 font-semibold">Category</th><th className="px-5 py-3 font-semibold">Fine Amount</th><th className="px-5 py-3 font-semibold text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockCmsArticles.map(art => (
                        <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-3 text-xs font-semibold text-slate-800">{art.title}</td>
                          <td className="px-5 py-3"><span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-600">{art.category}</span></td>
                          <td className="px-5 py-3 text-xs text-slate-600 font-medium">{art.fine}</td>
                          <td className="px-5 py-3 text-right">
                            <button className="text-blue-600 hover:text-blue-800 text-xs font-medium mr-3">Edit</button>
                            <button className="text-rose-600 hover:text-rose-800 text-xs font-medium">Delete</button>
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
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px]">
                {/* Filters */}
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 rounded-t-xl flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-white border border-slate-200 px-2.5 py-1.5 rounded-md text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
                    <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="bg-white border border-slate-200 px-2.5 py-1.5 rounded-md text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm min-w-[140px]">
                      <option value="">All Events</option>
                      <option value="EVALUATE_CAR">Valuations</option>
                      <option value="TRA_CUU_PHAT_NGUOI">Legal Searches</option>
                      <option value="SEARCH_HASH">Blockchain Verifications</option>
                    </select>
                    <input type="text" placeholder="Filter by email..." value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} className="bg-white border border-slate-200 px-2.5 py-1.5 rounded-md text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm w-48" />
                  </div>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium shadow-sm transition-colors flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Download CSV
                  </button>
                </div>
                
                {/* Table */}
                <div className="overflow-auto flex-1 custom-scrollbar relative">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-slate-200 shadow-sm">
                      <tr className="text-slate-500 text-[10px] uppercase tracking-wider">
                        <th className="px-5 py-3 font-semibold">Timestamp</th>
                        <th className="px-5 py-3 font-semibold">Identity</th>
                        <th className="px-5 py-3 font-semibold text-center">Event Type</th>
                        <th className="px-5 py-3 font-semibold text-right">Payload</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLogs.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-12 text-slate-500 text-sm">No events found matching criteria.</td></tr>
                      ) : (
                        filteredLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-3 text-[11px] font-medium text-slate-500">{formatTime(log.created_at)}</td>
                            <td className="px-5 py-3 text-xs font-semibold text-slate-800">{log.email}</td>
                            <td className="px-5 py-3 text-center">{getActionBadge(log.action_type)}</td>
                            <td className="px-5 py-3 text-right">
                              <button onClick={() => setSelectedJson(log.action_details)} className="text-[11px] font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                View JSON
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.1s_ease-out]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 flex flex-col max-h-[80vh]">
              <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Event Payload</h3>
                <button onClick={() => setSelectedJson(null)} className="text-slate-400 hover:text-slate-700 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="p-4 overflow-auto bg-slate-900 text-emerald-400 font-mono text-[11px] leading-relaxed">
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

print("AdminTab.tsx rewritten into SaaS Analyst Style!")
