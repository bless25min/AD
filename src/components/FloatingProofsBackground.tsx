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

interface SnowflakeData {
  src: string;
  width: string;
  left: string;
  duration: string;
  delay: string;
  startRot: string;
  endRot: string;
}

// 寫死 20 個隨機錯落的設定，避免 React Hydration 錯誤
const SNOWFLAKES: SnowflakeData[] = [
  { src: IMAGES[0], width: '22%', left: '2%', duration: '28s', delay: '-5s', startRot: '-10deg', endRot: '10deg' },
  { src: IMAGES[1], width: '40%', left: '35%', duration: '35s', delay: '-15s', startRot: '15deg', endRot: '-5deg' },
  { src: IMAGES[2], width: '45%', left: '55%', duration: '30s', delay: '-8s', startRot: '5deg', endRot: '25deg' },
  { src: IMAGES[3], width: '42%', left: '10%', duration: '40s', delay: '-25s', startRot: '-20deg', endRot: '0deg' },
  { src: IMAGES[4], width: '48%', left: '50%', duration: '32s', delay: '-2s', startRot: '0deg', endRot: '-15deg' },
  { src: IMAGES[5], width: '10%', left: '12%', duration: '22s', delay: '-18s', startRot: '-5deg', endRot: '15deg' },
  { src: IMAGES[6], width: '8%', left: '35%', duration: '20s', delay: '-7s', startRot: '10deg', endRot: '-10deg' },
  { src: IMAGES[7], width: '12%', left: '85%', duration: '24s', delay: '-12s', startRot: '-15deg', endRot: '5deg' },
  { src: IMAGES[8], width: '10%', left: '55%', duration: '18s', delay: '-22s', startRot: '20deg', endRot: '-20deg' },
  
  // 第二波重複，確保大圖也能隨機出現展示數據
  { src: IMAGES[0], width: '20%', left: '30%', duration: '33s', delay: '-10s', startRot: '12deg', endRot: '-8deg' },
  { src: IMAGES[2], width: '45%', left: '5%', duration: '38s', delay: '-28s', startRot: '-15deg', endRot: '10deg' },
  { src: IMAGES[4], width: '42%', left: '60%', duration: '31s', delay: '-20s', startRot: '10deg', endRot: '-10deg' },
  { src: IMAGES[5], width: '11%', left: '25%', duration: '26s', delay: '-4s', startRot: '-8deg', endRot: '12deg' },
  { src: IMAGES[6], width: '9%', left: '65%', duration: '21s', delay: '-16s', startRot: '15deg', endRot: '-5deg' },
  { src: IMAGES[7], width: '13%', left: '50%', duration: '27s', delay: '-9s', startRot: '-5deg', endRot: '-25deg' },
  { src: IMAGES[8], width: '10%', left: '90%', duration: '19s', delay: '-3s', startRot: '-12deg', endRot: '12deg' },
  { src: IMAGES[1], width: '38%', left: '15%', duration: '36s', delay: '-32s', startRot: '5deg', endRot: '-15deg' },
  { src: IMAGES[3], width: '40%', left: '70%', duration: '34s', delay: '-14s', startRot: '-10deg', endRot: '20deg' },
];

export const FloatingProofsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden ${className}`}>
      <style>{`
        @keyframes proofWaterfall {
          0% {
            transform: translateY(-50vh) rotate(var(--start-rot));
          }
          100% {
            transform: translateY(150vh) rotate(var(--end-rot));
          }
        }
        .proof-snowflake {
          position: absolute;
          top: 0;
          will-change: transform;
          animation-name: proofWaterfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      <div className="relative w-full h-full max-w-[1600px] mx-auto mix-blend-multiply">
        {SNOWFLAKES.map((data, index) => (
          <div
            key={index}
            className="proof-snowflake overflow-hidden rounded-xl shadow-sm"
            style={{
              width: data.width,
              left: data.left,
              animationDuration: data.duration,
              animationDelay: data.delay,
              // 傳遞 CSS 變數給 keyframes
              '--start-rot': data.startRot,
              '--end-rot': data.endRot,
              opacity: 0.12, // 微半透明
              filter: 'grayscale(100%)', // 拿掉模糊效果，只保留灰階讓數據清晰可見
            } as React.CSSProperties}
          >
            <img src={data.src} alt="proof waterfall" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};
