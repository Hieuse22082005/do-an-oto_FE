"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers"; 
import AuthModal from "@/components/AuthModal";
import Header from "@/components/Header";
import HomeTab from "@/components/tabs/HomeTab";
import EvaluateTab from "@/components/tabs/EvaluateTab";
import SearchTab from "@/components/tabs/SearchTab";
import FinesTab from '@/components/tabs/FinesTab';
import PenaltyTab from '@/components/tabs/PenaltyTab';
import AdminTab from "@/components/tabs/AdminTab";
import { supabase } from '../supabaseClient';// Nhớ sửa đường dẫn đúng với file của bạn

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const [activeTab, setActiveTab] = useState("home"); 

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userEmail = localStorage.getItem("user_email");
    const userTier = localStorage.getItem("user_tier") || "standard";
    
    if (token && userEmail) {
      // KIỂM TRA EMAIL ĐỂ CẤP QUYỀN ADMIN (Sửa thành email chính xác của bạn)
      const isAdmin = userEmail === "duongxuanhieu22082005@gmail.com";

      setUser({ 
        email: userEmail, 
        user_metadata: { display_name: userEmail.split('@')[0] },
        tier: userTier,
        role: isAdmin ? "admin" : "user" // DÒNG QUAN TRỌNG ĐỂ HIỆN TAB ADMIN
      });
    }
  }, []);

  const handleLogout = async () => {
    // THÊM ĐOẠN NÀY: Bắn log Đăng xuất lên Supabase
    if (user) {
      try {
        await supabase.from('user_activity_logs').insert([{
          email: user.email,
          action_type: 'LOGOUT',
          action_details: { time: new Date().toISOString() }
        }]);
      } catch (err) {
        console.error("Lỗi ghi log đăng xuất:", err);
      }
    }

    // Phần logic cũ giữ nguyên
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_tier");
    setUser(null);
    setActiveTab("home");
  };
