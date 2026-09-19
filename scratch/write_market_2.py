import codecs

content = """
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import CarDetailModal from '../modals/CarDetailModal';
import { supabase } from '../../supabaseClient';

const mockListings = [
  {
    id: 'mock-1',
    brand: 'HONDA',
    model: 'CIVIC 11TH GEN',
    condition: 'Xe lướt',
    manufacture_year: 2023,
    sell_price: 35000,
    image_url: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2072&auto=format&fit=crop',
    description: 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.',
    status: 'available'
  },
  {
    id: 'mock-2',
    brand: 'BMW',
    model: 'M4 COMPETITION',
    condition: 'Mới 100%',
    manufacture_year: 2024,
    sell_price: 85000,
    image_url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
    description: 'Sleek design meets innovation for a luxury driving experience.',
    status: 'available'
  },
  {
    id: 'mock-3',
    brand: 'MERCEDES',
    model: 'AMG GT',
    condition: 'Xe cũ',
    manufacture_year: 2021,
    sell_price: 75000,
    image_url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070&auto=format&fit=crop',
    description: 'Bold performance cars crafted for thrilling adventures.',
    status: 'available'
  }
];

export default function MarketplaceTab({ user }: { user: any }) {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('showroom_cars')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching listings:", error);
        setListings(mockListings);
      } else if (data && data.length > 0) {
        setListings(data);
      } else {
        setListings(mockListings);
      }
    } catch (err) {
      console.error(err);
      setListings(mockListings);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleUpdateStatus = async (carId: string, newStatus: string) => {
    if (carId.startsWith('mock-')) {
      alert("Đã cập nhật trạng thái trên xe mẫu thành công!");
      setSelectedCar(null);
      // Xóa xe mẫu khỏi danh sách hiển thị
      setListings(listings.map(c => c.id === carId ? { ...c, status: newStatus } : c));
      return;
    }
    
    try {
      const { error } = await supabase
        .from('showroom_cars')
        .update({ status: newStatus })
        .eq('id', carId);
        
      if (error) throw error;
      
      alert(`Thành công! Xe đã được xác nhận mua.`);
      setSelectedCar(null);
      fetchListings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Có lỗi xảy ra khi cập nhật!');
    }
  };

  const scrollSlider = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 370; // 350px width + 20px gap
      sliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Hàm format giá tiền
  const formatPrice = (price: number | string) => {
    const num = Number(price);
    if (isNaN(num)) return price;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="w-full bg-[#f8f9fa] dark:bg-[#121212] min-h-screen text-slate-900 dark:text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION (Dark theme) */}
      <section className="relative w-full h-[85vh] bg-black flex flex-col md:flex-row items-center overflow-hidden">
        {/* Left Content */}
        <div className="w-full md:w-[40%] h-full flex flex-col justify-center px-10 md:px-20 z-10 bg-black relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-5xl md:text-7xl font-light leading-tight mb-2">
              Modern <br />
              <span className="font-serif italic">Luxurious</span> <br />
              <span className="font-bold">Yours</span>
            </h1>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => {
                  document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2 border border-white/40 text-white hover:bg-white hover:text-black transition-all rounded-sm text-sm tracking-wider uppercase"
              >
                Khám Phá Ngay
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[60%] h-full relative">
          <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2160&auto=format&fit=crop" 
            alt="Hero Car" 
            className="w-full h-full object-cover object-center"
          />
          {/* Reflection Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </section>

      {/* 2. EXPLORE NEW LISTINGS */}
      <section id="listings-section" className="w-full py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-2xl font-bold mb-10 text-slate-800 dark:text-white">Explore New Listings</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-8 h-8 text-amber-500" />
            </div>
          ) : (
            <div className="relative group">
              
              {/* Slider container */}
              <div 
                ref={sliderRef} 
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 scroll-smooth" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {listings.filter(l => l.status === 'available').length === 0 ? (
                  <p className="text-slate-500 italic">Hiện tại chưa có xe nào đang mở bán.</p>
                ) : (
                  listings.filter(l => l.status === 'available').map((car) => (
                    <div 
                      key={car.id} 
                      // Fixed width instead of w-full to prevent stretching when there's only 1 item
                      className="w-[300px] md:w-[350px] flex-shrink-0 snap-start flex flex-col"
                    >
                      {/* Image */}
                      <div className="w-full aspect-[4/3] rounded-sm overflow-hidden mb-4 bg-slate-200">
                        <img src={car.image_url} alt={car.model} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                      </div>
                      {/* Info */}
                      <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">{car.model}</h3>
                      <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed min-h-[32px] line-clamp-2">{car.description}</p>
                      <p className="font-bold text-slate-900 dark:text-white mb-4">
                        {formatPrice(car.sell_price)}
                      </p>
                      <button 
                        onClick={() => setSelectedCar(car)}
                        className="self-start px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Arrows - positioned outside the container slightly */}
              <button onClick={() => scrollSlider('left')} className="absolute left-[-20px] md:left-[-40px] top-[35%] -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => scrollSlider('right')} className="absolute right-[-20px] md:right-[-40px] top-[35%] -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. PREMIUM DEALS FOOTER */}
      <section className="w-full h-[50vh] bg-black flex flex-col items-center justify-center relative overflow-hidden text-white pt-10">
        <h2 className="text-4xl md:text-6xl font-light text-center leading-tight mb-8 z-10">
          Experience <br /> <span className="font-thin text-white/90">Premium Deals</span>
        </h2>
        <button className="px-6 py-2 border border-white/30 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors z-10">
          SPORTS CARS &gt;
        </button>
        
        {/* Car bottom peek */}
        <div className="absolute bottom-[-30%] md:bottom-[-40%] left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-50 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop" alt="Peek car" className="w-full object-cover [mask-image:linear-gradient(to_top,black,transparent)]" />
        </div>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedCar && (
          <CarDetailModal 
            car={selectedCar} 
            onClose={() => setSelectedCar(null)} 
            onBuy={() => handleUpdateStatus(selectedCar.id, 'sold')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
"""

with codecs.open('components/tabs/MarketplaceTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
