"use client";
import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  user: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onUpgradeVIP: () => void;
}

export default function Header({ user, activeTab, onTabChange, onLoginClick, onLogoutClick, onUpgradeVIP }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // LOGIC HOVER ĐỂ MỞ MENU (Có độ trễ nhẹ để tránh lỗi chớp nháy khi trượt chuột)
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150); // Độ trễ 150ms để chuột di chuyển từ Nút xuống Menu không bị tắt
  };

  // Vẫn giữ logic click outside để hỗ trợ màn hình cảm ứng (Mobile/Tablet)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainTabs = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'evaluate', label: 'Định giá AI' },
  ];

  const dropdownTabs = [
    { id: 'fines', label: 'Dịch vụ Pháp lý (Phạt nguội)' },
    { id: 'penalty', label: 'Cẩm nang Luật giao thông' },
    { id: 'search', label: 'Tra cứu Lịch sử Blockchain' },
  ];

  if (user?.role === 'admin') {
    dropdownTabs.push({ id: 'admin', label: 'Bảng Quản trị viên' });
  }

  const isDropdownActive = dropdownTabs.some(tab => tab.id === activeTab);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO (Có hiệu ứng xoay nảy khi hover) */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onTabChange('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 active:scale-95">
            Đ
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900 hidden sm:block transition-colors duration-300 group-hover:text-blue-600">
            ĐịnhGiáXe<span className="text-blue-600">.AI</span>
          </span>
        </div>

        {/* NAVIGATION MENU */}
        <nav className="hidden md:flex items-center gap-2">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ease-out active:scale-95 ${
                activeTab === tab.id 
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* DROPDOWN HOVER CONTAINER */}
          <div 
            className="relative" 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* NÚT TÍNH NĂNG KHÁC */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Vẫn giữ onClick cho mobile
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 ease-out active:scale-95 ${
                isDropdownActive || isDropdownOpen
                  ? 'bg-blue-50 text-blue-700 shadow-md shadow-blue-500/10' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              Tính năng khác
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ease-out ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* DANH SÁCH MENU BÊN TRONG DROPDOWN */}
            {/* Sử dụng padding-top (pt-3) tạo một lớp đệm vô hình để chuột di chuyển xuống không bị mất hover */}
            <div 
              className={`absolute top-full right-0 pt-3 w-64 transition-all duration-300 ease-out origin-top-right ${
                isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 overflow-hidden">
                {dropdownTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-sm font-bold transition-all duration-200 active:scale-[0.98] relative overflow-hidden group ${
                      activeTab === tab.id 
                        ? 'bg-blue-50/50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-7'
                    }`}
                  >
                    {/* Thanh line dọc cho tab khi hover hoặc active */}
                    <div className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${activeTab === tab.id ? 'bg-blue-600' : 'bg-transparent group-hover:bg-gray-300'}`}></div>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* USER ACTIONS (Góc phải) */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end cursor-default">
                <span className="text-sm font-bold text-gray-900">{user.user_metadata?.display_name || user.email}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1 transition-transform hover:scale-105 ${
                  user.tier === 'vip' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {user.tier === 'vip' ? '👑 VIP Dealer' : 'Miễn phí'}
                </span>
              </div>
              
              {user.tier !== 'vip' && (
                <button onClick={onUpgradeVIP} className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-yellow-950 px-5 py-2.5 rounded-xl text-sm font-black shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-yellow-500/40 active:scale-95 active:translate-y-0">
                  Nâng cấp VIP
                </button>
              )}
              
              <button onClick={onLogoutClick} className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center transition-all duration-300 ease-out hover:bg-red-50 hover:text-red-600 hover:-translate-y-1 hover:shadow-md active:scale-95 active:translate-y-0 group">
                <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="bg-gray-900 hover:bg-gray-800 text-white px-7 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out shadow-md hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-1 active:scale-95 active:translate-y-0">
              Đăng Nhập
            </button>
          )}
        </div>

      </div>
    </header>
  );
}