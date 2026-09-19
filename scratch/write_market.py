import codecs

content = """
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Loader2, Upload } from 'lucide-react';
import CarDetailModal from '../modals/CarDetailModal';
import { supabase } from '../../supabaseClient';

const mockListings = [
  {
    id: 'mock-1',
    title: 'Azure Velocity',
    subtitle: 'Sleek design meets innovation for luxury driving experience.',
    price: '$75,000',
    main_image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=500&auto=format&fit=crop'
    ],
    generation: '2023 MODEL',
    long_description: 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.',
    status: 'available'
  },
  {
    id: 'mock-2',
    title: 'Steel Glide',
    subtitle: 'Elegant and refined, offering lasting premium performance.',
    price: '$57,000',
    main_image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=500&auto=format&fit=crop'
    ],
    generation: 'PREMIUM EDITION',
    long_description: 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.',
    status: 'available'
  },
  {
    id: 'mock-3',
    title: 'Crimson Rush',
    subtitle: 'Bold performance cars crafted for thrilling adventures.',
    price: '$68,000',
    main_image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=500&auto=format&fit=crop'
    ],
    generation: 'SPORT SERIES',
    long_description: 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.',
    status: 'available'
  },
  {
    id: 'mock-4',
    title: 'CIVIC',
    subtitle: 'A balance of innovation and heritage.',
    price: '$35,000',
    main_image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2072&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=500&auto=format&fit=crop'
    ],
    generation: '11TH GENERATION',
    long_description: 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.',
    status: 'available'
  }
];

export default function MarketplaceTab({ user }: { user: any }) {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSellModal, setShowSellModal] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('car_listings')
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
      alert("Đã cập nhật trạng thái trên xe mẫu (Mock data) thành công!");
      setSelectedCar(null);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('car_listings')
        .update({ status: newStatus })
        .eq('id', carId);
        
      if (error) throw error;
      
      alert(`Thành công! Trạng thái xe đã được cập nhật thành: ${newStatus}`);
      setSelectedCar(null);
      fetchListings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Có lỗi xảy ra khi cập nhật!');
    }
  };

  const scrollSlider = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 350;
      sliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
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
              <button className="px-6 py-2 border border-white/40 text-white hover:bg-white hover:text-black transition-all rounded-sm text-sm tracking-wider uppercase">
                Get Started
              </button>
              <button 
                onClick={() => setShowSellModal(true)}
                className="px-6 py-2 bg-[#1a1a1a] border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black transition-all rounded-sm text-sm tracking-wider uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              >
                Sell Your Car
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
      <section className="w-full py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-slate-800 dark:text-white">Explore New Listings</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-8 h-8 text-amber-500" />
            </div>
          ) : (
            <div className="relative group">
              {/* Slider container */}
              <div ref={sliderRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {listings.filter(l => l.status === 'available').map((car) => (
                  <div key={car.id} className="min-w-[300px] md:min-w-[340px] w-full flex-shrink-0 snap-start flex flex-col">
                    {/* Image */}
                    <div className="w-full aspect-[4/3] rounded-sm overflow-hidden mb-4 bg-slate-200">
                      <img src={car.main_image} alt={car.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    </div>
                    {/* Info */}
                    <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">{car.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed min-h-[32px] line-clamp-2">{car.short_description || car.subtitle}</p>
                    <p className="font-bold text-slate-900 dark:text-white mb-4">
                      {String(car.price).includes('$') ? car.price : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(car.price))}
                    </p>
                    <button 
                      onClick={() => setSelectedCar(car)}
                      className="self-start px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <button onClick={() => scrollSlider('left')} className="absolute left-[-20px] top-[35%] -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => scrollSlider('right')} className="absolute right-[-20px] top-[35%] -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
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

      {/* SELL CAR MODAL */}
      <AnimatePresence>
        {showSellModal && (
          <SellCarModal onClose={() => setShowSellModal(false)} onRefresh={fetchListings} user={user} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for Selling Car
function SellCarModal({ onClose, onRefresh, user }: { onClose: () => void, onRefresh: () => void, user: any }) {
  const [formData, setFormData] = useState({
    title: '',
    generation: '',
    price: '',
    short_description: '',
    long_description: '',
    main_image: '',
    gallery1: '',
    gallery2: '',
    gallery3: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        title: formData.title,
        generation: formData.generation,
        price: Number(formData.price),
        short_description: formData.short_description,
        long_description: formData.long_description,
        main_image: formData.main_image,
        gallery_images: [formData.gallery1, formData.gallery2, formData.gallery3].filter(Boolean),
        status: 'available',
        // Note: In real app, seller_id would be user.id, but since we might not have a full auth session matched with DB, we might omit or just rely on RLS.
      };

      const { error } = await supabase.from('car_listings').insert([payload]);
      
      if (error) throw error;
      
      alert("Đăng bán xe thành công!");
      onRefresh();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert("Lỗi khi đăng bán: " + (err.message || 'Check console'));
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b dark:border-slate-800">
          <h2 className="text-xl font-bold">Đăng Bán Xe</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tên xe</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded outline-none" placeholder="VD: Civic" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Phiên bản/Thế hệ</label>
              <input required type="text" value={formData.generation} onChange={e => setFormData({...formData, generation: e.target.value})} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded outline-none" placeholder="VD: 11TH GENERATION" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Giá bán (VND hoặc $)</label>
            <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded outline-none" placeholder="VD: 500000000" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Mô tả ngắn</label>
            <input required type="text" value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded outline-none" placeholder="Hiển thị ở trang ngoài..." />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Mô tả chi tiết</label>
            <textarea required rows={3} value={formData.long_description} onChange={e => setFormData({...formData, long_description: e.target.value})} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded outline-none" placeholder="Triết lý thiết kế, động cơ..."></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">URL Ảnh chính (Nên dùng ảnh nền trong suốt PNG)</label>
            <input required type="url" value={formData.main_image} onChange={e => setFormData({...formData, main_image: e.target.value})} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded outline-none" placeholder="https://..." />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">URL Ảnh phụ 1</label>
              <input required type="url" value={formData.gallery1} onChange={e => setFormData({...formData, gallery1: e.target.value})} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded outline-none text-xs" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">URL Ảnh phụ 2</label>
              <input required type="url" value={formData.gallery2} onChange={e => setFormData({...formData, gallery2: e.target.value})} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded outline-none text-xs" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">URL Ảnh phụ 3</label>
              <input required type="url" value={formData.gallery3} onChange={e => setFormData({...formData, gallery3: e.target.value})} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded outline-none text-xs" />
            </div>
          </div>
          
          <button type="submit" disabled={isSubmitting} className="mt-4 w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold uppercase tracking-widest rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Đăng Bán Lên Hệ Thống'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
"""

with codecs.open('components/tabs/MarketplaceTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
