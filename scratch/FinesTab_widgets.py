import codecs
import re

file_path = 'components/tabs/FinesTab.tsx'
content = codecs.open(file_path, 'r', 'utf-8').read()

new_vars = '''    let statTitle = "Hệ thống Dữ Liệu"; let statNum = "8,492,105"; let statDesc = "Biên bản đã đồng bộ"; let statColor = "text-blue-700 dark:text-blue-400"; let statBg="bg-blue-50/80 dark:bg-blue-900/20"; let statBorder="border-blue-200 dark:border-blue-500/20"; let dotColor="bg-blue-500";
    let listTitle = "Top Lỗi Phổ Biến"; let listItems = [{ n: "Quá tốc độ", v: "45%", c: "bg-red-500" }, { n: "Vượt đèn đỏ", v: "30%", c: "bg-orange-500" }, { n: "Đỗ sai quy định", v: "15%", c: "bg-blue-500" }];
    let warnIcon = "⚠️"; let warnTitle = "Cảnh báo Lừa Đảo"; let warnDesc = "Tuyệt đối không truy cập link lạ gửi qua SMS yêu cầu nộp phạt nguội."; let warnBg = "bg-amber-50/80 dark:bg-amber-900/20"; let warnBorder = "border-amber-200 dark:border-amber-500/20"; let warnText = "text-amber-700 dark:text-amber-400";
    
    if (activeMenu === 'dang-kiem') {
      statTitle = "Trung Tâm Đăng Kiểm"; statNum = "125"; statDesc = "Trạm hoạt động trên toàn quốc"; statColor = "text-emerald-700 dark:text-emerald-400"; statBg="bg-emerald-50/80 dark:bg-emerald-900/20"; statBorder="border-emerald-200 dark:border-emerald-500/20"; dotColor="bg-emerald-500";
      listTitle = "Top Lỗi Trượt ĐK"; listItems = [{ n: "Độ đèn sai chuẩn", v: "55%", c: "bg-emerald-500" }, { n: "Lốp sai kích cỡ", v: "25%", c: "bg-teal-400" }, { n: "Khí thải quá mức", v: "15%", c: "bg-cyan-400" }];
      warnIcon = "🔧"; warnTitle = "Lưu Ý Độ Xe"; warnDesc = "Cục Đăng Kiểm nghiêm cấm thay đổi kết cấu xe. Các xe độ cản, mâm, đèn không đúng chuẩn sẽ bị từ chối cấp tem."; warnBg = "bg-slate-50/80 dark:bg-slate-800/50"; warnBorder = "border-slate-200 dark:border-slate-700"; warnText = "text-slate-700 dark:text-slate-300";
    } else if (activeMenu === 'mat-cap') {
      statTitle = "CSDL An Ninh"; statNum = "12,050"; statDesc = "Xe tang vật được phát hiện"; statColor = "text-red-700 dark:text-red-500"; statBg="bg-red-50/80 dark:bg-red-900/20"; statBorder="border-red-200 dark:border-red-500/30"; dotColor="bg-red-500";
      listTitle = "Rủi Ro Mua Xe Cũ"; listItems = [{ n: "Đục lại số khung", v: "60%", c: "bg-red-500" }, { n: "Xe đang thế chấp", v: "30%", c: "bg-amber-500" }, { n: "Biển số giả mạo", v: "10%", c: "bg-orange-500" }];
      warnIcon = "🚨"; warnTitle = "Rủi Ro Pháp Lý"; warnDesc = "Tiêu thụ tài sản do người khác phạm tội mà có (mua xe gian) có thể bị truy cứu trách nhiệm hình sự."; warnBg = "bg-red-50/80 dark:bg-red-900/40"; warnBorder = "border-red-200 dark:border-red-500/40"; warnText = "text-red-700 dark:text-red-300";
    } else if (activeMenu === 'gplx') {
      statTitle = "Quản lý GPLX"; statNum = "1.2M+"; statDesc = "Lượt tra cứu thông qua"; statColor = "text-slate-700 dark:text-slate-200"; statBg="bg-slate-50/80 dark:bg-slate-800/50"; statBorder="border-slate-200 dark:border-slate-700"; dotColor="bg-slate-500 dark:bg-slate-400";
      listTitle = "Phân Loại Bằng"; listItems = [{ n: "Hạng B2", v: "65%", c: "bg-slate-400" }, { n: "Hạng C", v: "25%", c: "bg-slate-500" }, { n: "Các hạng khác", v: "10%", c: "bg-slate-600" }];
      warnIcon = "🚓"; warnTitle = "Chống Bằng Giả"; warnDesc = "Sử dụng GPLX giả mạo bị phạt tiền từ 10-12 triệu đồng, tịch thu phương tiện và có thể xử lý hình sự."; warnBg = "bg-indigo-50/80 dark:bg-indigo-900/20"; warnBorder = "border-indigo-200 dark:border-indigo-500/20"; warnText = "text-indigo-700 dark:text-indigo-300";
    } else if (activeMenu === 'thi-thu') {
      statTitle = "Tỉ Lệ Đỗ Hạng B2"; statNum = "68%"; statDesc = "Trung bình trên hệ thống"; statColor = "text-yellow-700 dark:text-yellow-400"; statBg="bg-yellow-50/80 dark:bg-yellow-900/20"; statBorder="border-yellow-200 dark:border-yellow-500/20"; dotColor="bg-yellow-400";
      listTitle = "Thống Kê Đề Thi"; listItems = [{ n: "Câu hỏi khái niệm", v: "145 câu", c: "bg-yellow-500" }, { n: "Câu hỏi sa hình", v: "114 câu", c: "bg-amber-500" }, { n: "Câu điểm liệt", v: "60 câu", c: "bg-red-500" }];
      warnIcon = "💡"; warnTitle = "Mẹo Thi Đỗ"; warnDesc = "Hãy luôn ưu tiên đọc kỹ 60 câu điểm liệt trước. Sai 1 câu điểm liệt sẽ bị trượt bài thi ngay lập tức."; warnBg = "bg-blue-50/80 dark:bg-blue-900/20"; warnBorder = "border-blue-200 dark:border-blue-500/20"; warnText = "text-blue-700 dark:text-blue-300";
    }'''

