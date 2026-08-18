"use client";
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import ResultCertificate from "../ResultCertificate";

export default function SearchTab({ user }: { user: any }) {
  const [searchTx, setSearchTx] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [txHistory, setTxHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user?.email) {
      setTxHistory(JSON.parse(localStorage.getItem(`txHistory_${user.email}`) || "[]"));
    }
  }, [user]);

  const handleSearchTx = async (hash?: string) => {
    const targetHash = hash || searchTx;
    if (!targetHash) return;
    
    setSearchTx(targetHash); 
    setSearchLoading(true);
    setSearchResult(null);
    
    try {
      const response = await apiService.searchTx(targetHash);
      const rawData = response.data.data;
      const isTampered = response.data.is_tampered; 

      let parsedInfo = {};
      if (typeof rawData.original_car_info === 'string') {
        try { parsedInfo = JSON.parse(rawData.original_car_info); } catch(e) {}
      } else if (rawData.original_car_info) {
        parsedInfo = rawData.original_car_info;
      }

      setSearchResult({
        txhash: rawData.txhash,
        license_plate: rawData.license_plate,
        predicted_price_display: Number(rawData.predicted_price_vnd).toLocaleString('vi-VN') + " VNĐ",
        isTampered: isTampered, 
        ...parsedInfo, 
      });
    } catch (error) {
      alert("Không tìm thấy mã giao dịch này!");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto relative">
      {/* 🌟 CÁC ĐỐM SÁNG GRADIENT HUYỀN ẢO PHÍA SAU NỀN */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      {/* TIÊU ĐỀ RỰC RỠ */}
      <div className="text-center mb-10">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-xs font-black uppercase tracking-[0.2em] mb-2 block">
          Hệ thống minh bạch Blockchain
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
          Tra Cứu Chứng Nhận
        </h1>
        <p className="text-gray-500 text-base">
          Xin chào <span className="font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">{user?.user_metadata?.display_name || user?.email}</span>
        </p>
      </div>
      
      {/* Ô TÌM KIẾM HIỆU ỨNG GLOW */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12 bg-white/80 backdrop-blur-xl p-3 rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.08)] border border-blue-100/80 hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] transition-all duration-500">
        <input 
          type="text" 
          placeholder="Nhập mã TxHash (VD: 0x123abc...)" 
          value={searchTx} 
          onChange={(e) => setSearchTx(e.target.value)} 
          className="flex-1 bg-gray-50/50 border border-transparent hover:border-gray-200 p-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm text-gray-800" 
        />
        <button 
          onClick={() => handleSearchTx()} 
          disabled={searchLoading || !searchTx} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50"
        >
          {searchLoading ? "Đang tra cứu..." : "Tra Cứu Ngay ➔"}
        </button>
      </div>

      {/* LỊCH SỬ GIAO DỊCH HIỆU ỨNG KÍNH MỜ & HOVER NỔI BẬT */}
      {txHistory.length > 0 && !searchResult && (
        <div className="mb-12 bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-blue-50 shadow-[0_15px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <h3 className="text-xl font-black mb-6 border-b border-gray-100 pb-4 text-gray-900 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg shadow-inner">🕒</span> 
            Lịch sử định giá của bạn
          </h3>
          
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
            {txHistory.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => handleSearchTx(item.txhash)} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gradient-to-r from-gray-50/60 to-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-indigo-50/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100 flex-shrink-0">
                    🚗
                  </div>
                  <div>
                    <p className="font-black text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.license_plate}
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5 truncate max-w-[220px] sm:max-w-md group-hover:text-blue-400 transition-colors">
                      {item.txhash}
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 text-xs font-bold text-gray-500 bg-white group-hover:bg-blue-100 group-hover:text-blue-700 px-4 py-2 rounded-xl border border-gray-100 transition-all shadow-2xs">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResult && <ResultCertificate data={searchResult} user={user} />}
    </div>
  );
}