// HÀM DÀNH CHO LẬP TRÌNH VIÊN ĐỂ TEST LUỒNG
  const handleResetTest = async () => {
    try {
      if (!(window as any).ethereum) return alert("Chưa cài ví!");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      
      // Nhớ THAY ĐỊA CHỈ CONTRACT MỚI CỦA BẠN VÀO ĐÂY NHÉ
      const contractAddress = "0x2169C854f514516038A068cCF758C2b8D40bCe01";
      
      const contract = new ethers.Contract(contractAddress, ["function debugResetVIP() public"], signer);
      
      // 1. Xóa trí nhớ trên Blockchain
      const tx = await contract.debugResetVIP();
      await tx.wait();

      // 2. Xóa trí nhớ trên Database Python
      // Sửa từ "http://localhost:8080/upgrade-vip" thành:
      const response = await fetch("http://localhost:8080/api/v1/transactions/upgrade-vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          txHash: tx.hash
        })
      });

      // 3. Cập nhật lại giao diện web
      localStorage.setItem("user_tier", "standard");
      setUser({ ...user, tier: "standard" });
      alert("🔧 Đã xóa VIP! Bạn đã trở về dân thường. Có thể test lại từ đầu!");
      
    } catch (error) {
      console.error(error);
      alert("Lỗi khi reset!");
    }
  };
  // HÀM XỬ LÝ THANH TOÁN VIP - ĐÃ TÍCH HỢP GỌI BACKEND PYTHON
  const processVIPUpgrade = async () => {
    setIsProcessingPayment(true);
    try {
      if (!(window as any).ethereum) {
        alert("Vui lòng cài đặt ví MetaMask để thanh toán Web3!");
        setIsProcessingPayment(false);
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contractAddress = "0x2169C854f514516038A068cCF758C2b8D40bCe01";
      
      const contract = new ethers.Contract(
        contractAddress, 
        ["function buyVIP() public payable"],
        signer
      );

      // 1. Thực thi gửi 0.05 ETH qua MetaMask
      const tx = await contract.buyVIP({ 
        value: ethers.parseEther("0.05") 
      });

      await tx.wait(); // Đợi block xác nhận

      // 2. GỌI BACKEND PYTHON ĐỂ XÁC THỰC VÀ LƯU DATABASE
      // Lưu ý: Đổi URL này nếu Backend Python của bạn chạy port khác hoặc đã deploy
      // 2. GỌI BACKEND PYTHON ĐỂ XÁC THỰC VÀ LƯU DATABASE
      // Lưu ý: Đổi URL này nếu Backend Python của bạn chạy port khác hoặc đã deploy
      const response = await fetch("http://localhost:8080/api/v1/transactions/upgrade-vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          txHash: tx.hash
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Lỗi xác thực từ Server Backend");
      }

      // 3. Nếu Backend OK -> Cập nhật giao diện
      localStorage.setItem("user_tier", "vip");
      setUser({ ...user, tier: "vip" });
      setShowPricingModal(false);
      alert("🎉 THANH TOÁN THÀNH CÔNG!\nGiao dịch đã được xác nhận bảo mật trên hệ thống. Chào mừng bạn đến với đặc quyền VIP.");
      
    } catch (error: any) {
      console.error(error);
      alert(`Giao dịch thất bại hoặc có lỗi hệ thống: ${error.message || "Ví không đủ số dư ETH!"}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === "home") {
      setActiveTab(tab);
    } else {
      if (user) setActiveTab(tab);
      else setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] dark:bg-slate-900 text-gray-800 font-sans selection:bg-blue-200 relative z-0">
      
      {/* 🚀 NÚT DEBUG CHỈ DÀNH CHO DEV (XÓA VIP ĐỂ TEST LẠI) */}
      {user && user.tier === 'vip' && (
        <button 
          onClick={handleResetTest} 
          className="fixed bottom-6 left-6 z-[999] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold shadow-xl shadow-red-600/30 text-sm flex items-center gap-2 transition-all active:scale-95"
        >
          🛠️ Xóa VIP (Test lại)
        </button>
      )}

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={async (userData) => { 
            const isAdmin = userData.email === "duongxuanhieu22082005@gmail.com";
            
            setUser({ 
              ...userData, 
              tier: localStorage.getItem("user_tier") || "standard",
              role: isAdmin ? "admin" : "user" 
            }); 
            setActiveTab("evaluate"); 
            setShowAuthModal(false); // Đóng modal

            // THÊM ĐOẠN NÀY: Bắn log Đăng nhập lên Supabase
            try {
              await supabase.from('user_activity_logs').insert([{
                email: userData.email,
                action_type: 'LOGIN',
                action_details: { time: new Date().toISOString() }
              }]);
            } catch (err) {
              console.error("Lỗi ghi log đăng nhập:", err);
            }
          }} 
        />
      )}

      {/* BẢNG GIÁ VIP */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100 relative">
            
            <button onClick={() => !isProcessingPayment && setShowPricingModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-all z-20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="p-10 text-center border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Nâng Tầm Trải Nghiệm Định Giá</h2>
              <p className="text-gray-500">Chọn gói dịch vụ phù hợp với nhu cầu của bạn để tối ưu hóa lợi nhuận.</p>
            </div>

            <div className="grid md:grid-cols-2 p-6 md:p-10 gap-8 bg-white">
              
              <div className="p-8 rounded-3xl border-2 border-gray-100 bg-gray-50 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Người dùng Tiêu chuẩn</h3>
                <p className="text-4xl font-black text-gray-900 mb-6">Miễn phí</p>
                <ul className="space-y-4 mb-8 flex-1 text-sm font-medium text-gray-600">
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Phân tích AI 30+ trường dữ liệu</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Cấp mộc chứng nhận Blockchain</li>
                  <li className="flex items-center gap-3 text-gray-900"><span className="text-amber-500 text-lg">⚡</span> Giới hạn <strong className="bg-amber-100 px-2 py-0.5 rounded text-amber-700">3 lượt / ngày</strong></li>
                  <li className="flex items-center gap-3 opacity-50"><span className="text-red-400 text-lg">✗</span> Phí Gas Web3: <strong className="text-gray-900">0.001 ETH / lần</strong></li>
                  <li className="flex items-center gap-3 opacity-50"><span className="text-red-400 text-lg">✗</span> Không có Bảng dự báo thanh khoản</li>
                </ul>
                <button className="w-full py-4 rounded-xl font-bold text-gray-500 bg-gray-200 cursor-not-allowed">Đang sử dụng</button>
              </div>

              <div className="p-8 rounded-3xl border-2 border-yellow-300 bg-gradient-to-b from-yellow-50 to-white flex flex-col relative transform hover:-translate-y-2 transition-all duration-300 shadow-xl shadow-yellow-500/10">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-4">
                  <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Được khuyên dùng</span>
                </div>
                
                <h3 className="text-xl font-black text-yellow-700 mb-2 flex items-center gap-2">👑 Tài khoản VIP (Dealer)</h3>
                <div className="mb-6 flex items-baseline gap-2">
                  <p className="text-4xl font-black text-gray-900">0.05<span className="text-xl text-blue-600 ml-1">ETH</span></p>
                  <p className="text-gray-400 font-bold">/ tháng</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1 text-sm font-bold text-gray-800">
                  <li className="flex items-center gap-3 text-emerald-600"><span className="text-emerald-500 text-lg">♾️</span> <strong>Không giới hạn</strong> lượt định giá / ngày</li>
                  <li className="flex items-center gap-3 text-blue-600"><span className="text-blue-500 text-lg">🚀</span> <strong className="bg-blue-50 px-2 py-0.5 rounded">Miễn phí 100%</strong> phí Gas Web3</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Mở khóa <strong>Dự báo Rớt giá 1 năm</strong></li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Mở khóa <strong>Chỉ số Thanh khoản</strong> xe</li>
                  <li className="flex items-center gap-3"><span className="text-emerald-500 text-lg">✓</span> Huy hiệu VIP vàng trên bảng định giá</li>
                </ul>
                
                <button 
                  onClick={processVIPUpgrade} 
                  disabled={isProcessingPayment}
                  className={`w-full py-4 rounded-xl font-black text-white transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center gap-2 ${isProcessingPayment ? "bg-yellow-400 cursor-wait" : "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 hover:shadow-yellow-500/40"}`}
                >
                  {isProcessingPayment ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                      Đang xử lý thanh toán...
                    </>
                  ) : "Thanh Toán bằng Crypto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER VÀ CÁC TAB NỘI DUNG GIỮ NGUYÊN */}
      <Header 
        user={user} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={handleLogout}
        onUpgradeVIP={() => setShowPricingModal(true)}
      />

      {/* ==========================================
          CHÈN ĐOẠN WATERMARK ĐỘNG NÀY VÀO ĐÂY
          ========================================== */}
      <div className="absolute top-28 left-0 w-full flex justify-center -z-10 pointer-events-none select-none overflow-hidden">
        <span className="text-[60px] md:text-[110px] font-black uppercase tracking-tighter text-gray-200/80 dark:text-slate-800/40 whitespace-nowrap transition-all duration-500">
          {activeTab === "home" && "ĐỊNH GIÁ XE.AI"}
          {activeTab === "evaluate" && "PHÂN TÍCH AI"}
          {activeTab === "search" && "TRA CỨU BLOCKCHAIN"}
          {activeTab === "fines" && "TRA CỨU PHẠT NGUỘI"}
          {activeTab === "penalty" && "LUẬT GIAO THÔNG"}
          {activeTab === "admin" && "QUẢN TRỊ VIÊN"}
        </span>
      </div>


      <main key={activeTab} className="flex-grow max-w-6xl mx-auto px-6 pt-12 pb-20 w-full animate-[fadeInUp_0.4s_ease-out]">
        {activeTab === "home" && <HomeTab onTryNow={() => handleTabChange("evaluate")} />}
        {activeTab === "evaluate" && <EvaluateTab user={user} onGoHome={() => setActiveTab("home")} />}
        {activeTab === "search" && <SearchTab user={user} />}
        
        {/* SỬA DÒNG NÀY: Phải thêm user={user} vào thì nó mới biết ai đang tra cứu */}
        {activeTab === "fines" && <FinesTab user={user} />}
        
        {activeTab === "penalty" && <PenaltyTab/>}
        {activeTab === "admin" && <AdminTab />} 
      </main>

      <footer className="no-print bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-extrabold text-xl">ĐịnhGiáXe.AI</div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">Công cụ phân tích giá xe cũ sử dụng Trí tuệ nhân tạo (AI) tích hợp Web3 Blockchain minh bạch đầu tiên tại Việt Nam.</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs text-gray-400 mt-6">© 2026 DinhGiaXe AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}