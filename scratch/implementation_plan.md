# Implementation Plan: Bổ sung Chế độ Sáng (Light Mode) Toàn Hệ Thống

## Goal Description
Người dùng muốn thêm một tùy chọn (nút gạt/toggle) để bật "Chế độ Sáng" (Light Mode) cho toàn bộ trang web. Hiện tại, toàn bộ giao diện đang được thiết kế cố định theo phong cách Cyberpunk/Dark Theme với hàng trăm lớp CSS được "hardcode" (code cứng) màu tối như `bg-slate-900`, `text-white`, `bg-black/40`, v.v.

Việc tích hợp Light Mode đòi hỏi phải cấu trúc lại toàn bộ hệ thống màu sắc của dự án.

> [!WARNING]
> **Đây là một đợt tái cấu trúc (refactor) lớn.** Hệ thống có khoảng hơn 250 đoạn code đang gắn cứng màu tối. Chúng ta sẽ phải sửa đổi gần như MỌI file giao diện (components) để hỗ trợ bộ chọn `dark:` và `light:` của TailwindCSS.

## Open Questions
1. **Thiết kế Light Mode cho Background?** Trong Dark Mode, chúng ta có nền đen, lưới lập phương mờ và các khối cầu ánh sáng Tím/Chàm. Trong Light Mode, bạn muốn giữ nền trắng tinh, hay nền xám nhạt với các khối cầu sáng màu pastel?
2. **Glassmorphism?** Các khung kính mờ hiện tại (`bg-black/40`) sẽ được chuyển thành kính trắng trong suốt (`bg-white/40` hoặc `bg-white/70`). Bạn có đồng ý với thiết kế này không?

## Proposed Changes

### `tailwind.config.ts` (nếu cần)
- Đảm bảo kích hoạt tính năng `darkMode: 'class'` để có thể chuyển đổi thủ công bằng nút bấm.

### `app/layout.tsx` & Theme Context
- [NEW] Tạo một `ThemeProvider` để quản lý trạng thái Theme (Light/Dark) và lưu vào `localStorage` để giữ trạng thái khi tải lại trang.
- Bao bọc toàn bộ ứng dụng bằng `ThemeProvider`.

### `components/Header.tsx`
- [MODIFY] Thêm một nút gạt (Toggle Button - icon Mặt Trời / Mặt Trăng) vào góc phải của Header để người dùng chuyển đổi giao diện.

### Tất cả các Components (Tab)
Thay thế toàn bộ mã màu cứng thành cấu trúc hỗ trợ 2 chế độ:
- `bg-slate-900` ➔ `bg-white dark:bg-slate-900`
- `bg-[#0f172a]` ➔ `bg-gray-50 dark:bg-[#0f172a]`
- `text-white` ➔ `text-gray-900 dark:text-white`
- `text-slate-400` ➔ `text-gray-500 dark:text-slate-400`
- `bg-black/40` (Kính mờ) ➔ `bg-white/60 dark:bg-black/40`
- `border-white/10` ➔ `border-gray-200 dark:border-white/10`

**Các file bị ảnh hưởng:**
#### [MODIFY] `app/page.tsx` (Global Background)
#### [MODIFY] `components/tabs/AdminTab.tsx`
#### [MODIFY] `components/tabs/FinesTab.tsx`
#### [MODIFY] `components/tabs/SearchTab.tsx`
#### [MODIFY] `components/tabs/EvaluateTab.tsx`
#### [MODIFY] `components/tabs/HomeTab.tsx`

## Verification Plan
### Automated Tests
- Chạy `npm run build` để đảm bảo Next.js không gặp lỗi biên dịch sau khi sửa hàng loạt file.
### Manual Verification
- Bấm nút Mặt trời / Mặt trăng trên Header.
- Kiểm tra toàn bộ 5 tab xem có thành phần nào bị "mù chữ" (chữ trắng trên nền trắng) do quên chưa đổi màu hay không.
