import React from 'react';

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
}

const StaticProof: React.FC<ProofProps> = ({ src, className }) => {
  return (
    <div
      className={`absolute ${className} overflow-hidden rounded-xl shadow-sm`}
      style={{
        opacity: 0.15, // 調整至可見的微半透明
        filter: 'grayscale(100%)', // 轉成灰階以避免色彩干擾背景
        mixBlendMode: 'multiply'
      }}
    >
      <img src={src} alt="proof" className="w-full h-full object-cover" />
    </div>
  );
};

export const FloatingProofsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  // 建立大範圍的隨機散落感
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden ${className}`}>
      <div className="relative w-full h-[120vh] max-w-[1600px] mx-auto mix-blend-multiply">
        <StaticProof src={IMAGES[0]} className="w-[15%] top-[5%] left-[2%] -rotate-6" />
        <StaticProof src={IMAGES[1]} className="w-[12%] top-[15%] right-[5%] rotate-12" />
        <StaticProof src={IMAGES[2]} className="w-[18%] top-[35%] left-[8%] rotate-3" />
        <StaticProof src={IMAGES[3]} className="w-[14%] top-[30%] right-[15%] -rotate-12" />
        <StaticProof src={IMAGES[4]} className="w-[20%] top-[60%] left-[-2%] rotate-6" />
        <StaticProof src={IMAGES[5]} className="w-[15%] top-[65%] right-[8%] -rotate-3" />
        <StaticProof src={IMAGES[6]} className="w-[12%] top-[85%] left-[18%] -rotate-6" />
        <StaticProof src={IMAGES[7]} className="w-[16%] top-[80%] right-[25%] rotate-12" />
        <StaticProof src={IMAGES[8]} className="w-[22%] top-[90%] right-[-5%] -rotate-12" />
        
        {/* 補充中間縫隙，營造鋪滿的感覺 */}
        <StaticProof src={IMAGES[2]} className="w-[15%] top-[10%] left-[40%] rotate-6 opacity-40" />
        <StaticProof src={IMAGES[5]} className="w-[18%] top-[45%] left-[45%] -rotate-6 opacity-40" />
        <StaticProof src={IMAGES[0]} className="w-[14%] top-[85%] left-[55%] rotate-12 opacity-40" />
        <StaticProof src={IMAGES[7]} className="w-[12%] top-[5%] right-[35%] -rotate-12 opacity-40" />
      </div>
    </div>
  );
};
