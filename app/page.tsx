"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); 
  const [authLoading, setAuthLoading] = useState(false);
  const [authForm, setAuthForm] = useState({
    fullName: "", phone: "", email: "", otp: ""
  });

  const [activeTab, setActiveTab] = useState("home"); 
  const [step, setStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  const [inputMode, setInputMode] = useState("form");
  const [jsonInputText, setJsonInputText] = useState("");
  const [searchTx, setSearchTx] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [txHistory, setTxHistory] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (user?.email) {
      const savedHistory = localStorage.getItem(`txHistory_${user.email}`);
      if (savedHistory) {
        setTxHistory(JSON.parse(savedHistory));
      }
    } else {
      setTxHistory([]);
    }
  }, [user]);

  const handleAuthChange = (e: any) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    if (authMode === "register" && (!authForm.fullName || !authForm.phone)) {
      alert("Vui lòng điền đủ Tên và SĐT để đăng ký!");
      return;
    }
    if (!authForm.email) return;

    setAuthLoading(true);

    const otpOptions: any = authMode === "register" 
      ? { 
          shouldCreateUser: true, 
          data: { display_name: authForm.fullName, phone: authForm.phone } 
        } 
      : { 
          shouldCreateUser: false 
        };

    const { error } = await supabase.auth.signInWithOtp({
      email: authForm.email,
      options: otpOptions
    });
    
    setAuthLoading(false);

    if (error) {
      if (error.message.includes("Signups not allowed") || error.message.toLowerCase().includes("not found")) {
        alert("Email này chưa được đăng ký! Vui lòng chuyển sang tab 'Tạo Tài Khoản' để đăng ký.");
      } else {
        alert("Lỗi gửi OTP: " + error.message);
      }
    } else {
      setAuthMode("verify"); 
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    if (!authForm.otp) return;
    setAuthLoading(true);
    
    const { error } = await supabase.auth.verifyOtp({
      email: authForm.email,
      token: authForm.otp,
      type: 'email'
    });
    
    setAuthLoading(false);

    if (error) {
      alert("Mã OTP không hợp lệ hoặc đã hết hạn!");
    } else {
      setShowAuthModal(false); 
      setAuthForm({ fullName: "", phone: "", email: "", otp: "" }); 
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActiveTab("home");
    setStep(1);
    setAuthMode("login");
  };

  const requireAuth = (callback: () => void) => {
    if (user) {
      callback();
    } else {
      setShowAuthModal(true);
      setAuthMode("login");
    }
  };

  const defaultJsonTemplate = JSON.stringify({
    Vehicle_brand: "VinFast", Vehicle_model: "VF 5", Production_year: 2023, Mileage_km: 15000, Fuel_type: "electric",
    doors_replaced: 0, scratch_severity: "minor", previous_owners: 1, ev_battery_type: "lithium_ion", vehicle_conditions: ["none"],
    license_plate: "30G-888.88", Displacement_cm3: 0, Power_HP: 134, Transmission: "automatic", Drive: "fwd", Type: "suv",
    Colour: "black", Doors_number: 4, Seats_count: 5, Condition: "used", Origin_country: "Vietnam", CO2_emissions: 0,
    Vehicle_version: "Plus", Vehicle_generation: "Gen 1", Accident_free: true, Service_record_available: true, First_owner: "Yes",
    Air_conditioning: "auto", Alloy_wheels: true, Leather_seats: true, Navigation_system: true, Parking_sensors: true, Owner_birth_year: 1996
  }, null, 2);

  const [formData, setFormData] = useState(JSON.parse(defaultJsonTemplate));

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleApplyJson = () => {
    try {
      setFormData(JSON.parse(jsonInputText));
      alert("Đã nạp dữ liệu JSON thành công!");
      setInputMode("form");
    } catch (error) {
      alert("Cục JSON bị lỗi cú pháp. Vui lòng kiểm tra lại!");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const connectAndCheckNetwork = async () => {
    if (typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111n) {
          alert("Sai mạng lưới! Vui lòng chuyển sang Sepolia Testnet.");
          return false;
        }
        setWalletAddress(accounts[0]);
        return true;
      } catch (error) {
        console.error("Lỗi ví:", error);
        return false;
      }
    } else {
      alert("Vui lòng cài đặt MetaMask!");
      return false;
    }
  };

  const handleGoToPayment = async () => {
    const isConnected = await connectAndCheckNetwork();
    if (isConnected) setStep(3);
  };

  const payAndEvaluate = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contractABI = ["function payForValuation() public payable"];
      const contractAddress = "0x2B6F37e09682a26a5689D8A178e27bd0aE973E1C"; 
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.payForValuation({ value: ethers.parseEther("0.001") });
      await tx.wait();
      
      const payload = { txhash: tx.hash, ...formData, user_email: user.email }; 
      const response = await axios.post("http://127.0.0.1:8080/api/v1/transactions/evaluate", payload);
      
      const fullData = { ...response.data.data, ...formData };
      setResult(fullData);
      setStep(4);

      if (user?.email) {
        const newItem = {
          txhash: tx.hash,
          license_plate: formData.license_plate,
          date: new Date().toLocaleString('vi-VN')
        };
        setTxHistory((prev: any) => {
          const newHistory = [newItem, ...prev];
          localStorage.setItem(`txHistory_${user.email}`, JSON.stringify(newHistory));
          return newHistory;
        });
      }

    } catch (error) {
      console.error("Lỗi xử lý:", error);
      alert("Giao dịch bị hủy hoặc có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTx = async (hashToSearch?: string) => {
    const targetHash = typeof hashToSearch === 'string' ? hashToSearch : searchTx;
    if (!targetHash) return;
    
    setSearchTx(targetHash); 
    setSearchLoading(true);
    setSearchResult(null);
    
    try {
      const response = await axios.get(`http://127.0.0.1:8080/api/v1/transactions/${targetHash}`);
      const rawData = response.data.data;

      // ĐIỂM CHỐT QUAN TRỌNG: Dịch dữ liệu từ Database thành Object an toàn
      let parsedInfo = {};
      if (rawData.original_car_info) {
        if (typeof rawData.original_car_info === 'string') {
          try { 
            parsedInfo = JSON.parse(rawData.original_car_info); 
          } catch(e) {
            console.error("Lỗi đọc dữ liệu JSON từ Database:", e);
          }
        } else {
          parsedInfo = rawData.original_car_info;
        }
      }

      const formattedResult = {
        txhash: rawData.txhash,
        license_plate: rawData.license_plate,
        // Đồng bộ định dạng tiền tệ đẹp giống hệt tab Định Giá
        predicted_price_display: Number(rawData.predicted_price_vnd).toLocaleString('vi-VN') + " VNĐ",
        ...parsedInfo, // Bung toàn bộ 30+ trường thông tin vào đây
      };
      
      setSearchResult(formattedResult);
      
    } catch (error) {
      console.error(error);
      alert("Không tìm thấy mã giao dịch này!");
    } finally {
      setSearchLoading(false);
    }
  };

  const years = Array.from({ length: 22 }, (_, i) => 2026 - i);
  const DropdownIcon = () => (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
      <svg className="w-5 h-5 transition-transform duration-300 group-focus-within:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  );

  const CertifiedStamp = () => (
    <div className="absolute top-6 right-6 opacity-90 transform rotate-[-15deg] pointer-events-none select-none z-30 drop-shadow-md">
      <div className="w-28 h-28 border-[4px] border-double border-[#D32F2F] rounded-full flex flex-col items-center justify-center text-[#D32F2F] p-1 text-center bg-white/40 backdrop-blur-[2px]">
        <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Chứng Nhận</span>
        <span className="text-xl font-black uppercase leading-none my-1 border-y-2 border-[#D32F2F] py-1 w-full text-center tracking-tighter">AI.WEB3</span>
        <span className="text-[8px] font-bold uppercase tracking-wider opacity-80">Đã Thẩm Định</span>
      </div>
    </div>
  );

  const ResultView = ({ data }: { data: any }) => {
    const fengShuiText = (data.feng_shui_translation || "").toLowerCase();
    const plateText = (data.license_plate || "").replace(/[-.]/g, '');
    const isVIP = fengShuiText.match(/(đẹp|phát|lộc|tài|đại cát|cát|tốt)/) || plateText.match(/(68|86|39|79|666|777|888|999|555)/);

    const safeRender = (val: any) => {
      if (val === undefined || val === null) return "Không rõ";
      if (typeof val === 'boolean') return val ? "Có" : "Không";
      return String(val);
    };

    // Chuẩn bị mảng dữ liệu để map ra các card
    const carDetails = [
      { label: "Hãng xe", value: safeRender(data.Vehicle_brand), icon: "🏢" },
      { label: "Dòng xe", value: safeRender(data.Vehicle_model), icon: "🚘" },
      { label: "Năm sản xuất", value: safeRender(data.Production_year), icon: "📅" },
      { label: "Odo (Km)", value: `${safeRender(data.Mileage_km)} km`, icon: "🛣️" },
      { label: "Kiểu dáng", value: safeRender(data.Type), icon: "🚙" },
      { label: "Nhiên liệu", value: safeRender(data.Fuel_type), icon: "⛽" },
      { label: "Dung tích (cm3)", value: safeRender(data.Displacement_cm3), icon: "⚙️" },
      { label: "Công suất (HP)", value: safeRender(data.Power_HP), icon: "🐎" },
      { label: "Hộp số", value: safeRender(data.Transmission), icon: "🕹️" },
      { label: "Hệ dẫn động", value: safeRender(data.Drive), icon: "🛞" },
      { label: "Màu sắc", value: safeRender(data.Colour), icon: "🎨" },
      { label: "Số cửa / Ghế", value: `${safeRender(data.Doors_number)} / ${safeRender(data.Seats_count)}`, icon: "🚪" },
      { label: "Tình trạng", value: safeRender(data.Condition), icon: "🔍" },
      { label: "Xuất xứ", value: safeRender(data.Origin_country), icon: "🌍" },
      { label: "Số đời chủ", value: safeRender(data.previous_owners), icon: "👤" },
      { label: "Không tai nạn", value: safeRender(data.Accident_free), icon: "🛡️" },
      { label: "Lịch sử bảo dưỡng", value: safeRender(data.Service_record_available), icon: "🔧" },
      { label: "Chủ đầu tiên", value: safeRender(data.First_owner), icon: "🥇" },
      { label: "Điều hòa", value: safeRender(data.Air_conditioning), icon: "❄️" },
      { label: "Ghế da / Vành đúc", value: `${safeRender(data.Leather_seats)} / ${safeRender(data.Alloy_wheels)}`, icon: "💺" },
      { label: "Năm sinh chủ xe", value: safeRender(data.Owner_birth_year), icon: "🎂" },
    ];

    return (
      <div id="certificate-print" className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden animate-[fadeInUp_0.5s_ease-out]">
        <CertifiedStamp />
        <div className="hidden print-header text-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-black text-blue-600 mb-1">CHỨNG NHẬN ĐỊNH GIÁ XE AI.WEB3</h1>
          <p className="text-gray-500">Người yêu cầu: {user?.user_metadata?.display_name || user?.email} | Mã giao dịch: {data.txhash}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 mb-8 relative z-10 pt-4">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Giá thị trường dự đoán</p>
            <p className="text-3xl md:text-4xl font-black text-blue-600">{safeRender(data.predicted_price_display || data.predicted_price_vnd)}</p>
          </div>
          <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVIP ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border-yellow-300 ring-2 ring-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'bg-gray-50 border-gray-100'}`}>
            <p className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${isVIP ? 'text-yellow-700' : 'text-gray-500'}`}>
              Biển số xe {isVIP && <span className="text-lg animate-bounce">👑 VIP</span>}
            </p>
            <p className={`text-3xl md:text-4xl font-black tracking-widest font-mono ${isVIP ? 'text-yellow-800' : 'text-gray-900'}`}>
              {safeRender(data.license_plate)}
            </p>
          </div>
          
          {/* PHẦN ĐÃ NÂNG CẤP UI (THU NHỎ ICON VÀ HIỂN THỊ ĐỦ TEXT) */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 rounded-3xl border border-gray-200 md:col-span-2 shadow-inner">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">📋</div>
              <p className="text-gray-900 font-extrabold uppercase tracking-widest text-sm">
                Chi tiết toàn bộ thông số xe <span className="text-gray-400 font-medium text-xs ml-1">(30+ Trường dữ liệu AI)</span>
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {carDetails.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl border border-gray-100 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-bold mb-0.5 leading-tight">{item.label}</span>
                    <strong className="text-gray-800 text-xs md:text-sm block font-black leading-tight break-words">{item.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50/30 p-6 rounded-2xl border border-orange-100 md:col-span-2 transition-all duration-300 hover:shadow-md">
            <p className="text-orange-600 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-lg">☯️</span> Luận giải Phong Thủy
            </p>
            <p className="text-lg text-gray-800 leading-relaxed font-serif italic">"{data.feng_shui_translation || "Chưa có dữ liệu luận giải."}"</p>
          </div>
        </div>
        <div className="no-print bg-gray-900 p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 text-white relative z-20 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300">
          <div className="overflow-hidden w-full flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Mã Giao Dịch (TxHash)</p>
            <div className="flex items-center gap-3">
              <p className="text-sm font-mono text-gray-200 truncate">{data.txhash}</p>
              <button onClick={() => handleCopy(data.txhash)} className="text-gray-400 hover:text-white p-1.5 bg-gray-800 hover:bg-blue-600 rounded-md transition-all active:scale-90 flex-shrink-0" title="Copy TxHash">
                {isCopied ? <span className="text-green-400 text-xs font-bold px-1">Đã copy!</span> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>}
              </button>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => window.print()} className="flex-1 md:flex-none whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Xuất PDF
            </button>
            <a href={`https://sepolia.etherscan.io/tx/${data.txhash}`} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none whitespace-nowrap bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
              Etherscan ↗
            </a>
          </div>
        </div>
      </div>
    );
  };

  const trafficLaws = [
    { title: "Vượt đèn đỏ / đèn vàng", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🚦", color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Quá tốc độ 10-20km/h", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "⚡", color: "bg-orange-50 text-orange-600 border-orange-100" },
    { title: "Quá tốc độ >35km/h", fine: "10 - 12 triệu", detail: "Tước GPLX 2-4 tháng", icon: "🏎️", color: "bg-red-50 text-red-700 border-red-200" },
    { title: "Nồng độ cồn (Mức 1)", fine: "6 - 8 triệu", detail: "Tước GPLX 10-12 tháng", icon: "🍻", color: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: "Đi sai làn đường", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🛣️", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "Đi ngược chiều", fine: "4 - 6 triệu", detail: "Tước GPLX 2-4 tháng", icon: "⛔", color: "bg-rose-50 text-rose-600 border-rose-100" },
    { title: "Không thắt dây an toàn", fine: "800k - 1 triệu", detail: "Phạt người lái & ghế phụ", icon: "💺", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { title: "Dùng điện thoại khi lái", fine: "2 - 3 triệu", detail: "Tước GPLX 1-3 tháng", icon: "📱", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
    { title: "Vượt phải sai quy định", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🚙", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    { title: "Dừng, đỗ xe sai quy định", fine: "800k - 1 triệu", detail: "Phạt tiền, cẩu xe", icon: "🅿️", color: "bg-gray-100 text-gray-700 border-gray-200" },
    { title: "Chuyển làn không xi-nhan", fine: "400k - 600k", detail: "Phạt tiền trực tiếp", icon: "↔️", color: "bg-lime-50 text-lime-700 border-lime-100" },
    { title: "Hết hạn đăng kiểm (< 1 tháng)", fine: "2 - 3 triệu", detail: "Tước GPLX 1-3 tháng", icon: "📋", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { title: "Không nhường xe ưu tiên", fine: "6 - 8 triệu", detail: "Tước GPLX 2-4 tháng", icon: "🚑", color: "bg-pink-50 text-pink-600 border-pink-100" },
    { title: "Không có GPLX", fine: "10 - 12 triệu", detail: "Tạm giữ xe 7 ngày", icon: "🪪", color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Lùi xe trên cao tốc", fine: "16 - 18 triệu", detail: "Tước GPLX 5-7 tháng", icon: "🔙", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { title: "Không bảo hiểm TNDS", fine: "400k - 600k", detail: "Phạt tiền trực tiếp", icon: "🛡️", color: "bg-teal-50 text-teal-600 border-teal-100" }
  ];

  const magazineArticles = [
    { category: "Động cơ", items: [
      { title: "Bộ chế hòa khí ô tô là gì?", snippet: "Ô tô có vận hành được nếu thiếu bộ chế hòa khí...", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=250&fit=crop" },
      { title: "Vè, lòng dè ô tô là gì?", snippet: "Vè ô tô tại garage hay nói tới là gì? Cùng tìm hiểu...", img: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400&h=250&fit=crop" }
    ]},
    { category: "Nội thất", items: [
      { title: "\"Con ngựa\" ô tô là gì?", snippet: "Thuật ngữ \"con ngựa\" tại garage hay nói tới là gì?", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop" },
      { title: "Trần thụng là gì?", snippet: "Trần thụng tại garage hay nói tới là gì? Nguyên nhân do đâu?", img: "https://images.unsplash.com/photo-1503376710342-9b2f676231bd?w=400&h=250&fit=crop" }
    ]}
  ];

  const faqs = [
    { q: "Giá mua và giá bán khác nhau như thế nào?", a: "Giá mua là giá đại lý thu vào, giá bán là giá showroom bán ra. Luôn có sự chênh lệch do chi phí bảo dưỡng." },
    { q: "Giá trên công cụ định giá AI có chính xác không?", a: "Hệ thống phân tích dựa trên hơn 30 biến số kỹ thuật và dữ liệu thị trường thực tế." },
    { q: "Dữ liệu công cụ được lấy từ đâu?", a: "Dữ liệu được thu thập và tổng hợp từ hàng trăm ngàn tin đăng bán xe trên các sàn thương mại điện tử, showroom lớn trên toàn quốc." },
    { q: "Kết quả định giá có được cập nhật không?", a: "Có. Trọng số của mô hình AI sẽ được tính toán và cập nhật theo từng chu kỳ biến động của thị trường." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] text-gray-800 font-sans selection:bg-blue-200">
      
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-opacity duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-[scaleIn_0.3s_ease-out]">
            <button onClick={() => { setShowAuthModal(false); setAuthMode("login"); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            {authMode !== "verify" && (
              <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative">
                <button onClick={() => setAuthMode("login")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${authMode === "login" ? "bg-white text-blue-600 shadow-md transform scale-100" : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"}`}>Đăng Nhập</button>
                <button onClick={() => setAuthMode("register")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${authMode === "register" ? "bg-white text-blue-600 shadow-md transform scale-100" : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"}`}>Tạo Tài Khoản</button>
              </div>
            )}

            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">
              {authMode === "verify" ? "Nhập mã xác nhận" : "Xác thực danh tính"}
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              {authMode === "verify" ? "Vui lòng kiểm tra Email và nhập mã số" : "Sử dụng Email để nhận mã OTP an toàn"}
            </p>
            
            {authMode === "verify" ? (
              <form onSubmit={handleVerifyOtp} className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div>
                  <input type="text" name="otp" maxLength={8} value={authForm.otp} onChange={handleAuthChange} required className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none text-center text-2xl font-mono tracking-[0.3em]" placeholder="--------" />
                </div>
                <button type="submit" disabled={authLoading} className="w-full bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:-translate-y-1 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all duration-300 mt-4">
                  {authLoading ? "Đang xác thực..." : "Xác nhận Đăng Nhập"}
                </button>
                <div className="text-center mt-4">
                  <button type="button" onClick={() => setAuthMode("login")} className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">Thử lại Email khác</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSendOtp} className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                {authMode === "register" && (
                  <div className="space-y-4 animate-[fadeInUp_0.3s_ease-out]">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Họ và Tên</label>
                      <input type="text" name="fullName" value={authForm.fullName} onChange={handleAuthChange} required={authMode === "register"} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:border-gray-300 transition-all duration-300 outline-none" placeholder="VD: Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                      <input type="tel" name="phone" value={authForm.phone} onChange={handleAuthChange} required={authMode === "register"} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:border-gray-300 transition-all duration-300 outline-none" placeholder="VD: 0987654321" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email của bạn</label>
                  <input type="email" name="email" value={authForm.email} onChange={handleAuthChange} required className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:border-gray-300 transition-all duration-300 outline-none" placeholder="VD: email@gmail.com" />
                </div>
                <button type="submit" disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-500 hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all duration-300 mt-4">
                  {authLoading ? "Đang gửi mã..." : "Nhận mã OTP"}
                </button>
                <div className="text-center pt-3 border-t border-gray-100 mt-4">
                  <button type="button" onClick={() => setAuthMode("verify")} className="text-sm font-semibold text-gray-500 hover:text-blue-600 hover:scale-105 transition-all duration-300">
                    Đã có mã OTP? Chuyển sang ô nhập mã
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <header className="no-print bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setActiveTab("home"); setStep(1); setResult(null); }}>
            <div className="w-8 h-8 bg-blue-600 group-hover:bg-blue-700 group-hover:rotate-12 rounded flex items-center justify-center text-white font-bold text-xl transition-all duration-300 shadow-md">Đ</div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">địnhgiá<span className="text-blue-600">xe</span>.ai</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-bold text-gray-600">
            <span onClick={() => setActiveTab("home")} className={`relative cursor-pointer py-2 group transition-colors duration-300 hover:text-blue-600 ${activeTab === "home" ? "text-blue-600" : ""}`}>
              Trang chủ
              <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "home" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
            </span>
            <span onClick={() => requireAuth(() => { setActiveTab("evaluate"); setStep(2); setResult(null); })} className={`relative cursor-pointer py-2 group transition-colors duration-300 hover:text-blue-600 ${activeTab === "evaluate" ? "text-blue-600" : ""}`}>
              Định giá AI
              <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "evaluate" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
            </span>
            <span onClick={() => requireAuth(() => { setActiveTab("search"); setSearchResult(null); setSearchTx(""); })} className={`relative cursor-pointer py-2 group transition-colors duration-300 hover:text-blue-600 ${activeTab === "search" ? "text-blue-600" : ""}`}>
              Tra cứu TxHash
              <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ease-out ${activeTab === "search" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
            </span>
            
            {user ? (
              <div className="flex items-center gap-3 ml-2 pl-6 border-l border-gray-200">
                <span className="bg-gray-50 border border-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                   👋 {user.user_metadata?.display_name || user.email.split('@')[0]}
                </span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all duration-300" title="Đăng xuất">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </button>
              </div>
            ) : (
              <button onClick={() => { setShowAuthModal(true); setAuthMode("login"); }} className="ml-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 hover:shadow-[0_8px_15px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 font-bold">
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </header>

      <main key={activeTab} className="flex-grow max-w-6xl mx-auto px-6 pt-12 pb-20 w-full animate-[fadeInUp_0.4s_ease-out]">
        
        {activeTab === "home" && (
          <div className="space-y-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl font-extrabold leading-tight text-gray-900">Có gì ở <span className="text-blue-600">địnhgiáxe.ai</span>? ⚡</h1>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">Định giá bằng AI <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-3 animate-pulse">MỚI</span></h3>
                    <p className="text-gray-500">Biết chiếc xe của bạn đáng giá bao nhiêu theo dữ liệu thị trường thực tế.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Minh bạch qua Blockchain</h3>
                    <p className="text-gray-500">Chứng nhận định giá được cấp mộc điện tử và có thể xuất file PDF bất cứ lúc nào.</p>
                  </div>
                </div>
                <button onClick={() => requireAuth(() => { setActiveTab("evaluate"); setStep(2); })} className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-2 group">
                  Dùng thử Định Giá Ngay <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 animate-[pulse_3s_ease-in-out_infinite]"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-sm transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🚗</div>
                    <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">Web3 AI</div>
                  </div>
                  <h4 className="font-bold text-xl text-gray-800 mb-2">Giá Trị Ước Tính</h4>
                  <p className="text-sm text-gray-500 mb-6">Đã cấp mộc chứng nhận Blockchain</p>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-full"></div><div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-16 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group relative cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop" alt="Giới thiệu" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white font-black text-xl tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Thấu hiểu giá trị, Minh bạch niềm tin.</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Về <span className="text-blue-600">ĐịnhGiáXe.ai</span></h2>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    Khởi nguồn từ sự thấu hiểu nỗi đau của người mua bán xe cũ về việc "bị hớ" giá, ĐịnhGiáXe.ai tự hào là nền tảng tiên phong tại Việt Nam ứng dụng Trí tuệ nhân tạo (AI) và công nghệ Web3 Blockchain vào việc thẩm định. 
                    <br/><br/>
                    Sứ mệnh của chúng tôi là chuẩn hóa và minh bạch hóa thị trường xe cũ, giúp người mua và người bán kết nối với nhau dựa trên dữ liệu thực tế và sự tin tưởng tuyệt đối.
                  </p>
                  <ul className="space-y-4 font-medium text-gray-700">
                    <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"><span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full shadow-sm text-sm">✓</span> Phân tích hơn 30+ biến số kỹ thuật</li>
                    <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"><span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full shadow-sm text-sm">✓</span> Cập nhật dữ liệu thị trường theo thời gian thực</li>
                    <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"><span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full shadow-sm text-sm">✓</span> Chứng nhận Blockchain vĩnh viễn, không thể làm giả</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-16 border-t border-gray-200">
              <h2 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Được tin tưởng & nhắc đến bởi</h2>
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
                 <div className="text-3xl font-black font-serif tracking-tighter text-gray-400 hover:text-[#9f224e] hover:scale-110 transition-all duration-500 cursor-pointer">VNEXPRESS</div>
                 <div className="text-3xl font-black text-gray-400 hover:text-[#008a66] hover:scale-110 tracking-tighter transition-all duration-500 cursor-pointer">DÂN TRÍ</div>
                 <div className="text-3xl font-black text-gray-400 hover:text-[#d62828] hover:scale-110 font-sans italic tracking-tighter transition-all duration-500 cursor-pointer">AutoPro</div>
                 <div className="text-3xl font-black text-gray-400 hover:text-[#005ea8] hover:scale-110 tracking-tighter transition-all duration-500 cursor-pointer">TUỔI TRẺ</div>
                 <div className="text-3xl font-black text-gray-400 hover:text-gray-900 hover:scale-110 tracking-tighter transition-all duration-500 cursor-pointer">Znews</div>
              </div>
            </div>

            <div className="pt-16 border-t border-gray-200">
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-800 uppercase tracking-tight">GIẢI MÃ NGÔN NGỮ "NGHỀ" CHO Ô TÔ</h2>
                  <p className="text-gray-500 mt-1">Những từ ngữ chủ garage, cò lái mua bán xe ô tô cũ thường dùng</p>
                </div>
              </div>
              {magazineArticles.map((cat, idx) => (
                <div key={idx} className="mb-12">
                  <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{cat.category}</h3>
                    <a href="#" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 group">Xem thêm <span className="transform group-hover:translate-x-1 transition-transform">→</span></a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {cat.items.map((item, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-2xl mb-4 aspect-video shadow-md group-hover:shadow-xl transition-shadow duration-300">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{item.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-16 border-t border-gray-200">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3"><span className="text-4xl animate-bounce">🚨</span> Cẩm nang Lỗi vi phạm 24/7</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
                {trafficLaws.map((law, index) => (
                  <div key={index} className={`p-4 rounded-2xl border ${law.color} bg-opacity-30 hover:bg-opacity-100 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-lg`}>
                    <div>
                      <div className="text-3xl mb-3 transform hover:scale-110 transition-transform">{law.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-2 text-xs leading-tight line-clamp-3">{law.title}</h3>
                    </div>
                    <div>
                      <p className="text-sm font-black mb-1">{law.fine}</p>
                      <p className="text-[10px] font-semibold opacity-70 line-clamp-2 leading-tight">{law.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-16 border-t border-gray-200 pb-10">
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-1"><h2 className="text-3xl font-extrabold text-gray-800 sticky top-24">Câu hỏi thường gặp</h2></div>
                <div className="md:col-span-2 space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`bg-white rounded-2xl border ${openFaq === index ? 'border-blue-300 shadow-md ring-4 ring-blue-50' : 'border-gray-100 hover:border-gray-300'} overflow-hidden transition-all duration-300`}>
                      <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-left px-6 py-5 font-bold text-gray-900 flex justify-between items-center focus:outline-none">
                        <span className="text-lg">{faq.q}</span>
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 ${openFaq === index ? 'bg-blue-100 text-blue-600 rotate-180' : ''}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </span>
                      </button>
                      <div className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "search" && (
          <div className="max-w-3xl mx-auto">
            <h1 className="no-print text-4xl font-extrabold text-gray-900 mb-3 text-center tracking-tight">Tra Cứu Chứng Nhận Định Giá</h1>
            <p className="no-print text-gray-500 text-center mb-10 text-lg">Xin chào <span className="font-bold text-blue-600">{user?.user_metadata?.display_name || user?.email}</span>, hãy nhập mã giao dịch (TxHash) trên mạng Sepolia để tra cứu.</p>
            
            <div className="no-print flex flex-col sm:flex-row gap-4 mb-10 bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <input type="text" placeholder="Nhập mã TxHash (VD: 0x123abc...)" value={searchTx} onChange={(e) => setSearchTx(e.target.value)} className="flex-1 bg-gray-50 border border-transparent hover:border-gray-200 p-4 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-mono" />
              <button onClick={() => handleSearchTx()} disabled={searchLoading || !searchTx} className="bg-gray-900 hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-bold shadow-md hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none">
                {searchLoading ? <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang tìm...</span> : "Tra Cứu Ngay"}
              </button>
            </div>

            {txHistory.length > 0 && !searchResult && (
              <div className="no-print mb-10 bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-[fadeInUp_0.4s_ease-out]">
                <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3 border-b pb-4">
                  <span className="bg-blue-100 p-2 rounded-xl text-blue-600">🕒</span> Lịch sử định giá của bạn
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
                  {txHistory.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleSearchTx(item.txhash)}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100">🚗</div>
                        <div>
                          <p className="font-extrabold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">{item.license_plate}</p>
                          <p className="text-sm text-gray-400 font-mono mt-1 truncate max-w-[200px] md:max-w-sm group-hover:text-blue-400 transition-colors">{item.txhash}</p>
                        </div>
                      </div>
                      <div className="mt-3 sm:mt-0 text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors duration-300">
                        {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchResult && <ResultView data={searchResult} />}
          </div>
        )}

        {activeTab === "evaluate" && step === 2 && (
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-100 pb-6 gap-4">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Thông số đánh giá</h2>
                <p className="text-gray-500 text-lg">Hệ thống AI phân tích dựa trên hơn 30+ trường dữ liệu.</p>
              </div>
              <div className="flex bg-gray-100 p-1.5 rounded-xl shadow-inner w-full md:w-auto">
                <button onClick={() => setInputMode("form")} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${inputMode === "form" ? "bg-white text-blue-600 shadow-md scale-100" : "text-gray-500 hover:text-gray-900"}`}>Nhập Form</button>
                <button onClick={() => { setInputMode("json"); setJsonInputText(JSON.stringify(formData, null, 2)); }} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${inputMode === "json" ? "bg-white text-blue-600 shadow-md scale-100" : "text-gray-500 hover:text-gray-900"}`}>Dán JSON</button>
              </div>
            </div>

            {inputMode === "json" ? (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <textarea rows={16} value={jsonInputText} onChange={(e) => setJsonInputText(e.target.value)} className="w-full bg-gray-900 text-emerald-400 font-mono text-sm p-6 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/30 transition-shadow duration-300 custom-scrollbar" />
                <button onClick={handleApplyJson} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300">Nạp dữ liệu JSON</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10 animate-[fadeIn_0.3s_ease-out]">
                <div className="group relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Hãng xe</label>
                  <div className="relative">
                    <select name="Vehicle_brand" value={formData.Vehicle_brand} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 cursor-pointer font-bold shadow-sm hover:shadow-md">
                      <option value="Toyota">Toyota</option><option value="Honda">Honda</option><option value="Ford">Ford</option><option value="VinFast">VinFast</option>
                      <option value="Hyundai">Hyundai</option><option value="Kia">Kia</option><option value="Mazda">Mazda</option>
                    </select>
                    <DropdownIcon />
                  </div>
                </div>
                <div className="group relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Dòng xe (Model)</label>
                  <input type="text" name="Vehicle_model" list="car_models" placeholder="Gõ hoặc chọn dòng xe..." value={formData.Vehicle_model} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 font-bold placeholder-gray-400 shadow-sm hover:shadow-md" />
                  <datalist id="car_models">
                    <option value="Vios" /><option value="Camry" /><option value="Corolla Cross" /><option value="Innova" />
                    <option value="Fadil" /><option value="VF 5" /><option value="VF 8" /><option value="Lux A2.0" />
                    <option value="City" /><option value="CR-V" /><option value="Accent" /><option value="Tucson" />
                    <option value="Ranger" /><option value="Everest" /><option value="Mazda 3" /><option value="CX-5" />
                  </datalist>
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Năm sản xuất</label>
                  <div className="relative">
                    <select name="Production_year" value={formData.Production_year} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 cursor-pointer font-bold shadow-sm hover:shadow-md">
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <DropdownIcon />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Số Km đã đi (Odo)</label>
                  <input type="number" name="Mileage_km" value={formData.Mileage_km} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 font-bold shadow-sm hover:shadow-md" />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Năm sinh chủ xe (Để luận Phong Thủy)</label>
                  <input type="number" name="Owner_birth_year" value={formData.Owner_birth_year} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 font-bold shadow-sm hover:shadow-md" />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Biển số xe (VD: 30G-888.88)</label>
                  <input type="text" name="license_plate" value={formData.license_plate} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 hover:border-gray-300 text-blue-700 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 text-xl font-mono tracking-widest uppercase font-black shadow-sm hover:shadow-md" />
                </div>
              </div>
            )}
            
            <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-4">
              <button onClick={() => setActiveTab("home")} className="w-full md:w-auto text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"><span>←</span> Trở về Trang chủ</button>
              <button onClick={handleGoToPayment} className="w-full md:w-auto bg-[#00B14F] hover:bg-[#009944] text-white px-10 py-4 rounded-xl font-extrabold text-lg shadow-lg hover:shadow-[0_10px_20px_rgba(0,177,79,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">Thẩm Định & Ký Web3 →</button>
            </div>
          </div>
        )}

        {activeTab === "evaluate" && step === 3 && (
          <div className="max-w-lg mx-auto bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-10 text-center animate-[scaleIn_0.3s_ease-out]">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="text-3xl font-extrabold mb-3 text-gray-900">Xác Nhận Dịch Vụ</h2>
            <p className="text-gray-500 mb-10 text-lg">Cấp mộc định giá Blockchain cho xe <strong className="text-gray-900 font-mono tracking-widest px-2 py-1 bg-gray-100 rounded">{formData.license_plate}</strong></p>
            
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-10">
              <p className="text-sm text-gray-400 font-black uppercase tracking-widest mb-3">Phí dịch vụ Web3</p>
              <p className="text-6xl font-black text-gray-900 flex justify-center items-baseline gap-2">0.001 <span className="text-2xl text-blue-600 font-bold">ETH</span></p>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} disabled={loading} className="px-6 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50">Hủy</button>
              <button onClick={payAndEvaluate} disabled={loading} className={`flex-1 px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 flex justify-center items-center gap-3 ${loading ? "bg-blue-400 text-white cursor-wait" : "bg-gray-900 hover:bg-blue-600 text-white shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95"}`}>
                {loading ? <><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang xử lý...</> : "Ký & Thanh Toán"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "evaluate" && step === 4 && result && (
          <div className="max-w-4xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
            <div className="no-print text-center mb-12">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner transform hover:scale-110 transition-transform duration-300 cursor-default">✓</div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Chứng Nhận Hoàn Tất</h2>
              <p className="text-gray-500">Mã giao dịch của bạn đã được ghi nhận trên Blockchain.</p>
            </div>
            
            <ResultView data={result} />
            
            <div className="no-print text-center mt-12">
              <button onClick={() => { setStep(2); setResult(null); }} className="text-gray-500 hover:text-blue-600 font-bold px-8 py-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">⟲ Định giá xe khác</button>
            </div>
          </div>
        )}
      </main>

      <footer className="no-print bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center text-white font-bold text-xs">Đ</div>
              <h3 className="font-extrabold text-gray-900 text-xl tracking-tight">địnhgiá<span className="text-blue-600">xe</span>.ai</h3>
            </div>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">Công cụ phân tích giá xe cũ sử dụng Trí tuệ nhân tạo (AI) tích hợp Web3 Blockchain minh bạch đầu tiên tại Việt Nam.</p>
            <p className="text-xs text-gray-400 mt-6 font-mono">Version 2.0.1 PRO</p>
          </div>
          <div className="md:text-right flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wider">Hỗ trợ khách hàng</h3>
              <a href="mailto:hotro@dinhgiaxe.ai" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline">hotro@dinhgiaxe.ai</a>
            </div>
            <p className="text-xs text-gray-400 mt-6">© 2026 DinhGiaXe AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        /* Thay đổi thanh cuộn cho mượt mà */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #CBD5E1; border-radius: 20px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #94A3B8; }
        
        @media print {
          body { background-color: white !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #certificate-print { 
            position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; border: none !important; padding: 0 !important;
          }
          .print-header { display: block !important; }
        }
      `}</style>
    </div>
  );
}