
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface CarDetailModalProps {
  car: any;
  onClose: () => void;
  onBuy: () => Promise<void>;
}


function MagnifierImage({ src, alt }: { src: string; alt: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  return (
    <div 
      className="relative w-full h-full cursor-zoom-in overflow-hidden"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={(e) => {
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
        setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />

      {showMagnifier && (
        <div 
          className="absolute pointer-events-none rounded-full"
          style={{
            display: "block",
            width: "300px",
            height: "300px",
            left: `${cursorPosition.x - 150}px`,
            top: `${cursorPosition.y - 150}px`,
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "250%", 
            backgroundPosition: `${position.x}% ${position.y}%`,
            zIndex: 50,
            boxShadow: "0 0 0 7px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)"
          }}
        />
      )}
    </div>
  );
}

export default function CarDetailModal({ car, onClose, onBuy }: CarDetailModalProps) {

  const [buying, setBuying] = useState(false);
  
  // Prevent scrolling when modal is open
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

  const formatPrice = (price: number | string) => {
    const num = Number(price);
    if (isNaN(num)) return price;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-black/90 text-white overflow-hidden flex items-center justify-center p-4 md:p-10"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full max-w-7xl bg-[#1a1720] rounded-2xl flex flex-col md:flex-row relative overflow-hidden shadow-2xl"
      >
        
        {/* Back Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 z-50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center transition-all border border-white/10"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Left Side: Poster Image with Magnifier */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex items-center justify-center overflow-hidden group">
          <MagnifierImage src={car.image_url} alt={car.model} />
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-16 relative">
          
          <div className="absolute top-8 right-8 flex flex-col items-end opacity-30">
            <h2 className="text-sm tracking-[0.5em] font-light">S M A R T C A R</h2>
            <p className="text-[10px] tracking-widest mt-1">EST. 2024</p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-2">{car.brand}</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white mb-4 leading-none">
              {car.model}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/10">{car.condition}</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/10">{car.manufacture_year} MODEL</span>
            </div>

            <p className="text-sm tracking-wide text-white/70 leading-relaxed mb-6 max-w-md">
              {car.description}
            </p>

            {/* MOCK SPECS */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md border-t border-white/10 pt-6">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Động cơ</p>
                <p className="text-sm font-bold text-white">
                  {car.brand.toLowerCase() === 'porsche' ? 'Flat-6 4.0L' : 
                   car.brand.toLowerCase() === 'audi' ? 'Dual Motor Electric' : 
                   'V8 Bi-Turbo 4.0L'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Tốc độ tối đa</p>
                <p className="text-sm font-bold text-white">
                  {car.brand.toLowerCase() === 'porsche' ? '320 km/h' : 
                   car.brand.toLowerCase() === 'audi' ? '250 km/h' : 
                   '280 km/h'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Tăng tốc 0-100 km/h</p>
                <p className="text-sm font-bold text-white">
                  {car.brand.toLowerCase() === 'porsche' ? '3.2 giây' : 
                   car.brand.toLowerCase() === 'audi' ? '3.3 giây' : 
                   '4.5 giây'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Tính năng nổi bật</p>
                <p className="text-xs text-white/80 line-clamp-2">Cửa sổ trời, Camera 360, Hỗ trợ phanh khẩn cấp, Loa cao cấp</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mb-8">
              <p className="text-xs text-white/50 tracking-widest uppercase">Giá lăn bánh</p>
              <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {formatPrice(car.sell_price)}
              </p>
            </div>

            <button 
              onClick={handleBuy}
              disabled={buying}
              className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform rounded-sm flex items-center justify-center gap-3 w-full md:w-auto"
            >
              {buying ? <Loader2 className="animate-spin w-5 h-5" /> : 'Mua Xe / Buy Now'}
            </button>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}
