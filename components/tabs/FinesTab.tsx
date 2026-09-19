"use client";
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Search, ShieldAlert, FileText, CreditCard, PenTool, Car } from "lucide-react";
 // Đảm bảo đường dẫn import Supabase đúng

// ================= DỮ LIỆU BỘ ĐỀ THI TRẮC NGHIỆM (30 CÂU THỰC TẾ) =================
const QUIZ_QUESTIONS = [
  { id: 1, text: "Khái niệm 'làn đường' được hiểu như thế nào là đúng?", options: ["Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn.", "Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe cơ giới.", "Là đường cho xe ô tô chạy, dừng, đỗ an toàn."], correct: 0, isFatal: false },
  { id: 2, text: "Người điều khiển phương tiện tham gia giao thông mà trong cơ thể có chất ma túy có bị nghiêm cấm không?", options: ["Không bị nghiêm cấm.", "Nghiêm cấm tùy từng trường hợp.", "Bị nghiêm cấm."], correct: 2, isFatal: true }, 
  { id: 3, text: "Bạn đang lái xe trong khu dân cư, có đông xe qua lại, nếu muốn quay đầu bạn cần làm gì?", options: ["Bấm còi liên tục và quay đầu xe.", "Đi tiếp đến điểm giao cắt gần nhất hoặc nơi có biển báo cho phép quay đầu xe.", "Bật đèn khẩn cấp và quay đầu xe từ từ."], correct: 1, isFatal: false },
  { id: 4, text: "Người lái xe sử dụng đèn như thế nào khi lái xe trong khu đô thị và đông dân cư vào ban đêm?", options: ["Bất cứ đèn nào miễn là nhìn rõ phía trước.", "Chỉ bật đèn chiếu xa (đèn pha) khi không có xe đi ngược chiều.", "Đèn chiếu gần (đèn cốt).", "Đèn chiếu xa (đèn pha)."], correct: 2, isFatal: false },
  { id: 5, text: "Hành vi giao xe cơ giới cho người không đủ điều kiện để điều khiển tham gia giao thông có bị nghiêm cấm không?", options: ["Không bị nghiêm cấm.", "Nghiêm cấm tùy trường hợp.", "Bị nghiêm cấm."], correct: 2, isFatal: true }, 
  { id: 6, text: "Biển báo hình tròn, viền đỏ, nền trắng, hình vẽ màu đen là loại biển gì?", options: ["Biển báo nguy hiểm.", "Biển báo cấm.", "Biển hiệu lệnh.", "Biển chỉ dẫn."], correct: 1, isFatal: false },
  { id: 7, text: "Tại nơi giao nhau không có báo hiệu đi theo vòng xuyến, người điều khiển phương tiện phải nhường đường như thế nào?", options: ["Nhường đường cho xe đi đến từ bên phải.", "Nhường đường cho xe đi đến từ bên trái.", "Nhường đường cho xe đi thẳng."], correct: 0, isFatal: false },
  { id: 8, text: "Hành vi vượt đèn đỏ có bị coi là vi phạm pháp luật giao thông đường bộ không?", options: ["Bị vi phạm pháp luật.", "Chỉ vi phạm khi gây tai nạn.", "Không vi phạm nếu không có cảnh sát giao thông."], correct: 0, isFatal: true }, 
  { id: 9, text: "Khi điều khiển xe chạy với tốc độ dưới 60 km/h, người lái xe phải chủ động giữ khoảng cách an toàn như thế nào?", options: ["Giữ khoảng cách tùy theo mật độ phương tiện, tình hình giao thông thực tế.", "Giữ khoảng cách 35m.", "Giữ khoảng cách 55m."], correct: 0, isFatal: false },
  { id: 10, text: "Người có giấy phép lái xe hạng B2 được điều khiển loại xe nào?", options: ["Xe ô tô chở người trên 9 chỗ ngồi.", "Xe ô tô tải có trọng tải trên 3.500 kg.", "Xe ô tô chở người đến 9 chỗ ngồi; xe ô tô tải có trọng tải dưới 3.500 kg."], correct: 2, isFatal: false },
  { id: 11, text: "Khi gặp hiệu lệnh của CSGT giang hai tay sang ngang, người tham gia giao thông ở các hướng phải đi như thế nào?", options: ["Phía trước và phía sau người điều khiển được đi; bên phải và bên trái phải dừng lại.", "Bên phải và bên trái người điều khiển được đi; phía trước và phía sau phải dừng lại."], correct: 1, isFatal: false },
  { id: 12, text: "Sử dụng rượu bia khi lái xe, nếu bị phát hiện thì bị xử lý như thế nào?", options: ["Chỉ bị nhắc nhở.", "Xử phạt hành chính hoặc có thể bị xử lý hình sự tùy mức độ.", "Không bị xử lý hình sự."], correct: 1, isFatal: true }, 
  { id: 13, text: "Thời gian làm việc của người lái xe ô tô không được lái xe liên tục quá bao nhiêu giờ?", options: ["4 giờ.", "6 giờ.", "8 giờ."], correct: 0, isFatal: false },
  { id: 14, text: "Kỹ thuật cơ bản để giữ thăng bằng khi điều khiển xe mô tô đi trên đường gồ ghề?", options: ["Đứng thẳng trên giá gác chân, hơi gập đầu gối và khuỷu tay, đi chậm.", "Ngồi lùi lại phía sau, tăng ga vượt nhanh.", "Ngồi lệch sang một bên để giữ thăng bằng."], correct: 0, isFatal: false },
  { id: 15, text: "Khái niệm 'Dừng xe' được hiểu thế nào?", options: ["Là trạng thái đứng yên của phương tiện không giới hạn thời gian.", "Là trạng thái đứng yên tạm thời của phương tiện trong một khoảng thời gian cần thiết."], correct: 1, isFatal: false },
  { id: 16, text: "Trên đường cao tốc, người lái xe phải dừng, đỗ xe như thế nào?", options: ["Chỉ được dừng, đỗ xe ở nơi quy định.", "Dừng, đỗ xe ở nơi lề đường rộng.", "Dừng, đỗ xe bất cứ nơi nào miễn là có bật đèn khẩn cấp."], correct: 0, isFatal: true }, 
  { id: 17, text: "Để báo hiệu cho xe phía trước biết xe mô tô của bạn muốn vượt, bạn phải ra tín hiệu như thế nào?", options: ["Bằng tín hiệu còi hoặc đèn.", "Chỉ cần bật đèn xi nhan phải.", "Vượt lên bên phải và bóp còi liên tục."], correct: 0, isFatal: false },
  { id: 18, text: "Biển nào cấm máy kéo?", options: ["Biển cấm ô tô tải.", "Biển cấm máy kéo.", "Cả 2 biển trên."], correct: 2, isFatal: false },
  { id: 19, text: "Âm lượng của còi điện lắp trên ô tô là bao nhiêu (đo cách 2m)?", options: ["Không nhỏ hơn 90 dB, không lớn hơn 115 dB.", "Không nhỏ hơn 80 dB, không lớn hơn 100 dB.", "Không nhỏ hơn 70 dB, không lớn hơn 90 dB."], correct: 0, isFatal: false },
  { id: 20, text: "Hành vi lùi xe trên đường cao tốc có bị cấm không?", options: ["Chỉ cấm lùi khi có sương mù.", "Nghiêm cấm.", "Không cấm nếu có người xi nhan."], correct: 1, isFatal: true }, 
  { id: 21, text: "Độ mòn tối đa cho phép của lốp xe ô tô (chiều sâu hoa lốp) là bao nhiêu?", options: ["1.0 mm.", "1.6 mm.", "2.0 mm."], correct: 1, isFatal: false },
  { id: 22, text: "Khi xe đang kéo một xe khác không có hệ thống hãm, phải dùng loại dây kéo nào?", options: ["Dây cáp thép mền.", "Thanh nối cứng.", "Dây dù chịu lực."], correct: 1, isFatal: false },
  { id: 23, text: "Vạch kẻ đường màu vàng nét đứt có ý nghĩa gì?", options: ["Chia hai chiều xe chạy ngược chiều, được phép lấn làn.", "Chia các làn xe chạy cùng chiều.", "Cấm dừng đỗ xe."], correct: 0, isFatal: false },
  { id: 24, text: "Chủ xe ô tô có được tự ý thay đổi màu sơn, nhãn hiệu khác với Giấy đăng ký xe không?", options: ["Được phép nếu dán decal.", "Không được phép.", "Tùy thuộc vào loại xe."], correct: 1, isFatal: false },
  { id: 25, text: "Khi xảy ra tai nạn giao thông, người lái xe có mặt tại hiện trường phải làm gì?", options: ["Rời khỏi hiện trường ngay lập tức.", "Bảo vệ hiện trường, cấp cứu người bị nạn, báo cho cơ quan công an.", "Chỉ cần đền bù tiền cho người bị nạn rồi đi."], correct: 1, isFatal: false },
  { id: 26, text: "Gương chiếu hậu của xe mô tô hai bánh có tác dụng gì?", options: ["Để quan sát an toàn phía sau cả bên trái và bên phải.", "Để làm đẹp cho phương tiện.", "Chỉ để quan sát phía trước."], correct: 0, isFatal: false },
  { id: 27, text: "Người đủ bao nhiêu tuổi trở lên thì được điều khiển xe mô tô hai bánh dung tích từ 50cm3 trở lên?", options: ["16 tuổi.", "18 tuổi.", "21 tuổi."], correct: 1, isFatal: false },
  { id: 28, text: "Việc sản xuất, mua bán, sử dụng biển số xe cơ giới được quy định thế nào?", options: ["Nghiêm cấm sản xuất, mua bán, sử dụng trái phép.", "Được phép nếu làm bằng vật liệu phản quang.", "Được phép mua bán tự do trên mạng."], correct: 0, isFatal: false },
  { id: 29, text: "Khi đi qua khu vực ngập nước, người lái xe cần làm gì?", options: ["Tăng số cao, tăng ga đi nhanh qua.", "Đạp ly hợp (côn) liên tục, về số thấp, đi chậm, giữ đều ga.", "Tắt máy, nhờ người đẩy qua."], correct: 1, isFatal: false },
  { id: 30, text: "Trong các loại nhiên liệu dưới đây, loại nào giảm thiểu ô nhiễm môi trường?", options: ["Xăng pha chì.", "Xăng sinh học (E5), Khí sinh học (Biogas).", "Dầu Điêzen (Diesel)."], correct: 1, isFatal: false }
];

