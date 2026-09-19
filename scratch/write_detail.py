import codecs

content = """
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#1a1720] text-white overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col relative pb-20">
        
        {/* Back Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 z-50 bg-white text-black w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Brand Header */}
        <div className="w-full pt-12 pb-8 flex flex-col items-center justify-center z-10">
          <h2 className="text-sm tracking-[0.5em] font-light">S M A R T C A R</h2>
          <p className="text-[10px] tracking-widest text-white/50 mt-2">EST. 2024</p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-4xl mx-auto relative px-4 flex flex-col items-center">
          
          {/* 3 Gallery Images Grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 w-full h-[300px] md:h-[450px] relative z-0">
            {car.gallery_images?.map((img: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                className="w-full h-full relative overflow-hidden bg-slate-800"
              >
                <img src={img} alt={`${car.title} detail ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1720] opacity-80"></div>
              </motion.div>
            ))}
          </div>

          {/* Overlapping Main Car Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-[110%] md:w-[120%] -mt-32 md:-mt-48 relative z-10 flex justify-center pointer-events-none"
          >
            <img 
              src={car.main_image} 
              alt={car.title} 
              className="w-full max-w-5xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
            />
          </motion.div>

          {/* Typography details */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center -mt-10 md:-mt-20 z-20 relative w-full"
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-widest uppercase text-white/90 text-center">
              {car.title}
            </h1>
            
            <div className="flex items-center gap-4 mt-2 mb-8 w-full max-w-md">
              <div className="h-[1px] flex-1 bg-white/20"></div>
              <p className="text-xs tracking-[0.3em] text-white/60 uppercase text-center whitespace-nowrap">{car.generation}</p>
              <div className="h-[1px] flex-1 bg-white/20"></div>
            </div>

            <p className="text-[10px] md:text-xs tracking-widest text-center text-white/50 max-w-xl leading-loose uppercase mb-10 px-4">
              {car.long_description}
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
              <p className="text-3xl font-bold text-white tracking-widest">
                {String(car.price).includes('$') ? car.price : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(car.price))}
              </p>
              <button 
                onClick={handleBuy}
                disabled={buying}
                className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform rounded-sm flex items-center gap-2"
              >
                {buying ? <Loader2 className="animate-spin w-4 h-4" /> : 'Mua Ngay (Buy Now)'}
              </button>
            </div>

          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
}
"""

with codecs.open('components/modals/CarDetailModal.tsx', 'w', 'utf-8') as f:
    f.write(content)
