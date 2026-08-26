import React, { useState } from 'react';
// IMPORT CHUẨN XÁC TỪ THƯ MỤC COMPONENTS
import { supabase } from '../supabaseClient'; 

export default function FinesTab({ user }: { user?: any }) {
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
    
    try {
      // ĐOẠN NÀY LÀ ĐOẠN GHI LOG: Đảm bảo nó đang được bật (không bị /* */ che đi)
      if (user) {
        console.log("Tiến hành ghi log cho user:", user.email); // Thêm dòng này để test
        const { error: logError } = await supabase.from('user_activity_logs').insert([{
          email: user.email,
          action_type: subTab === 'csgt' ? 'CHECK_FINES' : 'CHECK_REGISTRY',
          action_details: { 
            plate_number: plate, 
            vehicle_type: 'car'
          }
        }]);

        if (logError) console.error("Lỗi Supabase:", logError);
      }

      // 2. GỌI API TRA CỨU
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
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-transparent pb-20 font-sans transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 relative z-10">
        
        {/* CỘT TRÁI */}
        <div className="lg:col-span-3 hidden lg:block h-fit sticky top-28">
          <div key={`left-${subTab}`} className="space-y-6 animate-[fadeInUp_0.5s_ease-out]">
            {subTab === 'csgt' ? (
              <>
                <div className="bg-gradient-to-br from-white to-red-50/50 dark:from-slate-800 dark:to-red-900/10 border border-red-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-all duration-300">
                  <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400 animate-bounce">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3">Phạt Nguội Là Gì?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                    Phạt nguội là hình thức xử phạt vi phạm giao thông thông qua hệ thống camera giám sát. Dữ liệu sẽ được trung tâm xử lý, sau đó Công an sẽ gửi thông báo yêu cầu chủ xe làm việc.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-800 dark:to-orange-900/10 border border-orange-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-all duration-300">
                  <h3 className="font-bold text-gray-900 dark:text-white text-[15px] mb-4">Quy trình xử lý</h3>
                  <div className="relative border-l-2 border-orange-200 dark:border-orange-900/30 ml-3 space-y-5">
                    <div className="relative pl-6">
                      <span className="absolute -left-[9px] top-1 w-4 h-4 bg-red-500 rounded-full border-4 border-white dark:border-slate-800 shadow-sm animate-pulse"></span>
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">1. Phát hiện</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Camera tự động ghi hình lỗi.</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute -left-[9px] top-1 w-4 h-4 bg-orange-400 rounded-full border-4 border-white dark:border-slate-800 shadow-sm animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">2. Gửi thông báo</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gửi giấy phạt về địa chỉ chủ xe.</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute -left-[9px] top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 shadow-sm animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">3. Nộp phạt</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nộp online qua Cổng DVCQG.</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-900/10 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-all duration-300">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 animate-bounce">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3">Đăng Kiểm Là Gì?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                    Đăng kiểm là quá trình kiểm tra định kỳ tình trạng an toàn kỹ thuật và bảo vệ môi trường của xe cơ giới để đảm bảo đủ điều kiện lưu thông.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-white to-teal-50/50 dark:from-slate-800 dark:to-teal-900/10 border border-teal-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-all duration-300">
                  <h3 className="font-bold text-gray-900 dark:text-white text-[15px] mb-4 flex items-center gap-2"><span className="animate-bounce inline-block">📋</span> Giấy tờ cần chuẩn bị</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="text-teal-500 mt-0.5">✓</span> Đăng ký xe bản gốc.</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="text-teal-500 mt-0.5">✓</span> Giấy chứng nhận Đăng kiểm cũ.</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="text-teal-500 mt-0.5">✓</span> Bảo hiểm TNDS còn hạn.</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="text-teal-500 mt-0.5">✓</span> Căn cước công dân (CCCD).</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CỘT GIỮA: FORM */}
        <div className="lg:col-span-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-gray-100 dark:border-slate-700 transition-colors duration-300 relative z-20">
            <div className="flex bg-gray-50/80 dark:bg-slate-900/50 rounded-xl p-1.5 mb-6 font-semibold text-sm border border-gray-100 dark:border-slate-700 transition-colors relative z-20">
              <button onClick={() => { setSubTab('csgt'); setResult(null); }} className={`flex-1 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${subTab === 'csgt' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-slate-800 border border-transparent'}`}>
                <svg className={`w-5 h-5 ${subTab !== 'csgt' && 'opacity-60 grayscale'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg> CỤC CSGT
              </button>
              <button onClick={() => { setSubTab('dangkiem'); setResult(null); }} className={`flex-1 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${subTab === 'dangkiem' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-slate-800 border border-transparent'}`}>
                <svg className={`w-5 h-5 ${subTab !== 'dangkiem' && 'opacity-60 grayscale'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg> ĐĂNG KIỂM
              </button>
            </div>

            <div className="mb-5 relative z-20">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm transition-colors">Biển Kiểm Soát</label>
              <input type="text" value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl p-4 text-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all uppercase font-semibold text-gray-800 dark:text-white" placeholder="Ví dụ: 30G88888" />
              {errorMessage && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errorMessage}</p>}
            </div>

            <div className="mb-8 relative z-20">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm transition-colors">Loại Phương Tiện</label>
              <div className="py-4 rounded-xl border bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2 font-semibold cursor-default transition-colors">
                <span>🚗</span> Ô tô (Hệ thống chỉ hỗ trợ tra cứu Ô tô)
              </div>
            </div>

            <div className="text-center mb-4 relative z-20">
              <button onClick={handleCheck} disabled={loading} className={`text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center mx-auto gap-3 text-lg ${subTab === 'csgt' ? 'bg-[#E53935] hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-[#1E88E5] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'}`}>
                {loading ? <><svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang truy xuất...</> : (subTab === 'csgt' ? 'Tra Cứu Phạt Nguội ➔' : 'Tra Cứu Đăng Kiểm ➔')}
              </button>
            </div>

            {result && (
              <div className="animate-[fadeInUp_0.4s_ease-out] border-t border-gray-100 dark:border-slate-700 mt-8 pt-8 transition-colors duration-300 relative z-20">
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
                            <div key={index} className="bg-white dark:bg-slate-800 border border-red-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
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

                {subTab === 'dangkiem' && result.data && (
                  <div className={`border-2 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto transition-colors duration-300 ${result.status === 'valid' ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'}`}>
                    <div className="text-center mb-6">
                      <h2 className={`text-2xl font-bold mb-2 transition-colors ${result.status === 'valid' ? 'text-blue-700 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                        {result.status === 'valid' ? 'Hồ Sơ Kiểm Định Hợp Lệ' : 'Cảnh Báo: Hết Hạn Đăng Kiểm'}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 transition-colors">{result.message}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
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
        </div>

        {/* CỘT PHẢI */}
        <div className="lg:col-span-3 hidden lg:block h-fit sticky top-28">
          <div key={`right-${subTab}`} className="space-y-6 animate-[fadeInUp_0.5s_ease-out]">
            {subTab === 'csgt' ? (
              <>
                <div className="bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-800 dark:to-amber-900/10 border border-amber-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xl font-black">
                      <svg className="w-6 h-6 animate-[spin_4s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">Thời Hạn Xử Lý</h3>
                  </div>
                  <ul className="space-y-4 mb-6">
                    <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"><span className="text-amber-500">▪</span> <span>Giải quyết trong vòng <strong className="text-gray-800 dark:text-gray-200">20 ngày</strong> kể từ ngày thông báo.</span></li>
                    <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"><span className="text-amber-500">▪</span> <span>Quá hạn sẽ bị từ chối kiểm định xe ở chu kỳ tiếp theo.</span></li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800/30 rounded-2xl p-5 shadow-sm transition-all duration-300">
                  <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2 flex items-center gap-2"><span className="animate-bounce inline-block text-lg">⚠️</span> Cảnh báo lừa đảo</h4>
                  <p className="text-xs text-red-600/90 dark:text-red-300/80 leading-relaxed font-medium">Tuyệt đối <strong className="text-red-800 dark:text-red-300">KHÔNG</strong> click vào các đường link nộp phạt lạ gửi qua SMS/Zalo. Cơ quan CSGT chỉ thông báo bằng văn bản giấy.</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-white to-green-50/50 dark:from-slate-800 dark:to-green-900/10 border border-green-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xl font-black animate-bounce">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">Mức Phạt Trễ Hạn</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"><span className="text-green-500">▪</span> <span>Dưới 01 tháng: Phạt <strong className="text-red-500 dark:text-red-400">3 - 4 triệu</strong>, tước GPLX 1-3 tháng.</span></li>
                    <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"><span className="text-green-500">▪</span> <span>Trên 01 tháng: Phạt <strong className="text-red-500 dark:text-red-400">4 - 6 triệu</strong>, tước GPLX 1-3 tháng.</span></li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-800 dark:to-indigo-900/10 border border-indigo-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="https://play-lh.googleusercontent.com/rN5h00T1gB2E6b1g5B8q2K62_k1sWvK6o8i5r0D_5H3Y4o6W5u4g6_YwW9z_hXo4OQ=w240-h480-rw" alt="TTDK App" className="w-10 h-10 rounded-lg shadow-sm animate-pulse" />
                    <div><h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">App TTDK</h4><p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Cục Đăng Kiểm VN</p></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Đặt lịch hẹn kiểm định xe ô tô trực tuyến nhanh chóng, tiện lợi.</p>
                  <button className="w-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold text-xs py-2 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all duration-300 active:scale-95">Tải ứng dụng ngay</button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}