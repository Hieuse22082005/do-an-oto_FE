import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_renderCenterMain = """
  const renderCenterMain = () => {
    const isLocked = activeMenu === 'thi-thu' && user?.tier !== 'vip';
    const hasResult = (activeMenu === 'phat-nguoi' && results.fines !== null) || (activeMenu === 'dang-kiem' && results.registry !== null) || (activeMenu === 'mat-cap' && results.stolen !== null) || (activeMenu === 'gplx' && results.license !== null);
    
    // THI THỬ (Gamified - VIP)
    if (activeMenu === 'thi-thu') {
      if (isLocked) return (
        <div key={activeMenu} className="lg:col-span-6 bg-[#0f172a] rounded-[2rem] p-10 flex flex-col items-center justify-center min-h-[500px] border border-[#1e293b] shadow-2xl animate-[fadeIn_0.4s_ease-out] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
          <span className="text-6xl mb-4 relative z-10 drop-shadow-lg">👑</span>
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 mb-2 relative z-10">Tính Năng VIP</h3>
          <p className="text-slate-400 text-sm mb-8 text-center max-w-sm relative z-10">Bộ đề thi trắc nghiệm B2 mô phỏng thực tế với hệ thống AI tự động chấm điểm và cảnh báo câu điểm liệt.</p>
          <button className="relative z-10 bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-slate-900 px-8 py-3 rounded-xl font-black tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] active:scale-95">Nâng cấp ngay</button>
        </div>
      );
      
      return (
        <div key={activeMenu} className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-200 min-h-[500px] flex flex-col relative animate-[fadeIn_0.4s_ease-out]">
          {!quizState.started ? (
            <div className="text-center my-auto space-y-6">
              <div className="w-24 h-24 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-5xl shadow-inner border-4 border-white">🚦</div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Thi Thử GPLX B2</h2>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">Bộ đề 30 câu hỏi ngẫu nhiên chuẩn Bộ GTVT. Có chấm điểm trực tiếp từng câu.</p>
                <div className="mt-4 inline-block bg-red-100 text-red-700 px-4 py-2 rounded-lg text-xs font-bold border border-red-200">
                  ⚠️ Sai 1 câu điểm liệt = TRƯỢT NGAY!
                </div>
              </div>
              <button onClick={() => setQuizState({ ...quizState, started: true })} className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl text-base transition-all duration-300 ease-out mt-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95">BẮT ĐẦU THI</button>
            </div>
          ) : quizState.finished ? (
            <div className="text-center my-auto space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="text-7xl drop-shadow-md">{quizState.hasFailedFatal ? '💀' : (quizState.score >= 26 ? '🏆' : '💔')}</div>
              <h2 className={`text-3xl font-black ${quizState.hasFailedFatal ? 'text-red-600' : (quizState.score >= 26 ? 'text-emerald-600' : 'text-amber-600')}`}>
                {quizState.hasFailedFatal ? 'BẠN ĐÃ TRƯỢT (ĐIỂM LIỆT)' : (quizState.score >= 26 ? 'CHÚC MỪNG BẠN ĐÃ ĐỖ!' : 'BẠN ĐÃ TRƯỢT')}
              </h2>
              <div className="bg-white inline-block px-10 py-6 rounded-3xl shadow-sm border border-slate-100">
                <p className="text-6xl font-black text-slate-900">{quizState.score} <span className="text-2xl text-slate-400">/ 30</span></p>
                <p className="text-xs text-slate-500 mt-2 font-medium">Điều kiện: Đạt 26/30 và không sai điểm liệt.</p>
              </div>
              <br/>
              <button onClick={() => setQuizState({ started: false, currentQ: 0, score: 0, finished: false, hasFailedFatal: false, selectedOption: null, isAnswered: false })} className="bg-slate-800 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all duration-300 ease-out hover:bg-slate-900 hover:shadow-lg active:scale-95 inline-flex items-center gap-2">🔄 Thi Lại</button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">{quizState.currentQ + 1}</div>
                  <span className="font-bold text-slate-400 text-xs">/ 30 CÂU</span>
                </div>
                {QUIZ_QUESTIONS[quizState.currentQ].isFatal && <span className="text-[10px] font-black text-white bg-red-500 px-3 py-1.5 rounded-lg animate-pulse shadow-sm flex items-center gap-1">⚠️ CÂU ĐIỂM LIỆT</span>}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-8 leading-relaxed px-2">{QUIZ_QUESTIONS[quizState.currentQ].text}</h3>
              <div className="space-y-3 mb-auto">
                {QUIZ_QUESTIONS[quizState.currentQ].options.map((opt, idx) => {
                  let btnStyle = 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 text-slate-600';
                  let icon = <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-bold shrink-0">{idx + 1}</span>;
                  
                  if (quizState.isAnswered) {
                    const isCorrect = idx === QUIZ_QUESTIONS[quizState.currentQ].correct;
                    const isSelected = idx === quizState.selectedOption;
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 shadow-md';
                      icon = <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">✓</span>;
                    } else if (isSelected) {
                      btnStyle = 'border-red-500 bg-red-50 text-red-900 shadow-md';
                      icon = <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">✗</span>;
                    }
                  } else if (idx === quizState.selectedOption) {
                    btnStyle = 'border-blue-500 bg-blue-50 text-blue-900 shadow-md';
                    icon = <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">{idx + 1}</span>;
                  }

                  return (
                    <button key={idx} onClick={() => handleAnswerSelect(idx)} disabled={quizState.isAnswered} className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ease-out font-medium text-sm flex items-center gap-4 ${quizState.isAnswered ? '' : 'active:scale-[0.98]'} ${btnStyle}`}>
                      {icon} <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizState.isAnswered && (
                <div className="mt-8 pt-4 flex justify-end">
                  <button onClick={handleNextQuestion} className="bg-slate-900 hover:bg-black text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all duration-300 ease-out shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2">
                    {quizState.currentQ === 29 ? 'Hoàn Tất Bài Thi' : 'Câu Tiếp Theo ➔'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // PHẠT NGUỘI (Dark Blue Gradient, Sleek)
    if (activeMenu === 'phat-nguoi') {
      return (
        <div key={activeMenu} className="lg:col-span-6 flex flex-col gap-6 animate-[fadeIn_0.4s_ease-out]">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden border border-blue-700/50">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <span className="text-9xl">🚔</span>
            </div>
            <div className="relative z-10 text-center mb-8 mt-4">
              <h2 className="text-3xl font-black mb-2 drop-shadow-md">Tra Cứu Phạt Nguội</h2>
              <p className="text-blue-200 text-xs uppercase tracking-widest font-bold">Hệ thống CSDL CSGT Toàn Quốc</p>
            </div>
            <form onSubmit={handleSearchFines} className="relative z-10 flex flex-col gap-4 max-w-md mx-auto">
              <div className="relative">
                <input type="text" value={queries.plate} onChange={(e) => handleInputChange('plate', e.target.value)} placeholder="VD: 30G99999" className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center text-xl font-mono text-white placeholder-blue-300/50 focus:border-blue-400 focus:bg-white/20 outline-none uppercase tracking-[0.2em] transition-all" required/>
              </div>
              <button type="submit" disabled={isLoading === 'phat-nguoi'} className="w-full bg-blue-500 hover:bg-blue-400 text-white py-4 rounded-2xl font-black text-sm tracking-wider uppercase transition-all duration-300 ease-out shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] active:scale-95 disabled:opacity-70">
                {isLoading ? 'Đang truy xuất...' : 'KIỂM TRA LỖI'}
              </button>
            </form>
          </div>

          {!hasResult ? (
            <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 text-xl font-black">?</div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Tra Cứu Phạt Nguội Là Gì?</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Hình thức xử phạt vi phạm giao thông qua hệ thống camera giám sát. Hình ảnh được gửi về Trung tâm đối chiếu và gửi giấy báo về nhà chủ phương tiện. Tránh bị từ chối đăng kiểm hoặc vướng mắc khi sang tên đổi chủ.</p>
              </div>
            </div>
          ) : (
            <div className="animate-[fadeInUp_0.4s_ease-out]">
              {results.fines.length === 0 ? (
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-10 text-center shadow-sm">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 shadow-inner">✓</div>
                  <h3 className="text-2xl font-black text-emerald-900 mb-1">KHÔNG CÓ LỖI</h3>
                  <p className="text-emerald-700 text-sm font-medium">Chúc mừng! Phương tiện của bạn không có vi phạm phạt nguội nào.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-700">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                      <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Trạng thái</h3><p className="text-xl font-black text-red-500">PHÁT HIỆN VI PHẠM</p></div>
                      <div className="w-full md:w-px h-px md:h-12 bg-slate-700"></div>
                      <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng tiền phạt (Dự kiến)</h3><p className="text-2xl font-black text-white">4.000.000 VNĐ</p></div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-md border border-red-100 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
                    <div className="flex-1 space-y-4 pl-2">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <span className="font-black text-slate-900 text-base">Đội CSGT Số 6</span>
                        <span className="bg-red-100 text-red-700 font-black text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider">Chưa nộp phạt</span>
                      </div>
                      <div className="space-y-1"><p className="text-slate-400 uppercase text-[10px] font-bold">Lỗi vi phạm</p><p className="font-bold text-slate-800">{results.fines[0].violation}</p></div>
                      <div className="space-y-1"><p className="text-slate-400 uppercase text-[10px] font-bold">Thời gian & Địa điểm</p><p className="font-medium text-slate-700">{results.fines[0].time} tại {results.fines[0].location}</p></div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button onClick={() => setQrModal(results.fines[0])} className="bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all duration-300 hover:bg-black active:scale-95 flex items-center gap-2">QR Thanh Toán</button>
                      </div>
                    </div>
                    <div className="w-full md:w-56 flex flex-col gap-3 shrink-0">
                      <div className="h-28 bg-slate-900 rounded-2xl relative overflow-hidden border-2 border-slate-800">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-500 bg-red-500/20 px-3 py-1 rounded flex items-center justify-center"><span className="text-red-100 font-mono font-black text-[10px]">{queries.plate}</span></div>
                        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> REC: {results.fines[0].cameraImg}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // ĐĂNG KIỂM (Teal / Technical Card)
    if (activeMenu === 'dang-kiem') {
      return (
        <div key={activeMenu} className="lg:col-span-6 flex flex-col gap-6 animate-[fadeIn_0.4s_ease-out]">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
            <div className="text-center mb-8 mt-2">
              <h2 className="text-3xl font-black text-slate-800 mb-2">Hồ Sơ Đăng Kiểm</h2>
              <p className="text-emerald-600 text-xs uppercase tracking-widest font-bold">Cục Đăng Kiểm Việt Nam (VR)</p>
            </div>
            <form onSubmit={handleSearchRegistry} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <input type="text" value={queries.plate} onChange={(e) => handleInputChange('plate', e.target.value)} placeholder="Biển số xe" className="px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm font-bold focus:border-emerald-500 uppercase outline-none transition-colors" required/>
              <input type="text" value={queries.cert} onChange={(e) => handleInputChange('cert', e.target.value)} placeholder="Số Tem/GCN" className="px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm font-bold focus:border-emerald-500 uppercase outline-none transition-colors" required/>
              <button type="submit" className="md:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black text-sm tracking-wider uppercase transition-all duration-300 ease-out shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] active:scale-95">Kiểm Tra Hồ Sơ</button>
            </form>
          </div>
          
          {hasResult && results.registry && (
            <div className="bg-emerald-50/50 p-8 rounded-[2rem] shadow-sm border border-emerald-200 animate-[fadeInUp_0.4s_ease-out] relative">
              <div className="absolute top-4 right-6 text-emerald-200 opacity-20 text-8xl font-black">VR</div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10 border-b border-emerald-200/50 pb-4">
                <div>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1">Phương tiện</p>
                  <h3 className="text-2xl font-black text-emerald-950">{results.registry.make} {results.registry.model}</h3>
                </div>
                <span className="bg-emerald-500 text-white font-black px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-sm mt-3 md:mt-0">{results.registry.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white p-4 rounded-2xl border border-emerald-100"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Đời xe</p><p className="font-black text-slate-800">{results.registry.year}</p></div>
                <div className="bg-white p-4 rounded-2xl border border-emerald-100"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Hết hạn ĐK</p><p className="font-black text-red-600">{results.registry.expiryDate}</p></div>
                <div className="col-span-2 bg-white p-4 rounded-2xl border border-emerald-100 flex justify-between items-center"><div className="w-1/2"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Số Khung (VIN)</p><p className="font-bold text-slate-800 font-mono text-sm">{results.registry.vin}</p></div><div className="w-px h-8 bg-slate-100"></div><div className="w-1/2 text-right"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Số Máy</p><p className="font-bold text-slate-800 font-mono text-sm">{results.registry.engine}</p></div></div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // MẤT CẮP (Crimson / Urgent)
    if (activeMenu === 'mat-cap') {
      return (
        <div key={activeMenu} className="lg:col-span-6 flex flex-col gap-6 animate-[fadeIn_0.4s_ease-out]">
           <div className="bg-[#1a0f0f] p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden border border-red-900/50">
            <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(220,38,38,0.05)_20px,rgba(220,38,38,0.05)_40px)]"></div>
            <div className="relative z-10 text-center mb-8 mt-2">
              <div className="w-16 h-16 bg-red-950/50 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 border border-red-800">🚨</div>
              <h2 className="text-3xl font-black text-red-50 mb-2">Tra Cứu Pháp Lý / Mất Cắp</h2>
              <p className="text-red-400 text-xs uppercase tracking-widest font-bold">Dữ Liệu An Ninh Quốc Gia</p>
            </div>
            <form onSubmit={handleSearchStolen} className="relative z-10 flex flex-col gap-4 max-w-md mx-auto">
              <input type="text" value={queries.vin} onChange={(e) => handleInputChange('vin', e.target.value)} placeholder="Nhập Số Khung hoặc Biển Số" className="w-full px-6 py-4 bg-black/40 border border-red-900/50 rounded-2xl text-center text-lg font-mono text-white placeholder-red-900/50 focus:border-red-500 focus:bg-black/60 outline-none uppercase tracking-[0.1em] transition-all" required/>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black text-sm tracking-wider uppercase transition-all duration-300 ease-out shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] active:scale-95">Quét Tình Trạng Pháp Lý</button>
            </form>
          </div>

          {hasResult && results.stolen && (
            <div className="bg-emerald-50 p-8 rounded-[2rem] shadow-sm border border-emerald-200 text-center animate-[fadeInUp_0.4s_ease-out] relative overflow-hidden">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-5xl mb-6 shadow-inner border-4 border-white relative z-10">🛡️</div>
              <h3 className="text-2xl font-black text-emerald-950 mb-2 relative z-10">PHƯƠNG TIỆN AN TOÀN</h3>
              <p className="text-emerald-700 text-sm font-medium relative z-10 max-w-sm mx-auto">{results.stolen.message}</p>
            </div>
          )}
        </div>
      );
    }

    // GPLX (Slate / Formal Card)
    if (activeMenu === 'gplx') {
      return (
        <div key={activeMenu} className="lg:col-span-6 flex flex-col gap-6 animate-[fadeIn_0.4s_ease-out]">
          <div className="bg-gradient-to-b from-slate-100 to-white p-8 rounded-[2rem] shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="text-center mb-8 mt-2">
              <h2 className="text-3xl font-black text-slate-800 mb-2">Xác Minh GPLX</h2>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Tổng Cục Đường Bộ Việt Nam</p>
            </div>
            <form onSubmit={handleSearchLicense} className="flex flex-col gap-4 max-w-md mx-auto">
              <input type="text" value={queries.gplx} onChange={(e) => handleInputChange('gplx', e.target.value)} placeholder="Nhập 12 số GPLX (VD: 010123456789)" maxLength={12} className="w-full px-6 py-4 bg-white border border-slate-300 rounded-2xl text-center text-lg font-mono text-slate-800 placeholder-slate-300 focus:border-slate-800 focus:ring-4 focus:ring-slate-100 outline-none tracking-[0.2em] transition-all shadow-inner" required/>
              <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-sm tracking-wider uppercase transition-all duration-300 ease-out shadow-lg hover:shadow-xl active:scale-95">Truy Xuất Hồ Sơ</button>
            </form>
          </div>

          {hasResult && results.license && (
            <div className="bg-[#f8f9fa] p-8 rounded-[2rem] shadow-lg border border-slate-200 animate-[fadeInUp_0.4s_ease-out] relative">
               <div className="absolute top-0 right-0 p-6 opacity-5"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Emblem_of_Vietnam.svg/200px-Emblem_of_Vietnam.svg.png" alt="Quoc Huy" className="w-32 h-32"/></div>
               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                  <div className="w-24 h-32 bg-slate-200 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0"><img src="https://ui-avatars.com/api/?name=Nguyen+Van+A&background=e2e8f0&color=475569" alt="Avatar" className="w-full h-full object-cover"/></div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Chủ Giấy Phép</p>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase">{results.license.name}</h3>
                    <div className="inline-block bg-slate-800 text-white px-4 py-1 rounded-lg text-sm font-bold mb-4 shadow-sm">Hạng {results.license.class}</div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-left"><p className="text-[9px] text-slate-400 uppercase font-bold">Ngày hết hạn</p><p className="text-red-600 font-bold text-sm">{results.license.expiryDate}</p></div>
                      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-left"><p className="text-[9px] text-slate-400 uppercase font-bold">Vi phạm tước bằng</p><p className="text-emerald-600 font-bold text-sm">{results.license.violations} lần</p></div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      );
    }
    
    return null; // Fallback
  };

  // ================= LAYOUT 3: CỘT PHẢI (WIDGET ĐỔI LẠI LÀ CÓ THỂ TƯƠNG TÁC) =================
  const renderRightWidgets = () => {
    let statTitle = "Hệ thống Dữ Liệu"; let statNum = "8,492,105"; let statDesc = "Biên bản đã đồng bộ"; let statColor = "text-blue-600"; let statBg="bg-blue-50"; let statBorder="border-blue-100"; let dotColor="bg-blue-500";
    let listTitle = "Top Lỗi Phổ Biến"; let listItems = [{ n: "Quá tốc độ", v: "45%", c: "bg-red-500" }, { n: "Vượt đèn đỏ", v: "30%", c: "bg-orange-500" }, { n: "Đỗ sai quy định", v: "15%", c: "bg-blue-500" }];
    let warnIcon = "⚠️"; let warnTitle = "Cảnh báo Lừa Đảo"; let warnDesc = "Tuyệt đối không truy cập link lạ gửi qua SMS yêu cầu nộp phạt nguội."; let warnBg = "bg-amber-50"; let warnBorder = "border-amber-200"; let warnText = "text-amber-900";
    
    if (activeMenu === 'dang-kiem') {
      statTitle = "Trung Tâm Đăng Kiểm"; statNum = "125"; statDesc = "Trạm hoạt động trên toàn quốc"; statColor = "text-emerald-600"; statBg="bg-emerald-50"; statBorder="border-emerald-100"; dotColor="bg-emerald-500";
      listTitle = "Top Lỗi Trượt ĐK"; listItems = [{ n: "Độ đèn sai chuẩn", v: "55%", c: "bg-emerald-600" }, { n: "Lốp sai kích cỡ", v: "25%", c: "bg-teal-500" }, { n: "Khí thải quá mức", v: "15%", c: "bg-cyan-500" }];
      warnIcon = "🔧"; warnTitle = "Lưu Ý Độ Xe"; warnDesc = "Cục Đăng Kiểm nghiêm cấm thay đổi kết cấu xe. Các xe độ cản, mâm, đèn không đúng chuẩn sẽ bị từ chối cấp tem."; warnBg = "bg-slate-100"; warnBorder = "border-slate-300"; warnText = "text-slate-800";
    } else if (activeMenu === 'mat-cap') {
      statTitle = "CSDL An Ninh"; statNum = "12,050"; statDesc = "Xe tang vật được phát hiện"; statColor = "text-red-600"; statBg="bg-red-50"; statBorder="border-red-100"; dotColor="bg-red-600";
      listTitle = "Rủi Ro Mua Xe Cũ"; listItems = [{ n: "Đục lại số khung", v: "60%", c: "bg-red-600" }, { n: "Xe đang thế chấp", v: "30%", c: "bg-amber-600" }, { n: "Biển số giả mạo", v: "10%", c: "bg-orange-600" }];
      warnIcon = "🚨"; warnTitle = "Rủi Ro Pháp Lý"; warnDesc = "Tiêu thụ tài sản do người khác phạm tội mà có (mua xe gian) có thể bị truy cứu trách nhiệm hình sự."; warnBg = "bg-red-900"; warnBorder = "border-red-800"; warnText = "text-red-50";
    } else if (activeMenu === 'gplx') {
      statTitle = "Quản lý GPLX"; statNum = "1.2M+"; statDesc = "Lượt tra cứu thông qua"; statColor = "text-slate-800"; statBg="bg-slate-100"; statBorder="border-slate-200"; dotColor="bg-slate-800";
      listTitle = "Phân Loại Bằng"; listItems = [{ n: "Hạng B2", v: "65%", c: "bg-slate-800" }, { n: "Hạng C", v: "25%", c: "bg-slate-600" }, { n: "Các hạng khác", v: "10%", c: "bg-slate-400" }];
      warnIcon = "👮"; warnTitle = "Chống Bằng Giả"; warnDesc = "Sử dụng GPLX giả mạo bị phạt tiền từ 10-12 triệu đồng, tịch thu phương tiện và có thể xử lý hình sự."; warnBg = "bg-indigo-50"; warnBorder = "border-indigo-100"; warnText = "text-indigo-900";
    } else if (activeMenu === 'thi-thu') {
      statTitle = "Tỷ Lệ Đỗ Hạng B2"; statNum = "68%"; statDesc = "Trung bình trên hệ thống"; statColor = "text-yellow-600"; statBg="bg-yellow-50"; statBorder="border-yellow-100"; dotColor="bg-yellow-500";
      listTitle = "Thống Kê Đề Thi"; listItems = [{ n: "Câu hỏi khái niệm", v: "145 câu", c: "bg-yellow-500" }, { n: "Câu hỏi sa hình", v: "114 câu", c: "bg-amber-500" }, { n: "Câu điểm liệt", v: "60 câu", c: "bg-red-500" }];
      warnIcon = "💡"; warnTitle = "Mẹo Thi Đỗ"; warnDesc = "Hãy luôn ưu tiên đọc kỹ 60 câu điểm liệt trước. Sai 1 câu điểm liệt sẽ bị trượt bài thi ngay lập tức."; warnBg = "bg-blue-50"; warnBorder = "border-blue-100"; warnText = "text-blue-900";
    }

    return (
      <div className="lg:col-span-3 space-y-5">
        <div className={`p-6 rounded-[2rem] shadow-sm border ${statBorder} ${statBg} transition-all duration-500 hover:shadow-md`}>
          <h3 className="font-black text-slate-800 text-[10px] mb-3 uppercase flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`}></span> {statTitle}</h3>
          <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">{statDesc}</p>
          <p className={`text-3xl font-black ${statColor} transition-colors duration-500`}>{statNum}</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-md">
          <h3 className="font-black text-slate-800 text-[10px] mb-5 uppercase tracking-wider">{listTitle}</h3>
          <ul className="space-y-4">
            {listItems.map((li, i) => (
              <li key={i} className="flex justify-between items-center text-xs group cursor-default">
                <div className="flex items-center gap-3"><div className={`w-2.5 h-2.5 ${li.c} rounded-full shadow-sm transition-transform duration-300 group-hover:scale-150`}></div><span className="font-bold text-slate-600 transition-colors duration-300 group-hover:text-slate-900">{li.n}</span></div>
                <span className="font-black text-slate-300 transition-colors duration-300 group-hover:text-slate-500">{li.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${warnBg} p-6 rounded-[2rem] shadow-sm border ${warnBorder} transition-all duration-500 hover:shadow-md`}>
          <div className="flex items-center gap-3 mb-3">
             <span className="text-2xl">{warnIcon}</span>
             <h3 className={`font-black text-sm ${warnText} transition-colors duration-500`}>{warnTitle}</h3>
          </div>
          <p className={`text-xs leading-relaxed font-medium ${warnText} opacity-90 transition-colors duration-500`}>{warnDesc}</p>
        </div>

        {user?.tier === 'vip' ? (
          <div className="bg-slate-900 p-6 rounded-[2rem] shadow-lg border border-slate-800 relative overflow-hidden flex flex-col justify-center text-center">
            <h3 className="font-black text-blue-400 text-sm mb-2 relative z-10">💼 Công Cụ Đại Lý</h3>
            <p className="text-[10px] text-slate-400 mb-5 relative z-10 font-medium">Đặc quyền VIP: Tra cứu tự động 100+ biển số.</p>
            <button onClick={() => { alert('Hệ thống đang mở cổng kết nối API tải file Excel!'); }} className="w-full bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white py-3 rounded-xl text-xs font-bold transition-all duration-300 ease-out active:scale-95 flex items-center justify-center gap-2">
              📥 Tải lên File Excel (.xlsx)
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 p-6 rounded-[2rem] shadow-lg border border-slate-800 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-out active:scale-95 text-center">
            <div className="absolute -right-2 -top-2 text-6xl opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 text-white">💼</div>
            <h3 className="font-black text-white text-sm mb-2 relative z-10 transition-colors duration-300 group-hover:text-yellow-400">Giải Pháp Đại Lý</h3>
            <p className="text-[10px] text-slate-400 mb-0 relative z-10 font-medium">Nâng cấp VIP tra cứu tự động hàng loạt bằng Excel.</p>
          </div>
        )}
      </div>
    );
  };
"""

with open(r"c:\Users\Hieu\Desktop\do an oto_FE\scratch\rewrite_finestab.py", "w", encoding="utf-8") as f:
    f.write(new_renderCenterMain)
