"use client";
import { useState, useEffect } from "react";

interface HeaderProps {
  user: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onUpgradeVIP: () => void;
}

export default function Header({ user, activeTab, onTabChange, onLoginClick, onLogoutClick, onUpgradeVIP }: HeaderProps) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("app_theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  const cycleTheme = () => {
    let nextTheme = "light";
    if (theme === "light") nextTheme = "dark";
    else if (theme === "dark") nextTheme = "mystic";
    
    setTheme(nextTheme);
    localStorage.setItem("app_theme", nextTheme);
    document.body.setAttribute("data-theme", nextTheme);
  };

  const renderIcon = () => {
    if (!mounted) return "☀️";
    if (theme === "dark") return "🌙";
    if (theme === "mystic") return "🔮";
    return "☀️";
  };

  return (
    <header className="no-print bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
      {/* Đã nới rộng ra max-w-7xl để chứa đủ các tab */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO (Thêm shrink-0 để không bao giờ bị bóp méo) */}
        <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => onTabChange("home")}>
          <div className="relative flex items-center justify-center w-11 h-11">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-md group-hover:blur-xl opacity-40 group-hover:opacity-80 transition-all duration-500"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 group-hover:from-indigo-500 group-hover:to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 transform group-hover:-translate-y-1 transition-all duration-300">
              <svg className="w-[22px] h-[22px] transform group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H8.3a2 2 0 0 0-1.6.8L4 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m-7 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-white shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-gray-900 flex items-baseline whitespace-nowrap">
            địnhgiá
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent ml-[1px]">xe</span>
            <span className="text-blue-600 text-3xl leading-none mx-[1px]">.</span>
            <span className="font-bold text-gray-400 text-lg tracking-normal">ai</span>
          </span>
        </div>
        
        {/* CÁC TAB (Giảm gap xuống gap-5 và thêm whitespace-nowrap) */}
        <div className="flex items-center gap-5 text-sm font-bold text-gray-600">
          <span onClick={() => onTabChange("home")} className={`relative cursor-pointer py-2 group transition-colors duration-300 whitespace-nowrap hover:text-blue-600 ${activeTab === "home" ? "text-blue-600" : ""}`}>
            Trang chủ
            <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "home" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
          </span>
          <span onClick={() => onTabChange("evaluate")} className={`relative cursor-pointer py-2 group transition-colors duration-300 whitespace-nowrap hover:text-blue-600 ${activeTab === "evaluate" ? "text-blue-600" : ""}`}>
            Định giá AI
            <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "evaluate" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
          </span>
          <span onClick={() => onTabChange("search")} className={`relative cursor-pointer py-2 group transition-colors duration-300 whitespace-nowrap hover:text-blue-600 ${activeTab === "search" ? "text-blue-600" : ""}`}>
            Tra cứu TxHash
            <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "search" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
          </span>
          
          {/* TAB TRA CỨU PHẠT NGUỘI */}
          <span onClick={() => onTabChange("fines")} className={`relative cursor-pointer py-2 group transition-colors duration-300 whitespace-nowrap hover:text-blue-600 ${activeTab === "fines" ? "text-blue-600" : ""}`}>
            Tra cứu Phạt nguội
            <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "fines" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
          </span>

          {/* TAB MỨC PHẠT GIAO THÔNG (Đang có sẵn) */}
          <span onClick={() => onTabChange("penalty")} className={`relative cursor-pointer py-2 group transition-colors duration-300 whitespace-nowrap hover:text-blue-600 ${activeTab === "penalty" ? "text-blue-600" : ""}`}>
            Mức Phạt Giao Thông
            <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "penalty" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
          </span>

          {/* DÒNG NÀY SẼ HIỂN THỊ NÚT ADMIN NẾU user.role === 'admin' */}
          {user && user.role === 'admin' && (
            <span onClick={() => onTabChange("admin")} className={`relative cursor-pointer py-2 group transition-colors duration-300 whitespace-nowrap font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 ${activeTab === "admin" ? "text-indigo-800 dark:text-indigo-300" : ""}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
              Quản trị (Admin)
              <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-indigo-600 transition-transform duration-300 ease-out ${activeTab === "admin" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
            </span>
          )}


          {/* USER & THEME TOGGLE (Thêm shrink-0 để không bị đẩy) */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200 shrink-0">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="bg-gray-50 border border-gray-100 flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-default transition-all duration-300">
                  <span className="text-gray-800 font-medium text-sm whitespace-nowrap">👋 {user.user_metadata?.display_name || user.email.split('@')[0]}</span>
                  
                  {user.tier === 'vip' ? (
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest shadow-sm shadow-yellow-500/30 border border-yellow-200 whitespace-nowrap">
                      👑 VIP
                    </span>
                  ) : (
                    <button onClick={onUpgradeVIP} className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded transition-colors uppercase whitespace-nowrap">
                      Nâng cấp VIP
                    </button>
                  )}
                </div>

                <button onClick={onLogoutClick} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all duration-300 shrink-0" title="Đăng xuất">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-300 font-bold whitespace-nowrap">Đăng nhập</button>
            )}

            <button 
              onClick={cycleTheme} 
              className="w-10 h-10 ml-1 rounded-full bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:scale-110 active:scale-95 flex items-center justify-center text-xl transition-all duration-300 shadow-sm shrink-0"
              title="Thay đổi Giao diện"
            >
              {renderIcon()}
            </button>
              
          </div>
        </div>
      </div>
    </header>
  );
}