
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface CarDetailModalProps {
  car: any;
  onClose: () => void;
  onBuy: () => Promise<void>;
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

        {/* Left Side: Poster Image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={car.image_url} 
            alt={car.model} 
            className="w-full h-full object-cover"
          />
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

            <p className="text-sm tracking-wide text-white/70 leading-relaxed mb-10 max-w-md">
              {car.description}
            </p>
            
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
