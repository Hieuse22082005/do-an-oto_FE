"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Loader2, ExternalLink, QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ id: string, email: string, token_balance: number } | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState<number>(5);
  const [invoice, setInvoice] = useState<{ invoice_code: string, total_amount: number } | null>(null);

  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session) {
        router.push('/');
        return;
      }

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') {
         throw profileError;
      }

      if (profileData) {
        setProfile(profileData);
      } else {
        // Fallback if profile not found in table but user is logged in
        setProfile({ id: session.user.id, email: session.user.email || '', token_balance: 0 });
      }

      // Fetch transaction history
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_email', session.user.email) // Use email since older records used email!
        .order('created_at', { ascending: false });

      if (txError) throw txError;

      if (txData) {
        setHistory(txData);
      }

    } catch (e: any) {
      console.error("Lỗi đồng bộ hồ sơ:", e);
      setErrorMsg(e.message || JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };


  const handleCreateInvoice = async () => {
    if (!profile) return;
    try {
      const res = await fetch("http://127.0.0.1:8080/api/v1/payment/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: profile.id,
          token_amount: depositAmount
        })
      });
      const data = await res.json();
      setInvoice(data);
    } catch (e) {
      console.error(e);
      alert("Không thể tạo hóa đơn");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-900" /></div>;
  if (errorMsg) return <div className="min-h-screen flex items-center justify-center flex-col text-red-500"><p>Lỗi đồng bộ:</p><pre>{errorMsg}</pre></div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* KHỐI TỔNG QUAN TÀI KHOẢN */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Thông Tin Tài Khoản</h1>
            <p className="text-slate-500 mb-1">Định danh xác thực: <span className="text-slate-800 font-medium">{profile.email}</span></p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-sm text-slate-500">Số dư khả dụng:</span>
              <span className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full">{profile.token_balance || 0} Token</span>
            </div>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 w-full md:w-auto">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><QrCode className="w-5 h-5"/> Nạp thêm Token</h3>
            {!invoice ? (
              <div className="flex flex-col gap-3">
                <select 
                  value={depositAmount} 
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value={5}>Gói 5 Token (400.000đ)</option>
                  <option value={10}>Gói 10 Token (800.000đ)</option>
                  <option value={50}>Gói 50 Token (4.000.000đ)</option>
                </select>
                <button 
                  onClick={handleCreateInvoice}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                >
                  Tạo mã VietQR
                </button>
              </div>
            ) : (
              <div className="text-center">
                {/* Dùng API của vietqr.io. Thay YOUR_BANK_BIN và YOUR_ACCOUNT_NO bằng thông tin thật */}
                <img 
                  src={`https://img.vietqr.io/image/970422-0000000000-compact2.jpg?amount=${invoice.total_amount}&addInfo=${invoice.invoice_code}&accountName=SMARTCAR`} 
                  alt="VietQR" 
                  className="w-48 h-48 mx-auto rounded-lg mb-3 shadow-sm border border-slate-200"
                />
                <p className="text-sm text-slate-600 mb-1">Nội dung: <strong className="text-blue-700 select-all">{invoice.invoice_code}</strong></p>
                <p className="text-sm text-slate-600 mb-4">Số tiền: <strong>{invoice.total_amount.toLocaleString()} VNĐ</strong></p>
                <button 
                  onClick={() => setInvoice(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Hủy & Đổi gói khác
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DANH SÁCH LỊCH SỬ GIAO DỊCH */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Lịch Sử Định Giá & Chứng Nhận Blockchain</h2>
          <p className="text-slate-500 mb-6 text-sm">Bản ghi bất biến được ghi nhận và bảo chứng bởi mạng lưới Ethereum Sepolia.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 rounded-tl-lg">Thời gian</th>
                  <th className="py-3 px-4">Phương tiện</th>
                  <th className="py-3 px-4">Giá trị định giá</th>
                  <th className="py-3 px-4">Mã băm giao dịch (TxHash)</th>
                  <th className="py-3 px-4 rounded-tr-lg">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">Bạn chưa thực hiện phiên định giá phương tiện nào.</td>
                  </tr>
                ) : (
                  history.map((tx) => {
                    const data = tx.full_data || {};
                    return (
                      <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 px-4 whitespace-nowrap">{new Date(tx.created_at).toLocaleString("vi-VN")}</td>
                        <td className="py-4 px-4 font-medium text-slate-800">{data.brand} {data.model} ({data.year})</td>
                        <td className="py-4 px-4 font-bold text-blue-600">{Number(tx.predicted_price || 0).toLocaleString("vi-VN")} VNĐ</td>
                        <td className="py-4 px-4">
                          {tx.txhash ? (
                            <a 
                              href={`https://sepolia.etherscan.io/tx/${tx.txhash}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-mono text-xs bg-blue-50 px-2 py-1 rounded"
                            >
                              {tx.txhash.slice(0, 8)}...{tx.txhash.slice(-6)}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400 text-xs italic">Đang phát lệnh...</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {tx.chain_status === 'SUCCESS' && <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">Đã xác thực</span>}
                          {tx.chain_status === 'MINING' && <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-max"><Loader2 className="w-3 h-3 animate-spin"/> Đang đóng khối</span>}
                          {tx.chain_status === 'QUEUED' && <span className="text-slate-500 bg-slate-100 px-2 py-1 rounded-full text-xs font-medium">Hàng đợi</span>}
                          {tx.chain_status === 'FAILED' && <span className="text-rose-600 bg-rose-50 px-2 py-1 rounded-full text-xs font-medium">Lỗi mạng</span>}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
