import React, { useState, useEffect } from 'react';
import { Share2, Phone, Mail, UserPlus, Download } from 'lucide-react';
import { useLiff } from '../hooks/useLiff';
import { getBusinessCardFlexMessage } from '../lib/flexMessageTemplate';

export const BusinessCardPage: React.FC = () => {
  const { liff, isInitializing } = useLiff(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleShare = async () => {
    if (isInitializing) {
      alert('LIFF 尚未初始化完成，請稍候...');
      return;
    }
    if (!liff || !liff.isLoggedIn()) {
      alert('如果要傳送電子名片給朋友，請在 LINE 裡面打開這個連結，進入您的個人聊天室分享喔！\n即將為您重新導向登入連線...');
      liff?.login();
      return;
    }

    try {
      if (liff.isApiAvailable('shareTargetPicker')) {
        // 註：若在本地端 (localhost) 測試，LINE 無法抓取圖片。上線後 window.location.origin 即可正常顯示圖片
        const flexMsg = getBusinessCardFlexMessage(window.location.origin);
        
        const result = await liff.shareTargetPicker([flexMsg as any]);
        if (result) {
          console.log('Flex Message Shared Successfully');
          // 這裡可以觸發 toast 等成功提示
        } else {
          console.log('Target picker was closed before sending messages');
        }
      } else {
        alert('您的 LINE 裝置或環境暫時不支援快速分享功能，請手動複製網址分享！');
      }
    } catch (err) {
      console.error('Share failed:', err);
      alert('分享過程發生錯誤，請稍後再試。');
    }
  };

  useEffect(() => {
    if (!isInitializing && liff && liff.isLoggedIn()) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autoShare') === 'true') {
        if (!sessionStorage.getItem('autoShared')) {
          sessionStorage.setItem('autoShared', 'true');
          // 稍微延遲一下讓 UI 呈現後再跳出分享畫面，體驗較好
          setTimeout(() => {
            handleShare();
          }, 500);
        }
      }
    }
  }, [isInitializing, liff]);

  const handleVcfDownload = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Liao;Bless;;;
FN:廖天佑 Bless Liao
ORG:25 MIN
TITLE:AI顧問式成交引擎
TEL;TYPE=CELL:0983919101
EMAIL:bless@25min.co
URL:https://line.me/ti/p/~reedread
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bless_liao_business_card.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      {/* 頁面標題 */}
      <h1 className="text-xl font-bold text-slate-800 mb-6">點擊卡片可翻面</h1>

      {/* 翻轉卡片容器 */}
      <div 
        className="relative w-full max-w-sm h-[400px] md:h-[420px] perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`w-full h-full relative preserve-3d transition-transform duration-700 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ============== 正面 ============== */}
          <div 
            className="absolute w-full h-full bg-white rounded-2xl shadow-xl flex flex-col p-6 md:p-8 backface-hidden overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex-1">
              <h2 className="text-3xl font-black tracking-wider text-slate-800 mb-1">廖天佑</h2>
              <p className="text-lg font-bold text-slate-500 mb-2">Bless Liao</p>
              <div className="inline-block px-3 py-1 bg-blue-900 text-white font-bold text-sm rounded-full mb-6 mt-2">
                AI顧問式成交引擎
              </div>
              
              <div className="text-blue-900 font-bold text-lg mb-8 relative">
                把流量變成可預測的成交
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-500 rounded"></div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 flex justify-between items-end mt-auto">
              <div className="w-[85px] shrink-0">
                <img src="/images/logo.jpg" alt="25 MIN" className="w-full h-auto object-contain mix-blend-multiply" />
              </div>
              
              <div className="text-right text-xs text-slate-500 space-y-1 font-medium">
                <p>0983-919-101</p>
                <p>bless@25min.co</p>
                <p>LINE: reedread</p>
              </div>
            </div>
          </div>

          {/* ============== 反面 ============== */}
          <div 
            className="absolute w-full h-full rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 md:p-8 backface-hidden rotate-y-180 overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)',
              backgroundImage: 'url("/images/circuit.svg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="w-full text-center mb-6">
              <h2 className="text-2xl font-black text-yellow-500 tracking-widest mb-1">用成交，代替服務費</h2>
            </div>

            {/* 個人頭像區塊 */}
            <div className="w-40 h-40 border-4 border-yellow-500 rounded-lg overflow-hidden mb-6 relative shadow-xl bg-blue-800">
               <img src="/images/avatar.jpg" alt="Bless Liao" className="w-full h-full object-cover" />
               
               {/* 邊角裝飾保留科技感 */}
               <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white"></div>
               <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white"></div>
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white"></div>
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white"></div>
            </div>

            <div className="text-center text-blue-100 text-sm font-medium space-y-1 tracking-wide">
              <p>AI 顧問式行銷漏斗</p>
              <p>打破廣告轉換天花板</p>
            </div>
          </div>

        </div>
      </div>

      {/* 互動按鈕區 (CTA) */}
      <div className="w-full max-w-sm mt-8 space-y-4">
        {/* 用來傳送 Flex Message 專用的最強按鈕 */}
        <button 
          onClick={handleShare}
          className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>將名片傳給 LINE 好友 / 群組</span>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <a
            href="https://line.me/ti/p/~reedread"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center bg-white border border-slate-200 text-slate-700 py-3 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all"
          >
            <UserPlus className="w-5 h-5 mb-1 text-slate-500" />
            <span className="text-sm font-bold">加好友</span>
          </a>
          
          <button
            onClick={handleVcfDownload}
            className="flex flex-col items-center justify-center bg-white border border-slate-200 text-slate-700 py-3 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all"
          >
            <Download className="w-5 h-5 mb-1 text-slate-500" />
            <span className="text-sm font-bold">存入通訊錄</span>
          </button>
          
          <a
            href="tel:0983919101"
            className="flex flex-col items-center justify-center bg-white border border-slate-200 text-slate-700 py-3 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all"
          >
            <Phone className="w-5 h-5 mb-1 text-slate-500" />
            <span className="text-sm font-bold">打電話</span>
          </a>

          <a
            href="mailto:bless@25min.co"
            className="flex flex-col items-center justify-center bg-white border border-slate-200 text-slate-700 py-3 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all"
          >
            <Mail className="w-5 h-5 mb-1 text-slate-500" />
            <span className="text-sm font-bold">發信件</span>
          </a>
        </div>
      </div>
    </div>
  );
};
