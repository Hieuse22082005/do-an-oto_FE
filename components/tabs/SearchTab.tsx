"use client";
import GlitchInput from '../GlitchInput';
import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import ResultCertificate from "../ResultCertificate";
import { supabase } from '../supabaseClient';
import { ScanSearch, QrCode, ShieldCheck, Copy, CheckCircle2, Clock, CarFront, Check, Activity, Network, Key, Layers, Globe, Zap, Crown } from "lucide-react";

export default function SearchTab({ user }: { user: any }) {
  const [searchTx, setSearchTx] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [txHistory, setTxHistory] = useState<any[]>([]);
  const [copiedHash, setCopiedHash] = useState("");
  
  // Animation states for sidebars
  const [ping, setPing] = useState(25);
  const [blocksVerified, setBlocksVerified] = useState(14892);
  const [gasPrice, setGasPrice] = useState(15.4);

  useEffect(() => {
    if (user?.email) {
      setTxHistory(JSON.parse(localStorage.getItem(`txHistory_${user.email}`) || "[]"));
    }
    
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 10) + 20);
      if (Math.random() > 0.4) setBlocksVerified(c => c + 1);
      if (Math.random() > 0.6) setGasPrice(p => p + (Math.random() * 2 - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [user]);

  const handleSearchTx = async (hash?: string) => {
    const targetHash = hash || searchTx;
    if (!targetHash) return;
      
    // ==========================================
    // BẮN LOG TÌM KIẾM HASH LÊN SUPABASE
    // ==========================================
    if (user) {
      try {
        const { error: logError } = await supabase.from('user_activity_logs').insert([{
          email: user.email,
          action_type: 'SEARCH_HASH',
          action_details: { 
            tx_hash: targetHash,
            time: new Date().toISOString()
          }
        }]);
        if (logError) console.error("Lỗi ghi log Search Hash:", logError);
      } catch (err) {
        console.error("Lỗi try-catch Supabase:", err);
      }
    }
    // ==========================================

    setSearchTx(targetHash); 
    setSearchLoading(true);
    setSearchResult(null);
      
    try {
      const response = await apiService.searchTx(targetHash);
      const rawData = response.data.data;
      const isTampered = response.data.is_tampered; 

      let parsedInfo: any = {};
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
        userSignature: rawData.user_signature || parsedInfo.user_signature,
        user_email: rawData.user_email || parsedInfo.user_email,
        ...parsedInfo, 
      });
    } catch (error) {
      alert("Không tìm thấy mã giao dịch này!");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCopy = (e: any, hash: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(""), 2000);
  };

  return (
    <div className="flex gap-6 w-full justify-center items-start relative z-10 animate-[fadeInUp_0.4s_ease-out]">
      {/* BACKGROUND HEXAGON/CIRCUIT PATTERN (Subtle) */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 dark:opacity-20 invert dark:invert-0 pointer-events-none"></div>
      
      {/* GRADIENT ORBS */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-300/40 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-violet-500/15 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* LEFT SIDEBAR: Blockchain Status */}
      <div className="hidden 2xl:flex flex-col w-[320px] shrink-0 space-y-6">
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          
          <h3 className="text-indigo-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
            <Network className="w-5 h-5" /> Trạng Thái Mạng Lưới
          </h3>
          
          <div className="space-y-5 text-sm relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Kết nối Blockchain</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></div> 
                ĐÃ ĐỒNG BỘ
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Mạng</span>
              <span className="text-slate-900 dark:text-white font-mono flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-gray-700 dark:text-gray-500"/> Sepolia ETH</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Độ Trễ Mạng</span>
              <span className="text-slate-900 dark:text-white font-mono transition-all duration-300">~{ping}ms</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Khối Đã Xác Thực</span>
              <span className="text-indigo-400 font-mono">{blocksVerified.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Gwei (Phí Gas)</span>
              <span className="text-slate-900 dark:text-white font-mono">{gasPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 relative z-10">
            <h4 className="text-gray-700 dark:text-gray-500 text-xs uppercase mb-3 font-bold tracking-widest flex items-center gap-2">
              Log Quét Khối <div className="h-1 w-1 rounded-full bg-indigo-500 animate-ping"></div>
            </h4>
            <div className="space-y-3">
              <div className="bg-white/60 dark:bg-black/40 rounded-lg p-3 border border-indigo-500/30 flex items-start gap-3 relative overflow-hidden shadow-[0_0_15px_rgba(79,70,229,0.1)]">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-400 animate-[pulse_1s_infinite]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 animate-pulse shrink-0 shadow-[0_0_5px_#818cf8]"></div>
                <div>
                  <p className="text-xs text-slate-800 dark:text-gray-200 font-mono">Đang chờ lệnh tra cứu<span className="animate-pulse">_</span></p>
                  <p className="text-[10px] text-indigo-500/70 font-mono mt-0.5">Sẵn sàng đọc smart contract...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Banner QC hoặc Tính năng nổi bật */}
        <div className="bg-gradient-to-b from-indigo-100/80 to-white dark:from-indigo-900/40 dark:to-black/40 backdrop-blur-2xl border border-indigo-500/20 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-[50px] group-hover:bg-fuchsia-500/20 transition-all duration-700"></div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-300/40 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold mb-2 text-lg">Xác Thực Chống Giả Mạo</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            Công nghệ băm dữ liệu (Hashing) giúp phát hiện 100% các sửa đổi trái phép trên kết quả định giá.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5 text-slate-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">SHA-256</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5 text-slate-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">Immutable</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-5xl shrink flex-col">
        {/* HERO SECTION */}
        <div className="text-center mb-12 relative">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(79,70,229,0.15)]">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest">Hệ Thống Xác Thực Blockchain</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 tracking-tight mb-4 drop-shadow-sm font-sora py-1">
            Tra Cứu Chứng Nhận
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Xin chào <span className="font-bold bg-black/5 dark:bg-white/5 text-slate-800 dark:text-gray-200 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 ml-1">{user?.user_metadata?.display_name || user?.email}</span>
          </p>
        </div>
        
        {/* Ô TÌM KIẾM */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 bg-white/60 dark:bg-black/40 backdrop-blur-2xl p-4 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-black/10 dark:border-white/10 transition-all duration-500 relative overflow-hidden group/search z-20">
          {/* Glow pulse on focus (handled via group-focus-within) */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-600 dark:via-indigo-500/0 to-violet-500/0 group-focus-within/search:from-indigo-500/10 group-focus-within/search:via-violet-500/5 group-focus-within/search:to-transparent transition-all duration-700 pointer-events-none"></div>

          <div className="relative flex-1 flex items-center">
            <div className="absolute left-5 text-gray-700 dark:text-gray-500 pointer-events-none">
              <QrCode className="w-6 h-6 group-focus-within/search:text-indigo-400 transition-colors" />
            </div>
<input
  type="text"
  placeholder="Nhập mã TxHash (VD: 0x123abc...)"
  value={searchTx}
  onChange={(e) => setSearchTx(e.target.value)}
  className="w-full bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-transparent focus:border-indigo-500/50 pl-14 pr-6 py-4 rounded-xl outline-none focus:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all font-mono text-base text-slate-800 dark:text-gray-200 placeholder:text-gray-500"
/>
          </div>
          <button 
            onClick={() => handleSearchTx()} 
            disabled={searchLoading || !searchTx} 
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap text-lg"
          >
            {searchLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Đang quét...</span>
              </>
            ) : (
              <>
                <ScanSearch className="w-5 h-5" />
                <span>Tra Cứu Ngay</span>
              </>
            )}
          </button>
        </div>

        {/* LỊCH SỬ GIAO DỊCH (SỔ CHỨNG NHẬN) */}
        {txHistory.length > 0 && !searchResult && (
          <div className="mb-12 bg-white/60 dark:bg-black/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-black/10 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 rounded-full blur-[50px] pointer-events-none"></div>
            
            <h3 className="text-xl font-bold mb-8 border-b border-black/10 dark:border-white/10 pb-5 text-slate-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-300/40 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                 <Clock className="w-5 h-5 text-indigo-400" />
              </div>
              Sổ Chứng Nhận Định Giá
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {txHistory.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleSearchTx(item.txhash)} 
                  className="relative flex flex-col justify-between items-start p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-indigo-500/50 hover:bg-black/5 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  {/* Hologram Ribbon */}
                  <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden rounded-tr-2xl z-0">
                    <div className="absolute top-4 -right-8 w-32 h-6 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] rotate-45 opacity-40 shadow-[0_0_15px_rgba(118,75,162,0.5)] group-hover:opacity-70 transition-opacity"></div>
                  </div>

                  <div className="flex items-center justify-between w-full relative z-10 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 border border-indigo-500/20 flex-shrink-0">
                        <CarFront className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-lg text-slate-800 dark:text-gray-200 group-hover:text-indigo-400 transition-colors tracking-widest">
                          {item.license_plate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  </div>

                  <div className="w-full bg-black/30 rounded-xl p-3 border border-black/5 dark:border-white/5 group-hover:border-white/10 transition-colors relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-gray-700 dark:text-gray-500 uppercase tracking-widest font-bold">Mã Khối (TxHash)</span>
                      <button 
                        onClick={(e) => handleCopy(e, item.txhash)}
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-400 transition-colors bg-black/5 dark:bg-white/5 hover:bg-indigo-500/20 p-1.5 rounded-lg border border-transparent hover:border-indigo-500/30"
                        title="Copy TxHash"
                      >
                        {copiedHash === item.txhash ? <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 font-mono break-all">
                      {item.txhash.substring(0, 14)}...{item.txhash.substring(item.txhash.length - 12)}
                    </p>
                    <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                       <span className="text-[10px] text-gray-700 dark:text-gray-500 uppercase tracking-widest font-bold">Thời gian</span>
                       <span className="text-[10px] font-mono text-gray-600 dark:text-gray-400">{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResult && <ResultCertificate data={searchResult} user={user} />}
      </div>

      {/* RIGHT SIDEBAR: ADS / VIP */}
      <div className="hidden xl:flex flex-col w-[320px] shrink-0 space-y-6">
        {/* QC VIP */}
        <div className="bg-gradient-to-b from-amber-100/80 to-white dark:from-amber-900/40 dark:to-black/40 backdrop-blur-2xl border border-amber-500/20 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] group-hover:bg-amber-500/20 transition-all duration-700"></div>
          
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/30">
            <Crown className="w-6 h-6" />
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold mb-2 text-lg">Định Giá Không Giới Hạn</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
            Trở thành Dealer VIP ngay hôm nay. Chỉ 0.05 ETH/tháng cho trải nghiệm đỉnh cao, dự báo rớt giá và miễn phí Gas.
          </p>
          <button className="btn-uiverse w-full font-black py-3 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all active:scale-95" style={{ "--color": "#f59e0b" } as any}>
            Nâng cấp VIP
          </button>
        </div>

        {/* Feature Highlight */}
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-6 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
            <Zap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> Tốc độ xử lý
          </h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-black text-emerald-700 dark:text-emerald-400 font-mono">0.4</span>
            <span className="text-gray-600 dark:text-gray-400 font-bold pb-1">Giây</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-500 leading-relaxed">
            Thời gian trung bình để AI quét, định giá và ghi nhận chữ ký số của bạn lên Blockchain ETH. Nhanh và chính xác tuyệt đối.
          </p>
        </div>
      </div>
    </div>
  );
}