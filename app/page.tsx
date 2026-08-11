"use client";

import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

export default function Home() {
  const [activeTab, setActiveTab] = useState("evaluate"); 
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

  const defaultJsonTemplate = JSON.stringify({
    Vehicle_brand: "VinFast",
    Vehicle_model: "VF 5",
    Production_year: 2023,
    Mileage_km: 15000,
    Fuel_type: "electric",
    doors_replaced: 0,
    scratch_severity: "minor",
    previous_owners: 1,
    ev_battery_type: "lithium_ion",
    vehicle_conditions: ["none"],
    license_plate: "30G-888.88",
    Displacement_cm3: 0,
    Power_HP: 134,
    Transmission: "automatic",
    Drive: "fwd",
    Type: "suv",
    Colour: "black",
    Doors_number: 4,
    Seats_count: 5,
    Condition: "used",
    Origin_country: "Vietnam",
    CO2_emissions: 0,
    Vehicle_version: "Plus",
    Vehicle_generation: "Gen 1",
    Accident_free: true,
    Service_record_available: true,
    First_owner: "Yes",
    Air_conditioning: "auto",
    Alloy_wheels: true,
    Leather_seats: true,
    Navigation_system: true,
    Parking_sensors: true,
    Owner_birth_year: 1996
  }, null, 2);

  const [formData, setFormData] = useState(JSON.parse(defaultJsonTemplate));

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonInputText);
      setFormData(parsed);
      alert("Đã nạp dữ liệu JSON thành công!");
      setInputMode("form");
    } catch (error) {
      alert("Cục JSON bạn dán bị lỗi cú pháp. Vui lòng kiểm tra lại!");
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
      
      const payload = { txhash: tx.hash, ...formData };
      const response = await axios.post("http://127.0.0.1:8080/api/v1/transactions/evaluate", payload);
      
      const fullData = { ...response.data.data, ...formData };
      setResult(fullData);
      setStep(4);
    } catch (error) {
      console.error("Lỗi xử lý:", error);
      alert("Giao dịch bị hủy hoặc có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTx = async () => {
    if (!searchTx) return;
    setSearchLoading(true);
    setSearchResult(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8080/api/v1/transactions/${searchTx}`);
      const rawData = response.data.data;
      const formattedResult = {
        txhash: rawData.txhash,
        license_plate: rawData.license_plate,
        predicted_price_display: Number(rawData.predicted_price_vnd).toLocaleString() + " VND",
        ...rawData.original_car_info,
      };
      setSearchResult(formattedResult);
    } catch (error) {
      console.error(error);
      alert("Không tìm thấy mã giao dịch này trong cơ sở dữ liệu!");
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
    // FIX LOGIC BIỂN VIP: Kiểm tra cả nội dung phong thủy VÀ kiểm tra trực tiếp số trên biển
    const fengShuiText = (data.feng_shui_translation || "").toLowerCase();
    const plateText = (data.license_plate || "").replace(/[-.]/g, ''); // Bỏ gạch ngang và chấm
    
    // Nếu luận giải có chữ đẹp/tài/lộc HOẶC biển chứa 3 số lặp (888, 999) hoặc 68/86 thì tính là VIP
    const isVIP = fengShuiText.match(/(đẹp|phát|lộc|tài|đại cát|cát|tốt)/) || plateText.match(/(68|86|39|79|666|777|888|999|555)/);

    // Hàm an toàn để tránh hiển thị undefined
    const safeRender = (val: any) => {
      if (val === undefined || val === null) return "Không rõ";
      if (typeof val === 'boolean') return val ? "Có" : "Không";
      return String(val);
    };

    return (
      <div id="certificate-print" className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden animate-[fadeInUp_0.5s_ease-out]">
        <CertifiedStamp />
        
        <div className="hidden print-header text-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-black text-blue-600 mb-1">CHỨNG NHẬN ĐỊNH GIÁ XE AI.WEB3</h1>
          <p className="text-gray-500">Mã giao dịch: {data.txhash}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8 relative z-10 pt-4">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Giá thị trường dự đoán</p>
            <p className="text-3xl md:text-4xl font-black text-blue-600">{safeRender(data.predicted_price_display || data.predicted_price_vnd)}</p>
          </div>
          
          <div className={`p-6 rounded-2xl border ${isVIP ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border-yellow-300 ring-2 ring-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'bg-gray-50 border-gray-100'}`}>
            <p className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${isVIP ? 'text-yellow-700' : 'text-gray-500'}`}>
              Biển số xe {isVIP && <span className="text-lg animate-bounce">👑 VIP</span>}
            </p>
            <p className={`text-3xl md:text-4xl font-black tracking-widest font-mono ${isVIP ? 'text-yellow-800' : 'text-gray-900'}`}>
              {safeRender(data.license_plate)}
            </p>
          </div>

          <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-200 md:col-span-2">
            <p className="text-gray-900 font-bold mb-4 uppercase tracking-wider text-xs border-b pb-2 flex items-center justify-between">
              <span>📋 Chi tiết toàn bộ thông số xe (30+ Trường dữ liệu AI)</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
              <div><span className="text-gray-400 block text-xs">Hãng xe</span> <strong className="text-gray-800">{safeRender(data.Vehicle_brand)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Dòng xe</span> <strong className="text-gray-800">{safeRender(data.Vehicle_model)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Năm sản xuất</span> <strong className="text-gray-800">{safeRender(data.Production_year)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Odo (Km)</span> <strong className="text-gray-800">{safeRender(data.Mileage_km)} km</strong></div>
              <div><span className="text-gray-400 block text-xs">Kiểu dáng</span> <strong className="text-gray-800">{safeRender(data.Type)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Nhiên liệu</span> <strong className="text-gray-800">{safeRender(data.Fuel_type)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Dung tích (cm3)</span> <strong className="text-gray-800">{safeRender(data.Displacement_cm3)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Công suất (HP)</span> <strong className="text-gray-800">{safeRender(data.Power_HP)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Hộp số</span> <strong className="text-gray-800">{safeRender(data.Transmission)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Hệ dẫn động</span> <strong className="text-gray-800">{safeRender(data.Drive)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Màu sắc</span> <strong className="text-gray-800">{safeRender(data.Colour)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Số cửa / Ghế</span> <strong className="text-gray-800">{safeRender(data.Doors_number)} / {safeRender(data.Seats_count)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Tình trạng</span> <strong className="text-gray-800">{safeRender(data.Condition)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Xuất xứ</span> <strong className="text-gray-800">{safeRender(data.Origin_country)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Số đời chủ</span> <strong className="text-gray-800">{safeRender(data.previous_owners)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Không tai nạn</span> <strong className="text-gray-800">{safeRender(data.Accident_free)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Lịch sử bảo dưỡng</span> <strong className="text-gray-800">{safeRender(data.Service_record_available)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Chủ đầu tiên</span> <strong className="text-gray-800">{safeRender(data.First_owner)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Điều hòa</span> <strong className="text-gray-800">{safeRender(data.Air_conditioning)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Ghế da / Vành đúc</span> <strong className="text-gray-800">{safeRender(data.Leather_seats)} / {safeRender(data.Alloy_wheels)}</strong></div>
              <div><span className="text-gray-400 block text-xs">Năm sinh chủ xe</span> <strong className="text-gray-800">{safeRender(data.Owner_birth_year)}</strong></div>
            </div>
          </div>

          <div className="bg-orange-50/30 p-6 rounded-2xl border border-orange-100 md:col-span-2">
            <p className="text-orange-600 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="text-lg">☯️</span> Luận giải Phong Thủy
            </p>
            <p className="text-lg text-gray-800 leading-relaxed font-serif italic">"{data.feng_shui_translation || "Chưa có dữ liệu luận giải cho biển số này."}"</p>
          </div>
        </div>

        <div className="no-print bg-gray-900 p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 text-white relative z-20">
          <div className="overflow-hidden w-full flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Mã Giao Dịch (TxHash)</p>
            <div className="flex items-center gap-3">
              <p className="text-sm font-mono text-gray-200 truncate">{data.txhash}</p>
              <button onClick={() => handleCopy(data.txhash)} className="text-gray-400 hover:text-white p-1.5 bg-gray-800 rounded-md transition-colors flex-shrink-0" title="Copy TxHash">
                {isCopied ? <span className="text-green-400 text-xs font-bold px-1">Đã copy!</span> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>}
              </button>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => window.print()} 
              className="flex-1 md:flex-none whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Xuất PDF
            </button>
            <a href={`https://sepolia.etherscan.io/tx/${data.txhash}`} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
              Etherscan ↗
            </a>
          </div>
        </div>
      </div>
    );
  };

  // 24 Lỗi vi phạm giao thông thường gặp
  const trafficLaws = [
    { title: "Vượt đèn đỏ / đèn vàng", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🚦", color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Quá tốc độ 10-20km/h", fine: "4 - 6 triệu", detail: "Tước GPLX 1-3 tháng", icon: "⚡", color: "bg-orange-50 text-orange-600 border-orange-100" },
    { title: "Quá tốc độ >35km/h", fine: "10 - 12 triệu", detail: "Tước GPLX 2-4 tháng", icon: "🏎️", color: "bg-red-50 text-red-700 border-red-200" },
    { title: "Nồng độ cồn (Mức 1)", fine: "6 - 8 triệu", detail: "Tước GPLX 10-12 tháng", icon: "🍻", color: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: "Nồng độ cồn (Kịch khung)", fine: "30 - 40 triệu", detail: "Tước GPLX 22-24 tháng", icon: "🍷", color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200" },
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
    { title: "Không có bảo hiểm TNDS", fine: "400k - 600k", detail: "Phạt tiền trực tiếp", icon: "🛡️", color: "bg-teal-50 text-teal-600 border-teal-100" },
    { title: "Lắp còi hú sai quy định", fine: "2 - 3 triệu", detail: "Tịch thu còi", icon: "📢", color: "bg-orange-50 text-orange-600 border-orange-100" },
    { title: "Quay đầu xe trên cầu", fine: "400k - 600k", detail: "Phạt tiền trực tiếp", icon: "🌉", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "Đi vào đường cấm", fine: "2 - 3 triệu", detail: "Tước GPLX 1-3 tháng", icon: "🚫", color: "bg-red-50 text-red-500 border-red-100" },
    { title: "Không bật đèn ban đêm", fine: "800k - 1 triệu", detail: "Áp dụng từ 19h - 5h", icon: "💡", color: "bg-yellow-50 text-yellow-600 border-yellow-100" },
    { title: "Chở quá số người (>1 người)", fine: "400k - 600k/người", detail: "Nhân lên theo số người vượt", icon: "👨‍👩‍👧‍👦", color: "bg-green-50 text-green-600 border-green-100" },
    { title: "Để biển số bị che khuất", fine: "4 - 6 triệu", detail: "Phạt tiền trực tiếp", icon: "🌫️", color: "bg-gray-100 text-gray-600 border-gray-200" },
    { title: "Xe hết niên hạn", fine: "10 - 12 triệu", detail: "Tịch thu phương tiện", icon: "🏗️", color: "bg-stone-100 text-stone-700 border-stone-300" }
  ];

  // Dữ liệu Tạp chí: "Giải mã ngôn ngữ nghề cho ô tô"
  const magazineArticles = [
    { 
      category: "Động cơ", 
      items: [
        { title: "Bộ chế hòa khí ô tô là gì?", snippet: "\"Bộ chế hòa khí\" ô tô là gì? Ô tô có vận hành được nếu thiếu bộ chế hòa khí...", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=250&fit=crop" },
        { title: "Vè, lòng dè ô tô là gì?", snippet: "\"Vè ô tô\" tại garage hay nói tới là gì? Cùng Dinhgiaxe tìm hiểu về 2...", img: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400&h=250&fit=crop" },
        { title: "Khe hở xupap là gì? Cách...", snippet: "Khe hở supap là gì? Vai trò của khe hở supap đối với động cơ ô tô? Nguyên...", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=250&fit=crop" },
        { title: "Gioăng giàn cò là gì? Thay...", snippet: "Gioăng giàn cò là gì? Thay gioăng giàn cò có phải bổ máy? Chi phí thay gioăng...", img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=250&fit=crop" }
      ]
    },
    { 
      category: "Nội thất", 
      items: [
         { title: "\"Con ngựa\" ô tô là gì?", snippet: "\"Con ngựa\" tại garage hay nói tới là gì? Cùng Dinhgiaxe tìm hiểu thuật ngữ...", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop" },
         { title: "Trần thụng là gì?", snippet: "\"Trần thụng\" tại garage hay nói tới là gì? Cùng Dinhgiaxe tìm hiểu nguyên nhân...", img: "https://images.unsplash.com/photo-1503376710342-9b2f676231bd?w=400&h=250&fit=crop" }
      ]
    }
  ];

  const faqs = [
    { q: "Giá mua và giá bán khác nhau như thế nào?", a: "Giá mua được định nghĩa là giá mua xe cũ của cá nhân và là giá thu mua của các đại lý. Ngược lại, giá bán là giá bán ra của showroom. Thực tế, giá mua và giá bán xe cũ có sự chênh lệch khá lớn vì phần lớn các showroom sẽ mất chi phí bảo dưỡng, trùng tu trước khi bán." },
    { q: "Giá trên công cụ định giá AI có chính xác không?", a: "Hệ thống phân tích dựa trên hơn 30 biến số kỹ thuật (Odo, dòng xe, năm sản xuất...) kết hợp với dữ liệu thị trường thực tế, mang lại mức giá sát nhất với giao dịch thực tế." },
    { q: "Dữ liệu công cụ được lấy từ đâu?", a: "Dữ liệu được thu thập và tổng hợp từ hàng trăm ngàn tin đăng bán xe trên các sàn thương mại điện tử, showroom lớn trên toàn quốc và liên tục được máy học (Machine Learning) cập nhật." },
    { q: "Kết quả định giá có được cập nhật không?", a: "Có. Trọng số của mô hình AI sẽ được tính toán và cập nhật theo từng chu kỳ biến động của thị trường xe cũ, đảm bảo giá trị luôn theo sát thời cuộc." },
    { q: "Tại sao xe của tôi không định giá được?", a: "Có thể xe của bạn thuộc dạng quá hiếm (Classic, xe sưu tầm) không có dữ liệu đối chiếu trên thị trường, hoặc bạn đã nhập sai một số thông số kỹ thuật. Vui lòng kiểm tra lại Form nhập liệu." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] text-gray-800 font-sans selection:bg-blue-200">
      
      <header className="no-print bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab("evaluate"); setStep(1); setResult(null); }}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">Đ</div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">địnhgiá<span className="text-blue-600">xe</span>.ai</span>
          </div>
          <div className="flex gap-6 text-sm font-bold text-gray-600">
            <span onClick={() => { setActiveTab("evaluate"); setStep(1); setResult(null); }} className={`cursor-pointer transition-colors pb-1 border-b-2 ${activeTab === "evaluate" ? "text-blue-600 border-blue-600" : "border-transparent hover:text-blue-600"}`}>Định giá AI</span>
            <span onClick={() => { setActiveTab("search"); setSearchResult(null); setSearchTx(""); }} className={`cursor-pointer transition-colors pb-1 border-b-2 ${activeTab === "search" ? "text-blue-600 border-blue-600" : "border-transparent hover:text-blue-600"}`}>Tra cứu TxHash</span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-6 pt-12 pb-20 w-full">
        
        {activeTab === "search" && (
          <div className="max-w-3xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            <h1 className="no-print text-3xl font-extrabold text-gray-900 mb-2 text-center">Tra Cứu Chứng Nhận Định Giá</h1>
            <p className="no-print text-gray-500 text-center mb-8">Nhập mã giao dịch (TxHash) trên mạng Sepolia để xem lại toàn bộ hồ sơ xe và xuất PDF.</p>
            <div className="no-print flex gap-3 mb-10">
              <input type="text" placeholder="Nhập mã TxHash (VD: 0x9fa311d...)" value={searchTx} onChange={(e) => setSearchTx(e.target.value)} className="flex-1 bg-white border border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-mono shadow-sm" />
              <button onClick={handleSearchTx} disabled={searchLoading || !searchTx} className="bg-gray-900 hover:bg-blue-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap">
                {searchLoading ? "Đang tìm..." : "Tra Cứu"}
              </button>
            </div>
            {searchResult && <ResultView data={searchResult} />}
          </div>
        )}

        {activeTab === "evaluate" && step === 1 && (
          <div className="space-y-20 animate-[fadeIn_0.5s_ease-out]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl font-extrabold leading-tight text-gray-900">Có gì ở <span className="text-blue-600">địnhgiáxe.ai</span>? ⚡</h1>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Định giá bằng AI <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-2">MỚI</span></h3>
                    <p className="text-gray-500">Biết chiếc xe của bạn đáng giá bao nhiêu theo dữ liệu thị trường thực tế.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Minh bạch qua Blockchain</h3>
                    <p className="text-gray-500">Chứng nhận định giá được cấp mộc điện tử và có thể xuất file PDF bất cứ lúc nào.</p>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:scale-95">
                  Dùng thử Định Giá Ngay →
                </button>
              </div>
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-sm transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">🚗</div>
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

            {/* SECTION: GIẢI MÃ NGÔN NGỮ NGHỀ (Y HỆT ẢNH) */}
            <div className="pt-12 border-t border-gray-200">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800 uppercase tracking-tight">GIẢI MÃ NGÔN NGỮ "NGHỀ" CHO Ô TÔ</h2>
                <p className="text-gray-500 mt-1">Những từ ngữ chủ garage, cò lái mua bán xe ô tô cũ thường dùng bạn cần biết</p>
              </div>
              
              {magazineArticles.map((cat, idx) => (
                <div key={idx} className="mb-10">
                  <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
                    <h3 className="text-xl font-bold text-gray-900">{cat.category}</h3>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">Xem thêm <span>→</span></a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {cat.items.map((item, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-xl mb-3 aspect-video">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{item.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SECTION: CẨM NANG LUẬT GIAO THÔNG */}
            <div className="pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-3"><span className="text-3xl">🚨</span> Cẩm nang Lỗi vi phạm 24/7 (Ô tô)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {trafficLaws.map((law, index) => (
                  <div key={index} className={`p-4 rounded-2xl border ${law.color} bg-opacity-50 hover:bg-opacity-100 transition-colors cursor-pointer flex flex-col justify-between`}>
                    <div>
                      <div className="text-2xl mb-2">{law.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-1 text-xs leading-tight line-clamp-2">{law.title}</h3>
                    </div>
                    <div>
                      <p className="text-sm font-black mb-1">{law.fine}</p>
                      <p className="text-[10px] font-medium opacity-80 line-clamp-1">{law.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: FAQ */}
            <div className="pt-12 border-t border-gray-200 pb-10">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h2 className="text-3xl font-extrabold text-gray-800">Câu hỏi thường gặp</h2>
                </div>
                <div className="md:col-span-2 space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`bg-white rounded-xl border ${openFaq === index ? 'border-gray-300 shadow-sm' : 'border-gray-100'} overflow-hidden transition-all duration-300`}>
                      <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-left px-6 py-4 font-semibold text-gray-900 flex justify-between items-center focus:outline-none">
                        {faq.q}
                        <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                      <div className={`px-6 text-sm text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* BƯỚC 2: NHẬP FORM */}
        {activeTab === "evaluate" && step === 2 && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 animate-[fadeInUp_0.4s_ease-out]">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Thông tin xe</h2>
                <p className="text-gray-500 text-sm">Điền form hoặc dán mã JSON để AI định giá nhanh.</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button onClick={() => setInputMode("form")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${inputMode === "form" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>Nhập Form</button>
                <button onClick={() => { setInputMode("json"); setJsonInputText(JSON.stringify(formData, null, 2)); }} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${inputMode === "json" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>Dán JSON ({">"}30 trường)</button>
              </div>
            </div>
            {inputMode === "json" ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-500">Dán toàn bộ đối tượng JSON chứa các biến mô hình AI vào ô dưới đây:</p>
                <textarea rows={14} value={jsonInputText} onChange={(e) => setJsonInputText(e.target.value)} className="w-full bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner" />
                <button onClick={handleApplyJson} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all shadow-md">Áp dụng JSON vào hệ thống</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="group relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hãng xe</label>
                  <div className="relative">
                    <select name="Vehicle_brand" value={formData.Vehicle_brand} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer font-medium hover:bg-gray-100">
                      <option value="Toyota">Toyota</option><option value="Honda">Honda</option><option value="Ford">Ford</option><option value="VinFast">VinFast</option>
                      <option value="Hyundai">Hyundai</option><option value="Kia">Kia</option><option value="Mazda">Mazda</option>
                    </select>
                    <DropdownIcon />
                  </div>
                </div>
                <div className="group relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dòng xe (Model)</label>
                  <input type="text" name="Vehicle_model" list="car_models" placeholder="Gõ hoặc chọn dòng xe..." value={formData.Vehicle_model} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium placeholder-gray-400 hover:bg-gray-100" />
                  <datalist id="car_models">
                    <option value="Vios" /><option value="Camry" /><option value="Corolla Cross" /><option value="Innova" />
                    <option value="Fadil" /><option value="VF 5" /><option value="VF 8" /><option value="Lux A2.0" />
                    <option value="City" /><option value="CR-V" /><option value="Accent" /><option value="Tucson" />
                    <option value="Ranger" /><option value="Everest" /><option value="Mazda 3" /><option value="CX-5" />
                  </datalist>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Năm sản xuất</label>
                  <div className="relative">
                    <select name="Production_year" value={formData.Production_year} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer font-medium hover:bg-gray-100">
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <DropdownIcon />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Số Km đã đi</label>
                  <input type="number" name="Mileage_km" value={formData.Mileage_km} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl font-medium" />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Năm sinh chủ xe</label>
                  <input type="number" name="Owner_birth_year" value={formData.Owner_birth_year} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl font-medium" />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Biển số xe (VD: 30G-888.88)</label>
                  <input type="text" name="license_plate" value={formData.license_plate} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl text-xl font-mono tracking-wider uppercase font-medium" />
                </div>
              </div>
            )}
            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2 transition-colors flex items-center gap-2"><span>←</span> Quay lại</button>
              <button onClick={handleGoToPayment} className="bg-[#00B14F] hover:bg-[#009944] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-200 transition-all transform active:scale-95">Tiếp tục thanh toán →</button>
            </div>
          </div>
        )}

        {/* BƯỚC 3: XÁC NHẬN */}
        {activeTab === "evaluate" && step === 3 && (
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-[scaleIn_0.3s_ease-out]">
            <h2 className="text-2xl font-extrabold mb-2 text-gray-900 mt-4">Xác Nhận Dịch Vụ</h2>
            <p className="text-gray-500 mb-8 text-sm">Cấp mộc định giá Blockchain cho xe <strong className="text-gray-900 font-mono">{formData.license_plate}</strong></p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Phí dịch vụ Web3</p>
              <p className="text-4xl font-black text-gray-900 flex justify-center items-baseline gap-1">0.001 <span className="text-xl text-blue-600 font-bold">ETH</span></p>
            </div>
            <button onClick={payAndEvaluate} disabled={loading} className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all ${loading ? "bg-gray-200 text-gray-400" : "bg-gray-900 hover:bg-blue-600 text-white shadow-xl hover:-translate-y-1 active:scale-95"}`}>
              {loading ? "Đang xử lý giao dịch..." : "Ký & Thanh Toán"}
            </button>
          </div>
        )}

        {/* BƯỚC 4: KẾT QUẢ ĐỊNH GIÁ */}
        {activeTab === "evaluate" && step === 4 && result && (
          <div className="max-w-4xl mx-auto">
            <div className="no-print text-center mb-10 animate-[fadeInUp_0.4s_ease-out]">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner">✓</div>
              <h2 className="text-4xl font-extrabold text-gray-900">Chứng Nhận Hoàn Tất</h2>
            </div>
            <ResultView data={result} />
            <div className="no-print text-center mt-10">
              <button onClick={() => { setStep(1); setResult(null); }} className="text-gray-500 hover:text-gray-900 font-bold px-6 py-3 transition-colors underline">Định giá xe khác</button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER GIỐNG ẢNH */}
      <footer className="no-print bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg mb-2">địnhgiáxe.ai</h3>
            <p className="text-sm text-gray-500">Công cụ phân tích giá xe cũ sử dụng trí tuệ nhân tạo tích hợp Web3 đầu tiên tại Việt Nam.</p>
            <p className="text-xs text-gray-400 mt-4">Version 2.0</p>
          </div>
          <div className="md:text-right">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Liên hệ với chúng tôi</h3>
            <p className="text-sm text-gray-600 flex items-center md:justify-end gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              hotro@dinhgiaxe.ai
            </p>
            <p className="text-xs text-gray-400 mt-4">© 2026 dinhgiaxe.ai</p>
          </div>
        </div>
      </footer>

      {/* CSS CHO ANIMATION VÀ PRINT (In PDF) */}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        @media print {
          body { background-color: white !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #certificate-print { 
            position: absolute; 
            left: 0; top: 0; width: 100%; 
            box-shadow: none !important; 
            border: none !important;
            padding: 0 !important;
          }
          .print-header { display: block !important; }
        }
      `}</style>
    </div>
  );
}