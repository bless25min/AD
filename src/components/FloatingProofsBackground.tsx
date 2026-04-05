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
  opacity: number;
}

// 寫死 18 個隨機錯落的設定，避免 React Hydration 錯誤
const SNOWFLAKES: SnowflakeData[] = [
  // 廣告成效 (48% ~ 64%) -> 提高透明度以增加數據清晰度
  { src: IMAGES[0], width: '50%', left: '-5%', duration: '36s', delay: '-2s', startRot: '-10deg', endRot: '10deg', opacity: 0.22 },
  { src: IMAGES[1], width: '60%', left: '35%', duration: '36s', delay: '-4s', startRot: '15deg', endRot: '-5deg', opacity: 0.22 },
  { src: IMAGES[2], width: '64%', left: '45%', duration: '36s', delay: '-6s', startRot: '5deg', endRot: '25deg', opacity: 0.22 },
  { src: IMAGES[3], width: '55%', left: '10%', duration: '36s', delay: '-8s', startRot: '-20deg', endRot: '0deg', opacity: 0.22 },
  { src: IMAGES[4], width: '48%', left: '50%', duration: '36s', delay: '-10s', startRot: '0deg', endRot: '-15deg', opacity: 0.22 },
  
  // 媒體報導 (改為 24% ~ 36%) -> 維持微弱背景感並且比例適度縮小
  { src: IMAGES[5], width: '28%', left: '5%', duration: '36s', delay: '-12s', startRot: '-5deg', endRot: '15deg', opacity: 0.1 },
  { src: IMAGES[6], width: '30%', left: '35%', duration: '36s', delay: '-14s', startRot: '10deg', endRot: '-10deg', opacity: 0.1 },
  { src: IMAGES[7], width: '34%', left: '60%', duration: '36s', delay: '-16s', startRot: '-15deg', endRot: '5deg', opacity: 0.1 },
  { src: IMAGES[8], width: '24%', left: '45%', duration: '36s', delay: '-18s', startRot: '20deg', endRot: '-20deg', opacity: 0.1 },
  
  // 第二波重複，確保大圖也能隨機出現展示數據
  { src: IMAGES[0], width: '55%', left: '30%', duration: '36s', delay: '-20s', startRot: '12deg', endRot: '-8deg', opacity: 0.22 },
  { src: IMAGES[2], width: '62%', left: '-10%', duration: '36s', delay: '-22s', startRot: '-15deg', endRot: '10deg', opacity: 0.22 },
  { src: IMAGES[4], width: '50%', left: '55%', duration: '36s', delay: '-24s', startRot: '10deg', endRot: '-10deg', opacity: 0.22 },
  { src: IMAGES[5], width: '32%', left: '20%', duration: '36s', delay: '-26s', startRot: '-8deg', endRot: '12deg', opacity: 0.1 },
  { src: IMAGES[6], width: '26%', left: '65%', duration: '36s', delay: '-28s', startRot: '15deg', endRot: '-5deg', opacity: 0.1 },
  { src: IMAGES[7], width: '36%', left: '40%', duration: '36s', delay: '-30s', startRot: '-5deg', endRot: '-25deg', opacity: 0.1 },
  { src: IMAGES[8], width: '28%', left: '80%', duration: '36s', delay: '-32s', startRot: '-12deg', endRot: '12deg', opacity: 0.1 },
  { src: IMAGES[1], width: '48%', left: '15%', duration: '36s', delay: '-34s', startRot: '5deg', endRot: '-15deg', opacity: 0.22 },
  { src: IMAGES[3], width: '60%', left: '60%', duration: '36s', delay: '-36s', startRot: '-10deg', endRot: '20deg', opacity: 0.22 },
];

export const FloatingProofsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] pointer-events-none z-0 overflow-hidden ${className}`}>
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

      <div className="relative w-full h-full mix-blend-multiply">
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
              opacity: data.opacity, // 依圖片屬性客製化透明度
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
