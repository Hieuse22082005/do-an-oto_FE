"use client";
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

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
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add("nav-scrolled", "py-3");
        nav.classList.remove("py-4");
      } else {
        nav.classList.remove("nav-scrolled", "py-3");
        nav.classList.add("py-4");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 150);
  };

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
    { id: "home", label: "Trang Chủ" },
    { id: "marketplace", label: "Mua Bán Xe" },
    { id: "analytics", label: "Báo Chí & Thống Kê" },
    { id: "evaluate", label: "Định Giá SmartCar" },
  ];

  const dropdownTabs = [
    { id: "fines", label: "Dịch vụ Pháp lý (Phạt nguội)" },
    { id: "penalty", label: "Cẩm nang Luật giao thông" },
    { id: "search", label: "Tra cứu Lịch sử Blockchain" },
  ];

  if (user?.role === "admin") dropdownTabs.push({ id: "admin", label: "Bảng Quản trị viên" });

  const isDropdownActive = dropdownTabs.some(tab => tab.id === activeTab);

  return (
    <>
      <style jsx global>{`
        .nav-scrolled {
          background: rgba(3, 7, 18, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .logo-spin {
          animation: spin-slow 10s linear infinite;
        }
        .nav-link-active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #00f2fe;
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.8);
        }
      `}</style>

      <header
        ref={navRef}
        className="fixed top-0 left-0 z-50 w-full py-4 transition-all duration-500 font-sans"
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-[1350px] px-6 flex items-center justify-between gap-4 lg:gap-8">

          {/* LOGO */}
          <button
            onClick={() => onTabChange("home")}
            className="flex items-center gap-3 group shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,242,254,0.9)]"
            />
            <span className="text-2xl font-black uppercase tracking-tighter hidden xl:block transition-colors duration-300 text-[#00f2fe] drop-shadow-[0_0_2px_rgba(0,242,254,0.3)]">
              SmartCar
            </span>
          </button>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400 whitespace-nowrap">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative pb-1 transition-colors hover:text-[#00f2fe] ${
                  activeTab === tab.id ? "text-[#00f2fe] nav-link-active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* DROPDOWN */}
            <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`relative pb-1 flex items-center gap-1 transition-colors hover:text-[#00f2fe] ${
                  isDropdownActive || isDropdownOpen ? "text-[#00f2fe]" : ""
                }`}
              >
                Tính Năng Khác
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
                {(isDropdownActive || isDropdownOpen) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00f2fe] shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                )}
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 pt-4 w-64 z-50">
                    <div className="bg-[#030712]/95 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] p-2 flex flex-col gap-1">
                      {dropdownTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => { onTabChange(tab.id); setIsDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm font-bold tracking-wide transition-colors ${
                            activeTab === tab.id
                              ? "text-[#00f2fe] bg-[#00f2fe]/10 border-l-2 border-[#00f2fe]"
                              : "text-slate-400 hover:text-[#00f2fe] hover:bg-white/5 border-l-2 border-transparent"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest whitespace-nowrap shrink-0">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end cursor-default">
                  <span className="text-xs font-bold text-white normal-case tracking-normal max-w-[100px] lg:max-w-[150px] truncate block">
                    {user.user_metadata?.display_name || user.email}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 flex items-center gap-1 ${
                    user.tier === "vip"
                      ? "text-amber-400 border border-amber-500/50 bg-amber-500/10"
                      : "text-slate-400 border border-white/10 bg-white/5"
                  }`}>
                    {user.tier === "vip" ? "👑 VIP Dealer" : "Miễn phí"}
                  </span>
                </div>

                {user.tier !== "vip" && (
                  <button
                    onClick={onUpgradeVIP}
                    className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-5 py-2.5 text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all hover:from-amber-400 hover:to-yellow-300"
                  >
                    Nâng cấp VIP
                  </button>
                )}

                <button
                  onClick={onLogoutClick}
                  className="w-9 h-9 border border-white/10 bg-white/5 text-slate-400 flex items-center justify-center transition-colors hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-white px-5 py-2.5 font-bold uppercase tracking-widest text-[#030712] shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-colors hover:bg-[#00f2fe] hover:text-[#030712]"
              >
                Đăng Nhập
              </button>
            )}
          </div>

        </div>
      </header>
    </>
  );
}
