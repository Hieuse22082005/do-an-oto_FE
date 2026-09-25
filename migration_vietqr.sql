-- 1. Bổ sung trường tín dụng vào bảng profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS token_balance INT DEFAULT 0;

-- 2. Bảng theo dõi các đơn nạp tiền qua mã VietQR
CREATE TABLE IF NOT EXISTS public.deposit_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    invoice_code VARCHAR(50) UNIQUE NOT NULL, -- Ví dụ: NAP_USR123_5TK
    token_amount INT NOT NULL,
    total_vnd NUMERIC(12, 0) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SUCCESS, EXPIRED
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bật Row Level Security cho deposit_invoices
ALTER TABLE public.deposit_invoices ENABLE ROW LEVEL SECURITY;

-- Policy cho phép user đọc hóa đơn của chính họ
CREATE POLICY "Users can view own invoices" ON public.deposit_invoices
    FOR SELECT USING (auth.uid() = user_id);

-- Policy cho phép insert hóa đơn (hoặc insert qua service role ở backend)
CREATE POLICY "Users can create own invoices" ON public.deposit_invoices
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Cập nhật bảng lưu trữ định giá hỗ trợ trạng thái xử lý chuỗi khối
ALTER TABLE public.transactions 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS chain_status VARCHAR(20) DEFAULT 'QUEUED',
ADD COLUMN IF NOT EXISTS txhash VARCHAR(100);

-- 4. Tạo Function an toàn để cộng số dư (Atomic Increment)
CREATE OR REPLACE FUNCTION increment_user_balance(uid UUID, val INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET token_balance = COALESCE(token_balance, 0) + val
  WHERE id = uid;
END;
$$;
