"use client";

import { useState } from "react";
import { apiService } from "../services/api";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState("login"); 
  const [authLoading, setAuthLoading] = useState(false);
  const [authForm, setAuthForm] = useState({ fullName: "", phone: "", email: "", otp: "" });

  const handleChange = (e: any) => setAuthForm({ ...authForm, [e.target.name]: e.target.value });

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "register" && (!authForm.fullName || !authForm.phone)) {
      alert("Vui lòng điền đủ Tên và SĐT để đăng ký!"); return;
    }
    setAuthLoading(true);
    try {
      await apiService.sendOtp(authForm.email, authForm.fullName, authForm.phone, authMode === "register");
      setAuthMode("verify"); 
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || "Lỗi gửi OTP!";
      if (errorMsg.toLowerCase().includes("not found")) {
        alert("Email này chưa đăng ký! Hãy chuyển sang tab 'Tạo Tài Khoản'.");
      } else {
        alert(errorMsg);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const response = await apiService.verifyOtp(authForm.email, authForm.otp);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_email", response.data.user_email);
      onSuccess({ email: response.data.user_email, user_metadata: { display_name: authForm.fullName || response.data.user_email.split('@')[0] } });
      onClose(); 
    } catch (error) {
      alert("Mã OTP không hợp lệ hoặc đã hết hạn!");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-opacity duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-[scaleIn_0.3s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {authMode !== "verify" && (
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative">
            <button onClick={() => setAuthMode("login")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${authMode === "login" ? "bg-white text-blue-600 shadow-md transform scale-100" : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"}`}>Đăng Nhập</button>
            <button onClick={() => setAuthMode("register")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${authMode === "register" ? "bg-white text-blue-600 shadow-md transform scale-100" : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"}`}>Tạo Tài Khoản</button>
          </div>
        )}

        <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">{authMode === "verify" ? "Nhập mã xác nhận" : "Xác thực danh tính"}</h2>
        <p className="text-center text-sm text-gray-500 mb-6">{authMode === "verify" ? "Vui lòng kiểm tra Email và nhập mã số" : "Sử dụng Email để nhận mã OTP an toàn"}</p>
        
        {authMode === "verify" ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
            <input type="text" name="otp" maxLength={8} value={authForm.otp} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none text-center text-2xl font-mono tracking-[0.3em]" placeholder="--------" />
            <button type="submit" disabled={authLoading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl mt-4">{authLoading ? "Đang xác thực..." : "Xác nhận Đăng Nhập"}</button>
          </form>
        ) : (
          <form onSubmit={handleSendOtp} className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
            {authMode === "register" && (
              <>
                <input type="text" name="fullName" value={authForm.fullName} onChange={handleChange} required placeholder="Họ và Tên" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none" />
                <input type="tel" name="phone" value={authForm.phone} onChange={handleChange} required placeholder="Số điện thoại" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none" />
              </>
            )}
            <input type="email" name="email" value={authForm.email} onChange={handleChange} required placeholder="Email của bạn" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none" />
            <button type="submit" disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl mt-4">{authLoading ? "Đang gửi mã..." : "Nhận mã OTP"}</button>
          </form>
        )}
      </div>
    </div>
  );
}