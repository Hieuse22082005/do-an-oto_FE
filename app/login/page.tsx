"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import { supabase } from '../../supabaseClient'; 

export default function LoginPage() {
  const router = useRouter(); 
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  
  const [otp, setOtp] = useState(['', '', '', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Đếm ngược thời gian
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // ==========================================
  // VŨ KHÍ TỐI THƯỢNG: LẮNG NGHE VÀ TỰ ĐỘNG CHẠY
  // ==========================================
  useEffect(() => {
    const otpCode = otp.join('');
    // Kiểm tra: Phải đang ở bước 2, đúng 8 ký tự, không có ô nào rỗng và chưa tải
    const isComplete = otpCode.length === 8 && !otp.includes('');

    if (step === 2 && isComplete && !isLoading) {
      // Delay 100ms để người dùng kịp nhìn thấy số thứ 8 vừa gõ
      const autoSubmitTimer = setTimeout(() => {
        processLogin(otpCode);
      }, 100);
      return () => clearTimeout(autoSubmitTimer);
    }
  }, [otp, step, isLoading]); // Hàm này sẽ tự động chạy mỗi khi mảng OTP thay đổi

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });

      if (error) throw error;

      setStep(2);
      setTimer(60); 
    } catch (error: any) {
      alert("❌ Lỗi gửi mã: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const processLogin = async (otpCodeToVerify: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otpCodeToVerify,
        type: 'email'
      });

      if (error) throw error;

      if (data.session) {
        localStorage.setItem("access_token", data.session.access_token);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_tier", "standard"); 

        await supabase.from('user_activity_logs').insert([{
           email: email,
           action_type: 'LOGIN',
           action_details: { time: new Date().toISOString() }
        }]);

        router.push('/');
      }
    } catch (error: any) {
      alert("❌ Mã OTP không chính xác hoặc đã hết hạn!");
      setOtp(['', '', '', '', '', '', '', '']); // Xóa trắng để nhập lại
      inputRefs.current[0]?.focus(); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Chỉ cho phép nhập số, chặn luôn cả dấu cách
    if (!/^\d*$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); 
    setOtp(newOtp);

    // Tự động nhảy sang ô tiếp theo
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Tính năng mới: Dán (Paste) nguyên 8 số vào
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Lấy chuỗi dán, loại bỏ chữ cái, chỉ giữ tối đa 8 số
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
    
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      // Focus vào ô tiếp theo hoặc ô cuối cùng
      const nextIndex = Math.min(pasteData.length, 7);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleResend = async () => {
    setOtp(['', '', '', '', '', '', '', '']); 
    inputRefs.current[0]?.focus();
    await handleSendOTP({ preventDefault: () => {} } as any);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    const otpCode = otp.join('');
    if (otpCode.length < 8) { 
      alert('Vui lòng nhập đủ 8 số OTP');
      return;
    }
    processLogin(otpCode);
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Background trái */}
      <div className="hidden lg:flex w-[40%] bg-[#002f6c] relative overflow-hidden flex-col justify-center items-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_transparent_20%,_#001a40_80%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-[1px] border-white rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-dashed border-[2px] border-white rounded-full opacity-20 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[1px] border-white rounded-full opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center px-10">
          <h1 className="text-4xl font-black text-white mb-4 tracking-wider uppercase">AI.WEB3</h1>
          <p className="text-blue-200 text-sm font-medium">Hệ thống định giá và lưu trữ phương tiện trên Blockchain</p>
        </div>
      </div>

      {/* Form đăng nhập */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center items-center p-4 sm:p-16 relative">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-tl-full opacity-50 pointer-events-none -z-10"></div>

        <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Đăng nhập</h2>
            <p className="text-gray-500 text-sm">Hệ thống quản lý thông tin an toàn</p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email hoặc Số điện thoại</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..." 
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#1860d2] hover:bg-[#124ba6] text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : 'Gửi mã xác nhận'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleManualLogin} className="space-y-8 animate-[fadeInRight_0.4s_ease-out]">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Mã xác minh đã được gửi đến</p>
                <p className="font-bold text-gray-900">{email}</p>
              </div>

              <div className="flex justify-center gap-1.5 sm:gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste} // Gọi sự kiện dán
                    disabled={isLoading} 
                    className="w-10 h-12 sm:w-11 sm:h-14 text-center text-xl font-black text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-[#1860d2] focus:ring-4 focus:ring-blue-500/20 focus:scale-110 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                ))}
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#1860d2] hover:bg-[#124ba6] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex justify-center items-center gap-2 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Đang xác thực...
                  </>
                ) : 'Xác nhận Đăng nhập'}
              </button>

              <div className="text-center flex flex-col items-center gap-2">
                <p className="text-sm text-gray-500">Chưa nhận được mã?</p>
                {timer > 0 ? (
                  <span className="text-sm font-bold text-gray-400">
                    Vui lòng chờ <span className="text-[#1860d2]">{timer}s</span> để gửi lại
                  </span>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleResend}
                    className="text-sm font-bold text-[#1860d2] hover:text-[#124ba6] hover:underline transition-all"
                  >
                    Gửi lại mã OTP
                  </button>
                )}
                
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-gray-400 hover:text-gray-600 mt-4 underline"
                >
                  ← Đổi địa chỉ nhận mã
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}