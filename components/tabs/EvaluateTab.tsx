"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { supabase } from '../supabaseClient';
import ResultCertificate from "../ResultCertificate";

export default function EvaluateTab({ user, onGoHome }: { user: any, onGoHome: () => void }) {
  const [step, setStep] = useState(2);
  const [inputMode, setInputMode] = useState("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const [isExtracting, setIsExtracting] = useState(false);

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

   setLoading(true);
    try {
      const payloadData = { 
          ...formData, 
          user_email: user?.email,
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

      setResult({ ...finalResult.data, ...formData });
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
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner transform hover:scale-110 transition-transform duration-300">✓</div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Chứng Nhận Hoàn Tất</h2>
          <p className="text-gray-500">Mã giao dịch của bạn đã được ghi nhận trên Blockchain.</p>
        </div>
        <ResultCertificate data={result} user={user} />
        <div className="no-print text-center mt-12">
          <button onClick={() => { setStep(2); setResult(null); }} className="text-gray-500 hover:text-blue-600 font-bold px-8 py-4 bg-white border border-gray-200 rounded-xl shadow-sm">⟲ Định giá xe khác</button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden animate-[fadeInUp_0.3s_ease-out]">
        {/* Thanh màu trang trí phía trên */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-blue-600"></div>
        
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-orange-100">
             {/* Logo MetaMask */}
             <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Xác Nhận Web3</h2>
          <p className="text-gray-500 text-sm mt-2">Ký giao dịch qua mạng lưới Blockchain để lưu trữ vĩnh viễn.</p>
        </div>

        {/* Khung thông tin thanh toán */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-200 shadow-inner">
           <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-bold">Phí định giá:</span>
              <span className="text-2xl font-black text-blue-600">
                {user?.tier === 'vip' ? '0 ETH' : '0.001 ETH'}
              </span>
           </div>
           <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-500">Hãng xe:</span>
              <span className="font-bold text-gray-800">{formData.Vehicle_brand}</span>
           </div>
           <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Biển số:</span>
              <span className="font-bold text-gray-800 tracking-wider">{formData.license_plate}</span>
           </div>
        </div>

        {/* Cảnh báo an toàn */}
        <div className="bg-amber-50 text-amber-700 text-xs p-4 rounded-xl mb-8 flex gap-3 text-left border border-amber-200">
           <span className="text-xl">💡</span>
           <p>Vui lòng kiểm tra kỹ thông tin. Phí Gas sẽ được tính thêm bởi mạng lưới. Yêu cầu bật tiện ích MetaMask để tiếp tục.</p>
        </div>

        {/* Nút bấm */}
        <div className="flex gap-4">
          <button 
            onClick={() => setStep(2)} 
            disabled={loading} 
            className="px-6 py-4 rounded-xl font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors w-1/3 shadow-sm"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={payAndEvaluate} 
            disabled={loading} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Đang gọi Ví...
              </>
            ) : 'Ký & Thanh Toán →'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400"></div>
      <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Thông số đánh giá</h2>
          <p className="text-gray-500">Hệ thống AI phân tích dựa trên hơn 30+ trường dữ liệu.</p>
        </div>
        <div className="flex bg-gray-100 p-1.5 rounded-xl">
          <button onClick={() => setInputMode("form")} className={`px-6 py-2.5 rounded-lg text-sm font-bold ${inputMode === "form" ? "bg-white text-blue-600 shadow-md" : "text-gray-500"}`}>Nhập Form</button>
          <button onClick={() => { setInputMode("json"); setJsonInputText(JSON.stringify(formData, null, 2)); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold ${inputMode === "json" ? "bg-white text-blue-600 shadow-md" : "text-gray-500"}`}>Dán JSON</button>
        </div>
      </div>

      {inputMode === "json" ? (
        <div className="space-y-6">
          <textarea rows={16} value={jsonInputText} onChange={(e) => setJsonInputText(e.target.value)} className="w-full bg-gray-900 text-emerald-400 font-mono text-sm p-6 rounded-2xl" />
          <button onClick={handleApplyJson} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Nạp dữ liệu JSON</button>
        </div>
      ) : (
        <div>
          <div className="mb-8 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl shadow-sm relative overflow-hidden">
             {isExtracting && <div className="absolute top-0 left-0 h-1 bg-blue-600 w-1/3 shadow-[0_0_10px_#2563eb] animate-[pulse_1s_ease-in-out_infinite] rounded-full"></div>}
             <label className="block text-sm font-black text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📸</span> Tự động điền bằng Trí tuệ Nhân tạo (AI Vision)
             </label>
             <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={handleUploadCavet}
                disabled={isExtracting}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#1d4ed8] file:text-white hover:file:bg-[#1e40af] disabled:opacity-50 cursor-pointer"
             />
             {isExtracting ? (
                <div className="mt-5 p-4 bg-white rounded-xl border border-blue-100 shadow-inner flex flex-col gap-3 transition-all duration-300">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-700">
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      AI đang bóc tách chữ từ ảnh...
                    </div>
                    <span className="animate-pulse text-red-500">Xin đừng tắt trang!</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden relative">
                     <div className="absolute top-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 w-1/2 rounded-full animate-pulse"></div>
                  </div>
                </div>
             ) : (
                <p className="text-xs text-gray-500 mt-3 italic">*Mẹo: Chụp ảnh thật nét để AI đọc chính xác Biển số và Hãng xe nhất nhé!</p>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
            <div className="group relative">
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Hãng xe</label>
              <div className="relative">
                <select name="Vehicle_brand" value={formData.Vehicle_brand} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 border border-gray-200 p-4 rounded-xl font-bold">
                  <option value="Toyota">Toyota</option><option value="Honda">Honda</option><option value="Ford">Ford</option><option value="VinFast">VinFast</option>
                  <option value="Hyundai">Hyundai</option><option value="Kia">Kia</option><option value="Mazda">Mazda</option>
                </select>
                <DropdownIcon />
              </div>
            </div>
            <div className="group relative">
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Dòng xe (Model)</label>
              <input type="text" name="Vehicle_model" list="car_models" placeholder="Gõ hoặc chọn dòng xe..." value={formData.Vehicle_model} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl font-bold placeholder-gray-400" />
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
                <select name="Production_year" value={formData.Production_year} onChange={handleInputChange} className="w-full appearance-none bg-gray-50 border border-gray-200 p-4 rounded-xl font-bold">
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <DropdownIcon />
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Số Km đã đi (Odo)</label>
              <input type="number" name="Mileage_km" value={formData.Mileage_km} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl font-bold" />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Năm sinh chủ xe (Để luận Phong Thủy)</label>
              <input type="number" name="Owner_birth_year" value={formData.Owner_birth_year} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl font-bold" />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Biển số xe</label>
              <input type="text" name="license_plate" value={formData.license_plate} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-blue-700 p-4 rounded-xl text-xl font-mono tracking-widest font-black uppercase" />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <button onClick={onGoHome} className="text-gray-500 font-bold px-8 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">← Trở về</button>
        <button onClick={() => setStep(3)} className="bg-[#00B14F] hover:bg-[#009944] text-white px-10 py-4 rounded-xl font-extrabold shadow-lg transition-transform hover:-translate-y-1">Thẩm Định & Ký Web3 →</button>
      </div>
    </div>
  );
}