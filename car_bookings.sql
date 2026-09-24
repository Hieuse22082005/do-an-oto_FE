-- Bảng lưu trữ thông tin Đặt lịch xem xe
CREATE TABLE IF NOT EXISTS public.car_bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id text,
  car_model text NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  booking_date text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tắt RLS để API Route có thể chèn dữ liệu trực tiếp (hoặc viết policies nếu cần bảo mật)
ALTER TABLE public.car_bookings DISABLE ROW LEVEL SECURITY;

-- Cấp quyền cho anon và authenticated
GRANT ALL ON TABLE public.car_bookings TO anon, authenticated;
