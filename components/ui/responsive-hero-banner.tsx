"use client";
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface Partner {
    label?: string;
    colorClass?: string;
    href: string;
}

interface ResponsiveHeroBannerProps {
    backgroundImageUrl?: string;
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
    backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
    badgeLabel = "New",
    badgeText = "Bản cập nhật AI 2.0",
    title = "Định Giá Giá Trị Thực",
    titleLine2 = "Của Mọi Chiếc Xe",
    description = "Ứng dụng Trí tuệ nhân tạo và dữ liệu lớn để bóc tách hơn 30 biến số kỹ thuật.",
    primaryButtonText = "Định Giá Ngay",
    primaryButtonHref = "#",
    secondaryButtonText = "Xem Thư Viện",
    secondaryButtonHref = "#",
    partnersTitle = "Cơ sở dữ liệu được tích hợp từ các hệ thống uy tín",
    partners = []
}) => {
    return (
        <section className="w-full isolate h-[750px] overflow-hidden relative flex flex-col justify-center border-b border-white/5">
            {/* BACKGROUND */}
            <motion.img 
                initial={{ scale: 1.1, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={backgroundImageUrl} alt="Background" className="w-full h-full object-cover absolute inset-0" 
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* CONTENT CĂN GIỮA */}
            <div className="z-10 relative pt-16">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center"
                    >
                        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/5 px-2.5 py-2 ring-1 ring-white/10 backdrop-blur">
                            <span className="inline-flex items-center text-[10px] font-black uppercase text-black bg-white rounded-full py-0.5 px-2">
                                {badgeLabel}
                            </span>
                            <span className="text-sm font-medium text-white/90">
                                {badgeText}
                            </span>
                        </motion.div>

                        {/* Tiêu đề dùng font Serif */}
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] text-white tracking-tight font-serif">
                            {title}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-blue-400 to-indigo-500">{titleLine2}</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/70 max-w-2xl mt-6 mx-auto font-light leading-relaxed">
                            {description}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center">
                            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={primaryButtonHref} className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-bold text-white bg-white/10 ring-1 ring-white/20 rounded-full py-3.5 px-8 transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                {primaryButtonText}
                                <ArrowRight className="h-4 w-4" />
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={secondaryButtonHref} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white/70 hover:text-white transition-colors">
                                {secondaryButtonText}
                                <Play className="w-4 h-4 fill-current" />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* DÀN NÚT ĐỐI TÁC MÀU LOANG */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                        className="mx-auto mt-24 max-w-5xl"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/50 text-center mb-8">
                            {partnersTitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-8">
                            {partners.map((partner, index) => (
                                <motion.a 
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={index} 
                                    href={partner.href} 
                                    className="flex flex-col items-center gap-3 group cursor-pointer"
                                >
                                    <div className={`w-[120px] h-[36px] rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] ${partner.colorClass}`}></div>
                                    {partner.label && (
                                        <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">
                                            {partner.label}
                                        </span>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ResponsiveHeroBanner;