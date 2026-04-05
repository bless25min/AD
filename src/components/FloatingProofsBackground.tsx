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

// 寫死 18 個隨機錯落的設定，避免 React Hydration 錯誤
const SNOWFLAKES: SnowflakeData[] = [
  // 廣告成效 (48% ~ 64%)
  { src: IMAGES[0], width: '50%', left: '-5%', duration: '28s', delay: '-2s', startRot: '-10deg', endRot: '10deg' },
  { src: IMAGES[1], width: '60%', left: '35%', duration: '35s', delay: '-14s', startRot: '15deg', endRot: '-5deg' },
  { src: IMAGES[2], width: '64%', left: '45%', duration: '30s', delay: '-22s', startRot: '5deg', endRot: '25deg' },
  { src: IMAGES[3], width: '55%', left: '10%', duration: '40s', delay: '-35s', startRot: '-20deg', endRot: '0deg' },
  { src: IMAGES[4], width: '48%', left: '50%', duration: '32s', delay: '-45s', startRot: '0deg', endRot: '-15deg' },
  
  // 媒體報導 (36% ~ 48%)
  { src: IMAGES[5], width: '38%', left: '5%', duration: '22s', delay: '-6s', startRot: '-5deg', endRot: '15deg' },
  { src: IMAGES[6], width: '40%', left: '35%', duration: '20s', delay: '-28s', startRot: '10deg', endRot: '-10deg' },
  { src: IMAGES[7], width: '45%', left: '60%', duration: '24s', delay: '-38s', startRot: '-15deg', endRot: '5deg' },
  { src: IMAGES[8], width: '36%', left: '45%', duration: '18s', delay: '-52s', startRot: '20deg', endRot: '-20deg' },
  
  // 第二波重複，確保大圖也能隨機出現展示數據
  { src: IMAGES[0], width: '55%', left: '30%', duration: '33s', delay: '-8s', startRot: '12deg', endRot: '-8deg' },
  { src: IMAGES[2], width: '62%', left: '-10%', duration: '38s', delay: '-55s', startRot: '-15deg', endRot: '10deg' },
  { src: IMAGES[4], width: '50%', left: '55%', duration: '31s', delay: '-18s', startRot: '10deg', endRot: '-10deg' },
  { src: IMAGES[5], width: '42%', left: '20%', duration: '26s', delay: '-30s', startRot: '-8deg', endRot: '12deg' },
  { src: IMAGES[6], width: '36%', left: '65%', duration: '21s', delay: '-42s', startRot: '15deg', endRot: '-5deg' },
  { src: IMAGES[7], width: '48%', left: '40%', duration: '27s', delay: '-48s', startRot: '-5deg', endRot: '-25deg' },
  { src: IMAGES[8], width: '38%', left: '80%', duration: '19s', delay: '-58s', startRot: '-12deg', endRot: '12deg' },
  { src: IMAGES[1], width: '48%', left: '15%', duration: '36s', delay: '-65s', startRot: '5deg', endRot: '-15deg' },
  { src: IMAGES[3], width: '60%', left: '60%', duration: '34s', delay: '-10s', startRot: '-10deg', endRot: '20deg' },
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
