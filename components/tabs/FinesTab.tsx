"use client";
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Đảm bảo đường dẫn import Supabase đúng

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
    { id: 'thi-thu', title: 'THI TRẮC NGHIỆM (30)', icon: '📝', bg: 'bg-slate-700', isFree: false },
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
      if (queries.plate.includes("30G") || queries.plate === "29A11111") {
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
      setResults({ ...results, stolen: { status: "SAFE", message: "Không tìm thấy hồ sơ báo mất cắp, tranh chấp hay nợ xấu thế chấp ngân hàng đối với phương tiện này.", checkTime: new Date().toLocaleString() }});
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
    <div className="lg:col-span-3">
      <div className="bg-[#111827] p-4 rounded-3xl shadow-xl sticky top-6 border border-gray-800">
        <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> DỊCH VỤ PHÁP LÝ
        </h3>
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveMenu(item.id); setResults({ fines: null, registry: null, stolen: null, license: null }); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl font-bold text-left transition-all duration-200 relative overflow-hidden group ${activeMenu === item.id ? `${item.bg} text-white shadow-lg` : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white hover:translate-x-1'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-transform duration-300 ease-out ${activeMenu === item.id ? 'bg-black/20' : 'bg-gray-800 text-gray-300 group-hover:rotate-12'}`}>{item.icon}</div>
              <div className="flex-1">
                 <span className="block text-[11px] tracking-wider uppercase">{item.title}</span>
                 {!item.isFree && <span className={`text-[8px] font-black uppercase mt-0.5 tracking-widest transition-colors duration-300 ${activeMenu === item.id ? 'text-yellow-300' : 'text-amber-500 group-hover:text-yellow-400'}`}>★ Dành cho VIP</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ================= LAYOUT 2: CỘT GIỮA (CÓ KEY ĐỂ KÍCH HOẠT ANIMATION MƯỢT MÀ) =================
  const renderCenterMain = () => {
    const isLocked = !menuItems.find(m => m.id === activeMenu)?.isFree && user?.tier !== 'vip';
    const hasResult = (activeMenu === 'phat-nguoi' && results.fines !== null) || (activeMenu === 'dang-kiem' && results.registry !== null) || (activeMenu === 'mat-cap' && results.stolen !== null) || (activeMenu === 'gplx' && results.license !== null);
    
    let contentData = { title: "", def: "", uses: [] };
    if (activeMenu === 'phat-nguoi') contentData = { title: "Tra Cứu Phạt Nguội", def: "Phạt nguội là hình thức xử phạt vi phạm giao thông thông qua hệ thống camera giám sát thay vì bị CSGT dừng xe trực tiếp. Hình ảnh được gửi về Trung tâm để đối chiếu và gửi giấy báo về nhà chủ phương tiện.", uses: ["Bảo vệ người mua xe cũ không phải gánh nợ thay.", "Tránh bị Cục Đăng Kiểm từ chối cấp tem đăng kiểm mới.", "Sang tên đổi chủ dễ dàng không bị vướng mắc pháp lý."] };
    else if (activeMenu === 'dang-kiem') contentData = { title: "Tra Cứu Đăng Kiểm", def: "Đăng kiểm là quá trình kiểm tra định kỳ chất lượng an toàn kỹ thuật và bảo vệ môi trường của xe cơ giới theo quy định của Cục Đăng Kiểm Việt Nam.", uses: ["Kiểm tra xem xe có bị độ chế, thay đổi kết cấu hay không.", "Xác minh thông số kỹ thuật gốc (Số máy, số khung, kích thước).", "Tránh bị CSGT phạt tiền từ 2-3 triệu do quá hạn kiểm định."] };
    else if (activeMenu === 'mat-cap') contentData = { title: "Tra Cứu Pháp Lý / Mất Cắp", def: "Hệ thống tra cứu dữ liệu phương tiện đang bị thông báo mất cắp, biển số giả, hoặc đang bị cầm cố/thế chấp tại Ngân hàng trên toàn quốc.", uses: ["Tuyệt đối an toàn khi giao dịch mua bán xe cũ.", "Không bị vướng vào vòng lao lý khi mua nhầm xe gian.", "Đảm bảo xe có thể rút hồ sơ gốc để sang tên."] };
    else if (activeMenu === 'gplx') contentData = { title: "Xác Minh GPLX", def: "Xác thực thông tin Giấy phép lái xe trực tiếp từ CSDL của Tổng Cục Đường Bộ Việt Nam để phát hiện bằng giả hoặc bằng đang bị tước.", uses: ["Chủ doanh nghiệp vận tải an tâm khi giao xe cho tài xế.", "Xác minh bằng lái thật / giả nhanh chóng.", "Biết trước lịch sử vi phạm để có hướng xử lý."] };

    if (activeMenu === 'thi-thu') {
      if (isLocked) return (
        <div key={activeMenu} className="lg:col-span-6 bg-slate-900 rounded-3xl p-10 flex flex-col items-center justify-center min-h-[500px] border border-slate-800 shadow-xl animate-[fadeIn_0.4s_ease-out]">
          <span className="text-6xl mb-4">🔒</span>
          <h3 className="text-2xl font-black text-white mb-2">Tính năng VIP</h3>
          <p className="text-gray-400 text-sm mb-6">Bạn cần nâng cấp VIP để sử dụng chức năng thi thử.</p>
          <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-yellow-950 px-6 py-3 rounded-xl font-bold transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-95 active:translate-y-0">Nâng cấp ngay</button>
        </div>
      );
      
      return (
        <div key={activeMenu} className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col relative animate-[fadeIn_0.4s_ease-out]">
          {!quizState.started ? (
            <div className="text-center my-auto space-y-4">
              <span className="text-6xl block mb-4">📝</span>
              <h2 className="text-2xl font-black text-gray-900">Thi Thử Lý Thuyết GPLX (B2)</h2>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">Bộ đề 30 câu hỏi ngẫu nhiên chuẩn Bộ GTVT. Có chấm điểm trực tiếp từng câu. <br/><strong className="text-red-500">Sai 1 câu điểm liệt = Trượt!</strong></p>
              <button onClick={() => setQuizState({ ...quizState, started: true })} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all duration-300 ease-out mt-4 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 active:translate-y-0">BẮT ĐẦU THI</button>
            </div>
          ) : quizState.finished ? (
            <div className="text-center my-auto space-y-4 animate-[fadeInUp_0.4s_ease-out]">
              <div className="text-6xl">{quizState.hasFailedFatal ? '❌' : (quizState.score >= 26 ? '🏆' : '😥')}</div>
              <h2 className={`text-2xl font-black ${quizState.hasFailedFatal ? 'text-red-600' : (quizState.score >= 26 ? 'text-emerald-600' : 'text-amber-600')}`}>
                {quizState.hasFailedFatal ? 'BẠN ĐÃ TRƯỢT (SAI CÂU ĐIỂM LIỆT)' : (quizState.score >= 26 ? 'CHÚC MỪNG BẠN ĐÃ ĐỖ' : 'BẠN ĐÃ TRƯỢT')}
              </h2>
              <p className="text-4xl font-black text-gray-900 my-4">{quizState.score} <span className="text-lg text-gray-400">/ 30</span></p>
              <p className="text-sm text-gray-500">Điều kiện: Đạt 26/30 và không sai câu điểm liệt.</p>
              <button onClick={() => setQuizState({ started: false, currentQ: 0, score: 0, finished: false, hasFailedFatal: false, selectedOption: null, isAnswered: false })} className="bg-gray-200 text-gray-800 font-bold px-6 py-2 rounded-lg text-sm transition-all duration-300 ease-out hover:bg-gray-300 active:scale-95">Thi Lại</button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-500 text-xs bg-gray-100 px-3 py-1 rounded-md">Câu {quizState.currentQ + 1}/30</span>
                {QUIZ_QUESTIONS[quizState.currentQ].isFatal && <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-1 rounded-sm animate-pulse">⚠️ CÂU ĐIỂM LIỆT</span>}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-6 leading-relaxed">{QUIZ_QUESTIONS[quizState.currentQ].text}</h3>
              <div className="space-y-3 mb-auto">
                {QUIZ_QUESTIONS[quizState.currentQ].options.map((opt, idx) => {
                  let btnStyle = 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50';
                  let icon = <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>;
                  
                  if (quizState.isAnswered) {
                    const isCorrect = idx === QUIZ_QUESTIONS[quizState.currentQ].correct;
                    const isSelected = idx === quizState.selectedOption;
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20';
                      icon = <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>;
                    } else if (isSelected) {
                      btnStyle = 'border-red-500 bg-red-50 text-red-900';
                      icon = <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0">✕</span>;
                    }
                  } else if (idx === quizState.selectedOption) {
                    btnStyle = 'border-blue-500 bg-blue-50 text-blue-900';
                  }

                  return (
                    <button key={idx} onClick={() => handleAnswerSelect(idx)} disabled={quizState.isAnswered} className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ease-out font-medium text-sm flex items-center gap-3 ${quizState.isAnswered ? '' : 'active:scale-[0.98]'} ${btnStyle}`}>
                      {icon} <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizState.isAnswered && (
                <div className="mt-6 border-t border-gray-100 pt-4 flex justify-end">
                  <button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all duration-300 ease-out shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2">
                    {quizState.currentQ === 29 ? 'Kết Thúc Bài Thi' : 'Câu Tiếp Theo ➔'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    if (isLocked) return (
      <div key={activeMenu} className="lg:col-span-6 bg-slate-900 rounded-3xl p-10 flex flex-col items-center justify-center min-h-[400px] border border-slate-800 shadow-xl animate-[fadeIn_0.4s_ease-out]">
        <span className="text-6xl mb-4">🔒</span>
        <h3 className="text-xl font-black text-white mb-2">Tính năng VIP</h3>
        <p className="text-gray-400 text-sm mb-6 text-center">Truy cập CSDL Quốc Gia yêu cầu quyền Dealer.</p>
        <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-yellow-950 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-95 active:translate-y-0">Nâng cấp (0.05 ETH)</button>
      </div>
    );

    return (
      <div key={activeMenu} className="lg:col-span-6 space-y-6 animate-[fadeIn_0.4s_ease-out]">
        {/* KHỐI TÌM KIẾM */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-gray-900">{contentData.title}</h2>
            {activeMenu === 'phat-nguoi' && <p className="text-xs text-gray-500 mt-1">Miễn phí cho mọi người dùng</p>}
          </div>

          {activeMenu === 'phat-nguoi' && (
            <form onSubmit={handleSearchFines} className="flex flex-col gap-3">
              <input type="text" value={queries.plate} onChange={(e) => handleInputChange('plate', e.target.value)} placeholder="Nhập biển số (Thử: 30G99999)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm font-bold focus:border-blue-500 uppercase tracking-widest outline-none transition-colors" required/>
              <button type="submit" disabled={isLoading === 'phat-nguoi'} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 active:translate-y-0">{isLoading ? 'Đang kết nối...' : 'Tra Cứu'}</button>
            </form>
          )}
          {activeMenu === 'dang-kiem' && (
            <form onSubmit={handleSearchRegistry} className="grid grid-cols-2 gap-3">
              <input type="text" value={queries.plate} onChange={(e) => handleInputChange('plate', e.target.value)} placeholder="Biển số xe" className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm font-bold focus:border-indigo-500 uppercase outline-none" required/>
              <input type="text" value={queries.cert} onChange={(e) => handleInputChange('cert', e.target.value)} placeholder="Số Tem/GCN" className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm font-bold focus:border-indigo-500 uppercase outline-none" required/>
              <button type="submit" className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 active:translate-y-0">Kiểm Tra Hồ Sơ</button>
            </form>
          )}
          {activeMenu === 'mat-cap' && (
            <form onSubmit={handleSearchStolen} className="flex flex-col gap-3">
              <input type="text" value={queries.vin} onChange={(e) => handleInputChange('vin', e.target.value)} placeholder="Số Khung / Biển Số" className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm font-bold focus:border-red-500 uppercase outline-none" required/>
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 active:translate-y-0">Quét Pháp Lý</button>
            </form>
          )}
          {activeMenu === 'gplx' && (
            <form onSubmit={handleSearchLicense} className="flex flex-col gap-3">
              <input type="text" value={queries.gplx} onChange={(e) => handleInputChange('gplx', e.target.value)} placeholder="Nhập 12 số GPLX" maxLength={12} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm font-black focus:border-blue-500 tracking-widest outline-none" required/>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 active:translate-y-0">Xác Minh GPLX</button>
            </form>
          )}
        </div>

        {/* THÔNG TIN LẤP TRỐNG KHI CHƯA CÓ KẾT QUẢ */}
        {!hasResult && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md">
            <h3 className="font-black text-gray-900 text-sm mb-2 uppercase">{contentData.title}</h3>
            <p className="text-gray-600 text-xs leading-relaxed mb-4">{contentData.def}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Tác dụng của việc tra cứu:</p>
            <ul className="space-y-2">
              {contentData.uses.map((use, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 transition-colors hover:bg-emerald-100/50 hover:border-emerald-200">
                  <span className="text-emerald-500 font-black">✓</span> {use}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="min-h-[200px]">
          {activeMenu === 'phat-nguoi' && results.fines !== null && (
            <div className="animate-[fadeInUp_0.4s_ease-out]">
              {results.fines.length === 0 ? (
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center"><div className="text-4xl mb-3">✅</div><h3 className="text-xl font-black text-emerald-900">SẠCH PHẠT NGUỘI!</h3></div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#002f6c] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
                    <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div><h3 className="text-sm font-bold text-blue-200 mb-1">🤖 AI Cấn Trừ Định Giá</h3><p className="text-xl font-black text-white">500.000.000 đ</p></div>
                      <div className="text-center"><span className="text-red-400 font-bold text-lg">- 4.000.000 đ</span><p className="text-[10px] text-blue-300">Tổng Phạt Nguội</p></div>
                      <div className="text-right"><h3 className="text-sm font-bold text-emerald-300 mb-1">Thực Thu</h3><p className="text-2xl font-black text-emerald-400">496.000.000 đ</p></div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 transition-all duration-500 hover:shadow-md hover:border-blue-200">
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 text-sm">Đội CSGT Số 6</span>
                        <span className="bg-red-50 text-red-600 font-bold text-[10px] px-2 py-1 rounded uppercase">Chưa nộp phạt</span>
                      </div>
                      <div className="text-xs space-y-1"><p className="text-gray-500 uppercase text-[9px] font-bold">Lỗi vi phạm</p><p className="font-bold text-gray-900">{results.fines[0].violation}</p></div>
                      <div className="text-xs space-y-1"><p className="text-gray-500 uppercase text-[9px] font-bold">Thời gian & Địa điểm</p><p className="font-medium text-gray-700">{results.fines[0].time} tại {results.fines[0].location}</p></div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">⚠️ Từ chối Đăng kiểm</span>
                        <button onClick={() => setQrModal(results.fines[0])} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-md transition-all duration-300 ease-out hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:translate-y-0">QR Thanh toán</button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-48 flex flex-col gap-2 shrink-0">
                      <div className="h-24 bg-slate-900 rounded-xl relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-6 border border-red-500 bg-red-500/20 rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-110"><span className="text-red-100 font-black text-[8px]">{queries.plate}</span></div>
                        <div className="absolute bottom-1 left-2 text-[8px] font-mono text-emerald-400">REC 🔴 {results.fines[0].cameraImg}</div>
                      </div>
                      <div className="h-24 bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                        <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(results.fines[0].location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMenu === 'dang-kiem' && results.registry && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-100 animate-[fadeInUp_0.4s_ease-out]">
              <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-black text-gray-900">{results.registry.make} {results.registry.model}</h3><span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-[10px]">{results.registry.status}</span></div>
              <div className="space-y-2 text-xs bg-gray-50 p-4 rounded-xl font-medium">
                <p className="flex justify-between text-gray-500">Đời xe: <strong className="text-gray-900">{results.registry.year}</strong></p>
                <p className="flex justify-between text-gray-500">Số Khung: <strong className="text-gray-900">{results.registry.vin}</strong></p>
                <p className="flex justify-between text-gray-500">Số Máy: <strong className="text-gray-900">{results.registry.engine}</strong></p>
                <p className="flex justify-between pt-2 border-t border-gray-200 text-gray-500">Hết hạn ĐK: <strong className="text-red-600 text-sm font-black">{results.registry.expiryDate}</strong></p>
              </div>
            </div>
          )}
          {activeMenu === 'mat-cap' && results.stolen && (
            <div className="bg-emerald-50 p-6 rounded-3xl shadow-sm border border-emerald-200 text-center animate-[fadeInUp_0.4s_ease-out]"><div className="text-4xl mb-2">🛡️</div><h3 className="text-lg font-black text-emerald-900 mb-2">PHƯƠNG TIỆN AN TOÀN</h3><p className="text-emerald-700 text-xs">{results.stolen.message}</p></div>
          )}
          {activeMenu === 'gplx' && results.license && (
            <div className="bg-blue-50 p-6 rounded-3xl shadow-sm border border-blue-100 animate-[fadeInUp_0.4s_ease-out]"><div className="flex items-center gap-4 mb-4"><div className="w-16 h-20 bg-gray-300 rounded overflow-hidden"><img src="https://ui-avatars.com/api/?name=Nguyen+Van+A" alt="Avatar"/></div><div><p className="text-[9px] text-blue-500 font-bold uppercase mb-1">Chủ Giấy Phép</p><h3 className="text-base font-black text-gray-900">{results.license.name}</h3><p className="text-sm font-bold text-blue-600">Hạng: {results.license.class}</p></div></div><div className="bg-white p-3 rounded-xl text-xs space-y-1 font-medium"><p className="flex justify-between">Ngày hết hạn: <strong className="text-red-600">{results.license.expiryDate}</strong></p><p className="flex justify-between">Vi phạm tước bằng: <strong className="text-emerald-600">{results.license.violations} lần</strong></p></div></div>
          )}
        </div>
      </div>
    );
  };

  // ================= LAYOUT 3: CỘT PHẢI (WIDGET ĐẠI LÝ LÀ CÓ THỂ TƯƠNG TÁC) =================
  const renderRightWidgets = () => {
    let statTitle = "Hệ thống Dữ Liệu"; let statNum = "8,492,105"; let statDesc = "Biên bản đã đồng bộ"; let statColor = "text-blue-600";
    let listTitle = "Top Lỗi Phổ Biến"; let listItems = [{ n: "Quá tốc độ", v: "45%", c: "bg-red-500" }, { n: "Vượt đèn đỏ", v: "30%", c: "bg-orange-500" }, { n: "Đỗ sai quy định", v: "15%", c: "bg-blue-500" }];
    let warnIcon = "⚠️"; let warnTitle = "Cảnh báo Lừa Đảo"; let warnDesc = "Tuyệt đối không truy cập link lạ gửi qua SMS yêu cầu nộp phạt nguội."; let warnBg = "bg-amber-50"; let warnBorder = "border-amber-100"; let warnText = "text-amber-800";
    
    if (activeMenu === 'dang-kiem') {
      statTitle = "Trung Tâm Đăng Kiểm"; statNum = "125"; statDesc = "Trạm hoạt động trên toàn quốc"; statColor = "text-indigo-600";
      listTitle = "Top Lỗi Trượt ĐK"; listItems = [{ n: "Độ đèn sai chuẩn", v: "55%", c: "bg-indigo-500" }, { n: "Lốp sai kích cỡ", v: "25%", c: "bg-slate-500" }, { n: "Khí thải quá mức", v: "15%", c: "bg-gray-500" }];
      warnIcon = "🔧"; warnTitle = "Lưu ý Độ Xe"; warnDesc = "Cục Đăng Kiểm nghiêm cấm thay đổi kết cấu xe. Các xe độ cản, mâm, đèn không đúng chuẩn sẽ bị từ chối cấp tem."; warnBg = "bg-blue-50"; warnBorder = "border-blue-100"; warnText = "text-blue-800";
    } else if (activeMenu === 'mat-cap') {
      statTitle = "CSDL An Ninh"; statNum = "12,050"; statDesc = "Xe tang vật được phát hiện"; statColor = "text-red-600";
      listTitle = "Rủi Ro Mua Xe Cũ"; listItems = [{ n: "Đục lại số khung", v: "60%", c: "bg-red-600" }, { n: "Xe đang thế chấp", v: "30%", c: "bg-amber-600" }, { n: "Biển số giả mạo", v: "10%", c: "bg-orange-600" }];
      warnIcon = "⚖️"; warnTitle = "Rủi Ro Pháp Lý"; warnDesc = "Tiêu thụ tài sản do người khác phạm tội mà có (mua xe gian) có thể bị truy cứu trách nhiệm hình sự."; warnBg = "bg-red-50"; warnBorder = "border-red-100"; warnText = "text-red-800";
    } else if (activeMenu === 'gplx') {
      statTitle = "Quản lý GPLX"; statNum = "1.2M+"; statDesc = "Lượt tra cứu tháng qua"; statColor = "text-blue-500";
      listTitle = "Phân Loại Bằng"; listItems = [{ n: "Hạng B2", v: "65%", c: "bg-blue-500" }, { n: "Hạng C", v: "25%", c: "bg-indigo-500" }, { n: "Các hạng khác", v: "10%", c: "bg-gray-400" }];
      warnIcon = "👮"; warnTitle = "Chống Bằng Giả"; warnDesc = "Sử dụng GPLX giả mạo bị phạt tiền từ 10-12 triệu đồng, tịch thu phương tiện và có thể xử lý hình sự."; warnBg = "bg-slate-100"; warnBorder = "border-slate-200"; warnText = "text-slate-700";
    } else if (activeMenu === 'thi-thu') {
      statTitle = "Tỉ Lệ Đỗ Hạng B2"; statNum = "68%"; statDesc = "Trung bình trên hệ thống"; statColor = "text-emerald-500";
      listTitle = "Thống Kê Đề Thi"; listItems = [{ n: "Câu hỏi khái niệm", v: "145 câu", c: "bg-emerald-500" }, { n: "Câu hỏi sa hình", v: "114 câu", c: "bg-blue-500" }, { n: "Câu điểm liệt", v: "60 câu", c: "bg-red-500" }];
      warnIcon = "🎓"; warnTitle = "Mẹo Thi Đỗ"; warnDesc = "Hãy luôn ưu tiên đọc kỹ 60 câu điểm liệt trước. Sai 1 câu điểm liệt sẽ bị trượt bài thi ngay lập tức."; warnBg = "bg-emerald-50"; warnBorder = "border-emerald-100"; warnText = "text-emerald-800";
    }

    return (
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md">
          <h3 className="font-black text-gray-800 text-[10px] mb-3 uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {statTitle}</h3>
          <p className="text-[10px] text-gray-500 font-bold mb-1">{statDesc}</p>
          <p className={`text-2xl font-black ${statColor} transition-colors duration-500`}>{statNum}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md">
          <h3 className="font-black text-gray-800 text-[10px] mb-4 uppercase">{listTitle}</h3>
          <ul className="space-y-3">
            {listItems.map((li, i) => (
              <li key={i} className="flex justify-between items-center text-xs group cursor-default">
                <div className="flex items-center gap-2"><div className={`w-2 h-2 ${li.c} rounded-full transition-transform duration-300 group-hover:scale-150`}></div><span className="font-medium text-gray-700 transition-colors duration-300 group-hover:text-gray-900">{li.n}</span></div>
                <span className="font-bold text-gray-400 transition-colors duration-300 group-hover:text-gray-600">{li.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${warnBg} p-5 rounded-3xl shadow-sm border ${warnBorder} transition-all duration-500 hover:shadow-md`}>
          <span className="text-2xl mb-2 block animate-bounce">{warnIcon}</span>
          <h3 className={`font-black text-sm mb-2 ${warnText} transition-colors duration-500`}>{warnTitle}</h3>
          <p className={`text-xs leading-relaxed font-medium ${warnText} opacity-90 transition-colors duration-500`}>{warnDesc}</p>
        </div>

        {/* LOGIC CHỨC NĂNG TẢI FILE EXCEL CHO VIP */}
        {user?.tier === 'vip' ? (
          <div className="bg-[#111827] p-5 rounded-3xl shadow-lg border border-blue-500/40 relative overflow-hidden flex flex-col justify-center">
            <h3 className="font-black text-blue-400 text-sm mb-2 relative z-10 flex items-center gap-2">👑 Công Cụ Đại Lý</h3>
            <p className="text-[10px] text-gray-400 mb-4 relative z-10 font-medium">Đặc quyền VIP: Tra cứu tự động 100+ biển số.</p>
            <button onClick={() => { logActivity('EXCEL_UPLOAD_CLICK', {}); alert('Hệ thống đang mở cổng kết nối API tải file Excel!'); }} className="w-full bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ease-out active:scale-95 flex items-center justify-center gap-2">
              📁 Tải lên File Excel (.xlsx)
            </button>
          </div>
        ) : (
          <div className="bg-[#111827] p-5 rounded-3xl shadow-lg border border-gray-800 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-out active:scale-95">
            <div className="absolute -right-2 -top-2 text-5xl opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">👑</div>
            <h3 className="font-black text-white text-sm mb-2 relative z-10 transition-colors duration-300 group-hover:text-yellow-400">Giải Pháp Đại Lý</h3>
            <p className="text-[10px] text-gray-400 mb-0 relative z-10 font-medium">Nâng cấp VIP tra cứu tự động hàng loạt bằng Excel.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto relative min-h-[700px] font-sans pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-[fadeIn_0.5s_ease-out] items-start">
        {renderLeftMenu()}
        {renderCenterMain()}
        {renderRightWidgets()}
      </div>

      {qrModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 text-center relative animate-[fadeInUp_0.3s_ease-out]">
            <button onClick={() => setQrModal(null)} className="absolute top-4 right-4 bg-gray-100 rounded-full w-8 h-8 font-bold text-gray-500 transition-all duration-300 ease-out hover:bg-gray-200 hover:text-gray-900 hover:rotate-90 active:scale-95">✕</button>
            <h3 className="text-lg font-black text-blue-900 mb-1">Thanh Toán VietQR</h3>
            <p className="text-xs text-gray-500 mb-4">Mở app Ngân hàng để quét mã</p>
            <img src={`https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${qrModal.fineAmount}&addInfo=NopPhatNguoi`} alt="QR Code" className="w-48 h-48 mx-auto mb-4 border-2 border-dashed border-blue-200 p-2 rounded-xl transition-transform duration-500 hover:scale-105" />
            <button onClick={() => setQrModal(null)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm transition-all duration-300 ease-out shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95 active:translate-y-0">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}