"use client";
import { useState } from "react";
import { Copy, Check, QrCode, ArrowUpRight, Download, AlertTriangle, Crown, Settings2, Car, Calendar, Gauge, Fuel, Palette, MapPin, Wind, Disc, ShieldCheck, Navigation, ParkingSquare, DoorOpen, Users, Key, Zap, Wrench } from "lucide-react";

export default function ResultCertificate({ data, user }: { data: any; user: any }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fengShuiText = (data.feng_shui_translation || "").toLowerCase();
  const last5Digits = (data.license_plate || "").replace(/[^0-9]/g, '').slice(-5);
  
  const isVIP = 
    fengShuiText.match(/(đẹp|phát|lộc|tài|đại cát|cát|tốt)/) || 
    last5Digits.match(/(68|86|39|79|666|777|888|999|555)$/) || 
    last5Digits.match(/(1111|2222|3333|4444|5555|6666|7777|8888|9999)/);

  const safeRender = (val: any) => {
    if (val === undefined || val === null || val === "none") return "Không rõ";
    if (typeof val === 'boolean') return val ? "Có" : "Không";
    return String(val);
  };

  const carDetails = [
    { label: "Hãng xe", value: safeRender(data.Vehicle_brand), icon: <Car className="w-5 h-5"/> },
    { label: "Dòng xe", value: safeRender(data.Vehicle_model), icon: <Car className="w-5 h-5"/> },
    { label: "Năm sản xuất", value: safeRender(data.Production_year), icon: <Calendar className="w-5 h-5"/> },
    { label: "Odo (Km)", value: `${safeRender(data.Mileage_km)} km`, icon: <Gauge className="w-5 h-5"/> },
    { label: "Kiểu dáng", value: safeRender(data.Type), icon: <Car className="w-5 h-5"/> },
    { label: "Nhiên liệu", value: safeRender(data.Fuel_type), icon: <Fuel className="w-5 h-5"/> },
    { label: "Dung tích (cm3)", value: safeRender(data.Displacement_cm3), icon: <Settings2 className="w-5 h-5"/> },
    { label: "Công suất (HP)", value: safeRender(data.Power_HP), icon: <Zap className="w-5 h-5"/> },
    { label: "Hộp số", value: safeRender(data.Transmission), icon: <Settings2 className="w-5 h-5"/> },
    { label: "Hệ dẫn động", value: safeRender(data.Drive), icon: <Settings2 className="w-5 h-5"/> },
    { label: "Màu sắc", value: safeRender(data.Colour), icon: <Palette className="w-5 h-5"/> },
    { label: "Số cửa", value: safeRender(data.Doors_number), icon: <DoorOpen className="w-5 h-5"/> },
    { label: "Số ghế", value: safeRender(data.Seats_count), icon: <Users className="w-5 h-5"/> },
    { label: "Xuất xứ", value: safeRender(data.Origin_country), icon: <MapPin className="w-5 h-5"/> },
    { label: "Số đời chủ", value: safeRender(data.previous_owners), icon: <Crown className="w-5 h-5"/> },
    { label: "Chủ đầu tiên", value: safeRender(data.First_owner), icon: <Key className="w-5 h-5"/> },
    { label: "Không tai nạn", value: safeRender(data.Accident_free), icon: <ShieldCheck className="w-5 h-5"/> },
    { label: "Bảo dưỡng Hãng", value: safeRender(data.Service_record_available), icon: <Wrench className="w-5 h-5"/> },
    { label: "Điều hoà tự động", value: safeRender(data.Air_conditioning === "auto" || data.Air_conditioning === true), icon: <Wind className="w-5 h-5"/> },
    { label: "Mâm hợp kim", value: safeRender(data.Alloy_wheels), icon: <Disc className="w-5 h-5"/> },
    { label: "Ghế da", value: safeRender(data.Leather_seats), icon: <Car className="w-5 h-5"/> },
    { label: "Hệ thống định vị", value: safeRender(data.Navigation_system), icon: <Navigation className="w-5 h-5"/> },
    { label: "Cảm biến đỗ xe", value: safeRender(data.Parking_sensors), icon: <ParkingSquare className="w-5 h-5"/> },
    { label: "Mức độ xước xát", value: safeRender(data.scratch_severity), icon: <AlertTriangle className="w-5 h-5"/> },
  ];

  // Bảng màu cho từng dòng (mỗi dòng 6 ô)
  const cBlue = { bg: "bg-blue-50/70", border: "border-blue-100", icon: "text-blue-600", label: "text-blue-600 dark:text-blue-500", val: "text-blue-900" };
  const cIndigo = { bg: "bg-indigo-50/70", border: "border-indigo-100", icon: "text-indigo-600", label: "text-indigo-500", val: "text-indigo-900" };
  const cAmber = { bg: "bg-amber-50/70", border: "border-amber-100", icon: "text-amber-600", label: "text-amber-600/80", val: "text-amber-900" };
  const cEmerald = { bg: "bg-emerald-50/70", border: "border-emerald-100", icon: "text-emerald-600", label: "text-emerald-600/80", val: "text-emerald-900" };

  return (
    <div id="certificate-print" className="relative mt-10 mb-10 w-full bg-[#fdfbf7] shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-[fadeInUp_0.5s_ease-out] mx-auto text-gray-800 overflow-hidden" style={{ minHeight: '800px' }}>
      
      {/* ================= CORNER TRIANGLES (NAVY + GOLD) ================= */}
      {/* Top Left */}
      <svg className="absolute top-0 left-0 w-32 h-32 md:w-56 md:h-56 z-0 drop-shadow-md pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 100,0 0,100" fill="#0B192C" />
        <polygon points="0,0 85,0 0,85" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
      </svg>
      {/* Top Right */}
      <svg className="absolute top-0 right-0 w-32 h-32 md:w-56 md:h-56 z-0 drop-shadow-md pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 100,0 100,100" fill="#0B192C" />
        <polygon points="15,0 100,0 100,85" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
      </svg>
      {/* Bottom Left */}
      <svg className="absolute bottom-0 left-0 w-32 h-32 md:w-56 md:h-56 z-0 drop-shadow-md pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 100,100 0,100" fill="#0B192C" />
        <polygon points="0,15 85,100 0,100" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
      </svg>
      {/* Bottom Right */}
      <svg className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 z-0 drop-shadow-md pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="100,0 100,100 0,100" fill="#0B192C" />
        <polygon points="100,15 100,100 15,100" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
      </svg>

      {/* ================= GOLDEN INNER BORDER ================= */}
      <div className="absolute inset-4 md:inset-6 border-[3px] border-[#FBBF24] z-10 pointer-events-none opacity-80"></div>
      <div className="absolute inset-5 md:inset-7 border border-[#FBBF24] z-10 pointer-events-none opacity-50"></div>

      {/* ================= RED CERTIFIED STAMP ================= */}
      <div className="absolute top-[35%] right-[10%] md:right-[20%] z-20 pointer-events-none opacity-80 transform rotate-[-15deg] scale-[1.2] drop-shadow-md">
        <div className="border-[6px] border-red-600 rounded-lg p-2 animate-[pulse_3s_ease-in-out_infinite]">
          <div className="border-[2px] border-red-600 border-dashed rounded px-6 py-2 bg-[#fdfbf7]/50 backdrop-blur-[1px]">
            <h2 className="text-4xl md:text-5xl font-black text-red-600 uppercase tracking-widest text-center" style={{ textShadow: '1px 1px 0px rgba(220,38,38,0.3)' }}>
              ĐÃ KIỂM ĐỊNH
            </h2>
            <p className="text-center text-red-600 font-bold tracking-widest text-[10px] uppercase mt-1">
              AI.WEB3 BLOCKCHAIN SYSTEM
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-20 flex flex-col items-center px-10 md:px-20 pt-16 md:pt-24 pb-32">
        
        {/* Header Text */}
        <h1 className="text-5xl md:text-7xl font-serif text-[#0B192C] mb-2 tracking-wide font-black" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          Certificate
        </h1>
        <h2 className="text-sm md:text-lg font-bold tracking-[0.4em] text-gray-500 uppercase mb-12">
          OF VALUATION & AUTHENTICATION
        </h2>

        {data.isTampered && (
          <div className="w-full max-w-2xl bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded shadow-sm animate-pulse">
            <div className="flex items-center gap-4">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              <div>
                <h3 className="text-sm font-black text-red-800 uppercase tracking-wider">Cảnh báo bảo mật!</h3>
                <p className="text-sm text-red-700 mt-1 font-medium">Dữ liệu chứng nhận đã bị can thiệp trái phép. Chữ ký Blockchain không khớp!</p>
              </div>
            </div>
          </div>
        )}

        {/* Presentation Text */}
        <p className="text-sm font-bold tracking-[0.2em] text-[#0B192C] uppercase mb-6">
          Proudly Presented To
        </p>

        {/* User Name in Cursive */}
        <div className="w-full max-w-2xl border-b border-gray-400 pb-2 mb-8 text-center group cursor-default">
          <h3 className="text-5xl md:text-6xl text-[#0B192C] group-hover:text-[#FBBF24] transition-colors duration-500" style={{ fontFamily: "'Brush Script MT', 'Great Vibes', cursive, serif" }}>
            {user?.user_metadata?.display_name || user?.email || "Khách Hàng SmartCar"}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 text-center max-w-3xl leading-relaxed font-serif italic mb-12 px-4">
          Chứng nhận này xác thực  phương tiện dưới đây đã vượt qua quá trình phân tích 30+ điểm dữ liệu bởi Trí Tuệ Nhân Tạo (AI),  định giá được ký sốvĩnh viễn trên mạng lưới Blockchain.
        </p>

        {/* Highlight Stats (Price & Plate) */}
        <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl mb-12">
          <div className="text-center p-8 bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#0B192C] transition-all duration-300 rounded-lg group">
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${data.isTampered ? 'text-red-500' : 'text-gray-400 group-hover:text-[#FBBF24] transition-colors'}`}>
              Giá Thị Trường Dự Đoán {data.isTampered && "(Bị sai lệch)"}
            </p>
            <p className={`text-3xl md:text-4xl font-black font-serif ${data.isTampered ? 'text-red-600 line-through' : 'text-[#0B192C]'}`}>
              {safeRender(data.predicted_price_display || data.predicted_price_vnd)}
            </p>
          </div>
          <div className={`text-center p-8 bg-white border shadow-sm transition-all duration-300 rounded-lg group hover:shadow-lg hover:-translate-y-1 ${isVIP && !data.isTampered ? 'border-[#FBBF24]' : 'border-gray-200 hover:border-[#0B192C]'}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2 ${isVIP && !data.isTampered ? 'text-[#D97706]' : 'text-gray-400 group-hover:text-[#FBBF24] transition-colors'}`}>
              Biển Số Xe {isVIP && !data.isTampered && <Crown className="w-4 h-4 animate-bounce text-[#D97706]" />}
            </p>
            <p className={`text-3xl md:text-4xl font-black font-mono tracking-widest ${isVIP && !data.isTampered ? 'text-[#D97706]' : 'text-[#0B192C]'}`}>
              {safeRender(data.license_plate)}
            </p>
          </div>
        </div>

        {/* Car Details Grid */}
        <div className="w-full max-w-5xl mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {carDetails.map((item, idx) => {
              const rowIdx = Math.floor(idx / 6);
              const color = rowIdx === 0 ? cBlue : rowIdx === 1 ? cIndigo : rowIdx === 2 ? cAmber : cEmerald;
              return (
              <div key={idx} className={`flex flex-col items-center justify-center p-3 border rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default ${color.bg} ${color.border} hover:bg-[#0B192C] hover:border-[#0B192C]`}>
                <div className={`group-hover:text-[#FBBF24] group-hover:scale-125 transition-all duration-300 mb-2 ${color.icon}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 text-center group-hover:text-gray-300 transition-colors ${color.label}`}>
                  {item.label}
                </span>
                <strong className={`text-xs font-black text-center leading-tight group-hover:text-white transition-colors ${color.val}`}>
                  {item.value}
                </strong>
              </div>
            )})}
          </div>
        </div>

        {/* Signatures & TxHash Line */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-end mt-8 border-t border-gray-200 pt-8 relative gap-4">
          
          <div className="text-center w-32 md:w-40 mb-8 md:mb-0 shrink-0">
            <p className="font-serif italic text-2xl text-[#0B192C] mb-2" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>AI.WEB3 Engine</p>
            <div className="h-px bg-gray-400 w-full mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Evaluator</p>
          </div>

          <div className="text-center flex-1 min-w-[200px] flex flex-col items-center group cursor-pointer" onClick={() => handleCopy(data.txhash)} title="Copy TxHash">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 flex items-center gap-1 group-hover:text-[#0B192C] transition-colors">
              <QrCode className="w-3 h-3" /> TxHash (Mã Khối)
            </p>
            <div className="h-px bg-gray-200 w-full mb-2"></div>
            <p className="text-[10px] font-mono text-gray-600 break-all w-full group-hover:text-[#FBBF24] transition-colors flex items-center justify-center gap-2">
              {data.txhash} {isCopied && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-500" />}
            </p>
          </div>

          <div className="text-center w-32 md:w-40 shrink-0 flex flex-col justify-end h-full">
            {data.userSignature ? (
              <img src={data.userSignature} alt="Customer Signature" className="h-10 w-full object-contain mix-blend-multiply opacity-80 mb-2" />
            ) : (
              <p className="font-serif italic text-xl text-[#0B192C] mb-2 truncate w-full px-2">{data.user_email?.split('@')[0] || "Customer"}</p>
            )}
            <div className="h-px bg-gray-400 w-full mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Customer</p>
          </div>

          <div className="text-center w-32 md:w-40 shrink-0">
            <p className="font-serif italic text-xl text-[#0B192C] mb-2 mt-4 md:mt-0">{data.date || new Date().toLocaleDateString('vi-VN')}</p>
            <div className="h-px bg-gray-400 w-full mb-2"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Date Issued</p>
          </div>

        </div>
        
      </div>
        
      {/* ================= GOLDEN SEAL (BOTTOM CENTER) ================= */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-30 group cursor-default print-exact">
        <div className="relative w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">
          {/* Blue Ribbons */}
          <div className="absolute -bottom-6 -left-3 w-8 h-12 bg-[#0B192C] transform -rotate-[20deg] -z-10 origin-top">
            <div className="absolute bottom-0 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#fdfbf7]"></div>
          </div>
          <div className="absolute -bottom-6 -right-3 w-8 h-12 bg-[#0B192C] transform rotate-[20deg] -z-10 origin-top">
            <div className="absolute bottom-0 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#fdfbf7]"></div>
          </div>
          
          {/* Golden Sunburst circle */}
          <div className="w-24 h-24 bg-gradient-to-br from-[#FDE047] via-[#F59E0B] to-[#B45309] rounded-full flex items-center justify-center p-1 border-[3px] border-[#0B192C] border-dashed shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-[spin_15s_linear_infinite]">
          </div>
          
          {/* Inner Golden Plate */}
          <div className="absolute inset-[6px] bg-gradient-to-br from-[#FEF08A] to-[#D97706] rounded-full border-2 border-[#92400E] shadow-inner flex flex-col items-center justify-center">
             <span className="text-[#0B192C] text-[11px] font-black tracking-widest uppercase">Verified</span>
             <span className="text-white text-[8px] font-bold bg-[#0B192C] px-1.5 rounded mt-0.5">AI.WEB3</span>
          </div>
        </div>
      </div>

      {/* ================= ACTION BUTTONS (NON-PRINT) ================= */}
      <div className="absolute top-8 right-8 z-50 flex flex-col gap-2 no-print opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:opacity-100">
        <button onClick={() => window.print()} className="bg-[#0B192C] hover:bg-[#FBBF24] text-white hover:text-[#0B192C] px-4 py-2.5 rounded shadow-lg font-bold text-sm transition-all active:scale-95 flex items-center gap-2 group/btn">
          <Download className="w-4 h-4 group-hover/btn:animate-bounce" /> Xuất PDF
        </button>
        <a href={`https://sepolia.etherscan.io/tx/${data.txhash}`} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#0B192C] text-[#0B192C] hover:text-white border border-[#0B192C] px-4 py-2.5 rounded shadow-lg font-bold text-sm transition-all active:scale-95 flex items-center gap-2">
           Etherscan <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
      
    </div>
  );
}