content = re.sub(
    r'    let statTitle = "Hệ thống Dữ Liệu".*?    \}(?=\s*\n*\s*return \()',
    new_vars,
    content,
    flags=re.DOTALL
)

new_jsx = '''    return (
      <div key={`widget-${activeMenu}`} className={`w-full max-w-sm lg:col-span-3 flex flex-col gap-5 h-full ${animationClass}`}>
        <div className={`flex-[1] flex flex-col justify-center p-5 rounded-3xl shadow-sm border ${statBorder} ${statBg} backdrop-blur-2xl transition-all duration-300 hover:shadow-md cursor-default group`}>
          <h3 className="font-bold text-slate-500 dark:text-slate-400 text-[10px] mb-2 uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1"><span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse shadow-[0_0_8px_currentColor]`}></span> {statTitle}</h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">{statDesc}</p>
          <p className={`text-3xl font-black ${statColor} transition-all duration-500 drop-shadow-sm group-hover:scale-105 origin-left`}>{statNum}</p>
        </div>

        <div className="flex-[1.2] flex flex-col justify-center bg-white/80 dark:bg-slate-800/60 backdrop-blur-2xl p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md cursor-default group">
          <h3 className="font-bold text-slate-500 dark:text-slate-400 text-[10px] mb-4 uppercase tracking-wider">{listTitle}</h3>
          <ul className="space-y-3">
            {listItems.map((li, i) => (
              <li key={i} className="flex justify-between items-center text-xs group cursor-default">
                <div className="flex items-center gap-2"><div className={`w-2 h-2 ${li.c} rounded-full shadow-[0_0_5px_currentColor] transition-transform duration-300 group-hover:scale-150`}></div><span className="font-bold text-slate-700 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white">{li.n}</span></div>
                <span className="font-bold text-slate-500 transition-colors duration-300">{li.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`flex-[0.8] flex flex-col justify-center ${warnBg} backdrop-blur-xl p-5 rounded-2xl shadow-sm border ${warnBorder} transition-all duration-300 hover:shadow-md cursor-default group`}>
          <div className="flex items-center gap-2 mb-2">
             <span className="text-xl drop-shadow-sm">{warnIcon}</span>
             <h3 className={`font-bold text-sm ${warnText} transition-all duration-300 group-hover:translate-x-1`}>{warnTitle}</h3>
          </div>
          <p className={`text-xs leading-relaxed font-medium ${warnText} opacity-90 transition-colors duration-500`}>{warnDesc}</p>
        </div>
      </div>
    );'''

content = re.sub(
    r'    return \(\s*<div key=\{`widget-\$\{activeMenu\}`\} className=\{`lg:col-span-3 flex flex-col gap-4 h-full \$\{animationClass\}`\}>.*?      </div>\n    \);',
    new_jsx,
    content,
    flags=re.DOTALL
)

codecs.open('components/tabs/FinesTab.tsx', 'w', 'utf-8').write(content)
