"use client";
import { useState } from "react";

export default function ResultCertificate({ data, user }: { data: any; user: any }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fengShuiText = (data.feng_shui_translation || "").toLowerCase();
  
  // Lọc ra đúng 5 số cuối của biển xe
  const last5Digits = (data.license_plate || "").replace(/[^0-9]/g, '').slice(-5);
  
  // Logic VIP Mới: Phải KẾT THÚC ($) bằng lộc phát/thần tài/tam hoa, HOẶC có tứ quý/ngũ quý
  const isVIP = 
    fengShuiText.match(/(đẹp|phát|lộc|tài|đại cát|cát|tốt)/) || 
    last5Digits.match(/(68|86|39|79|666|777|888|999|555)$/) || 
    last5Digits.match(/(1111|2222|3333|4444|5555|6666|7777|8888|9999)/);

  const safeRender = (val: any) => {
    if (val === undefined || val === null) return "Không rõ";
    if (typeof val === 'boolean') return val ? "Có" : "Không";
    return String(val);
  };

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
  ];

  return (
    <div id="certificate-print" className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden animate-[fadeInUp_0.5s_ease-out]">
      <div className="absolute top-6 right-6 opacity-90 transform rotate-[-15deg] pointer-events-none select-none z-30 drop-shadow-md">
        <div className="w-28 h-28 border-[4px] border-double border-[#D32F2F] rounded-full flex flex-col items-center justify-center text-[#D32F2F] p-1 text-center bg-white/40 backdrop-blur-[2px]">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Chứng Nhận</span>
          <span className="text-xl font-black uppercase leading-none my-1 border-y-2 border-[#D32F2F] py-1 w-full text-center tracking-tighter">AI.WEB3</span>
          <span className="text-[8px] font-bold uppercase tracking-wider opacity-80">Đã Thẩm Định</span>
        </div>
      </div>
      
      <div className="hidden print-header text-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-black text-blue-600 mb-1">CHỨNG NHẬN ĐỊNH GIÁ XE AI.WEB3</h1>
        <p className="text-gray-500">Người yêu cầu: {user?.user_metadata?.display_name || user?.email} | Mã giao dịch: {data.txhash}</p>
      </div>

      {data.isTampered && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg animate-pulse shadow-md relative z-20">
          <div className="flex items-center">
            <span className="text-red-600 text-3xl">⚠️</span>
            <div className="ml-4">
              <h3 className="text-sm font-black text-red-800 uppercase tracking-wider">Cảnh báo bảo mật nghiêm trọng!</h3>
              <p className="text-sm text-red-700 mt-1 font-medium leading-relaxed">Chữ ký Blockchain không khớp! Dữ liệu của tờ chứng nhận này đã bị can thiệp trái phép trên cơ sở dữ liệu.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 mb-8 relative z-10 pt-4">
        <div className={`p-6 rounded-2xl border transition-all duration-300 ${data.isTampered ? 'bg-red-50/50 border-red-200' : 'bg-blue-50/50 border-blue-100'}`}>
          <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${data.isTampered ? 'text-red-500' : 'text-gray-500'}`}>Giá thị trường dự đoán {data.isTampered && "(Bị sai lệch)"}</p>
          <p className={`text-3xl md:text-4xl font-black ${data.isTampered ? 'text-red-600 line-through' : 'text-blue-600'}`}>{safeRender(data.predicted_price_display || data.predicted_price_vnd)}</p>
        </div>

        <div className={`p-6 rounded-2xl border transition-all duration-300 ${isVIP && !data.isTampered ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border-yellow-300 ring-2 ring-yellow-400' : 'bg-gray-50 border-gray-100'}`}>
          <p className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${isVIP && !data.isTampered ? 'text-yellow-700' : 'text-gray-500'}`}>Biển số xe {isVIP && !data.isTampered && <span className="text-lg animate-bounce">👑 VIP</span>}</p>
          <p className={`text-3xl md:text-4xl font-black tracking-widest font-mono ${isVIP && !data.isTampered ? 'text-yellow-800' : 'text-gray-900'}`}>{safeRender(data.license_plate)}</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 rounded-3xl border border-gray-200 md:col-span-2 shadow-inner">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">📋</div>
            <p className="text-gray-900 font-extrabold uppercase tracking-widest text-sm">Chi tiết thông số xe</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {carDetails.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl border border-gray-100 flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-bold mb-0.5 leading-tight">{item.label}</span>
                  <strong className="text-gray-800 text-xs md:text-sm block font-black leading-tight break-words">{item.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 🏷️ KHU VỰC TÙY CHỌN & TRANG BỊ CAO CẤP (THEO THẺ TAG) */}
      {/* ======================================================== */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] mb-8 relative z-10">
        <h3 className="text-sm font-extrabold text-gray-800 mb-5 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-3">
          <span className="text-xl">✨</span> Trang bị thêm đã được lên 
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {data.Air_conditioning === "auto" && (
            <span className="px-4 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-xl text-sm border border-blue-100 shadow-sm flex items-center gap-2">❄️ Điều hòa tự động</span>
          )}
          {data.Alloy_wheels && (
            <span className="px-4 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl text-sm border border-gray-200 shadow-sm flex items-center gap-2">🛞 Mâm hợp kim</span>
          )}
          {data.Leather_seats && (
            <span className="px-4 py-2.5 bg-amber-50 text-amber-700 font-bold rounded-xl text-sm border border-amber-100 shadow-sm flex items-center gap-2">💺 Ghế da cao cấp</span>
          )}
          {data.Navigation_system && (
            <span className="px-4 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm border border-indigo-100 shadow-sm flex items-center gap-2">🗺️ Hệ thống định vị</span>
          )}
          {data.Parking_sensors && (
            <span className="px-4 py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-sm border border-emerald-100 shadow-sm flex items-center gap-2">📡 Cảm biến đỗ xe</span>
          )}
          
          {/* HIỂN THỊ TÌNH TRẠNG HAO MÒN / HƯ HỎNG NẾU CÓ */}
          {data.scratch_severity && data.scratch_severity !== "none" && (
            <span className="px-4 py-2.5 bg-red-50 text-red-700 font-bold rounded-xl text-sm border border-red-100 shadow-sm flex items-center gap-2">
              ⚠️ Xước xát: {data.scratch_severity}
            </span>
          )}
          {data.doors_replaced > 0 && (
            <span className="px-4 py-2.5 bg-orange-50 text-orange-700 font-bold rounded-xl text-sm border border-orange-100 shadow-sm flex items-center gap-2">
              🚪 Đã thay {data.doors_replaced} cửa
            </span>
          )}
          {data.vehicle_conditions && data.vehicle_conditions.length > 0 && data.vehicle_conditions[0] !== "none" && (
            <span className="px-4 py-2.5 bg-purple-50 text-purple-700 font-bold rounded-xl text-sm border border-purple-100 shadow-sm flex items-center gap-2">
              🚨 Lỗi: {Array.isArray(data.vehicle_conditions) ? data.vehicle_conditions.join(", ") : data.vehicle_conditions}
            </span>
          )}
        </div>
      </div>
      {/* ======================================================== */}

      {/* 👑 BẢNG PHÂN TÍCH CHUYÊN SÂU - CHỈ DÀNH CHO VIP */}
      {user?.tier === 'vip' && (
        <div className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">👑</div>
          <h4 className="font-black text-yellow-800 uppercase tracking-widest text-sm mb-4">Góc nhìn chuyên gia (Độc quyền VIP)</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/60 p-4 rounded-2xl border border-yellow-100">
              <p className="text-xs font-bold text-gray-500 uppercase">Dự báo rớt giá sau 1 năm</p>
              <p className="text-xl font-black text-red-500">- 8.5% <span className="text-sm font-medium text-gray-600">(~ 27.965.000 VNĐ)</span></p>
            </div>
            <div className="bg-white/60 p-4 rounded-2xl border border-yellow-100">
              <p className="text-xs font-bold text-gray-500 uppercase">Chỉ số thanh khoản (Dễ bán)</p>
              <p className="text-xl font-black text-emerald-600">Cao <span className="text-sm font-medium text-gray-600">(Dự kiến bán trong 14 ngày)</span></p>
            </div>
          </div>
        </div>
      )}

      {/* KHU VỰC NÚT BẤM CUỐI CHỨNG NHẬN */}
      <div className="no-print bg-gradient-to-r from-gray-900 via-slate-900 to-blue-950 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-5 text-white relative z-20 shadow-xl border border-blue-900/30">
        <div className="overflow-hidden w-full flex-1">
          <p className="text-xs text-blue-400 uppercase tracking-widest mb-1 font-extrabold">Mã Giao Dịch Blockchain (TxHash)</p>
          <div className="flex items-center gap-3">
            <p className="text-sm font-mono text-gray-200 truncate">{data.txhash}</p>
            <button onClick={() => handleCopy(data.txhash)} className="text-gray-300 hover:text-white p-2 bg-white/10 hover:bg-blue-600 rounded-xl transition-all duration-300 active:scale-95 flex-shrink-0 flex items-center gap-1.5" title="Copy TxHash">
              {isCopied ? <span className="text-emerald-400 text-xs font-bold px-1">Đã copy!</span> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>}
            </button>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => window.print()} className="flex-1 md:flex-none whitespace-nowrap bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Xuất PDF
          </button>
          <a href={`https://sepolia.etherscan.io/tx/${data.txhash}`} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2">
            Etherscan ↗
          </a>
        </div>
      </div>
    </div>
  );
}