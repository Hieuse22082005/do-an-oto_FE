"use client";

import { motion } from "framer-motion";

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Digit({ digit, index }: { digit: string; index: number }) {
  const isNumber = !isNaN(Number(digit)) && digit !== " ";
  
  if (!isNumber) {
    return <span className="inline-block translate-y-[0.05em]">{digit}</span>;
  }

  const targetNum = Number(digit);
  
  // Create an array with 3 sets of 0-9 to simulate a long spin
  const spinArray = [...NUMBERS, ...NUMBERS, ...NUMBERS]; 
  const finalIndex = 20 + targetNum; // The target is in the 3rd set

  // Total items = 30
  // Translation percentage per item = 100 / 30
  
  return (
    <div className="inline-block relative overflow-hidden h-[1.1em] leading-[1.1em] -mb-[0.1em]">
      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: `-${finalIndex * (100 / 30)}%` }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 1.5 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        {spinArray.map((n, i) => (
          <span key={i} className="h-[1.1em] flex items-center justify-center">
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function SlotMachineText({ text, className = "" }: { text: string; className?: string }) {
  const chars = text.split("");
  return (
    <div className={`inline-flex items-center overflow-hidden align-bottom ${className}`}>
      {chars.map((char, i) => (
        <Digit key={`${i}-${char}`} digit={char} index={i} />
      ))}
    </div>
  );
}
