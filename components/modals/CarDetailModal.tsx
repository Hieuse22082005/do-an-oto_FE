"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Zap, Gauge, Users, CalendarDays, Key, MapPin, Loader2, Cog, Fuel, Activity, Star, Play, ShieldCheck, FileText, Banknote, Truck, Check } from 'lucide-react';

interface CarDetailModalProps {
  car: any;
  onClose: () => void;
  onBuy: () => Promise<void>;
}

export default function CarDetailModal({ car, onClose, onBuy }: CarDetailModalProps) {
  const [buying, setBuying] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  // Magnifier states
  const [backgroundPosition, setBackgroundPosition] = useState('50% 50%');
  const [isZooming, setIsZooming] = useState(false);
  // Auto-play state
  const [isHovering, setIsHovering] = useState(false);

  // Build unified media list including video as the first item
  const allMedia: { type: 'video' | 'image', url: string }[] = [];
  
  if (car.video_url) {
    allMedia.push({ type: 'video', url: car.video_url });
  } else if (car.image_url) {
    allMedia.push({ type: 'image', url: car.image_url });
  }
  
  if (car.gallery && Array.isArray(car.gallery)) {
    car.gallery.forEach((url: string) => {
      if (url !== car.image_url) {
        allMedia.push({ type: 'image', url: url });
      }
    });
  }

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Auto-play carousel logic
  useEffect(() => {
    if (isHovering || allMedia.length <= 1 || lightboxIndex !== null) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % allMedia.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allMedia.length, isHovering, lightboxIndex]);

  const handleBuy = async () => {
    setBuying(true);
    await onBuy();
    setBuying(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 font-sans"
      onClick={onClose}
    >
      {/* Lightbox for full screen images */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + allMedia.length) % allMedia.length); }}
              className="absolute left-4 z-50 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            {allMedia[lightboxIndex].type === 'video' ? (
               <video 
                 src={allMedia[lightboxIndex].url} 
                 className="max-w-full max-h-full object-contain" 
                 autoPlay loop muted playsInline
                 onClick={(e) => e.stopPropagation()} 
               />
            ) : (
               <img 
                 src={allMedia[lightboxIndex].url} 
                 className="max-w-full max-h-full object-contain" 
                 onClick={(e) => e.stopPropagation()} 
               />
            )}

            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % allMedia.length); }}
              className="absolute right-4 z-50 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} 
              className="absolute top-6 right-6 z-50 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 hover:text-amber-500"
            >
              <X size={24} />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-mono bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              {lightboxIndex + 1} / {allMedia.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Boxed Modal Container */}
      <div 
        className="w-full max-w-[1400px] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden relative flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Floating Close Button for Modal */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-[60] bg-white/80 backdrop-blur-md p-2.5 rounded-full text-slate-800 hover:bg-white hover:text-amber-600 border border-slate-200 transition-all shadow-md hover:scale-110"
        >
          <X size={20} />
        </button>

        {/* LEFT: Media Column */}
        <div className="h-[40vh] lg:h-full w-full lg:w-[45%] flex-shrink-0 bg-slate-100 flex flex-col border-r border-slate-200 z-20">
          
          {/* Main Display (object-cover fills the frame beautifully) */}
          <div 
            className="flex-1 relative cursor-crosshair overflow-hidden bg-slate-200"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => { setIsZooming(false); setBackgroundPosition('50% 50%'); }}
            onMouseMove={handleMouseMove}
            onClick={() => setLightboxIndex(selectedIndex)}
          >
            <AnimatePresence>
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {allMedia[selectedIndex]?.type === 'video' ? (
                  <video 
                    src={allMedia[selectedIndex].url} 
                    className="w-full h-full object-cover contrast-[1.05] saturate-[1.1] brightness-[1.02] ease-out" 
                    style={{ 
                       transformOrigin: backgroundPosition,
                       transform: isZooming ? 'scale(1.5)' : 'scale(1)',
                       transitionDuration: isZooming ? '100ms' : '400ms'
                    }}
                    autoPlay loop muted playsInline 
                  />
                ) : (
                  <img 
                    src={allMedia[selectedIndex]?.url} 
                    alt={car.model} 
                    className="w-full h-full object-cover contrast-[1.05] saturate-[1.1] brightness-[1.02] ease-out" 
                    style={{ 
                       transformOrigin: backgroundPosition,
                       transform: isZooming ? 'scale(2)' : 'scale(1)',
                       transitionDuration: isZooming ? '100ms' : '400ms'
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mini Gallery */}
          {allMedia.length > 1 && (
            <div className="bg-white border-t border-slate-200 p-4 flex flex-wrap gap-3 overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {allMedia.map((media, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <div 
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`relative w-[70px] h-[70px] md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-amber-500 shadow-md opacity-100 scale-105 z-10' : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-amber-400 hover:scale-110'}`}
                  >
                    {media.type === 'video' ? (
                       <div className="w-full h-full bg-slate-200 relative">
                          <video src={media.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                             <div className="w-6 h-6 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center">
                                <Play size={12} className="text-white ml-0.5" fill="currentColor" />
                             </div>
                          </div>
                       </div>
                    ) : (
                       <img src={media.url} className="w-full h-full object-cover" />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* RIGHT: Text & Information */}
        <div className="flex-1 h-full bg-white overflow-y-auto p-6 md:p-10 lg:p-12 relative scrollbar-thin scrollbar-thumb-slate-200">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col min-h-full">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-amber-600 font-bold tracking-[0.4em] uppercase text-xs mb-3"
            >
              {car.brand}
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 leading-tight"
            >
              {car.model}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-3xl font-semibold text-slate-800 mb-6"
            >
              <span className="text-amber-500 font-bold mr-2">$</span>
              {car.sell_price?.toLocaleString()}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <span className="px-4 py-1.5 bg-slate-100 rounded-md text-xs font-bold tracking-widest uppercase text-slate-600">
                {car.condition}
              </span>
              <span className="px-4 py-1.5 bg-amber-50 rounded-md text-xs font-bold tracking-widest uppercase text-amber-700">
                Năm {car.manufacture_year}
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-slate-600 leading-relaxed text-sm lg:text-base text-justify mb-8"
            >
              {car.description || 'Chiếc xe mang đến trải nghiệm đẳng cấp với không gian nội thất xa xỉ, vật liệu chế tác thủ công cao cấp cùng hàng loạt công nghệ an toàn và tiện nghi tối tân nhất thế giới hiện nay. Sự kết hợp hoàn hảo giữa hiệu suất vượt trội và sự sang trọng tuyệt đối.'}
            </motion.p>
            
            <div className="w-full h-px bg-slate-100 mb-8"></div>

            {/* MORE TEXT: Specs & Features moved to Right Pane */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Settings size={16} className="text-amber-500" /> Thông số kỹ thuật
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <SpecCard icon={<Zap size={16} />} label="Động cơ" value="V8 4.0L" />
                <SpecCard icon={<Activity size={16} />} label="Công suất" value="450 HP" />
                <SpecCard icon={<Gauge size={16} />} label="Tăng tốc" value="4.5s" />
                <SpecCard icon={<Cog size={16} />} label="Hộp số" value="9 Cấp" />
              </div>

              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Star size={16} className="text-amber-500" /> Option Nổi bật
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                {['Hệ thống âm thanh vòm High-End 21 loa', 'Màn hình HUD thực tế ảo (AR HUD)', 'Cửa sổ trời toàn cảnh Panorama', 'Ghế da Nappa massage làm mát', 'Hệ thống treo khí nén tự động', 'Gói công nghệ an toàn ADAS'].map((opt, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm font-medium">{opt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="w-full h-px bg-slate-100 mb-6 mt-auto"></div>

            {/* CTAs and Guarantees */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="pb-4">
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                 <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <ShieldCheck className="text-amber-500" size={16} /> Bảo hành chính hãng
                 </div>
                 <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <FileText className="text-amber-500" size={16} /> Cam kết không đâm đụng
                 </div>
                 <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Banknote className="text-amber-500" size={16} /> Trả góp tới 80%
                 </div>
                 <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Truck className="text-amber-500" size={16} /> Giao xe tận nhà
                 </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleBuy}
                  disabled={buying || car.status !== 'available'}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/20 font-bold uppercase tracking-widest text-sm rounded-lg hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {buying ? <Loader2 className="animate-spin" size={18} /> : <Key size={18} className="group-hover:rotate-12 transition-transform" />}
                  {car.status !== 'available' ? 'Đã bán' : 'Đặt lịch xem xe ngay'}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-white border border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                    <MapPin size={14} className="text-amber-600" /> Báo giá lăn bánh
                  </button>
                  <button className="py-3 bg-slate-50 border border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-slate-100 transition-all">
                    Thương lượng giá
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}

// Subcomponent for Spec Cards
function SpecCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between hover:border-amber-300 transition-colors h-[80px]">
      <div className="flex items-center gap-2">
        <div className="text-slate-400">
          {icon}
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
          {label}
        </span>
      </div>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}