export default function FinesTab({ user }: { user: any }) {
  const [activeMenu, setActiveMenu] = useState('phat-nguoi');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const [queries, setQueries] = useState({ plate: '', vin: '', cert: '', gplx: '' });
  const [results, setResults] = useState<any>({ fines: null, registry: null, stolen: null, license: null });

  // STATES THI TRẮC NGHIỆM
  const [quizState, setQuizState] = useState({ 
    started: false, currentQ: 0, score: 0, finished: false, hasFailedFatal: false,
    selectedOption: null as number | null, isAnswered: false 
  });

  const menuItems = [
    { id: 'phat-nguoi', title: 'TRA CỨU PHẠT NGUỘI', icon: '🚦', bg: 'bg-emerald-500', isFree: true },
    { id: 'mat-cap', title: 'XE MẤT CẮP, CẦM CỐ', icon: '🚨', bg: 'bg-red-600', isFree: false },
    { id: 'dang-kiem', title: 'TRA CỨU ĐĂNG KIỂM', icon: '📋', bg: 'bg-indigo-500', isFree: false },
    { id: 'gplx', title: 'TRA CỨU BẰNG LÁI XE', icon: '💳', bg: 'bg-blue-500', isFree: false },
    { id: 'thi-thu', title: 'THI TRẮC NGHIỆM (30)', icon: '📝', bg: 'bg-slate-200 dark:bg-slate-700', isFree: false },
  ];

  const handleInputChange = (field: string, value: string) => {
    setQueries(prev => ({ ...prev, [field]: value.toUpperCase().replace(/[^A-Z0-9-]/g, '') }));
  };
  const formatVND = (money: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);

  // ================= 0. HÀM LƯU LOG HOẠT ĐỘNG VÀO SUPABASE =================
  const logActivity = async (actionType: string, actionDetails: any) => {
    if (!user?.email) return;
    try {
      await supabase.from('user_activity_logs').insert([{
        email: user.email,
        action_type: actionType,
        action_details: actionDetails
      }]);
    } catch (err) {
      console.error("Lỗi ghi log:", err);
    }
  };

  // ================= 1. HÀM GỌI API & LOGGING =================
  const handleSearchFines = async (e: React.FormEvent) => {
    e.preventDefault();
    if (queries.plate.length < 5) return alert("Biển số không hợp lệ!");
    setIsLoading('phat-nguoi'); setResults({ ...results, fines: null });
    
    // Ghi Log Admin
    await logActivity('TRA_CUU_PHAT_NGUOI', { plate: queries.plate, time: new Date().toISOString() });

    setTimeout(() => {
      setIsLoading(null);
      if (queries.plate === "30G99999" || queries.plate === "29A11111") {
        setResults({ ...results, fines: [{ id: 1, time: "14:30 - 10/05/2026", location: "Đại lộ Thăng Long, Hà Nội", violation: "Vượt đèn đỏ (Quy chuẩn QGVN)", fineAmount: 4000000, status: "Chưa nộp phạt", agency: "Đội CSGT Số 6", warning: "Nguy cơ từ chối đăng kiểm", cameraImg: "CAM-01-VRT" }]});
      } else setResults({ ...results, fines: [] });
    }, 1200);
  };

  const handleSearchRegistry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('dang-kiem'); setResults({ ...results, registry: null });

    // Ghi Log Admin
    await logActivity('TRA_CUU_DANG_KIEM', { plate: queries.plate, cert: queries.cert });

    setTimeout(() => {
      setIsLoading(null);
      setResults({ ...results, registry: { make: "Toyota", model: "Camry 2.5Q", year: 2022, vin: "JTDKB38EXXXXXXX", engine: "2AR-FE12345", color: "Đen", seats: 5, expiryDate: "15/08/2027", center: "29-03V Hà Nội", status: "Hợp lệ" }});
    }, 1500);
  };

  const handleSearchStolen = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('mat-cap'); setResults({ ...results, stolen: null });

    // Ghi Log Admin
    await logActivity('TRA_CUU_MAT_CAP', { vinOrPlate: queries.vin });

    setTimeout(() => {
        setIsLoading(null);
        if (queries.vin === "30G99999" || queries.vin === "29A11111") {
          setResults({ ...results, stolen: { status: "STOLEN", message: "CẢNH BÁO: Phương tiện nằm trong danh sách báo mất cắp ngày 15/08/2026 tại Công an TP. Hà Nội.", checkTime: new Date().toLocaleString() }});
        } else {
          setResults({ ...results, stolen: { status: "SAFE", message: "Không tìm thấy hồ sơ báo mất cắp, tranh chấp hay nợ xấu thế chấp ngân hàng đối với phương tiện này.", checkTime: new Date().toLocaleString() }});
        }
      }, 1000);
  };

  const handleSearchLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('gplx'); setResults({ ...results, license: null });

    // Ghi Log Admin
    await logActivity('TRA_CUU_GPLX', { gplx: queries.gplx });

    setTimeout(() => {
      setIsLoading(null);
      setResults({ ...results, license: { name: "NGUYỄN VĂN A", dob: "01/01/1990", class: "B2", issueDate: "10/10/2020", expiryDate: "10/10/2030", violations: 0, status: "Hợp lệ" }});
    }, 1200);
  };

  // ================= 2. XỬ LÝ TRẮC NGHIỆM =================
  const handleAnswerSelect = (idx: number) => {
    if (quizState.isAnswered) return;
    const isCorrect = idx === QUIZ_QUESTIONS[quizState.currentQ].correct;
    const isFatalFailed = !isCorrect && QUIZ_QUESTIONS[quizState.currentQ].isFatal;
    
    setQuizState({
      ...quizState, 
      selectedOption: idx, 
      isAnswered: true, 
      score: isCorrect ? quizState.score + 1 : quizState.score,
      hasFailedFatal: quizState.hasFailedFatal || isFatalFailed
    });
  };

  const handleNextQuestion = () => {
    if (quizState.currentQ < QUIZ_QUESTIONS.length - 1) {
      setQuizState({ ...quizState, currentQ: quizState.currentQ + 1, selectedOption: null, isAnswered: false });
    } else {
      setQuizState({ ...quizState, finished: true });
      logActivity('FINISH_QUIZ', { score: quizState.score, passed: !quizState.hasFailedFatal && quizState.score >= 26 });
    }
  };

  // ================= LAYOUT 1: CỘT TRÁI =================
  const renderLeftMenu = () => (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-transparent">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? (
            <h3 className="text-neutral-900 dark:text-white font-bold text-[11px] uppercase tracking-wider mb-8 px-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> DỊCH VỤ PHÁP LÝ
            </h3>
          ) : (
            <div className="w-8 h-8 mb-8 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.id}
                link={{
                  label: item.title,
                  href: "#",
                  onClick: (e) => {
                    e.preventDefault();
                    setActiveMenu(item.id);
                    setResults({ fines: null, registry: null, stolen: null, license: null });
                  },
                  icon: (
                    <div className={`w-6 h-6 flex items-center justify-center transition-colors ${activeMenu === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-700 dark:text-neutral-200'}`}>
                      {item.icon}
                    </div>
                  )
                }}
                className={activeMenu === item.id ? "bg-neutral-200 dark:bg-neutral-700/50 rounded-lg" : "hover:bg-neutral-200/50 dark:hover:bg-neutral-700/30 rounded-lg transition-all"}
              />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );

  // ================= LAYOUT 2: CỘT GIỮA (CÓ KEY ĐỂ KÍCH HOẠT ANIMATION MƯỢT MÀ) =================
  const renderCenterMain = () => {
    const isLocked = activeMenu === 'thi-thu' && user?.tier !== 'vip';
    const hasResult = (activeMenu === 'phat-nguoi' && results.fines !== null) || (activeMenu === 'dang-kiem' && results.registry !== null) || (activeMenu === 'mat-cap' && results.stolen !== null) || (activeMenu === 'gplx' && results.license !== null);
    
    const animationClass = "";
    
    // THI THỬ (Gamified - VIP)
    if (activeMenu === 'thi-thu') {
      if (isLocked) return (
        <div key={activeMenu} className={`lg:col-span-6 bg-black/40 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col items-center justify-center min-h-[500px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden ${animationClass}`}>

        <div className="text-center mb-10 relative">
          
          <div className="flex justify-center items-center gap-2 mb-4 relative z-10">
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">🔒 YÊU CẦU NÂNG CẤP VIP</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white tracking-tight mb-4 drop-shadow-sm py-1 relative z-10">
            Khóa Chức Năng
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base relative z-10">
              Xin chào <span className="font-bold bg-slate-100/50 dark:bg-slate-800/50 text-slate-800 dark:text-gray-200 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 ml-1">{user?.user_metadata?.display_name || user?.email || 'Khách'}</span>
          </p>
        </div>

          
          <span className="text-6xl mb-4 relative z-10 drop-shadow-lg">👑</span>
          <h3 className="text-3xl font-bold text-yellow-500 mb-2 relative z-10">Tính Năng VIP</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-8 text-center max-w-sm relative z-10">Bộ đề thi trắc nghiệm B2 mô phỏng thực tế với hệ thống AI tự động chấm điểm và cảnh báo câu điểm liệt.</p>
          <button className="relative z-10 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2 rounded-xl font-bold tracking-wider shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md active:scale-95">Nâng cấp ngay</button>
        </div>
      );
      
      return (
        <div key={activeMenu} className={`flex-[2] w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-xl shadow-lg border border-black/10 dark:border-white/10 min-h-[500px] flex flex-col relative ${animationClass}`}>
          {!quizState.started ? (
            <div className="text-center my-auto space-y-6">
              <div className="w-24 h-24 mx-auto bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center text-5xl shadow-inner border-4 border-slate-700/60">🚦</div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Thi Thử GPLX B2</h2>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">Bộ đề 30 câu hỏi ngẫu nhiên chuẩn Bộ GTVT. Có chấm điểm trực tiếp từng câu.</p>
                <div className="mt-4 inline-block bg-red-900/50 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg text-xs font-bold border border-red-800">
                  ⚠️ Sai 1 câu điểm liệt = TRƯỢT NGAY!
                </div>
              </div>
              <button onClick={() => setQuizState({ ...quizState, started: true })} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-2.5 rounded-2xl text-base transition-all duration-300 ease-out mt-4 hover:-translate-y-1 hover:shadow-md active:scale-95">BẮT ĐẦU THI</button>
            </div>
          ) : quizState.finished ? (
            <div className="text-center my-auto space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="text-7xl drop-shadow-md">{quizState.hasFailedFatal ? '💀' : (quizState.score >= 26 ? '🏆' : '💔')}</div>
              <h2 className={`text-4xl font-bold ${quizState.hasFailedFatal ? 'text-red-500' : (quizState.score >= 26 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-500')}`}>
                {quizState.hasFailedFatal ? 'BẠN ĐÃ TRƯỢT (ĐIỂM LIỆT)' : (quizState.score >= 26 ? 'CHÚC MỪNG BẠN ĐÃ ĐỖ!' : 'BẠN ĐÃ TRƯỢT')}
              </h2>
              <div className="bg-white dark:bg-[#1e293b] inline-block px-10 py-6 rounded-3xl shadow-sm border border-slate-700">
                <p className="text-6xl font-bold text-white">{quizState.score} <span className="text-2xl text-slate-500">/ 30</span></p>
                <p className="text-xs text-slate-400 mt-2 font-medium">Điều kiện: Đạt 26/30 và không sai điểm liệt.</p>
              </div>
              <br/>
              <button onClick={() => setQuizState({ started: false, currentQ: 0, score: 0, finished: false, hasFailedFatal: false, selectedOption: null, isAnswered: false })} className="bg-slate-200 dark:bg-slate-700 text-white font-bold px-6 py-2 rounded-xl text-sm transition-all duration-300 ease-out hover:bg-slate-600 hover:shadow-lg active:scale-95 inline-flex items-center gap-2">🔄 Thi Lại</button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6 bg-white dark:bg-[#1e293b] p-3 rounded-2xl shadow-sm border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-sm">{quizState.currentQ + 1}</div>
                  <span className="font-bold text-slate-400 text-xs">/ 30 CÂU</span>
                </div>
                {QUIZ_QUESTIONS[quizState.currentQ].isFatal && <span className="text-[10px] font-bold text-white bg-red-600 px-3 py-1.5 rounded-lg animate-pulse shadow-sm flex items-center gap-1">⚠️ CÂU ĐIỂM LIỆT</span>}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-8 leading-relaxed px-2">{QUIZ_QUESTIONS[quizState.currentQ].text}</h3>
              <div className="space-y-3 mb-auto">
                {QUIZ_QUESTIONS[quizState.currentQ].options.map((opt, idx) => {
                  let btnStyle = 'border-slate-700 bg-white dark:bg-[#1e293b] hover:border-blue-500 hover:bg-blue-900/30 text-slate-700 dark:text-slate-300';
                  let icon = <span className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-sm font-bold shrink-0">{idx + 1}</span>;
                  
                  if (quizState.isAnswered) {
                    const isCorrect = idx === QUIZ_QUESTIONS[quizState.currentQ].correct;
                    const isSelected = idx === quizState.selectedOption;
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20 shadow-md';
                      icon = <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">✓</span>;
                    } else if (isSelected) {
                      btnStyle = 'border-red-500 bg-red-900/30 text-red-700 dark:text-red-400 shadow-md';
                      icon = <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">✗</span>;
                    }
                  } else if (idx === quizState.selectedOption) {
                    btnStyle = 'border-blue-500 bg-blue-100/40 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-md';
                    icon = <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">{idx + 1}</span>;
                  }

                  return (
                    <button key={idx} onClick={() => handleAnswerSelect(idx)} disabled={quizState.isAnswered} className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ease-out font-medium text-sm flex items-center gap-4 ${quizState.isAnswered ? '' : 'active:scale-[0.98]'} ${btnStyle}`}>
                      {icon} <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizState.isAnswered && (
                <div className="mt-8 pt-4 flex justify-end">
                  <button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-2.5 rounded-2xl text-sm transition-all duration-300 ease-out shadow-lg hover:shadow-sm active:scale-95 flex items-center gap-2">
                    {quizState.currentQ === 29 ? 'Hoàn Tất Bài Thi' : 'Câu Tiếp Theo ➔'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // PHẠT NGUỘI
    if (activeMenu === 'phat-nguoi') {
      return (
        <div key={activeMenu} className={`flex-[2] w-full max-w-4xl mx-auto flex flex-col gap-8 lg:pl-10 ${animationClass}`}>
          <div className="text-center mb-10 relative">
            
            <div className="flex justify-center items-center gap-2 mb-4 relative z-10">
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">🚔 HỆ THỐNG CSDL CSGT TOÀN QUỐC</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white tracking-tight mb-4 drop-shadow-sm py-1 relative z-10">
              Tra Cứu Phạt Nguội
            </h1>
            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base relative z-10">
              Xin chào <span className="font-bold bg-slate-100/50 dark:bg-slate-800/50 text-slate-800 dark:text-gray-200 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 ml-1">{user?.user_metadata?.display_name || user?.email || 'Khách'}</span>
            </p>
          </div>
          <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white relative overflow-hidden">
            <form onSubmit={handleSearchFines} className="relative z-10 flex flex-col gap-4 max-w-md mx-auto">
              <div className="relative">
                <div className="w-full relative border-[2px] border-white dark:border-slate-300 outline outline-[6px] outline-[#383838] bg-[#383838]"><input type="text" value={queries.plate} onChange={(e) => handleInputChange('plate', e.target.value)} placeholder="Nhập biển số (Thử: 30G99999)" className="w-full h-[56px] bg-[#383838] text-[#383838] border-0 border-t-[46px] border-solid border-t-[#383838] text-center text-lg font-bold font-mono transition-all duration-[800ms] hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase block" required/></div>
              </div>
              <button type="submit" disabled={isLoading === 'phat-nguoi'} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm uppercase transition-all duration-300 ease-out shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70">
                {isLoading ? 'Đang kết nối...' : 'Tra Cứu'}
              </button>
            </form>
          </div>

          {!hasResult ? (
            <div className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-bold">?</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Tra Cứu Phạt Nguội Là Gì?</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Hình thức xử phạt vi phạm giao thông qua hệ thống camera giám sát. Hình ảnh được gửi về Trung tâm đối chiếu và gửi giấy báo về nhà chủ phương tiện. Tránh bị từ chối đăng kiểm hoặc vướng mắc khi sang tên đổi chủ.</p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto animate-[fadeInUp_0.4s_ease-out]">
              {results.fines.length === 0 ? (
                <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-3xl p-10 text-center shadow-xl backdrop-blur-md">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 border border-emerald-500/30 shadow-md">✓</div>
                  <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-1">KHÔNG CÓ LỖI</h3>
                  <p className="text-emerald-200/70 text-sm font-medium">Chúc mừng! Phương tiện của bạn không có vi phạm phạt nguội nào.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-red-500/30">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                      <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Trạng thái</h3><p className="text-xl font-bold text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">PHÁT HIỆN VI PHẠM</p></div>
                      <div className="w-full md:w-px h-px md:h-12 bg-slate-200 dark:bg-slate-700"></div>
                      <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng tiền phạt (Dự kiến)</h3><p className="text-2xl font-bold text-white">4.000.000 VNĐ</p></div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-black/10 dark:border-white/10 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
                    <div className="flex-1 space-y-4 pl-2">
                      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                        <span className="font-bold text-white text-base">Đội CSGT Số 6</span>
                        <span className="bg-red-500/20 text-red-700 dark:text-red-400 font-bold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider border border-red-500/30">Chưa nộp phạt</span>
                      </div>
                      <div className="space-y-1"><p className="text-slate-400 uppercase text-[10px] font-bold">Lỗi vi phạm</p><p className="font-bold text-slate-200">{results.fines[0].violation}</p></div>
                      <div className="space-y-1"><p className="text-slate-400 uppercase text-[10px] font-bold">Thời gian & Địa điểm</p><p className="font-medium text-slate-700 dark:text-slate-300">{results.fines[0].time} tại {results.fines[0].location}</p></div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button onClick={() => setQrModal(results.fines[0])} className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] active:scale-95 flex items-center gap-2">QR Thanh Toán</button>
                      </div>
                    </div>
                    <div className="w-full md:w-56 flex flex-col gap-3 shrink-0">
                      <div className="h-28 bg-white dark:bg-[#1e293b] rounded-2xl relative overflow-hidden border border-slate-700 shadow-inner">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-500/80 bg-black/60 px-4 py-1.5 rounded flex items-center justify-center backdrop-blur-sm"><span className="text-white font-mono font-bold text-xs tracking-wide">{queries.plate}</span></div>
                        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-red-700 dark:text-red-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span> REC: {results.fines[0].cameraImg}</div>
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

    // ĐĂNG KIỂM
    if (activeMenu === 'dang-kiem') {
      return (
        <div key={activeMenu} className={`flex-[2] w-full max-w-4xl mx-auto flex flex-col gap-8 lg:pl-10 ${animationClass}`}>
            <div className="text-center mb-10 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-[7rem] font-bold text-white/[0.03] whitespace-nowrap pointer-events-none select-none tracking-normal">
                HỒ SƠ ĐĂNG KIỂM
              </div>
              <div className="flex justify-center items-center gap-2 mb-4 relative z-10">
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">✅ CỤC ĐĂNG KIỂM VIỆT NAM (VR)</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-600 dark:to-cyan-400 tracking-tight mb-4 drop-shadow-sm py-1 relative z-10">
                Hồ Sơ Đăng Kiểm
              </h1>
              <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-lg relative z-10">
              Xin chào <span className="font-bold bg-slate-100/50 dark:bg-slate-800/50 text-slate-800 dark:text-gray-200 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 ml-1">{user?.user_metadata?.display_name || user?.email || 'Khách'}</span>
              </p>
            </div>
          <div className="bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-xl shadow-lg border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <form onSubmit={handleSearchRegistry} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto relative z-10">
              <div className="w-full relative border-[2px] border-white dark:border-slate-300 outline outline-[6px] outline-[#383838] bg-[#383838]"><input type="text" value={queries.plate} onChange={(e) => handleInputChange('plate', e.target.value)} placeholder="Biển số xe" className="w-full h-[56px] bg-[#383838] text-[#383838] border-0 border-t-[46px] border-solid border-t-[#383838] text-center text-lg font-bold font-mono transition-all duration-[800ms] hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase block" required/></div>
              <div className="w-full relative border-[2px] border-white dark:border-slate-300 outline outline-[6px] outline-[#383838] bg-[#383838]"><input type="text" value={queries.cert} onChange={(e) => handleInputChange('cert', e.target.value)} placeholder="Số Tem/GCN" className="w-full h-[56px] bg-[#383838] text-[#383838] border-0 border-t-[46px] border-solid border-t-[#383838] text-center text-lg font-bold font-mono transition-all duration-[800ms] hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase block" required/></div>
              <button type="submit" className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-5 rounded-xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-md active:scale-95">Kiểm Tra Hồ Sơ</button>
            </form>
          </div>
          
          {!hasResult ? (
            <div className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-bold">?</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Tra Cứu Đăng Kiểm Là Gì?</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Kiểm tra tính hợp lệ và thời hạn kiểm định kỹ thuật của phương tiện cơ giới đường bộ. Tránh bị phạt khi tham gia giao thông với tem đã hết hạn hoặc bị từ chối cấp do chưa nộp phạt nguội.</p>
              </div>
            </div>
          ) : hasResult && results.registry ? (
            <div className="bg-emerald-900/20 backdrop-blur-xl p-8 rounded-xl shadow-xl border border-emerald-500/20 animate-[fadeInUp_0.4s_ease-out] relative">
              <div className="absolute top-4 right-6 text-emerald-600 dark:text-emerald-500/10 text-8xl font-bold">VR</div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10 border-b border-emerald-500/20 pb-4">
                <div>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">Phương tiện</p>
                  <h3 className="text-2xl font-bold text-white">{results.registry.make} {results.registry.model}</h3>
                </div>
                <span className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-700 dark:text-emerald-400 font-bold px-4 py-1.5 rounded-lg text-[11px] uppercase tracking-widerr shadow-sm mt-3 md:mt-0">{results.registry.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-white/5"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Đời xe</p><p className="font-bold text-white">{results.registry.year}</p></div>
                <div className="bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-white/5"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Hết hạn ĐK</p><p className="font-bold text-red-700 dark:text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">{results.registry.expiryDate}</p></div>
                <div className="col-span-2 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-white/5 flex justify-between items-center"><div className="w-1/2"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Số Khung (VIN)</p><p className="font-bold text-slate-200 font-mono text-sm">{results.registry.vin}</p></div><div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div><div className="w-1/2 text-right"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Số Máy</p><p className="font-bold text-slate-200 font-mono text-sm">{results.registry.engine}</p></div></div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    // MẤT CẮP
    if (activeMenu === 'mat-cap') {
      return (
        <div key={activeMenu} className={`flex-[2] w-full max-w-4xl mx-auto flex flex-col gap-8 lg:pl-10 ${animationClass}`}>
            <div className="text-center mb-10 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-[7rem] font-bold text-white/[0.03] whitespace-nowrap pointer-events-none select-none tracking-normal">
                TRA CỨU XE MẤT CẮP
              </div>
              <div className="flex justify-center items-center gap-2 mb-4 relative z-10">
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-red-700 dark:text-red-300">🚨 DỮ LIỆU AN NINH QUỐC GIA</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-orange-400 tracking-tight mb-4 drop-shadow-sm py-1 relative z-10">
                Tra Cứu Xe Mất Cắp
              </h1>
              <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-lg relative z-10">
              Xin chào <span className="font-bold bg-slate-100/50 dark:bg-slate-800/50 text-slate-800 dark:text-gray-200 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 ml-1">{user?.user_metadata?.display_name || user?.email || 'Khách'}</span>
              </p>
            </div>
           <div className="bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-xl shadow-lg text-white relative overflow-hidden border border-red-500/30">
            <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(220,38,38,0.05)_20px,rgba(220,38,38,0.05)_40px)]"></div>
            <form onSubmit={handleSearchStolen} className="relative z-10 flex flex-col gap-4 max-w-md mx-auto">
              <div className="w-full relative border-[2px] border-white dark:border-slate-300 outline outline-[6px] outline-[#383838] bg-[#383838]"><input type="text" value={queries.vin} onChange={(e) => handleInputChange('vin', e.target.value)} placeholder="Nhập Số Khung hoặc Biển Số" className="w-full h-[56px] bg-[#383838] text-[#383838] border-0 border-t-[46px] border-solid border-t-[#383838] text-center text-lg font-bold font-mono transition-all duration-[800ms] hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase block" required/></div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-sm hover:shadow-md active:scale-95">Quét Tình Trạng Pháp Lý</button>
            </form>
          </div>

          {!hasResult ? (
            <div className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-red-900/50 text-red-700 dark:text-red-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-bold">?</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Tra Cứu Phản Ánh Mất Cắp Là Gì?</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Kiểm tra phương tiện có nằm trong danh sách tang vật vụ án, xe bị lấy cắp hoặc đang bị cầm cố/thế chấp ngân hàng không. Tránh rủi ro pháp lý khi mua bán xe cũ.</p>
              </div>
            </div>
          ) : hasResult && results.stolen ? (
            <div className={`backdrop-blur-xl p-8 rounded-xl shadow-xl border text-center animate-[fadeInUp_0.4s_ease-out] relative overflow-hidden ${results.stolen.status === 'STOLEN' ? 'bg-red-900/20 border-red-500/50' : 'bg-emerald-900/20 border-emerald-500/30'}`}>
              
              
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-5xl mb-6 border shadow-md relative z-10 ${results.stolen.status === 'STOLEN' ? 'bg-red-500/20 text-red-500 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.5)]' : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'}`}>
                {results.stolen.status === 'STOLEN' ? '⚠️' : '🛡️'}
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 relative z-10 ${results.stolen.status === 'STOLEN' ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-white'}`}>
                {results.stolen.status === 'STOLEN' ? 'PHÁT HIỆN TÀI SẢN TRANH CHẤP' : 'PHƯƠNG TIỆN AN TOÀN'}
              </h3>
              
              <p className={`text-sm font-medium relative z-10 max-w-md mx-auto ${results.stolen.status === 'STOLEN' ? 'text-red-200' : 'text-emerald-700 dark:text-emerald-300'}`}>
                {results.stolen.message}
              </p>
              
              {results.stolen.status === 'STOLEN' && (
                <div className="mt-6 inline-block bg-red-950/80 border border-red-500/50 px-6 py-3 rounded-xl relative z-10">
                   <p className="text-xs text-red-700 dark:text-red-400 font-bold uppercase tracking-wider mb-1">Hành động khuyến nghị</p>
                   <p className="text-sm text-white">Báo ngay cho cơ quan Công an gần nhất.</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      );
    }

    // GPLX
    if (activeMenu === 'gplx') {
      return (
        <div key={activeMenu} className={`flex-[2] w-full max-w-4xl mx-auto flex flex-col gap-8 lg:pl-10 ${animationClass}`}>
          <div className="bg-white dark:bg-slate-900 backdrop-blur-xl p-8 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
            <div className="text-center mb-8 mt-2">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Xác Minh GPLX</h2>
              <p className="text-slate-400 text-[11px] uppercase tracking-wider font-bold">Tổng Cục Đường Bộ Việt Nam</p>
            </div>
            <form onSubmit={handleSearchLicense} className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="w-full relative border-[2px] border-white dark:border-slate-300 outline outline-[6px] outline-[#383838] bg-[#383838]"><input type="text" value={queries.gplx} onChange={(e) => handleInputChange('gplx', e.target.value)} placeholder="Nhập 12 số GPLX (VD: 010123456789)" maxLength={12} className="w-full h-[56px] bg-[#383838] text-[#383838] border-0 border-t-[46px] border-solid border-t-[#383838] text-center text-lg font-bold font-mono transition-all duration-[800ms] hover:border-t-[4px] hover:bg-[#f1e8e8] focus:border-t-[4px] focus:bg-[#f1e8e8] placeholder-[#383838] focus:outline-none uppercase block" required/></div>
              <button type="submit" className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-600 text-white py-5 rounded-2xl font-bold text-base tracking-wider uppercase transition-all duration-300 ease-out shadow-lg hover:shadow-sm active:scale-95">Truy Xuất Hồ Sơ</button>
            </form>
          </div>

          {!hasResult ? (
            <div className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-100/50 dark:bg-slate-800/50 text-slate-400 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-bold">?</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Tra Cứu Giấy Phép Lái Xe Là Gì?</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Xác minh thông tin, hạng bằng và thời hạn của Giấy Phép Lái Xe trên hệ thống thật. Phát hiện bằng giả, hoặc kiểm tra lịch sử tước bằng, vi phạm giao thông.</p>
              </div>
            </div>
          ) : hasResult && results.license ? (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg border border-slate-600 animate-[fadeInUp_0.4s_ease-out] relative">
               <div className="absolute top-0 right-0 p-6 opacity-10"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Emblem_of_Vietnam.svg/200px-Emblem_of_Vietnam.svg.png" alt="Quoc Huy" className="w-32 h-32 brightness-0 invert"/></div>
               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                  <div className="w-24 h-32 bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden border-2 border-slate-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] shrink-0"><img src="https://ui-avatars.com/api/?name=Nguyen+Van+A&background=334155&color=f8fafc" alt="Avatar" className="w-full h-full object-cover"/></div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Chủ Giấy Phép</p>
                    <h3 className="text-2xl font-bold text-white mb-2 font-medium">{results.license.name}</h3>
                    <div className="inline-block bg-blue-100/50 dark:bg-blue-900/50 border border-blue-500/30 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-lg text-sm font-bold mb-4 shadow-sm">Hạng {results.license.class}</div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-700 shadow-sm text-left"><p className="text-[9px] text-slate-400 uppercase font-bold">Ngày hết hạn</p><p className="text-red-700 dark:text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)] font-bold text-sm">{results.license.expiryDate}</p></div>
                      <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-700 shadow-sm text-left"><p className="text-[9px] text-slate-400 uppercase font-bold">Vi phạm tước bằng</p><p className="text-emerald-700 dark:text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)] font-bold text-sm">{results.license.violations} lần</p></div>
                    </div>
                  </div>
               </div>
            </div>
          ) : null}
        </div>
      );
    }
    
    return null; // Fallback
  };

  // ================= LAYOUT 3: CỘT PHẢI (WIDGET ĐỔI LẠI LÀ CÓ THỂ TƯƠNG TÁC) =================
  const renderRightWidgets = () => {
    const animationClass = "animate-[fadeInRight_0.6s_ease-out]";
    
    let statTitle = "Hệ thống Dữ Liệu"; let statNum = "8,492,105"; let statDesc = "Biên bản đã đồng bộ"; let statColor = "text-blue-700 dark:text-blue-400"; let statBg="bg-blue-50/80 dark:bg-blue-900/20"; let statBorder="border-blue-200 dark:border-blue-500/20"; let dotColor="bg-blue-500";
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
    }

    return (
      <div key={`widget-${activeMenu}`} className={`w-full max-w-sm lg:col-span-3 flex flex-col gap-5 ${animationClass}`}>
        <div className={`flex-none flex flex-col justify-center p-5 rounded-3xl shadow-sm border ${statBorder} ${statBg} backdrop-blur-2xl transition-all duration-300 hover:shadow-md cursor-default group`}>
          <h3 className="font-bold text-slate-500 dark:text-slate-400 text-[10px] mb-2 uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1"><span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse shadow-[0_0_8px_currentColor]`}></span> {statTitle}</h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-wider">{statDesc}</p>
          <p className={`text-3xl font-black ${statColor} transition-all duration-500 drop-shadow-sm group-hover:scale-105 origin-left`}>{statNum}</p>
        </div>

        <div className="flex-none flex flex-col justify-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md cursor-default group">
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

        <div className={`flex-none flex flex-col justify-center ${warnBg} backdrop-blur-xl p-5 rounded-2xl shadow-sm border ${warnBorder} transition-all duration-300 hover:shadow-md cursor-default group`}>
          <div className="flex items-center gap-2 mb-2">
             <span className="text-xl drop-shadow-sm">{warnIcon}</span>
             <h3 className={`font-bold text-sm ${warnText} transition-all duration-300 group-hover:translate-x-1`}>{warnTitle}</h3>
          </div>
          <p className={`text-xs leading-relaxed font-medium ${warnText} opacity-90 transition-colors duration-500`}>{warnDesc}</p>
        </div>

        {user?.tier === 'vip' ? (
          <div className="flex-[1.2] bg-gradient-to-br from-blue-900 to-[#0f172a] p-6 rounded-xl shadow-lg border border-blue-500/30 relative overflow-hidden flex flex-col justify-center text-center transition-all duration-300 hover:scale-[1.03] hover:-translate-x-1 hover:shadow-md cursor-pointer group">
            <h3 className="font-bold text-blue-700 dark:text-blue-300 text-base mb-2 relative z-10 drop-shadow-md">💼 Công Cụ Đại Lý</h3>
            <p className="text-xs text-blue-800 dark:text-blue-200/70 mb-5 relative z-10 font-medium">Đặc quyền VIP: Tra cứu tự động 100+ biển số.</p>
            <button onClick={() => { alert('Hệ thống đang mở cổng kết nối API tải file Excel!'); }} className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] py-3 rounded-xl text-xs font-bold transition-all duration-300 ease-out active:scale-95 flex items-center justify-center gap-2 border border-blue-400">
              📥 Tải lên File Excel (.xlsx)
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1e293b]/80 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-slate-700 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-out active:scale-95 text-center">
            <div className="absolute -right-2 -top-2 text-6xl opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 text-white">💼</div>
            <h3 className="font-bold text-white text-base mb-2 relative z-10 transition-colors duration-300 group-hover:text-yellow-700 dark:text-yellow-400">Giải Pháp Đại Lý</h3>
            <p className="text-xs text-slate-400 mb-0 relative z-10 font-medium">Nâng cấp VIP tra cứu tự động hàng loạt bằng Excel.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-screen font-sans flex flex-col -mt-24">
      {/* FULL SCREEN LAYOUT */}
      <div className="flex flex-col md:flex-row bg-transparent w-full flex-1 overflow-hidden pt-28">
        {renderLeftMenu()}
        <div className="flex flex-1">
          <div className="p-4 md:p-10 flex flex-col lg:flex-row gap-8 flex-1 w-full h-full overflow-y-auto bg-transparent border-none">
            {renderCenterMain()}
            {renderRightWidgets()}
          </div>
        </div>
      </div>

      {qrModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 text-center relative animate-[fadeInUp_0.3s_ease-out]">
            <button onClick={() => setQrModal(null)} className="absolute top-4 right-4 bg-gray-100 rounded-full w-8 h-8 font-bold text-gray-500 transition-all duration-300 ease-out hover:bg-gray-200 hover:text-gray-900 hover:rotate-90 active:scale-95">✕</button>
            <h3 className="text-lg font-bold text-blue-900 mb-1">Thanh Toán VietQR</h3>
            <p className="text-xs text-gray-500 mb-4">Mở app Ngân hàng để quét mã</p>
            <img src={`https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${qrModal.fineAmount}&addInfo=NopPhatNguoi`} alt="QR Code" className="w-48 h-48 mx-auto mb-4 border-2 border-dashed border-blue-200 p-2 rounded-xl transition-transform duration-500 hover:scale-105" />
            <button onClick={() => setQrModal(null)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm transition-all duration-300 ease-out shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95 active:translate-y-0">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}