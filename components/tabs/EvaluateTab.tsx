"use client";
import GlitchInput from '../GlitchInput';

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { supabase } from '../supabaseClient';
import ResultCertificate from "../ResultCertificate";
import { Car, ScanLine, Calendar, Gauge, User, CreditCard, Tag, Receipt } from 'lucide-react';
import { SignaturePad } from "@ark-ui/react/signature-pad";

const CAR_BRANDS_AND_MODELS: Record<string, string[]> = {
  "Toyota": ["Vios", "Camry", "Corolla Cross", "Innova"],
  "Honda": ["City", "CR-V"],
  "Ford": ["Ranger", "Everest"],
  "VinFast": ["Fadil", "VF 5", "VF 8", "Lux A2.0"],
  "Hyundai": ["Accent", "Tucson"],
  "Kia": ["Morning", "Cerato", "K3", "Seltos"],
  "Mazda": ["Mazda 3", "CX-5"]
};

const CustomDropdown = ({ icon: Icon, value, options, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
         <Icon className={`w-5 h-5 transition-colors ${isOpen ? 'text-cyan-700 dark:text-cyan-400' : 'text-gray-700 dark:text-gray-500'}`} />
      </div>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full cursor-pointer bg-white/60 dark:bg-black/40 border ${isOpen ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-black/10 dark:border-white/10'} text-slate-900 dark:text-white pl-12 pr-10 py-4 rounded-xl font-bold transition-all outline-none backdrop-blur-md flex items-center justify-between hover:border-cyan-500/50`}
      >
        <span className={value ? "text-slate-900 dark:text-white" : "text-gray-700 dark:text-gray-500"}>{value || placeholder}</span>
        <svg className={`w-5 h-5 text-gray-700 dark:text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-700 dark:text-cyan-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0a0a0c]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 max-h-60 overflow-y-auto py-2">
            {options.map((opt: string) => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`px-6 py-3 cursor-pointer transition-colors font-bold ${value == opt ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400' : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const LicensePlateInput = ({ value, onChange, icon: Icon }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 10;
  
  return (
    <div className="relative group h-[58px]">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
         <Icon className={`w-5 h-5 transition-colors ${isFocused ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-500'}`} />
      </div>
      
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-text z-20"
        maxLength={maxLength}
        autoComplete="off"
        spellCheck="false"
      />

      <div className={`w-full h-full bg-white/60 dark:bg-black/40 border ${isFocused ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-black/10 dark:border-white/10'} pl-12 pr-4 flex items-center rounded-xl transition-all backdrop-blur-md overflow-hidden`}>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxLength }).map((_, i) => {
            const char = value[i];
            const isPunctuation = char === '-' || char === '.';
            const isActive = isFocused && value.length === i;
            
            let boxStyle = "w-7 h-9 md:w-8 md:h-10 text-lg md:text-xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-gray-600";
            if (char) {
              boxStyle = isPunctuation 
                ? "w-3 text-emerald-600 dark:text-emerald-500/50 text-xl bg-transparent border-none" 
                : "w-7 h-9 md:w-8 md:h-10 text-lg md:text-xl bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 border border-emerald-500/50 text-emerald-700 dark:text-emerald-400 shadow-[inset_0_0_8px_rgba(16,185,129,0.3)] scale-110";
            } else if (isActive) {
              boxStyle = "w-7 h-9 md:w-8 md:h-10 text-lg md:text-xl border-2 border-emerald-400 border-dashed animate-pulse bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.4)]";
            }

            return (
              <div key={i} className={`flex items-center justify-center font-mono font-black rounded-lg transition-all duration-300 ${boxStyle}`}>
                {char || ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default function EvaluateTab({ user, onGoHome }: { user: any, onGoHome: () => void }) {
  const [step, setStep] = useState(2);
  const [inputMode, setInputMode] = useState("form");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Đang xử lý...");
  const [result, setResult] = useState<any>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  
  const [isExtracting, setIsExtracting] = useState(false);

  // Animation states for sidebars
  const [ping, setPing] = useState(45);
  const [analyzedCount, setAnalyzedCount] = useState(388268);
  const [ethPrice, setEthPrice] = useState(2845.20);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 15) + 35);
      if (Math.random() > 0.6) setAnalyzedCount(c => c + 1);
      if (Math.random() > 0.5) setEthPrice(p => p + (Math.random() * 5 - 2.5));
    }, 2500);
    return () => clearInterval(interval);
  }, []);
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
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-500">
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

  const handleUploadCavet = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy toàn bộ danh sách ảnh người dùng chọn
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsExtracting(true);
    
    const uploadData = new FormData();
    // Vòng lặp: Bơm tất cả ảnh vào một chuyến xe tải gửi đi
    Array.from(files).forEach((file) => {
      uploadData.append("files", file); // Chú ý: Tên biến là 'files' có chữ 's'
    });

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/transactions/extract-cavet", {
        method: "POST",
        body: uploadData,
      });
      
      const json = await response.json();
      if (json.status === "success") {
         // ====================================================
         // BỘ LỌC DỮ LIỆU: ÉP KIỂU & XÓA KÝ TỰ RÁC TỪ AI
         // ====================================================
         let cleanData = { ...json.data };
         
         // 1. Danh sách các trường BẮT BUỘC phải là số
         const numberFields = [
           'Displacement_cm3', 'CO2_emissions', 'Power_HP', 'doors_replaced', 
           'Mileage_km', 'Production_year', 'Owner_birth_year', 'Doors_number', 
           'Seats_count', 'previous_owners'
         ];
         
         // 2. Vòng lặp dọn rác: Chuyển ký tự lạ (như @) thành số 0
         numberFields.forEach(field => {
            if (cleanData[field] !== undefined && cleanData[field] !== null) {
               const parsed = parseFloat(cleanData[field]);
               cleanData[field] = isNaN(parsed) ? 0 : parsed;
            }
         });

         // 3. Ép kiểu Mảng (Array) cho điều kiện xe
         if (cleanData.vehicle_conditions && !Array.isArray(cleanData.vehicle_conditions)) {
            cleanData.vehicle_conditions = [cleanData.vehicle_conditions];
         }
         // ====================================================

         // Đẩy dữ liệu ĐÃ SẠCH SẼ vào Form
         setFormData((prev: any) => ({
           ...prev,
           ...cleanData 
         }));

         setIsExtracting(false);
         // Hiển thị số lượng trường đã gộp thành công
         setTimeout(() => alert(`✅ AI đã quét xong ${files.length} ảnh!\nHệ thống gộp được ${Object.keys(cleanData).length} trường dữ liệu sạch.`), 200);
      } else {
         setIsExtracting(false);
         alert("Ảnh mờ quá AI không đọc được. Vui lòng xem log!");
      }
    } catch (error) {
      console.error("Lỗi gọi API OCR:", error);
      setIsExtracting(false);
      alert("❌ Lỗi mất kết nối! Backend của bạn không phản hồi.");
    }
  };

  const payAndEvaluate = async () => {
    const today = new Date().toLocaleDateString('vi-VN'); 
    const usageKey = `usage_${user?.email}_${today}`;
    const currentUsage = parseInt(localStorage.getItem(usageKey) || "0");

    if (user?.tier !== 'vip' && currentUsage >= 3) {
      alert("🔒 HẾT LƯỢT SỬ DỤNG HÔM NAY!\nBạn đã dùng hết 3 lượt định giá miễn phí. Vui lòng nâng cấp VIP để sử dụng không giới hạn!");
      return; 
    }

   if (!hasSignature || !signatureData) {
      alert("Vui lòng ký xác nhận trước khi thanh toán!");
      return;
    }
    setLoading(true);
    try {
      const payloadData = { 
          ...formData, 
          user_email: user?.email,
          user_signature: signatureData,
          txhash: "draft_mode_pending" 
      };
      // ... code gọi API ở dưới
      // -----------------------------------------

      const draftRes = await fetch("http://127.0.0.1:8080/api/v1/transactions/evaluate/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadData),
      });

      if (!draftRes.ok) {
        const error = await draftRes.json();
        const errorMsg = typeof error.detail === 'object' ? JSON.stringify(error.detail) : error.detail;
        throw new Error(errorMsg || "Lỗi khi gọi AI định giá (Draft)!");
      }

      const draftData = await draftRes.json();
      const { predicted_price_raw, carHash, salt } = draftData;

      if (!(window as any).ethereum) throw new Error("Vui lòng cài đặt MetaMask!");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      setLoadingText("Vui lòng mở MetaMask để xác nhận...");
      const signer = await provider.getSigner();
      
      const ABI = ["function payForValuation(string memory carHash) public payable"];
      const contract = new ethers.Contract("0x2169C854f514516038A068cCF758C2b8D40bCe01", ABI, signer);

      const tx = await contract.payForValuation(carHash, { 
        value: ethers.parseEther(user?.tier === 'vip' ? "0" : "0.001") 
      });
      await tx.wait();
      
      if (user?.tier !== 'vip') {
        localStorage.setItem(usageKey, (currentUsage + 1).toString());
      }

      const confirmPayload = {
        txhash: tx.hash,
        carHash: carHash,
        salt: salt,
        predicted_price: predicted_price_raw,
        vehicle_data: payloadData
      };

      const confirmRes = await fetch("http://127.0.0.1:8080/api/v1/transactions/evaluate/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confirmPayload),
      });

      if (!confirmRes.ok) throw new Error("Dữ liệu bị từ chối lưu vào Database!");
      const finalResult = await confirmRes.json();
      
      if (user) {
        try {
          await supabase.from('user_activity_logs').insert([{
            email: user.email, 
            action_type: 'EVALUATE_CAR',
            action_details: { 
              brand: formData.Vehicle_brand, 
              model: formData.Vehicle_model, 
              price: finalResult.data?.predicted_price || predicted_price_raw
            }
          }]);
        } catch (err) {}
      }

      setResult({ ...finalResult.data, ...formData, userSignature: signatureData });
      setStep(4);

      const prev = JSON.parse(localStorage.getItem(`txHistory_${user?.email}`) || "[]");
      localStorage.setItem(`txHistory_${user?.email}`, JSON.stringify([
        { txhash: tx.hash, license_plate: formData.license_plate, date: new Date().toLocaleString('vi-VN') }, 
        ...prev
      ]));

    } catch (error: any) {
      alert(error.message || error.reason || "Giao dịch bị hủy hoặc lỗi MetaMask!");
    } finally {
      setLoading(false);
    }
  };

  if (step === 4 && result) {
    return (
      <div className="max-w-4xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
        <div className="no-print text-center mb-12">
          <div className="w-24 h-24 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-[0_0_30px_rgba(16,185,129,0.2)] transform hover:scale-110 transition-transform duration-300">✓</div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Chứng Nhận Hoàn Tất</h2>
          <p className="text-gray-600 dark:text-gray-400">Mã giao dịch của bạn đã được ghi nhận trên Blockchain.</p>
        </div>
        <ResultCertificate data={result} user={user} />
        <div className="no-print text-center mt-12">
          <button onClick={() => { setStep(2); setResult(null); }} className="text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-bold px-8 py-4 bg-white dark:bg-[#111] hover:bg-slate-100 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl shadow-lg transition-all">⟲ Định giá xe khác</button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-md mx-auto w-full animate-[fadeInUp_0.3s_ease-out]">
        <div className="bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl relative overflow-hidden">
          {/* Top Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
          
          {/* Receipt Header */}
          <div className="border-b border-black/10 dark:border-white/10 p-5 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Xác Nhận Web3
                </span>
              </div>
              <span className="text-sm text-gray-500 font-mono">
                #{Math.floor(10000 + Math.random() * 90000)}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Ký giao dịch qua mạng lưới Blockchain để lưu trữ vĩnh viễn.
            </div>
          </div>

          {/* Receipt Items */}
          <div className="p-5 space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Hãng xe</span>
              <span className="text-slate-900 dark:text-gray-100 font-bold">{formData.Vehicle_brand}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Biển số</span>
              <span className="text-slate-900 dark:text-gray-100 font-bold tracking-wider">{formData.license_plate}</span>
            </div>
            <div className="border-t border-black/10 dark:border-white/10 pt-3 flex justify-between items-center font-black">
              <span className="text-slate-900 dark:text-gray-100 font-sans">Phí định giá</span>
              <span className="text-orange-600 dark:text-orange-400 text-lg">
                {user?.tier === 'vip' ? '0 ETH' : '0.001 ETH'}
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t border-black/10 dark:border-white/10 p-5 space-y-3 bg-slate-50 dark:bg-[#111]">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                Phương thức: MetaMask (Web3)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">
                Khách hàng: {user?.email?.split('@')[0] || "Khách"}
              </span>
            </div>
          </div>

          {/* Signature Section */}
          <div className="border-t border-black/10 dark:border-white/10 p-5 space-y-3">
            <div className="text-center mb-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Chữ ký Khách Hàng
              </span>
            </div>

            <SignaturePad.Root 
              onDrawEnd={(details) => {
                setHasSignature(true);
                details.getDataUrl("image/png").then((url) => setSignatureData(url));
              }}
            >
              <SignaturePad.Control className="relative w-full h-32 bg-white dark:bg-black rounded-lg border border-gray-300 dark:border-gray-600 shadow-inner">
                <SignaturePad.Segment className="w-full h-full stroke-slate-900 dark:stroke-white fill-slate-900 dark:fill-white" />
                <SignaturePad.ClearTrigger 
                  onClick={() => { setHasSignature(false); setSignatureData(null); }}
                  className="absolute top-2 right-2 px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-gray-500 hover:text-red-500 text-xs font-bold transition-colors"
                >
                  Xóa
                </SignaturePad.ClearTrigger>
                <SignaturePad.Guide className="absolute bottom-6 left-4 right-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700" />
              </SignaturePad.Control>
            </SignaturePad.Root>

            <div className="text-center mt-2">
              <span className={`text-xs font-bold ${hasSignature ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-500'}`}>
                {hasSignature ? "✓ Đã ký hợp lệ" : "Vui lòng ký vào ô trên để tiếp tục"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 flex gap-3 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#111]">
            <button 
              onClick={() => setStep(2)} 
              disabled={loading} 
              className="px-4 py-3 rounded-lg font-bold bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-300 transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={payAndEvaluate} 
              disabled={loading} 
              className={`flex-1 font-extrabold rounded-lg shadow-lg transition-all flex justify-center items-center gap-2 ${
                hasSignature && !loading
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-orange-500/20' 
                  : 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed border border-black/5 dark:border-white/5'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span className="text-sm">{loadingText}</span>
                </>
              ) : 'Ký & Thanh Toán →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 w-full justify-center items-start">
      {/* LEFT SIDEBAR */}
      <div className="hidden 2xl:flex flex-col w-[320px] shrink-0 space-y-6 animate-[fadeInLeft_0.6s_ease-out]">
         <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
           <h3 className="text-cyan-700 dark:text-cyan-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-sm"><ScanLine className="w-5 h-5 animate-[spin_4s_linear_infinite]"/> Trạng Thái Máy Chủ AI</h3>
           <div className="space-y-5 text-sm relative z-10">
             <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400 font-medium">Trạng thái</span><span className="text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></div> TRỰC TUYẾN</span></div>
             <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400 font-medium">Mô hình Lõi</span><span className="text-slate-900 dark:text-white font-mono">LightGBM v2.1</span></div>
             <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400 font-medium">Độ trễ Mạng</span><span className="text-slate-900 dark:text-white font-mono transition-all duration-300">~{ping}ms</span></div>
             <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400 font-medium">Độ chính xác (R²)</span><span className="text-cyan-700 dark:text-cyan-400 font-mono">0.8542</span></div>
             <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400 font-medium">Sai số (MAE)</span><span className="text-slate-900 dark:text-white font-mono">16.5M VND</span></div>
           </div>
           <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 relative z-10">
             <h4 className="text-gray-700 dark:text-gray-500 text-xs uppercase mb-3 font-bold tracking-widest flex items-center gap-2">Nhật Ký Hoạt Động <div className="h-1 w-1 rounded-full bg-red-500 animate-ping"></div></h4>
             <div className="space-y-3">
               <div className="bg-white/60 dark:bg-black/40 rounded-lg p-3 border border-cyan-500/30 flex items-start gap-3 relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                 <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400 animate-[pulse_1s_infinite]"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 animate-pulse shrink-0 shadow-[0_0_5px_#22d3ee]"></div>
                 <div>
                   <p className="text-xs text-slate-800 dark:text-gray-200 font-mono">Đang chờ người dùng nhập<span className="animate-pulse">_</span></p>
                   <p className="text-[10px] text-cyan-600 dark:text-cyan-500/70 font-mono mt-0.5">Lắng nghe trên cổng 443</p>
                 </div>
               </div>
               <div className="bg-white dark:bg-black/5 dark:bg-black/20 rounded-lg p-3 border border-black/5 dark:border-white/5 flex items-start gap-3 hover:border-white/10 transition-colors">
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 shrink-0"></div>
                 <div>
                   <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">Đã đồng bộ Blockchain</p>
                   <p className="text-[10px] text-gray-600 font-mono mt-0.5">Khối #18420955</p>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-[90rem] w-full bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-black/10 dark:border-white/10 p-8 md:p-12 relative overflow-hidden flex-1 z-10">
      {/* Lưới công nghệ và Gradient Orbs */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-black/10 dark:border-white/10 pb-6 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 dark:from-cyan-400 to-emerald-600 dark:to-emerald-400 mb-2 tracking-tight drop-shadow-sm">Thông số đánh giá</h2>
            <p className="text-gray-600 dark:text-gray-400">Hệ thống AI phân tích dựa trên hơn 30+ trường dữ liệu.</p>
          </div>
          <div className="relative flex bg-white dark:bg-[#0a0a0c]/80 p-1.5 rounded-xl border border-black/10 dark:border-white/10 backdrop-blur-md w-72 h-[48px]">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform duration-500 ease-out ${inputMode === 'form' ? 'translate-x-0' : 'translate-x-full'}`}
            ></div>
            <button 
              onClick={() => setInputMode("form")} 
              className={`relative z-10 flex-1 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${inputMode === "form" ? "text-white drop-shadow-md" : "text-gray-700 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300"}`}
            >
              Nhập Form
            </button>
            <button 
              onClick={() => { setInputMode("json"); setJsonInputText(JSON.stringify(formData, null, 2)); }} 
              className={`relative z-10 flex-1 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${inputMode === "json" ? "text-white drop-shadow-md" : "text-gray-700 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300"}`}
            >
              Dán JSON
            </button>
          </div>
        </div>

        {inputMode === "json" ? (
          <div className="space-y-6 relative max-w-4xl mx-auto">
            <textarea rows={16} value={jsonInputText} onChange={(e) => setJsonInputText(e.target.value)} className="w-full bg-white dark:bg-black/50 text-slate-900 dark:text-cyan-400 font-mono text-sm p-6 rounded-2xl border border-black/10 dark:border-white/10 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all backdrop-blur-md" />
            <button onClick={handleApplyJson} className="btn-uiverse w-full rounded-xl font-bold py-4 transition-all hover:scale-[1.02]" style={{ "--color": "#0284c7" } as any}>Nạp dữ liệu JSON</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
             
             {/* LEFT COLUMN: ẢNH XE 3D */}
             <div className="xl:col-span-5 flex flex-col justify-center items-center bg-white dark:bg-black/5 dark:bg-black/20 rounded-[2rem] border border-black/10 dark:border-white/10 p-8 relative overflow-hidden group min-h-[400px]">
                 <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-50"></div>
                 {formData.Vehicle_model && formData.Vehicle_brand ? (
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                        <img 
                           src={`/cars/${formData.Vehicle_model.toLowerCase().replace(/ /g, '-')}.png`} 
                           alt={formData.Vehicle_model}
                           className="w-full max-h-[300px] object-contain drop-shadow-[0_30px_40px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-700"
                           onError={(e) => {
                             e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23374151" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                           }}
                        />
                        <div className="mt-8 text-center">
                           <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 dark:from-cyan-400 to-emerald-600 dark:to-emerald-400 uppercase tracking-widest drop-shadow-sm">{formData.Vehicle_brand}</h3>
                           <p className="text-2xl text-slate-900 dark:text-white font-bold mt-1 tracking-wide">{formData.Vehicle_model}</p>
                           <p className="text-cyan-600 dark:text-cyan-500/70 font-mono text-sm mt-3 border border-cyan-500/30 bg-cyan-500/10 py-1.5 px-4 rounded-full inline-block">Sẵn sàng thẩm định Web3</p>
                        </div>
                    </div>
                 ) : (
                    <div className="relative z-10 flex flex-col items-center text-center opacity-50">
                        <Car className="w-24 h-24 text-gray-700 dark:text-gray-500 mb-6 animate-pulse" />
                        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">Chưa chọn dòng xe</h3>
                        <p className="text-gray-700 dark:text-gray-500 text-sm mt-2 max-w-xs">Hãy chọn Hãng và Dòng xe ở form bên cạnh để xem mô hình 3D</p>
                    </div>
                 )}
             </div>

             {/* RIGHT COLUMN: FORM NHẬP LIỆU */}
             <div className="xl:col-span-7 flex flex-col">
                <div className="mb-10 relative group rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-cyan-500/50 transition-all duration-500 bg-white/60 dark:bg-black/40 backdrop-blur-md">
                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                   
                   <div className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between text-left gap-6">
                     <div className="flex-1">
                       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-wide uppercase">AI Vision <span className="text-cyan-700 dark:text-cyan-400">- Quét Ảnh Xe</span></h3>
                       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Tải ảnh xe hoặc giấy tờ lên để AI tự động nhận diện và bóc tách thông tin ngay lập tức.</p>
<label className="doodle-upload-container" tabIndex={0}>
                         <input type="file" accept="image/*" multiple className="hidden-file-input" onChange={handleUploadCavet} disabled={isExtracting} />
                         <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                            <defs>
                              <filter id="doodle-jitter" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} result="noise"></feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
                              </filter>
                            </defs>
                          </svg>

                          <div className="doodle-folder">
                            <div className="folder-back">
                              <div className="folder-tab"></div>
                            </div>

                            <div className="doodle-papers">
                              <div className="paper file-1">
                                <div className="scribble-line"></div>
                                <div className="scribble-line short"></div>
                                <div className="scribble-line"></div>
                              </div>
                              <div className="paper file-2">
                                <svg viewBox="0 0 24 24" className="doodle-image-icon">
                                  <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"></rect>
                                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle>
                                  <path d="M21 15l-5-5L5 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                                </svg>
                              </div>
                            </div>

                            <div className="folder-front">
                              <svg className="folder-smile" viewBox="0 0 24 24">
                                <path d="M 7 14 Q 12 19 17 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
                              </svg>
                            </div>
                          </div>

                          <div className="doodle-btn">
                            <span className="btn-text">CHỌN ẢNH TẢI LÊN</span>
                          </div>

                          <svg className="doodle-decor sparkle-1" viewBox="0 0 24 24">
                            <path d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z" fill="var(--btn-hover)" stroke="currentColor" strokeWidth="1.5"></path>
                          </svg>
                          <svg className="doodle-decor star-1" viewBox="0 0 24 24">
                            <path d="M12 2L15 9L22 10L17 15L18.5 22L12 18.5L5.5 22L7 15L2 10L9 9L12 2Z" fill="var(--accent-blue)" stroke="currentColor" strokeWidth="1.5"></path>
                          </svg>

                          <svg className="doodle-paperclip" viewBox="0 0 24 24">
                            <path d="M 12 4 L 12 18 C 12 20 9 20 9 18 L 9 6 C 9 3 15 3 15 6 L 15 16 C 15 18 13 18 13 16 L 13 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                          </svg>
                       </label>
</div>
                     <div className="w-40 h-40 relative shrink-0 ml-4">
                       <Car className={`w-full h-full text-cyan-700 dark:text-cyan-400 opacity-80 ${isExtracting ? 'animate-pulse' : ''}`} />
                       <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] animate-scan"></div>
                     </div>
                   </div>

          {isExtracting && (
            <div className="px-8 pb-8 flex justify-center">
              <div className="truck-loader">
                <div className="truckWrapper">
                  <div className="truckBody">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 198 93"
                      className="trucksvg"
                    >
                      <path
                        strokeWidth="3"
                        stroke="#282828"
                        fill="#F83D3D"
                        d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                      ></path>
                      <path
                        strokeWidth="3"
                        stroke="#282828"
                        fill="#7D7C7C"
                        d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                      ></path>
                      <path
                        strokeWidth="2"
                        stroke="#282828"
                        fill="#282828"
                        d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                      ></path>
                      <rect
                        strokeWidth="2"
                        stroke="#282828"
                        fill="#FFFCAB"
                        rx="1"
                        height="7"
                        width="5"
                        y="63"
                        x="187"
                      ></rect>
                      <rect
                        strokeWidth="2"
                        stroke="#282828"
                        fill="#282828"
                        rx="1"
                        height="11"
                        width="4"
                        y="81"
                        x="193"
                      ></rect>
                      <rect
                        strokeWidth="3"
                        stroke="#282828"
                        fill="#DFDFDF"
                        rx="2.5"
                        height="90"
                        width="121"
                        y="1.5"
                        x="6.5"
                      ></rect>
                      <rect
                        strokeWidth="2"
                        stroke="#282828"
                        fill="#DFDFDF"
                        rx="2"
                        height="4"
                        width="6"
                        y="84"
                        x="1"
                      ></rect>
                    </svg>
                  </div>
                  <div className="truckTires">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 30 30"
                      className="tiresvg"
                    >
                      <circle
                        strokeWidth="3"
                        stroke="#282828"
                        fill="#282828"
                        r="13.5"
                        cy="15"
                        cx="15"
                      ></circle>
                      <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 30 30"
                      className="tiresvg"
                    >
                      <circle
                        strokeWidth="3"
                        stroke="#282828"
                        fill="#282828"
                        r="13.5"
                        cy="15"
                        cx="15"
                      ></circle>
                      <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                    </svg>
                  </div>
                  <div className="road"></div>
              
                  <svg
                    xmlSpace="preserve"
                    viewBox="0 0 453.459 453.459"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_1"
                    version="1.1"
                    fill="#000000"
                    className="lampPost"
                  >
                    <path
                      d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
              c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
              c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
              c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
              h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
              v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
              V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
              M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
              h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  <div className="group relative z-30">
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 ml-1">Hãng xe</label>
                    <CustomDropdown 
                      icon={Car} 
                      value={formData.Vehicle_brand} 
                      options={Object.keys(CAR_BRANDS_AND_MODELS)}
                      onChange={(val: string) => setFormData({ ...formData, Vehicle_brand: val, Vehicle_model: '' })}
                      placeholder="Chọn hãng xe"
                    />
                  </div>
                  <div className="group relative z-20">
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 ml-1">Dòng xe (Model)</label>
                    <CustomDropdown 
                      icon={Tag} 
                      value={formData.Vehicle_model} 
                      options={CAR_BRANDS_AND_MODELS[formData.Vehicle_brand as string] || []}
                      onChange={(val: string) => setFormData({ ...formData, Vehicle_model: val })}
                      placeholder="Chọn dòng xe"
                    />
                  </div>
                  <div className="group relative z-10">
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 ml-1">Năm sản xuất</label>
                    <CustomDropdown 
                      icon={Calendar} 
                      value={formData.Production_year} 
                      options={years.map(String)}
                      onChange={(val: string) => setFormData({ ...formData, Production_year: Number(val) })}
                      placeholder="Chọn năm"
                    />
                  </div>
                  <div className="group relative">
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 ml-1">Số Km đã đi (Odo)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <Gauge className="w-5 h-5 text-gray-700 dark:text-gray-500 group-focus-within:text-cyan-700 dark:text-cyan-400 transition-colors" />
                      </div>
<input type="number" name="Mileage_km" value={formData.Mileage_km} onChange={handleInputChange} className="w-full bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white pl-12 pr-4 py-4 rounded-xl font-bold focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all backdrop-blur-md" autoComplete="off" />
                    </div>
                  </div>
                  <div className="group relative">
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 ml-1">Năm sinh chủ xe (Để luận Phong Thủy)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <User className="w-5 h-5 text-gray-700 dark:text-gray-500 group-focus-within:text-cyan-700 dark:text-cyan-400 transition-colors" />
                      </div>
<input type="number" name="Owner_birth_year" value={formData.Owner_birth_year} onChange={handleInputChange} className="w-full bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white pl-12 pr-4 py-4 rounded-xl font-bold focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all backdrop-blur-md" autoComplete="off" />
                    </div>
                  </div>
                  <div className="group relative md:col-span-2">
                    <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 ml-1">Biển số xe</label>
                    <LicensePlateInput 
                      icon={CreditCard} 
                      value={formData.license_plate}
                      onChange={(val: string) => setFormData({ ...formData, license_plate: val })}
                    />
                  </div>
                </div>
             </div>
          </div>
        )}

        <div className="flex justify-between pt-8 border-t border-black/10 dark:border-white/10 relative z-10">
          <button onClick={onGoHome} className="text-gray-600 dark:text-gray-400 font-bold px-8 py-4 bg-white dark:bg-black/5 dark:bg-white/5 hover:bg-white dark:bg-black/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-white/10 rounded-xl transition-all backdrop-blur-md">← Trở về</button>
          <button onClick={() => setStep(3)} className="btn-uiverse rounded-xl font-extrabold px-10 py-4 transition-all hover:scale-[1.02]" style={{ "--color": "#059669" } as any}>Thẩm Định & Ký Web3 →</button>
        </div>
      </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden 2xl:flex flex-col w-[320px] shrink-0 space-y-6 animate-[fadeInRight_0.6s_ease-out]">
         <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
           <h3 className="text-emerald-700 dark:text-emerald-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-sm relative z-10"><Gauge className="w-5 h-5 animate-[spin_3s_linear_infinite_reverse]"/> Xu Hướng Thị Trường</h3>
           <div className="space-y-4 text-sm relative z-10">
              <div className="bg-white dark:bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/10 dark:border-white/10 transition-colors hover:border-emerald-500/50 group/item relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/item:animate-[shimmer_1.5s_infinite]"></div>
                 <div className="text-gray-600 dark:text-gray-400 text-xs mb-1.5 font-medium uppercase tracking-widest relative z-10">Giá ETH/USD</div>
                 <div className="text-xl font-bold text-slate-900 dark:text-white flex justify-between items-center relative z-10">
                   $<span className="inline-block transition-all duration-300">{ethPrice.toFixed(2)}</span>
                   <span className="text-emerald-700 dark:text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded font-mono shadow-[0_0_8px_rgba(16,185,129,0.2)]">+1.24%</span>
                 </div>
              </div>
              <div className="bg-white dark:bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/10 dark:border-white/10 transition-colors hover:border-cyan-500/50 group/item relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/item:animate-[shimmer_1.5s_infinite]"></div>
                 <div className="text-gray-600 dark:text-gray-400 text-xs mb-1.5 font-medium uppercase tracking-widest relative z-10">Xe Đã Phân Tích</div>
                 <div className="text-xl font-bold text-slate-900 dark:text-white flex justify-between items-center relative z-10">
                   <span className="inline-block transition-all duration-300">{analyzedCount.toLocaleString()}</span>
                   <span className="text-cyan-700 dark:text-cyan-400 text-xs bg-cyan-500/10 px-2 py-1 rounded font-mono shadow-[0_0_8px_rgba(6,182,212,0.2)]">+12/hr</span>
                 </div>
              </div>
           </div>
         </div>
         
         <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex-1 relative overflow-hidden">
           <h3 className="text-slate-900 dark:text-white font-bold mb-5 flex items-center gap-2 uppercase tracking-wider text-sm border-b border-black/10 dark:border-white/10 pb-4">Định Giá Gần Đây</h3>
           <div className="space-y-4 relative z-10">
              {[
                {m: "Toyota Vios 2023", p: "450M VND", t: "Vừa xong"}, 
                {m: "VinFast VF 8 Plus", p: "890M VND", t: "2 phút trước"}, 
                {m: "Honda City RS", p: "520M VND", t: "5 phút trước"},
                {m: "Ford Everest", p: "1.2 Tỷ VND", t: "12 phút trước"}
              ].map((c, i) => (
                <div key={i} className="flex justify-between items-start border-b border-black/5 dark:border-white/5 pb-3 group cursor-pointer hover:border-emerald-500/30 transition-colors" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                  <div>
                    <div className="text-slate-700 dark:text-gray-300 text-sm font-bold group-hover:text-emerald-700 dark:text-emerald-400 transition-colors">{c.m}</div>
                    <div className="text-gray-700 dark:text-gray-500 text-[10px] mt-1 font-mono uppercase">{c.t}</div>
                  </div>
                  <span className="text-slate-900 dark:text-white text-sm font-mono font-bold bg-white dark:bg-black/5 dark:bg-white/5 px-2 py-1 rounded shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-shadow">{c.p}</span>
                </div>
              ))}
           </div>
           
           <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
         </div>
      </div>
    </div>
  );
}