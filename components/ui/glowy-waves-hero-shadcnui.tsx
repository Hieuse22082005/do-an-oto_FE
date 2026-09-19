"use client";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

import { Button } from "@/components/ui/button";

type Point = {
  x: number;
  y: number;
};

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const highlightPills = [
  "Trí tuệ nhân tạo",
  "Blockchain",
  "Dữ liệu lớn",
] as const;

const heroStats: { label: string; value: string }[] = [
  { label: "Lượt định giá", value: "8M+" },
  { label: "Tốc độ xử lý", value: "8ms" },
  { label: "Đại lý liên kết", value: "120+" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

export function GlowyWavesHero({ onTryNow }: { onTryNow?: () => void }) {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;

    const computeThemeColors = () => {
      const isLight = resolvedTheme === "light";
      return {
        backgroundTop: isLight ? "#ffffff" : "#09090b",
        backgroundBottom: isLight ? "#f8f9fa" : "#111", 
        wavePalette: [
          {
            offset: 0,
            amplitude: 70,
            frequency: 0.003,
            color: "rgba(59, 130, 246, 0.8)", // blue-500
            opacity: 0.45,
          },
          {
            offset: Math.PI / 2,
            amplitude: 90,
            frequency: 0.0026,
            color: "rgba(139, 92, 246, 0.7)", // violet-500
            opacity: 0.35,
          },
          {
            offset: Math.PI,
            amplitude: 60,
            frequency: 0.0034,
            color: "rgba(236, 72, 153, 0.65)", // pink-500
            opacity: 0.3,
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 80,
            frequency: 0.0022,
            color: "rgba(245, 158, 11, 0.25)", // amber-500
            opacity: 0.25,
          },
          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            color: isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.2)",
            opacity: 0.2,
          },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Adjust mouse pos relative to canvas
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      recenterMouse();
    };

    resizeCanvas();
    recenterMouse();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      time += 1;

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, themeColors.backgroundTop);
      gradient.addColorStop(1, themeColors.backgroundBottom);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      themeColors.wavePalette.forEach(drawWave);

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [resolvedTheme]);

  return (
    <section
      className="relative isolate flex min-h-[750px] w-full items-center justify-center overflow-hidden bg-white dark:bg-black border-b border-black/5 dark:border-white/5"
      role="region"
      aria-label="Glowing waves hero section"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-60"
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-purple-500/[0.05] blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/[0.05] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.15] text-slate-900 dark:text-white tracking-tight font-extrabold font-sans"
          >
            Định Giá Trị Thực 
            
            <br/>
            <span className="bg-gradient-to-r from-blue-600 dark:from-blue-400 via-indigo-600 dark:via-indigo-500 to-purple-600 dark:to-purple-400 bg-clip-text text-transparent">
              Của Mọi Chiếc Xe
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-700 dark:text-gray-300 md:text-xl font-medium leading-relaxed"
          >
            Tiên phong ứng dụng mô hình định lượng AI đa biến để tính toán tỷ lệ khấu hao. Mọi dữ liệu đều được bảo chứng minh bạch tuyệt đối qua nền tảng Blockchain.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onTryNow}
                size="lg"
                className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/50 shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Định Giá Ngay
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                    document.getElementById("thu-vien")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-8 py-6 text-base font-semibold text-slate-800 dark:text-white/90 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:border-black/30 dark:hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
              >
                Xem Thư Viện
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-700 dark:text-white/70 font-semibold"
          >
            {highlightPills.map((pill) => (
              <motion.li
                key={pill}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)" }}
                className="rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 px-5 py-2.5 backdrop-blur-md cursor-default transition-colors shadow-lg"
              >
                {pill}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={statsVariants}
            className="grid gap-4 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 p-6 backdrop-blur-xl sm:grid-cols-3 mx-auto max-w-4xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="space-y-2 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 relative z-10"
              >
                <div className="text-[11px] uppercase tracking-[0.3em] text-blue-700 dark:text-blue-300/70 font-black">
                  {stat.label}
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-white drop-shadow-md">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
