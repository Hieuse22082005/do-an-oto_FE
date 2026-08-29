import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'popular', name: 'Các Lỗi Chủ Yếu', icon: '🔥' },
  { id: 'all', name: 'Tất Cả Lỗi Phạt', icon: '📑' },
  { id: 'speed', name: 'Vi Phạm Tốc Độ', icon: '⏱️' },
  { id: 'alcohol', name: 'Nồng Độ Cồn & Ma túy', icon: '🍻' },
  { id: 'signal', name: 'Tín Hiệu Giao Thông', icon: '🚦' },
  { id: 'lane', name: 'Phần Đường & Làn Đường', icon: '🛣️' },
  { id: 'highway', name: 'Đường Cao Tốc', icon: '⚡' },
  { id: 'parking', name: 'Dừng, Đỗ Xe', icon: '🅿️' },
  { id: 'paperwork', name: 'Giấy Tờ & Đăng Kiểm', icon: '📋' },
  { id: 'other', name: 'Thiết Bị & Hành Vi Khác', icon: '⚠️' },
];

const VIOLATIONS = [
  // ==========================================
  // 1. VI PHẠM TỐC ĐỘ (4 lỗi)
  // ==========================================
  { id: 'spd1', categoryId: 'speed', isPopular: true, title: 'Chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '800.000 - 1.000.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '800.000 - 1.000.000đ', newExtra: 'Không trừ điểm.' },
  { id: 'spd2', categoryId: 'speed', isPopular: true, title: 'Chạy quá tốc độ quy định từ 10 km/h đến 20 km/h', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 03 điểm trên GPLX.' },
  { id: 'spd3', categoryId: 'speed', isPopular: false, title: 'Chạy quá tốc độ quy định từ 20 km/h đến 35 km/h', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '6.000.000 - 8.000.000đ', oldExtra: 'Tước GPLX 02-04 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '6.000.000 - 8.000.000đ', newExtra: 'Trừ 04 điểm trên GPLX.' },
  { id: 'spd4', categoryId: 'speed', isPopular: false, title: 'Chạy quá tốc độ quy định trên 35 km/h', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '10.000.000 - 12.000.000đ', oldExtra: 'Tước GPLX 02-04 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '10.000.000 - 12.000.000đ', newExtra: 'Trừ 06 điểm trên GPLX.' },

  // ==========================================
  // 2. NỒNG ĐỘ CỒN & MA TÚY (5 lỗi)
  // ==========================================
  { id: 'alc1', categoryId: 'alcohol', isPopular: true, title: 'Nồng độ cồn chưa vượt quá 50 mg/100 ml máu (Mức 1)', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '6.000.000 - 8.000.000đ', oldExtra: 'Tước GPLX 10-12 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '6.000.000 - 8.000.000đ', newExtra: 'Trừ 06 điểm trên GPLX.' },
  { id: 'alc2', categoryId: 'alcohol', isPopular: false, title: 'Nồng độ cồn từ 50 - 80 mg/100 ml máu (Mức 2)', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '16.000.000 - 18.000.000đ', oldExtra: 'Tước GPLX 16-18 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '16.000.000 - 18.000.000đ', newExtra: 'Trừ 10 điểm trên GPLX.' },
  { id: 'alc3', categoryId: 'alcohol', isPopular: false, title: 'Nồng độ cồn vượt quá 80 mg/100 ml máu (Mức 3)', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '30.000.000 - 40.000.000đ', oldExtra: 'Tước GPLX 22-24 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '30.000.000 - 40.000.000đ', newExtra: 'Trừ 12 điểm trên GPLX (Bắt buộc học lại LT).' },
  { id: 'alc4', categoryId: 'alcohol', isPopular: false, title: 'Không chấp hành yêu cầu kiểm tra nồng độ cồn', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '30.000.000 - 40.000.000đ', oldExtra: 'Tước GPLX 22-24 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '30.000.000 - 40.000.000đ', newExtra: 'Trừ 12 điểm trên GPLX.' },
  { id: 'alc5', categoryId: 'alcohol', isPopular: false, title: 'Điều khiển xe trên đường mà trong cơ thể có chất ma túy', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '30.000.000 - 40.000.000đ', oldExtra: 'Tước GPLX 22-24 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '30.000.000 - 40.000.000đ', newExtra: 'Trừ 12 điểm trên GPLX.' },

  // ==========================================
  // 3. TÍN HIỆU GIAO THÔNG (4 lỗi)
  // ==========================================
  { id: 'sig1', categoryId: 'signal', isPopular: true, title: 'Vượt đèn đỏ, đèn vàng', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '6.000.000 - 8.000.000đ', newExtra: 'Trừ 03 điểm trên GPLX.' },
  { id: 'sig2', categoryId: 'signal', isPopular: true, title: 'Chuyển hướng không có tín hiệu báo hướng rẽ (Không xi-nhan)', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '800.000 - 1.000.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '800.000 - 1.000.000đ', newExtra: 'Trừ 02 điểm trên GPLX.' },
  { id: 'sig3', categoryId: 'signal', isPopular: false, title: 'Không chấp hành hiệu lệnh, hướng dẫn của CSGT', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '3.000.000 - 5.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 03 điểm trên GPLX.' },
  { id: 'sig4', categoryId: 'signal', isPopular: false, title: 'Không chấp hành vạch kẻ đường, biển báo hiệu', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '300.000 - 400.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '300.000 - 400.000đ', newExtra: 'Không trừ điểm.' },

  // ==========================================
  // 4. LÀN ĐƯỜNG & PHẦN ĐƯỜNG (4 lỗi)
  // ==========================================
  { id: 'lan1', categoryId: 'lane', isPopular: true, title: 'Đi không đúng phần đường, làn đường quy định (Sai làn)', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 03 điểm trên GPLX.' },
  { id: 'lan2', categoryId: 'lane', isPopular: true, title: 'Đi ngược chiều trên đường có biển cấm ngược chiều', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 02-04 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 04 điểm trên GPLX.' },
  { id: 'lan3', categoryId: 'lane', isPopular: false, title: 'Vượt xe trong những trường hợp không được vượt', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 03 điểm trên GPLX.' },
  { id: 'lan4', categoryId: 'lane', isPopular: false, title: 'Không giữ khoảng cách an toàn gây tai nạn', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '10.000.000 - 12.000.000đ', oldExtra: 'Tước GPLX 02-04 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '10.000.000 - 12.000.000đ', newExtra: 'Trừ 04 điểm trên GPLX.' },

  // ==========================================
  // 5. ĐƯỜNG CAO TỐC (4 lỗi)
  // ==========================================
  { id: 'hw1', categoryId: 'highway', isPopular: true, title: 'Chạy ở làn dừng xe khẩn cấp của đường cao tốc', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 03 điểm trên GPLX.' },
  { id: 'hw2', categoryId: 'highway', isPopular: false, title: 'Đi ngược chiều hoặc đi lùi trên đường cao tốc', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '16.000.000 - 18.000.000đ', oldExtra: 'Tước GPLX 05-07 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '16.000.000 - 18.000.000đ', newExtra: 'Trừ 12 điểm trên GPLX (Tước quyền lái xe).' },
  { id: 'hw3', categoryId: 'highway', isPopular: false, title: 'Dừng xe, đỗ xe, quay đầu xe trên đường cao tốc sai quy định', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '10.000.000 - 12.000.000đ', oldExtra: 'Tước GPLX 02-04 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '10.000.000 - 12.000.000đ', newExtra: 'Trừ 04 điểm trên GPLX.' },
  { id: 'hw4', categoryId: 'highway', isPopular: false, title: 'Không tuân thủ khoảng cách an toàn trên cao tốc', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 02 điểm trên GPLX.' },

  // ==========================================
  // 6. DỪNG, ĐỖ XE (4 lỗi)
  // ==========================================
  { id: 'pk1', categoryId: 'parking', isPopular: true, title: 'Đỗ xe nơi có biển "Cấm đỗ xe" hoặc "Cấm dừng và đỗ"', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '800.000 - 1.000.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '800.000 - 1.000.000đ', newExtra: 'Không trừ điểm.' },
  { id: 'pk2', categoryId: 'parking', isPopular: false, title: 'Dừng, đỗ xe tại vị trí phần đường dành cho người đi bộ', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '400.000 - 600.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '400.000 - 600.000đ', newExtra: 'Không trừ điểm.' },
  { id: 'pk3', categoryId: 'parking', isPopular: false, title: 'Dừng, đỗ xe trên cầu, gầm cầu vượt', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '2.000.000 - 3.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '2.000.000 - 3.000.000đ', newExtra: 'Trừ 02 điểm trên GPLX.' },
  { id: 'pk4', categoryId: 'parking', isPopular: false, title: 'Mở cửa xe không đảm bảo an toàn gây tai nạn', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '10.000.000 - 12.000.000đ', oldExtra: 'Tước GPLX 02-04 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '10.000.000 - 12.000.000đ', newExtra: 'Trừ 04 điểm trên GPLX.' },

  // ==========================================
  // 7. GIẤY TỜ & ĐĂNG KIỂM (5 lỗi)
  // ==========================================
  { id: 'pap1', categoryId: 'paperwork', isPopular: true, title: 'Điều khiển xe quá hạn đăng kiểm dưới 01 tháng', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '3.000.000 - 4.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '3.000.000 - 4.000.000đ', newExtra: 'Trừ 02 điểm trên GPLX.' },
  { id: 'pap2', categoryId: 'paperwork', isPopular: true, title: 'Điều khiển xe quá hạn đăng kiểm trên 01 tháng', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 03 điểm trên GPLX.' },
  { id: 'pap3', categoryId: 'paperwork', isPopular: false, title: 'Không có Giấy phép lái xe (GPLX) do cơ quan thẩm quyền cấp', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '10.000.000 - 12.000.000đ', oldExtra: 'Tạm giữ xe 07 ngày.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '10.000.000 - 12.000.000đ', newExtra: 'Tạm giữ xe 07 ngày.' },
  { id: 'pap4', categoryId: 'paperwork', isPopular: true, title: 'Không mang theo Giấy phép lái xe / Đăng ký xe', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '200.000 - 400.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '200.000 - 400.000đ', newExtra: 'Không trừ điểm.' },
  { id: 'pap5', categoryId: 'paperwork', isPopular: true, title: 'Không có Bảo hiểm TNDS bắt buộc', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '400.000 - 600.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '400.000 - 600.000đ', newExtra: 'Không trừ điểm.' },

  // ==========================================
  // 8. THIẾT BỊ & HÀNH VI KHÁC (4 lỗi)
  // ==========================================
  { id: 'oth1', categoryId: 'other', isPopular: true, title: 'Sử dụng điện thoại di động khi đang lái xe', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '2.000.000 - 3.000.000đ', oldExtra: 'Tước GPLX 01-03 tháng.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 02 điểm trên GPLX.' },
  { id: 'oth2', categoryId: 'other', isPopular: true, title: 'Không thắt dây an toàn khi điều khiển xe chạy', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '800.000 - 1.000.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '800.000 - 1.000.000đ', newExtra: 'Không trừ điểm.' },
  { id: 'oth3', categoryId: 'other', isPopular: false, title: 'Che lấp biển số, dán decal làm sai lệch biển số', oldDecree: 'Nghị định 100 (Sửa đổi bởi 123/2021):', oldFine: '4.000.000 - 6.000.000đ', oldExtra: 'Khôi phục lại biển số.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '4.000.000 - 6.000.000đ', newExtra: 'Trừ 02 điểm trên GPLX.' },
  { id: 'oth4', categoryId: 'other', isPopular: false, title: 'Bấm còi, rú ga liên tục trong khu đô thị', oldDecree: 'Nghị định 100/2019/NĐ-CP:', oldFine: '400.000 - 600.000đ', oldExtra: 'Không tước GPLX.', newDecree: 'Nghị định 168/2024 (Mới):', newFine: '400.000 - 600.000đ', newExtra: 'Không trừ điểm.' },
];
export default function PenaltyTab() {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredViolations = activeCategory === 'popular'
    ? VIOLATIONS.filter(v => v.isPopular)
    : activeCategory === 'all' 
      ? VIOLATIONS 
      : VIOLATIONS.filter(v => v.categoryId === activeCategory);

  return (
    // Đã đổi bg-[#F8F9FA] thành bg-transparent để nhìn xuyên thấu chữ từ page.tsx
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-transparent pb-20 font-sans transition-colors duration-300 overflow-hidden">
      
      {/* Đã xóa khối chữ LUẬT Ô TÔ khổng lồ ở đây */}

      {/* Header Banner (Đổi bg-gradient thành bg-transparent) */}
      <div className="relative z-10 text-center py-12 border-b border-transparent dark:border-slate-800 transition-colors duration-300 bg-transparent">
        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-red-100 dark:border-red-900/50 shadow-sm animate-pulse">
          Cập Nhật Nghị Định Mới Nhất 2026 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight transition-colors duration-300">
          Cẩm Nang Luật <span className="text-[#E53935] dark:text-red-500">Ô Tô</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto transition-colors duration-300">
          Tra cứu nhanh 30+ lỗi vi phạm giao thông phổ biến dành riêng cho tài xế Ô tô. Tích hợp so sánh mức trừ điểm GPLX hệ thống mới.
        </p>
      </div>

      {/* KHUNG CHỨA SIÊU RỘNG (1600px): Đẩy 2 cột dạt ra 2 biên */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
        
        {/* ==========================================
            CỘT 1 (BÊN TRÁI): SIDEBAR MENU
            ========================================== */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24 transition-colors duration-300">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isPopularTab = cat.id === 'popular';
              
              return (
                <button 
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                  className={`w-full group relative text-left px-5 py-4 border-b border-gray-100 dark:border-slate-700/50 flex items-center gap-3 text-[14px] font-semibold transition-all duration-300 overflow-hidden
                    ${isActive 
                      ? (isPopularTab ? 'text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20' : 'text-[#E53935] dark:text-red-400 bg-red-50/50 dark:bg-red-900/20') 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                >
                  <span className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ease-out ${isActive ? (isPopularTab ? 'bg-orange-500' : 'bg-[#E53935] dark:bg-red-500') : 'bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-slate-600'}`}></span>
                  <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-125' : 'opacity-70 group-hover:scale-110'}`}>{cat.icon}</span> 
                  <span className={`transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>{cat.name}</span>
                  {isActive && (
                    <span className={`ml-auto text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm animate-fade-in ${isPopularTab ? 'bg-orange-500' : 'bg-[#E53935] dark:bg-red-600'}`}>
                      {filteredViolations.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            CỘT 2 (GIỮA - TO NHẤT): NỘI DUNG LUẬT
            ========================================== */}
        <div className="lg:col-span-6">
          <div className="mb-6 text-gray-800 dark:text-gray-200 font-bold text-lg flex items-center gap-2 transition-colors duration-300">
            Hiển thị: <span className={activeCategory === 'popular' ? 'text-orange-600 dark:text-orange-400' : 'text-[#E53935] dark:text-red-400'}>{CATEGORIES.find(c => c.id === activeCategory)?.name}</span> 
            <span className="text-gray-400 dark:text-gray-500 font-normal text-sm">({filteredViolations.length} quy định)</span>
          </div>

          <div className="space-y-4">
            {filteredViolations.map((violation) => {
              const isExpanded = expandedId === violation.id;
              
              return (
                <div key={violation.id} className={`bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm
                  ${isExpanded 
                    ? 'border-red-300 dark:border-red-500/50 shadow-md shadow-red-100/50 dark:shadow-red-900/20 ring-2 ring-red-50 dark:ring-red-900/20' 
                    : 'border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-slate-600 hover:shadow-md'}`}>
                  
                  <button onClick={() => setExpandedId(isExpanded ? null : violation.id)} className="w-full px-6 py-5 flex items-center justify-between bg-transparent focus:outline-none group">
                    <span className={`font-bold text-[15px] text-left pr-4 transition-colors duration-300 ${isExpanded ? 'text-[#E53935] dark:text-red-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400'}`}>
                      {violation.title}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-red-100 dark:bg-red-900/40 text-[#E53935] dark:text-red-400 rotate-180' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 group-hover:bg-red-50 dark:group-hover:bg-slate-600 group-hover:text-red-500 dark:group-hover:text-red-300'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2">
                        <div className="bg-gray-50 dark:bg-slate-900/50 p-5 rounded-xl border border-gray-100 dark:border-slate-700 relative transition-colors duration-300">
                          <h5 className="font-bold text-gray-700 dark:text-gray-300 text-sm mb-3 border-b border-gray-200 dark:border-slate-700 pb-2 inline-block">{violation.oldDecree}</h5>
                          <p className="text-gray-600 dark:text-gray-400 text-[15px] mb-2 flex gap-2"><span className="font-semibold w-28 shrink-0">Mức phạt tiền:</span> <span className="font-bold text-gray-900 dark:text-white">{violation.oldFine}</span></p>
                          {violation.oldExtra && <p className="text-gray-600 dark:text-gray-400 text-[15px] flex gap-2"><span className="font-semibold w-28 shrink-0">Hình phạt phụ:</span> <span className="font-medium text-gray-800 dark:text-gray-300">{violation.oldExtra}</span></p>}
                        </div>
                        <div className="flex justify-center -my-3.5 relative z-10">
                          <div className="bg-white dark:bg-slate-800 p-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-red-500 dark:text-red-400 shadow-sm transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                          </div>
                        </div>
                        <div className="bg-[#FFF5F5] dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-900/30 mt-2 transition-colors duration-300">
                          <h5 className="font-bold text-red-700 dark:text-red-400 text-sm mb-3 border-b border-red-200/50 dark:border-red-900/50 pb-2 inline-block">{violation.newDecree}</h5>
                          <p className="text-gray-700 dark:text-gray-300 text-[15px] mb-2 flex gap-2"><span className="font-semibold w-28 shrink-0">Mức phạt tiền:</span> <span className="font-black text-red-600 dark:text-red-400 text-base">{violation.newFine}</span></p>
                          {violation.newExtra && <p className="text-gray-700 dark:text-gray-300 text-[15px] flex gap-2"><span className="font-semibold w-28 shrink-0">Quy định mới:</span> <span className="font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded text-sm">{violation.newExtra}</span></p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            CỘT 3 (BÊN PHẢI): WIDGETS & QUẢNG CÁO TÀI TRỢ
            ========================================== */}
        <div className="lg:col-span-3 space-y-6 sticky top-24 h-fit">
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-700 dark:to-red-900 rounded-2xl p-5 text-white shadow-[0_8px_30px_rgb(229,57,53,0.3)] dark:shadow-none transition-colors duration-300">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <h4 className="font-bold text-lg">Đường Dây Nóng</h4>
            </div>
            <p className="text-sm opacity-90 mb-4 font-medium leading-relaxed">Phản ánh vi phạm giao thông hoặc yêu cầu cứu hộ khẩn cấp.</p>
            <div className="bg-white/20 dark:bg-black/20 rounded-xl p-3 text-center font-black text-2xl tracking-widest backdrop-blur-sm border border-white/30 dark:border-white/10">
              08 68 911 911
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm transition-colors duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 tracking-wider">TÀI TRỢ CHÍNH</span>
              <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded">Ad</span>
            </div>
            <div className="overflow-hidden rounded-xl mb-4 relative">
              <img 
                  src="/a.png" 
                  alt="Camera Hành Trình" 
                  className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-2 left-3"><span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">-30%</span></div>
            </div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-[15px] leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Camera Hành Trình 4K ĐịnhGiáXe.AI
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">Cảnh báo tốc độ, đọc biển báo giao thông thông minh. Độc quyền cho thành viên.</p>
            <button className="w-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50 font-bold text-sm py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300 active:scale-95">
              Tìm Hiểu Thêm
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}