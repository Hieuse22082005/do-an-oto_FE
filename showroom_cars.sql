-- Xóa bảng cũ nếu có (cẩn thận nếu có dữ liệu quan trọng)
DROP TABLE IF EXISTS public.showroom_cars;

-- Tạo bảng mới chuẩn cho Cửa hàng Xe Sang
CREATE TABLE public.showroom_cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,            -- Tên hãng
    model VARCHAR(255) NOT NULL,            -- Tên xe
    condition VARCHAR(255),                 -- Tình trạng xe (Mới, Cũ, Lướt...)
    manufacture_year INT,                   -- Năm sản xuất
    buy_price NUMERIC,                      -- Giá mua vào (Nội bộ)
    sell_price NUMERIC NOT NULL,            -- Giá bán ra (Hiển thị cho khách)
    status VARCHAR(50) DEFAULT 'available', -- Trạng thái: 'available' (Đang bán) hoặc 'sold' (Đã bán)
    image_url TEXT,                         -- Ảnh Poster của xe (Như Hình 3)
    description TEXT,                       -- Giới thiệu về xe
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bật RLS
ALTER TABLE public.showroom_cars ENABLE ROW LEVEL SECURITY;

-- Ai cũng có thể xem danh sách xe
CREATE POLICY "Anyone can view showroom cars" ON public.showroom_cars
    FOR SELECT USING (true);

-- Cho phép update trạng thái xe khi khách mua (có thể giới hạn lại sau)
CREATE POLICY "Anyone can update car status" ON public.showroom_cars
    FOR UPDATE USING (true);

-- (Thêm dữ liệu mẫu vào thẳng DB để test, bạn có thể xóa sau)
INSERT INTO public.showroom_cars (brand, model, condition, manufacture_year, buy_price, sell_price, status, image_url, description)
VALUES 
('SMARTCAR', 'CIVIC 11TH GEN', 'Mới 100%', 2024, 25000, 35000, 'available', 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2072', 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.');
