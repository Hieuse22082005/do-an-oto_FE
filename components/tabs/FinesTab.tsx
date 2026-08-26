import React, { useState } from 'react';

export default function FinesTab() {
  const [subTab, setSubTab] = useState<'csgt' | 'dangkiem'>('csgt');
  const [plate, setPlate] = useState('30G88888');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheck = async () => {
    if (!plate.trim()) {
      setErrorMessage('Vui lòng nhập biển kiểm soát!');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setResult(null); 
    
    try {
      const endpoint = subTab === 'csgt' 
        ? 'http://localhost:8080/api/v1/fines/check-real' 
        : 'http://localhost:8080/api/v1/fines/check-registry';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plate: plate }),
      });

      if (!res.ok) throw new Error('Không thể kết nối đến máy chủ.');
      const data = await res.json();
      setResult(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPlate = (p: string) => {
    if (p.length >= 8) {
      return `${p.slice(0, 3)}-${p.slice(3, 6)}.${p.slice(6, 9)}`;
    }
    return p;
  };

  return (
    // THÊM DARK MODE CHO CONTAINER
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-slate-800 mt-6 transition-colors duration-300">
      
      {/* Nút chuyển đổi CSGT / ĐĂNG KIỂM (CÓ HOVER & DARK MODE) */}
      <div className="flex bg-gray-50/80 dark:bg-slate-800 rounded-xl p-1.5 mb-6 font-semibold text-sm border border-gray-100 dark:border-slate-700 transition-colors">
        <button 
          onClick={() => { setSubTab('csgt'); setResult(null); }}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${subTab === 'csgt' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-slate-700 border border-transparent'}`}
        >
          {/* Thay ảnh bằng SVG Khiên CSGT */}
          <svg className={`w-5 h-5 ${subTab !== 'csgt' && 'opacity-60 grayscale'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
          CỤC CSGT
        </button>
        <button 
          onClick={() => { setSubTab('dangkiem'); setResult(null); }}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${subTab === 'dangkiem' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-slate-700 border border-transparent'}`}
        >
          {/* Thay ảnh bằng SVG Sổ Đăng Kiểm */}
          <svg className={`w-5 h-5 ${subTab !== 'dangkiem' && 'opacity-60 grayscale'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          ĐĂNG KIỂM
        </button>
      </div>

      {/* Input Biển Số (CÓ DARK MODE TRÁNH CHÓI MẮT) */}
      <div className="mb-5">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm transition-colors">Biển Kiểm Soát</label>
        <input 
          type="text" 
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          className="w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl p-3.5 text-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all uppercase font-semibold text-gray-800 dark:text-white"
          placeholder="Ví dụ: 30G88888"
        />
        {errorMessage && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errorMessage}</p>}
      </div>

      {/* Loại phương tiện (KHÓA CỨNG + DARK MODE) */}
      <div className="mb-8">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm transition-colors">Loại Phương Tiện</label>
        <div className="grid grid-cols-1">
          <div className="py-3.5 rounded-xl border bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2 font-semibold cursor-default transition-colors">
            <span>🚗</span> Ô tô (Hệ thống chỉ hỗ trợ tra cứu Ô tô)
          </div>
        </div>
      </div>

      {/* Nút Tra Cứu (THÊM HOVER/ACTIVE ANIMATION) */}
      <div className="text-center mb-6">
        <button 
          onClick={handleCheck}
          disabled={loading}
          className={`text-white font-bold py-3.5 px-10 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center mx-auto gap-2 ${subTab === 'csgt' ? 'bg-[#E53935] hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-[#1E88E5] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
        >
          {loading ? (
            <><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang truy xuất...</>
          ) : (subTab === 'csgt' ? 'Tra Cứu Phạt Nguội ➔' : 'Tra Cứu Đăng Kiểm ➔')}
        </button>
      </div>

      {/* ==========================================
          HIỂN THỊ KẾT QUẢ (DARK MODE TOÀN DIỆN)
          ========================================== */}
      {result && (
        <div className="animate-[fadeInUp_0.4s_ease-out] border-t border-gray-100 dark:border-slate-800 pt-6 transition-colors duration-300">
          
          {/* TAB 1: KẾT QUẢ CSGT */}
          {subTab === 'csgt' && (
            <>
              {result.violations && result.violations.length === 0 ? (
                <div className="bg-[#FAFFF9] dark:bg-green-900/10 border border-[#E8F5E9] dark:border-green-900/30 rounded-2xl p-8 text-center shadow-sm max-w-xl mx-auto transition-colors duration-300">
                  <div className="bg-[#74DE98] dark:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="text-[26px] font-bold text-[#20B054] dark:text-green-400 mb-4 transition-colors">Xin Chúc Mừng!</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-[15px] flex items-center justify-center gap-2 transition-colors">
                    Phương tiện <span className="font-bold text-gray-900 dark:text-white border-2 border-gray-800 dark:border-gray-500 px-3 py-1 rounded tracking-wider bg-white dark:bg-slate-800 transition-colors">{formatPlate(result.plate_number)}</span> không có lỗi vi phạm.
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto transition-colors duration-300">
                  <div className="text-center mb-6">
                    <div className="bg-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-sm animate-pulse">!</div>
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2 transition-colors">Cảnh báo vi phạm!</h2>
                    <p className="text-gray-700 dark:text-gray-300 transition-colors">Tìm thấy <span className="font-bold text-red-600 dark:text-red-400">{result.violations?.length}</span> lỗi vi phạm cho xe <span className="font-bold border-2 border-black dark:border-gray-500 px-2 py-1 mx-1 rounded-md bg-white dark:bg-slate-800 dark:text-white">{formatPlate(result.plate_number)}</span></p>
                  </div>
                  <div className="space-y-4">
                    {result.violations?.map((lỗi: any, index: number) => (
                      <div key={index} className="bg-white dark:bg-slate-800 border border-red-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-gray-500 dark:text-gray-400 font-semibold">Thời gian:</div><div className="col-span-2 text-gray-800 dark:text-gray-200 font-medium">{lỗi.thoi_gian_vi_pham}</div>
                          <div className="text-gray-500 dark:text-gray-400 font-semibold">Địa điểm:</div><div className="col-span-2 text-gray-800 dark:text-gray-200">{lỗi.dia_diem_vi_pham}</div>
                          <div className="text-gray-500 dark:text-gray-400 font-semibold">Hành vi:</div><div className="col-span-2 text-red-600 dark:text-red-400 font-medium">{lỗi.hanh_vi_vi_pham}</div>
                          <div className="text-gray-500 dark:text-gray-400 font-semibold">Trạng thái:</div><div className="col-span-2"><span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 px-2 py-1 rounded text-xs font-bold">{lỗi.trang_thai}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: KẾT QUẢ ĐĂNG KIỂM */}
          {subTab === 'dangkiem' && result.data && (
            <div className={`border-2 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto transition-colors duration-300 ${result.status === 'valid' ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'}`}>
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-bold mb-2 transition-colors ${result.status === 'valid' ? 'text-blue-700 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                  {result.status === 'valid' ? 'Hồ Sơ Kiểm Định Hợp Lệ' : 'Cảnh Báo: Hết Hạn Đăng Kiểm'}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 transition-colors">{result.message}</p>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors duration-300 hover:shadow-md">
                <div className="grid grid-cols-2 text-sm">
                  <div className="p-4 border-b border-r border-gray-100 dark:border-slate-700"><span className="text-gray-500 dark:text-gray-400 block mb-1">Biển số xe:</span><span className="font-bold text-lg dark:text-white">{formatPlate(result.plate_number)}</span></div>
                  <div className="p-4 border-b border-gray-100 dark:border-slate-700"><span className="text-gray-500 dark:text-gray-400 block mb-1">Nhãn hiệu:</span><span className="font-bold text-gray-800 dark:text-gray-200">{result.data.nhan_hieu}</span></div>
                  <div className="p-4 border-b border-r border-gray-100 dark:border-slate-700"><span className="text-gray-500 dark:text-gray-400 block mb-1">Số khung:</span><span className="font-mono font-medium text-gray-700 dark:text-gray-300">{result.data.so_khung}</span></div>
                  <div className="p-4 border-b border-gray-100 dark:border-slate-700"><span className="text-gray-500 dark:text-gray-400 block mb-1">Số máy:</span><span className="font-mono font-medium text-gray-700 dark:text-gray-300">{result.data.so_may}</span></div>
                  <div className="p-4 border-b border-r border-gray-100 dark:border-slate-700"><span className="text-gray-500 dark:text-gray-400 block mb-1">Ngày kiểm định:</span><span className="font-medium text-gray-800 dark:text-gray-200">{result.data.ngay_kiem_dinh}</span></div>
                  <div className={`p-4 border-b border-gray-100 dark:border-slate-700 transition-colors ${result.status === 'expired' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                    <span className="text-gray-500 dark:text-gray-400 block mb-1">Hạn kiểm định:</span>
                    <span className={`font-bold text-lg ${result.status === 'expired' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{result.data.han_kiem_dinh}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-900/50 text-center text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors">
                  Đơn vị kiểm định: {result.data.don_vi_kiem_dinh}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}