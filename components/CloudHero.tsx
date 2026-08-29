"use client";
import React from 'react';

export default function CarHero() {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex flex-col md:flex-row bg-[#0f1115] overflow-hidden">
      
      {/* CSS ANIMATION CHO CHỮ (Chỉ giữ lại hiệu ứng trượt chữ nhẹ nhàng) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeSlideUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-text-reveal { animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}} />

      {/* ================= 1. NỬA BÊN TRÁI: KHỐI NỘI DUNG ================= */}
      <div className="w-full md:w-[45%] lg:w-[40%] h-full flex flex-col justify-center px-8 lg:pl-24 lg:pr-12 z-10">
         <div className="animate-text-reveal" style={{ animationDelay: '0.1s' }}>
            <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">
              THE NEXT GENERATION
            </span>
            <h1 className="text-5xl lg:text-[4rem] font-black text-white leading-[1.1] mb-6">
              Tương Lai Trở <br /> Thành <br />
              <span className="text-gray-500">
                Hiện Thực.
              </span>
            </h1>
         </div>
         
         <p className="animate-text-reveal text-gray-400 text-sm md:text-base mb-10 leading-relaxed font-medium" style={{ animationDelay: '0.2s' }}>
            Kiểm tra giá trị thực tế của chiếc xe dựa trên AI và công nghệ dữ liệu Web3.
         </p>

         <div className="animate-text-reveal flex items-center gap-4" style={{ animationDelay: '0.3s' }}>
            <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-transform active:scale-95">
               Định Giá Ngay
            </button>
            <button className="text-white px-6 py-3 rounded-full font-bold text-sm border border-gray-600 hover:border-white hover:bg-white/5 transition-colors">
               Xem Thư Viện
            </button>
         </div>
      </div>

      {/* ================= 2. NỬA BÊN PHẢI: KHỐI HÌNH ẢNH ================= */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-full relative">
         {/* Lớp gradient nhỏ ở mép trái ảnh để làm mờ vết cắt, hòa quyện mượt mà phần nền đen của ảnh với khối bên trái */}
         <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0f1115] to-transparent z-10 hidden md:block"></div>
         
         <img 
           src="/vinfast.jpg" // Nhớ đảm bảo tên file khớp với ảnh trong thư mục public của bạn
           alt="VinFast VF9" 
           className="w-full h-full object-cover object-left md:object-center"
         />
      </div>

    </div>
  );
}