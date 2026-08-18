"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { apiService } from "../../services/api";
import ResultCertificate from "../ResultCertificate";

export default function EvaluateTab({ user, onGoHome }: { user: any, onGoHome: () => void }) {
  const [step, setStep] = useState(2);
  const [inputMode, setInputMode] = useState("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const defaultJsonTemplate = JSON.stringify({
    Vehicle_brand: "VinFast", Vehicle_model: "VF 5", Production_year: 2023, Mileage_km: 15000, Fuel_type: "electric",
    doors_replaced: 0, scratch_severity: "minor", previous_owners: 1, ev_battery_type: "lithium_ion", vehicle_conditions: ["none"],
    license_plate: "30G-888.88", Displacement_cm3: 0, Power_HP: 134, Transmission: "automatic", Drive: "fwd", Type: "suv",
    Colour: "black", Doors_number: 4, Seats_count: 5, Condition: "used", Origin_country: "Vietnam", CO2_emissions: 0,
    Vehicle_version: "Plus", Vehicle_generation: "Gen 1", Accident_free: true, Service_record_available: true, First_owner: "Yes",
    Air_conditioning: "auto", Alloy_wheels: true, Leather_seats: true, Navigation_system: true, Parking_sensors: true, Owner_birth_year: 1996
  }, null, 2);

  const [formData, setFormData] = useState(JSON.parse(defaultJsonTemplate));
  const [jsonInputText, setJsonInputText] = useState("");

  const years = Array.from({ length: 22 }, (_, i) => 2026 - i);
  const DropdownIcon = () => (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
      <svg className="w-5 h-5 transition-transform duration-300 group-focus-within:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  );

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

  const payAndEvaluate = async () => {
    // 1. LOGIC KIỂM TRA GIỚI HẠN 3 LẦN / NGÀY CHO USER THƯỜNG
    const today = new Date().toLocaleDateString('vi-VN'); // Lấy ngày hiện tại (VD: 17/08/2026)
    const usageKey = `usage_${user?.email}_${today}`;
    const currentUsage = parseInt(localStorage.getItem(usageKey) || "0");

    if (user?.tier !== 'vip' && currentUsage >= 5) {
      alert("🔒 HẾT LƯỢT SỬ DỤNG HÔM NAY!\nBạn đã dùng hết 3 lượt định giá miễn phí. Vui lòng nâng cấp VIP để sử dụng không giới hạn!");
      return; // Chặn không cho chạy tiếp
    }

    // 2. LOGIC GỌI SMART CONTRACT THANH TOÁN
    setLoading(true);
    try {
      if (!(window as any).ethereum) throw new Error("No MetaMask");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract("0x6c8af48613a69eB729675eA48CA24c180Df54fAd", ["function payForValuation() public payable"], signer);

      // Trừ 0 ETH nếu là VIP, trừ 0.001 ETH nếu là user thường
      const tx = await contract.payForValuation({ value: ethers.parseEther(user?.tier === 'vip' ? "0" : "0.001") });
      await tx.wait();
      
      // 3. LƯU LẠI SỐ LẦN ĐÃ SỬ DỤNG VÀO LOCAL STORAGE
      if (user?.tier !== 'vip') {
        localStorage.setItem(usageKey, (currentUsage + 1).toString());
      }
      
      const payload = { txhash: tx.hash, ...formData, user_email: user.email }; 
      const response = await apiService.evaluateCar(payload);
      
      setResult({ ...response.data.data, ...formData });
      setStep(4);

      const prev = JSON.parse(localStorage.getItem(`txHistory_${user.email}`) || "[]");
      localStorage.setItem(`txHistory_${user.email}`, JSON.stringify([{ txhash: tx.hash, license_plate: formData.license_plate, date: new Date().toLocaleString('vi-VN') }, ...prev]));

    } catch (error) {
      alert("Giao dịch bị hủy hoặc lỗi MetaMask!");
    } finally {
      setLoading(false);
    }
  };

  if (step === 4 && result) {
    return (
      <div className="max-w-4xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
        <div className="no-print text-center mb-12">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner transform hover:scale-110 transition-transform duration-300 cursor-default">✓</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Chứng Nhận Hoàn Tất</h2>
          <p className="text-gray-500">Mã giao dịch của bạn đã được ghi nhận trên Blockchain.</p>
        </div>
        <ResultCertificate data={result} user={user} />
        <div className="no-print text-center mt-12">
          <button onClick={() => { setStep(2); setResult(null); }} className="text-gray-500 hover:text-blue-600 font-bold px-8 py-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">⟲ Định giá xe khác</button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-[2.55rem] shadow-[0_25px_60px_-15px_rgba(37,99,235,0.15)] border border-blue-50 p-10 text-center animate-[scaleIn_0.3s_ease-out] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 transform hover:rotate-6 transition-transform duration-300">
          <svg className="w-10 h-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>

        <h2 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Xác Nhận Dịch Vụ Web3</h2>
        <p className="text-gray-500 mb-8 text-sm">
          Cấp mộc định giá Blockchain cho biển số <strong className="text-blue-600 font-mono tracking-widest px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg ml-1">{formData.license_plate}</strong>
        </p>
        
        {/* 👇 KHUNG THANH TOÁN ĐÃ TÍCH HỢP LOGIC VIP */}
        <div className={`p-8 rounded-3xl text-white shadow-xl mb-8 relative overflow-hidden group ${user?.tier === 'vip' ? 'bg-gradient-to-br from-yellow-500 to-amber-700' : 'bg-gradient-to-br from-gray-900 to-blue-950'}`}>
          <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-32 h-32 bg-white/20 rounded-full blur-2xl transition-all"></div>
          
          <div className="flex justify-between items-start mb-2 relative z-10">
            <p className={`text-xs font-black uppercase tracking-widest ${user?.tier === 'vip' ? 'text-white/80' : 'text-blue-300'}`}>Phí thẩm định mạng Web3</p>
            {user?.tier === 'vip' && <span className="bg-white text-yellow-600 text-[10px] font-black px-2 py-1 rounded shadow-sm">👑 VIP</span>}
          </div>
          
          <p className="text-5xl font-black tracking-tight flex justify-center items-baseline gap-2 relative z-10">
            {/* Logic hiển thị giá: VIP thì 0.000, Thường thì 0.001 */}
            {user?.tier === 'vip' ? "0.000" : "0.001"} 
            <span className={`text-xl font-extrabold ${user?.tier === 'vip' ? 'text-white' : 'text-cyan-400'}`}>ETH</span>
          </p>

          {user?.tier === 'vip' && <p className="text-xs text-yellow-100 mt-3 font-medium italic relative z-10">Đã được tài trợ 100% phí Gas bởi hệ thống.</p>}
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setStep(2)} disabled={loading} className="px-6 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 disabled:opacity-50 active:scale-95">
            Hủy bỏ
          </button>
          <button onClick={payAndEvaluate} disabled={loading} className={`flex-1 px-8 py-4 rounded-2xl font-black text-white transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 ${loading ? "bg-blue-400 cursor-wait" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:-translate-y-1"}`}>
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                Đang xử lý Blockchain...
              </>
            ) : "Ký & Thanh Toán ngay →"}
          </button>
        </div>
      </div>
    );
  }

  return (
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
        <button onClick={onGoHome} className="w-full md:w-auto text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"><span>←</span> Trở về Trang chủ</button>
        <button onClick={() => setStep(3)} className="w-full md:w-auto bg-[#00B14F] hover:bg-[#009944] text-white px-10 py-4 rounded-xl font-extrabold text-lg shadow-lg hover:shadow-[0_10px_20px_rgba(0,177,79,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">Thẩm Định & Ký Web3 →</button>
      </div>
    </div>
  );
}