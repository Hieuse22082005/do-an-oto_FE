"use client";
import React from "react";
import { useTheme } from "next-themes";
import { CircularTestimonials } from "./circular-testimonials";

const testimonials = [
  {
    quote:
      "Tiếp nối sự phát triển của công nghệ Blockchain và Trí tuệ nhân tạo, SmartCar ra đời như một giải pháp tiên phong nhằm minh bạch hóa thị trường xe cũ tại Việt Nam.",
    name: "Tầm Nhìn Chiến Lược",
    designation: "SmartCar",
    src: "/images/overview-car.jpg",
  },
  {
    quote:
      "Sự kết hợp giữa hơn 30+ biến số kỹ thuật được phân tích bởi mô hình Machine Learning và tính năng lưu trữ bất biến của Smart Contract (Web3) hứa hẹn mang đến một tiêu chuẩn định giá mới.",
    name: "Công Nghệ Đột Phá",
    designation: "AI & Blockchain",
    src: "/images/blockchain-ai.jpg",
  },
  {
    quote:
      "Không chỉ là một công cụ tra cứu đơn thuần, đây còn là hệ sinh thái đáng tin cậy giúp người dùng nắm bắt chính xác giá trị thực tế của phương tiện, loại bỏ hoàn toàn các rủi ro gian lận.",
    name: "Bảo Vệ Người Dùng",
    designation: "Thị Trường Minh Bạch",
    src: "/images/data-protection.png",
  },
];

export const HomeTestimonials = () => {
  const { theme } = useTheme();
  
  // Decide if we are in dark mode. (Default to light if undefined, though next-themes handles this usually)
  const isDark = true; // Forced true because HomeTab is always dark

  return (
    <div className={`p-8 md:p-12 mb-32 flex flex-wrap gap-6 items-center justify-center relative`}>
      <div
        className="items-center justify-center relative flex w-full"
        style={{ maxWidth: "1456px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={
            isDark
              ? {
                  name: "#f7f7ff",
                  designation: "#e1e1e1",
                  testimony: "#f1f1f7",
                  arrowBackground: "#0582CA",
                  arrowForeground: "#141414",
                  arrowHoverBackground: "#f7f7ff",
                }
              : {
                  name: "#0a0a0a",
                  designation: "#454545",
                  testimony: "#171717",
                  arrowBackground: "#141414",
                  arrowForeground: "#f1f1f7",
                  arrowHoverBackground: "#00A6FB",
                }
          }
          fontSizes={{
            name: "28px",
            designation: "20px",
            quote: "20px",
          }}
        />
      </div>
    </div>
  );
};
