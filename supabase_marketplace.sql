-- Create car_listings table
CREATE TABLE IF NOT EXISTS public.car_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    generation VARCHAR(255),
    price NUMERIC NOT NULL,
    short_description TEXT,
    long_description TEXT,
    main_image TEXT,
    gallery_images TEXT[],
    seller_id UUID REFERENCES auth.users(id),
    status VARCHAR(50) DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.car_listings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read listings
CREATE POLICY "Anyone can view car listings" ON public.car_listings
    FOR SELECT USING (true);

-- Allow authenticated users to insert their own listings
CREATE POLICY "Users can insert their own listings" ON public.car_listings
    FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- Allow users to update their own listings
CREATE POLICY "Users can update their own listings" ON public.car_listings
    FOR UPDATE USING (auth.uid() = seller_id);
