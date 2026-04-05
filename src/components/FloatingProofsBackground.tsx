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

// 重新設計 9 個輪播設定，採「單道錯落」墜落策略，徹底避免重疊
const SNOWFLAKES: SnowflakeData[] = [
  // #1
  { src: IMAGES[0], width: '85%', left: '5%', duration: '90s', delay: '0s', startRot: '-3deg', endRot: '4deg', opacity: 0.35 },
  // #2
  { src: IMAGES[5], width: '60%', left: '25%', duration: '90s', delay: '-10s', startRot: '5deg', endRot: '-5deg', opacity: 0.15 },
  // #3
  { src: IMAGES[1], width: '82%', left: '12%', duration: '90s', delay: '-20s', startRot: '4deg', endRot: '-3deg', opacity: 0.35 },
  // #4
  { src: IMAGES[6], width: '65%', left: '5%', duration: '90s', delay: '-30s', startRot: '-6deg', endRot: '6deg', opacity: 0.15 },
  // #5
  { src: IMAGES[2], width: '88%', left: '0%', duration: '90s', delay: '-40s', startRot: '-2deg', endRot: '5deg', opacity: 0.35 },
  // #6
  { src: IMAGES[7], width: '55%', left: '35%', duration: '90s', delay: '-50s', startRot: '7deg', endRot: '-4deg', opacity: 0.15 },
  // #7
  { src: IMAGES[3], width: '78%', left: '18%', duration: '90s', delay: '-60s', startRot: '-5deg', endRot: '2deg', opacity: 0.35 },
  // #8
  { src: IMAGES[8], width: '62%', left: '10%', duration: '90s', delay: '-70s', startRot: '3deg', endRot: '-6deg', opacity: 0.15 },
  // #9
  { src: IMAGES[4], width: '85%', left: '-2%', duration: '90s', delay: '-80s', startRot: '-4deg', endRot: '3deg', opacity: 0.35 },
];

export const FloatingProofsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] pointer-events-none z-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes proofWaterfall {
          0% {
            transform: translateY(-80vh) rotate(var(--start-rot));
          }
          100% {
            transform: translateY(400vh) rotate(var(--end-rot));
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
