import codecs

file_path = 'components/modals/CarDetailModal.tsx'
content = """"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Zap, Gauge, Users, Calendar, CheckCircle2, MessageCircle, CalendarDays, Key, MapPin } from 'lucide-react';

interface CarDetailModalProps {
  car: any;
  onClose: () => void;
  onBuy: () => Promise<void>;
}

export default function CarDetailModal({ car, onClose, onBuy }: CarDetailModalProps) {
  const [activeMedia, setActiveMedia] = useState(0);
  const [isHoveringGallery, setIsHoveringGallery] = useState(false);
  const [buying, setBuying] = useState(false);

  // Build media list
  const mediaList: { type: string, url: string }[] = [];
  if (car.video_url) {
    mediaList.push({ type: 'video', url: car.video_url });
  }
  if (car.image_url) {
    mediaList.push({ type: 'image', url: car.image_url });
  }
  if (car.gallery && Array.isArray(car.gallery)) {
    car.gallery.forEach((url: string) => {
      mediaList.push({ type: 'image', url: url });
    });
  }

  // Auto-slide gallery for Hero
  useEffect(() => {
    if (mediaList.length <= 1 || isHoveringGallery) return;
    
    // Stop sliding if it's a video
    if (mediaList[activeMedia]?.type === 'video') return;
    
    const interval = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % mediaList.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [mediaList.length, isHoveringGallery, activeMedia]);

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
      {/* Floating Close Button */}
      <button 
        onClick={onClose} 
        className="fixed top-6 right-6 z-[60] bg-black/40 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/10 hover:text-amber-500 border border-white/10 transition-all shadow-xl hover:scale-110"
      >
        <X size={24} />
      </button>

      {/* 1. HERO SECTION */}
      <div 
        className="relative w-full h-[70vh] md:h-[80vh] flex items-end overflow-hidden"
        onMouseEnter={() => setIsHoveringGallery(true)}
        onMouseLeave={() => setIsHoveringGallery(false)}
      >
        <AnimatePresence>
          <motion.div
            key={activeMedia}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0 flex items-center justify-center bg-black"
          >
            {mediaList[activeMedia]?.type === 'video' ? (
              <video 
                src={mediaList[activeMedia].url} 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              />
            ) : (
              <img src={mediaList[activeMedia]?.url} alt={car.model} className="w-full h-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay for Text Readability & Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-900/20 to-transparent mix-blend-overlay"></div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 pb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-3 drop-shadow-md"
          >
            {car.brand}
          </motion.h3>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-2xl"
          >
            {car.model}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <p className="text-3xl md:text-4xl font-light text-slate-100 drop-shadow-lg">
              <span className="text-amber-500 font-medium mr-1">$</span>
              {car.sell_price?.toLocaleString()}
            </p>
            <div className="flex gap-3">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium tracking-widest uppercase border border-white/20 text-white shadow-xl">
                {car.condition}
              </span>
              <span className="px-4 py-1.5 bg-amber-500/10 backdrop-blur-md rounded-full text-xs font-medium tracking-widest uppercase border border-amber-500/30 text-amber-400 shadow-xl">
                Năm {car.manufacture_year}
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Slideshow Progress Indicators */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 flex gap-2 z-20">
            {mediaList.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveMedia(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeMedia === idx ? 'w-8 bg-amber-500' : 'w-2 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="w-full px-6 md:px-12 lg:px-24 py-16 max-w-[1600px] mx-auto relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[500px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Specs & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Spec Cards (Glowing Cards) */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <Settings size={16} className="text-amber-500" />
                Thông số kỹ thuật
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <SpecCard icon={<Zap size={20} />} label="Động cơ" value="V8 4.0L Bi-Turbo" />
                <SpecCard icon={<Gauge size={20} />} label="Tăng tốc" value="4.5s (0-100km/h)" />
                <SpecCard icon={<Users size={20} />} label="Chỗ ngồi" value="4 Ghế VIP" />
                <SpecCard icon={<CalendarDays size={20} />} label="Sản xuất" value={car.manufacture_year} />
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <MessageCircle size={16} className="text-amber-500" />
                Tổng quan
              </h4>
              <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base">
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

          {/* Right Column: Bento Grid Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Thư viện ảnh
            </h4>
            
            {mediaList.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[220px]">
                {mediaList.slice(0, 5).map((media, i) => {
                  // Determine grid span based on index for a Bento style
                  let spanClass = "";
                  if (i === 0) spanClass = "col-span-2 row-span-2"; // Large feature image
                  else if (i === 1 || i === 2) spanClass = "col-span-1 row-span-1";
                  else if (i === 3) spanClass = "col-span-1 md:col-span-2 row-span-1";
                  else spanClass = "col-span-1 row-span-1";

                  return (
                    <div 
                      key={i} 
                      className={`rounded-xl overflow-hidden relative group bg-zinc-900 border border-white/5 cursor-pointer hover:border-amber-500/30 transition-colors ${spanClass}`}
                      onClick={() => {
                        setActiveMedia(i);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {media.type === 'video' ? (
                        <video src={media.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                      ) : (
                        <img src={media.url} alt={`Gallery ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                      )}
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 border border-amber-500/50 px-2 py-1 rounded backdrop-blur-md bg-black/30">
                          {media.type === 'video' ? 'Phát Video' : 'Xem Ảnh'}
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
    <div className="bg-zinc-900/80 backdrop-blur border border-white/5 rounded-lg p-4 hover:border-amber-500/40 hover:bg-zinc-800/80 transition-all group shadow-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-black rounded-md border border-white/10 text-slate-400 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-colors">
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">{label}</span>
      </div>
      <p className="text-base font-semibold text-white tracking-wide pl-1">{value}</p>
    </div>
  );
}
"""

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Redesigned CarDetailModal!")
