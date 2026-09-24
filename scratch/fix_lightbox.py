import codecs

file_path = 'components/modals/CarDetailModal.tsx'
content = """"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Zap, Gauge, Users, CalendarDays, Key, MapPin, MessageCircle, Loader2 } from 'lucide-react';

interface CarDetailModalProps {
  car: any;
  onClose: () => void;
  onBuy: () => Promise<void>;
}

export default function CarDetailModal({ car, onClose, onBuy }: CarDetailModalProps) {
  const [buying, setBuying] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Build media list for Bento grid
  const mediaList: { type: string, url: string }[] = [];
  if (car.image_url) {
    mediaList.push({ type: 'image', url: car.image_url });
  }
  if (car.gallery && Array.isArray(car.gallery)) {
    car.gallery.forEach((url: string) => {
      mediaList.push({ type: 'image', url: url });
    });
  }

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBuy = async () => {
    setBuying(true);
    await onBuy();
    setBuying(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-zinc-950 overflow-y-auto text-slate-200 font-sans"
    >
      {/* Lightbox for full screen images */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <img 
              src={lightboxImage} 
              className="max-w-full max-h-full object-contain cursor-default drop-shadow-2xl rounded-sm" 
              onClick={(e) => e.stopPropagation()} 
            />
            <button 
              onClick={() => setLightboxImage(null)} 
              className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors border border-white/10"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Close Button */}
      <button 
        onClick={onClose} 
        className="fixed top-6 right-6 z-[60] bg-black/40 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/10 hover:text-amber-500 border border-white/10 transition-all shadow-xl hover:scale-110"
      >
        <X size={24} />
      </button>

      {/* 1. HERO SECTION (Split Layout) */}
      <div className="flex flex-col lg:flex-row w-full lg:h-[70vh]">
        
        {/* Left: 2/3 Video or Image */}
        <div className="w-full lg:w-2/3 h-[50vh] lg:h-full relative bg-black">
          {car.video_url ? (
            <video 
              src={car.video_url} 
              className="absolute inset-0 w-full h-full object-cover" 
              autoPlay loop muted playsInline 
            />
          ) : (
            <img 
              src={car.image_url} 
              alt={car.model} 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          )}
          {/* Subtle gradient overlay to blend with the right side */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent hidden lg:block"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent lg:hidden"></div>
        </div>

        {/* Right: 1/3 Car Details */}
        <div className="w-full lg:w-1/3 h-full bg-zinc-950 flex flex-col justify-center px-8 lg:px-12 py-12 lg:py-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <motion.h3 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-3"
            >
              {car.brand}
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight"
            >
              {car.model}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="text-4xl font-light text-slate-100 mb-8"
            >
              <span className="text-amber-500 font-medium mr-2">$</span>
              {car.sell_price?.toLocaleString()}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row lg:flex-col gap-3"
            >
              <span className="px-5 py-2.5 bg-white/5 rounded-sm text-xs font-medium tracking-widest uppercase border border-white/10 text-white w-fit">
                {car.condition}
              </span>
              <span className="px-5 py-2.5 bg-amber-500/10 rounded-sm text-xs font-medium tracking-widest uppercase border border-amber-500/20 text-amber-400 w-fit">
                Sản xuất năm {car.manufacture_year}
              </span>
            </motion.div>
          </div>
        </div>

      </div>

      {/* 2. CONTENT SECTION */}
      <div className="w-full px-6 md:px-12 lg:px-24 py-16 max-w-[1600px] mx-auto relative border-t border-white/5">
        <div className="absolute top-0 left-1/4 w-1/2 h-[500px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Specs & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Spec Cards */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <Settings size={16} className="text-amber-500" />
                Thông số kỹ thuật
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <SpecCard icon={<Zap size={20} />} label="Động cơ" value="V8 4.0L Bi-Turbo" />
                <SpecCard icon={<Gauge size={20} />} label="Tăng tốc" value="4.5s" />
                <SpecCard icon={<Users size={20} />} label="Chỗ ngồi" value="4 Ghế" />
                <SpecCard icon={<CalendarDays size={20} />} label="Sản xuất" value={car.manufacture_year} />
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <MessageCircle size={16} className="text-amber-500" />
                Tổng quan
              </h4>
              <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base text-justify">
                {car.description || 'Chiếc xe mang đến trải nghiệm đẳng cấp thương gia với không gian nội thất xa xỉ, vật liệu chế tác thủ công cao cấp cùng hàng loạt công nghệ an toàn và tiện nghi tối tân nhất thế giới hiện nay.'}
              </p>
            </div>

            {/* Call to Actions */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <button 
                onClick={handleBuy}
                disabled={buying || car.status !== 'available'}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-bold uppercase tracking-widest text-sm rounded-sm hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {buying ? <Loader2 className="animate-spin" size={18} /> : <Key size={18} className="group-hover:scale-110 transition-transform" />}
                {car.status !== 'available' ? 'Đã bán' : 'Đặt lịch xem xe'}
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="py-3.5 bg-zinc-900 border border-white/10 text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:border-amber-500/50 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group">
                  <MapPin size={14} className="text-amber-500 group-hover:scale-110 transition-transform" /> Báo giá lăn bánh
                </button>
                <button className="py-3.5 bg-transparent border border-transparent text-slate-400 hover:text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-white/5 transition-all underline underline-offset-4">
                  Thương lượng
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Bento Grid Gallery (8 cols) */}
          <div className="lg:col-span-8">
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Thư viện ảnh ({mediaList.length})
            </h4>
            
            {mediaList.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {mediaList.slice(0, 7).map((media, i) => {
                  let spanClass = "";
                  if (i === 0) spanClass = "col-span-2 row-span-2"; 
                  else if (i === 1 || i === 2) spanClass = "col-span-1 row-span-1";
                  else if (i === 3) spanClass = "col-span-1 md:col-span-2 row-span-1";
                  else spanClass = "col-span-1 row-span-1";

                  return (
                    <div 
                      key={i} 
                      className={`rounded-xl overflow-hidden relative group bg-zinc-900 border border-white/5 cursor-zoom-in hover:border-amber-500/40 transition-all ${spanClass}`}
                      onClick={() => setLightboxImage(media.url)}
                    >
                      <img 
                        src={media.url} 
                        alt={`Gallery ${i}`} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-md bg-black/40">
                          Xem toàn màn hình
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full h-[400px] border border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-500">
                Chưa có hình ảnh phụ
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// Subcomponent for Spec Cards
function SpecCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-lg p-4 hover:border-amber-500/40 hover:bg-zinc-800/80 transition-all group shadow-lg flex flex-col justify-between h-[100px]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-black rounded-md border border-white/10 text-slate-400 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
          {label}
        </span>
      </div>
      <p className="text-base font-semibold text-white tracking-wide">{value}</p>
    </div>
  );
}
"""

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Redesigned CarDetailModal again with Lightbox and 2/3 Layout!")
