import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\FinesTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update handleSearchStolen
new_search_stolen = """  const handleSearchStolen = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('mat-cap'); setResults({ ...results, stolen: null });
    await logActivity('TRA_CUU_MAT_CAP', { vinOrPlate: queries.vin });
    setTimeout(() => {
      setIsLoading(null);
      if (queries.vin === "30G99999" || queries.vin === "29A11111") {
        setResults({ ...results, stolen: { status: "STOLEN", message: "CẢNH BÁO: Phương tiện nằm trong danh sách báo mất cắp ngày 15/08/2026 tại Công an TP. Hà Nội.", checkTime: new Date().toLocaleString() }});
      } else {
        setResults({ ...results, stolen: { status: "SAFE", message: "Không tìm thấy hồ sơ báo mất cắp, tranh chấp hay nợ xấu thế chấp ngân hàng đối với phương tiện này.", checkTime: new Date().toLocaleString() }});
      }
    }, 1000);
  };"""

content = re.sub(r"const handleSearchStolen = async \(e: React\.FormEvent\) => \{.*?\}, 1000\);\n    \};", new_search_stolen, content, flags=re.DOTALL)

# 2. Update the UI for Mat Cap
old_ui = """          {hasResult && results.stolen && (
            <div className="bg-emerald-900/20 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-emerald-500/30 text-center animate-[fadeInUp_0.4s_ease-out] relative overflow-hidden">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-5xl mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-10">🛡️</div>
              <h3 className="text-2xl font-black text-white mb-2 relative z-10">PHƯƠNG TIỆN AN TOÀN</h3>
              <p className="text-emerald-300 text-sm font-medium relative z-10 max-w-sm mx-auto">{results.stolen.message}</p>
            </div>
          )}"""

new_ui = """          {hasResult && results.stolen && (
            <div className={`backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border text-center animate-[fadeInUp_0.4s_ease-out] relative overflow-hidden ${results.stolen.status === 'STOLEN' ? 'bg-red-900/20 border-red-500/50' : 'bg-emerald-900/20 border-emerald-500/30'}`}>
              {results.stolen.status === 'STOLEN' && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 mix-blend-overlay"></div>}
              
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-5xl mb-6 border shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 ${results.stolen.status === 'STOLEN' ? 'bg-red-500/20 text-red-500 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.5)]' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                {results.stolen.status === 'STOLEN' ? '⚠️' : '🛡️'}
              </div>
              
              <h3 className={`text-2xl font-black mb-2 relative z-10 ${results.stolen.status === 'STOLEN' tang ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-white'}`}>
                {results.stolen.status === 'STOLEN' ? 'PHÁT HIỆN TÀI SẢN TRANH CHẤP' : 'PHƯƠNG TIỆN AN TOÀN'}
              </h3>
              
              <p className={`text-sm font-medium relative z-10 max-w-md mx-auto ${results.stolen.status === 'STOLEN' ? 'text-red-200' : 'text-emerald-300'}`}>
                {results.stolen.message}
              </p>
              
              {results.stolen.status === 'STOLEN' && (
                <div className="mt-6 inline-block bg-red-950/80 border border-red-500/50 px-6 py-3 rounded-xl relative z-10">
                   <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-1">Hành động khuyến nghị</p>
                   <p className="text-sm text-white">Báo ngay cho cơ quan Công an gần nhất.</p>
                </div>
              )}
            </div>
          )}"""
          
new_ui = new_ui.replace("tang ?", "") # fix typo in string

content = content.replace(old_ui, new_ui)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated Stolen UI and mock logic!")
