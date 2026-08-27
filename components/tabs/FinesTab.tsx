"use client";
import React, { useState } from 'react';

export default function FinesTab({ user }: { user: any }) {
  const [plateNumber, setPlateNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  
  const [finesResult, setFinesResult] = useState<any[]>([]);

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, '');
    setPlateNumber(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (plateNumber.length < 6) {
      alert("Biển số xe không hợp lệ!");
      return;
    }

    setIsLoading(true);
    setIsSearched(false);

    // Giả lập gọi API
    setTimeout(() => {
      setIsLoading(false);
      setIsSearched(true);
      
      // Nếu nhập đúng biển này sẽ bung ra giao diện Lỗi + Hình ảnh + Cấn trừ
      if (plateNumber === "30G99999" || plateNumber === "29A11111") {
        setFinesResult([
          {
            id: 1,
            time: "14:30 - 10/05/2026",
            location: "Đại lộ Thăng Long, Hà Nội",
            violation: "Vượt đèn đỏ (Quy chuẩn kỹ thuật quốc gia về báo hiệu đường bộ)",
            fineAmount: 4000000,
            status: "Chưa nộp phạt",
            agency: "Đội CSGT Số 6",
            warning: "Nguy cơ từ chối đăng kiểm",
            cameraImg: "CAM-01-VRT"
          },
          {
            id: 2,
            time: "09:15 - 02/03/2026",
            location: "Cầu Nhật Tân, Hà Nội",
            violation: "Điều khiển xe chạy quá tốc độ quy định từ 10 km/h đến 20 km/h",
            fineAmount: 5000000,
            status: "Chưa nộp phạt",
            agency: "Trạm CSGT Cầu Giấy",
            warning: "Bình thường",
            cameraImg: "CAM-03-SPD"
          }
        ]);
      } else {
        setFinesResult([]); 
      }
    }, 1500);
  };

  // TÍNH TOÁN CẤN TRỪ (Giả lập AI định giá xe này là 500 triệu)
  const aiValuation = 500000000;
  const totalFineNumber = finesResult.reduce((sum, item) => sum + item.fineAmount, 0);
  const finalValue = aiValuation - totalFineNumber;

  // Hàm format tiền tệ VNĐ
  const formatVND = (money: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* TIÊU ĐỀ */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Tra Cứu <span className="text-blue-600">Phạt Nguội</span> Toàn Quốc
        </h2>
        <p className="text-gray-500 font-medium">
          Dữ liệu được đồng bộ liên tục. Hỗ trợ đối chiếu cấn trừ vào giá trị xe AI.
        </p>
      </div>

      {/* KHU VỰC TÌM KIẾM THÔNG MINH */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={plateNumber}
              onChange={handlePlateChange}
              placeholder="Nhập biển số (Thử gõ: 30G99999)..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-xl font-black text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all uppercase tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !plateNumber}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-[0.98] sm:w-auto w-full"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Đang quét...
              </>
            ) : (
              'Tra Cứu Ngay'
            )}
          </button>
        </form>
      </div>

      {/* HIỂN THỊ KẾT QUẢ SAU KHI QUÉT */}
      {isSearched && (
        <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
          
          {finesResult.length === 0 ? (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/30">✓</div>
              <h3 className="text-2xl font-black text-emerald-900">Biển số {plateNumber}: SẠCH PHẠT NGUỘI!</h3>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* TÍNH NĂNG MỚI 1: KHỐI AI CẤN TRỪ GIÁ TRỊ XE */}
              <div className="bg-[#002f6c] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                {/* Họa tiết background */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-blue-800 pb-4">
                    <span>🤖</span> AI Báo cáo Cấn trừ Tài chính
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800">
                    <div className="pt-4 md:pt-0">
                      <p className="text-blue-300 text-sm font-medium mb-1">Giá xe AI định giá</p>
                      <p className="text-2xl font-bold text-white">{formatVND(aiValuation)}</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                      <p className="text-red-300 text-sm font-medium mb-1">Tổng nợ phạt nguội</p>
                      <p className="text-2xl font-bold text-red-400">- {formatVND(totalFineNumber)}</p>
                    </div>
                    <div className="pt-4 md:pt-0">
                      <p className="text-emerald-300 text-sm font-medium mb-1">Giá trị thu mua an toàn</p>
                      <p className="text-3xl font-black text-emerald-400">{formatVND(finalValue)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DANH SÁCH CHI TIẾT KÈM CAMERA */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-lg text-gray-800 px-2 flex items-center justify-between">
                  <span>Bằng chứng vi phạm ({finesResult.length} lỗi)</span>
                  <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full border border-red-200">Bắt buộc xử lý</span>
                </h4>
                
                {finesResult.map((item, index) => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 hover:border-blue-200 transition-all flex flex-col md:flex-row gap-6">
                    
                    {/* Cột trái: Text */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-red-100 text-red-600 font-black flex items-center justify-center text-sm">#{index + 1}</span>
                          <span className="font-bold text-gray-900">{item.agency}</span>
                        </div>
                        <span className="bg-red-50 text-red-600 font-extrabold text-xs px-3 py-1.5 rounded-xl border border-red-100 uppercase">{item.status}</span>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-gray-400 font-bold uppercase text-[10px]">Hành vi vi phạm</p>
                          <p className="font-bold text-gray-800">{item.violation}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-bold uppercase text-[10px]">Thời gian & Địa điểm</p>
                          <p className="font-medium text-gray-700">{item.time} tại <strong className="text-gray-900">{item.location}</strong></p>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-amber-800 mt-auto">
                        <span>⚠️ Mức phạt: <strong className="text-red-600 text-sm ml-1">{formatVND(item.fineAmount)}</strong></span>
                        <span className="text-amber-700">{item.warning}</span>
                      </div>
                    </div>

                    {/* TÍNH NĂNG MỚI 2: Cột phải - Ảnh Camera Giả lập */}
                    <div className="w-full md:w-64 h-48 bg-slate-900 rounded-2xl relative overflow-hidden flex-shrink-0 shadow-inner group cursor-pointer">
                      {/* Lưới giả lập camera */}
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                      
                      {/* Biển số bị bôi đỏ */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-12 border-2 border-red-500 bg-red-500/20 rounded shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                         <span className="text-red-100 font-black tracking-widest text-xs opacity-80">{plateNumber}</span>
                      </div>
                      
                      {/* Thông tin tọa độ camera */}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[8px] font-mono text-emerald-400">
                        <span>REC 🔴</span>
                        <span>{item.cameraImg} | LAT:21.0285</span>
                      </div>
                      <div className="absolute top-2 right-2 text-[10px] text-white/50 font-mono">2026-05-10</div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}