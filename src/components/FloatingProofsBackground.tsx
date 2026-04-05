import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  '/images/proofs/廣告成效.jpg',
  '/images/proofs/廣告成效1.png',
  '/images/proofs/廣告成效2.png',
  '/images/proofs/廣告成效3.png',
  '/images/proofs/廣告成效示意圖.jpg',
  '/images/proofs/媒體報導示意圖.jpg',
  '/images/proofs/媒體報導示意圖2.jpg',
  '/images/proofs/媒體報導示意圖3.jpg',
  '/images/proofs/媒體報導示意圖4.jpg'
];

interface ProofProps {
  src: string;
  className: string;
  delay: number;
  duration: number;
  yOffset: number;
}

const FloatingProof: React.FC<ProofProps> = ({ src, className, delay, duration, yOffset }) => {
  return (
    <motion.div
      className={`absolute ${className} overflow-hidden rounded-xl shadow-2xl`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: [0.03, 0.08, 0.03], 
        y: [0, yOffset, 0] 
      }}
      transition={{
        opacity: { duration, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }
      }}
      style={{
        filter: 'grayscale(100%) contrast(120%)',
        mixBlendMode: 'multiply'
      }}
    >
      <img src={src} alt="proof" className="w-full h-full object-cover opacity-80" />
    </motion.div>
  );
};

export const FloatingProofsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* 讓底色帶有一點漸層，讓小圖不會太過突兀 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white z-10"></div>
      
      {/* Layout for scattered images */}
      <div className="relative w-full h-full max-w-[1400px] mx-auto opacity-70">
        <FloatingProof src={IMAGES[0]} className="w-48 md:w-64 top-[5%] left-[2%] -rotate-6" delay={0} duration={8} yOffset={-30} />
        <FloatingProof src={IMAGES[1]} className="w-40 md:w-56 top-[15%] right-[5%] rotate-12" delay={2} duration={9} yOffset={25} />
        <FloatingProof src={IMAGES[2]} className="w-52 md:w-72 top-[35%] left-[10%] rotate-3" delay={4} duration={10} yOffset={-20} />
        <FloatingProof src={IMAGES[3]} className="w-48 md:w-64 top-[30%] right-[15%] -rotate-12" delay={1} duration={11} yOffset={40} />
        <FloatingProof src={IMAGES[4]} className="w-56 md:w-80 top-[55%] left-[-5%] rotate-6" delay={3} duration={12} yOffset={-35} />
        <FloatingProof src={IMAGES[5]} className="w-44 md:w-60 top-[60%] right-[2%] -rotate-3" delay={5} duration={9} yOffset={30} />
        <FloatingProof src={IMAGES[6]} className="w-40 md:w-56 top-[80%] left-[20%] -rotate-6" delay={2} duration={8} yOffset={-20} />
        <FloatingProof src={IMAGES[7]} className="w-48 md:w-64 top-[75%] right-[25%] rotate-12" delay={4} duration={10} yOffset={25} />
        <FloatingProof src={IMAGES[8]} className="w-64 md:w-96 top-[85%] right-[-10%] -rotate-12" delay={1} duration={11} yOffset={-40} />
        
        {/* Fill more spaces with staggered duplicates for a "paved" look */}
        <FloatingProof src={IMAGES[2]} className="w-32 md:w-48 top-[10%] left-[40%] rotate-45 opacity-50" delay={3} duration={13} yOffset={-20} />
        <FloatingProof src={IMAGES[5]} className="w-40 md:w-56 top-[45%] left-[45%] -rotate-12 opacity-50" delay={7} duration={10} yOffset={30} />
        <FloatingProof src={IMAGES[0]} className="w-36 md:w-52 top-[80%] left-[60%] rotate-12 opacity-50" delay={2} duration={9} yOffset={-25} />
        <FloatingProof src={IMAGES[7]} className="w-48 md:w-64 top-[5%] right-[40%] -rotate-12 opacity-50" delay={6} duration={12} yOffset={25} />
      </div>
    </div>
  );
};
