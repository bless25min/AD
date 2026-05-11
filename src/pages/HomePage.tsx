import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Footer } from '../components/Footer';
import { FloatingProofsBackground } from '../components/FloatingProofsBackground';

export const HomePage = () => {
  // 管理漸進式揭露的狀態，1 代表只有第一段可見
  const [visibleLevel, setVisibleLevel] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAlgoDetails, setShowAlgoDetails] = useState(false);

  const cases = [
    { img: "/images/醫美術後模擬.png", title: "醫美術後模擬", href: "https://dr-julia.25min.co/" },
    { img: "/images/遊戲化機制.png", title: "遊戲化機制", href: "https://soyaplayablead.25min.co/ad" },
    { img: "/images/知識解鎖.png", title: "知識解鎖", href: "https://soya.massenlighten.com/" },
    { img: "/images/健身互動落地頁.png", title: "健身互動", href: "https://fightnight.25min.co/" },
    { img: "/images/tolokah-adult-assessment.png", title: "身高體態評估", href: "https://tolokah.25min.co/" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cases.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + cases.length) % cases.length);

  // 區段對應的指標
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);
  const section5Ref = useRef<HTMLElement>(null);

  // 解鎖下一區段並平滑捲動
  const revealSection = (level: number, ref: React.RefObject<HTMLElement | null>) => {
    setVisibleLevel((prev) => Math.max(prev, level));
    setTimeout(() => {
      const topOffset = ref.current?.getBoundingClientRect().top ?? 0;
      const scrollPosition = topOffset + window.pageYOffset - 80;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }, 150);
  };

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-800 font-sans selection:bg-brand-500 selection:text-white pb-0 overflow-x-hidden relative">
      {/* 背景層 z-0 */}
      <FloatingProofsBackground />

      {/* 前景層 z-10：100% 不透明、銳利，絕對不會被背景濾鏡干擾 */}
      <div className="relative z-10 w-full flex flex-col flex-1">
        {/* ======================================= */}
        {/* Section 1: Hero */}
        {/* ======================================= */}
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="flex flex-col items-center max-w-3xl mx-auto">
              {/* 文字置中寬度限制 */}
              <div className="w-full space-y-6 md:space-y-8 flex flex-col items-center">
                <div className="inline-flex items-center p-1 pr-4 rounded-full bg-white/30 backdrop-blur-md border border-brand-200 text-brand-900 shadow-md">
                  <img src="/images/avatar.jpg" alt="Bless Liao" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3 object-cover border border-white/60 shadow-sm" />
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider drop-shadow-sm">廖天佑 Bless Liao｜AI 預見成交引擎</span>
                </div>

                <div className="w-full flex justify-center py-4">
                  <img 
                    src="/images/你的廣告，到底是在賺你的錢，還是在賺客戶的錢？.png" 
                    alt="你的廣告到底是在賺你的錢，還是在賺客戶的錢？" 
                    className="w-full max-w-2xl h-auto object-contain drop-shadow-xl"
                  />
                </div>

                {/* 第一層解鎖選項 */}
                {visibleLevel === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-4 md:pt-6 space-y-3"
                  >
                    <p className="text-sm text-slate-500 font-bold mb-4">你的現況是哪一種？</p>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => revealSection(2, section2Ref)}
                        className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                        <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">📌 廣告一直砸，但成本越來越高</span>
                        <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                      </button>
                      <button
                        onClick={() => revealSection(2, section2Ref)}
                        className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                        <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">📌 流量很多，但實際轉換變少</span>
                        <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                      </button>
                      <button
                        onClick={() => revealSection(2, section2Ref)}
                        className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                        <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">📌 換過行銷團隊，但仍找不出問題在哪</span>
                        <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 右側圖片已移除 */}
            </div>
          </motion.div>
        </section>

        {/* ======================================= */}
        {/* Section 2: 共同困境 */}
        {/* ======================================= */}
        <AnimatePresence>
          {visibleLevel >= 2 && (
            <motion.section
              ref={section2Ref}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative py-16 md:py-24 bg-transparent border-y border-slate-200"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                  {/* 左側圖片 */}
                  <div className="w-full lg:w-1/2 relative flex justify-center items-center">
                    <img
                      src="/images/news-pain.jpg"
                      alt="流量騙局報導"
                      className="w-full h-auto object-contain rounded-3xl shadow-lg border border-slate-300 bg-white/20 backdrop-blur-md p-2 sm:p-4"
                    />
                  </div>

                  {/* 右側文字（已替換為圖片） */}
                  <div className="w-full lg:w-1/2 flex justify-center items-center drop-shadow-xl">
                    <img 
                      src="/images/有做，不代表有賺。.png" 
                      alt="有做，不代表有賺" 
                      className="w-full max-w-lg h-auto object-contain"
                    />
                  </div>
                </div>

                {/* 新增區塊：演算法盲點與導致問題 */}
                <div className="mt-16 pt-16 border-t border-slate-300/50 max-w-5xl mx-auto w-full">
                  <div className="flex justify-center mb-12 drop-shadow-xl">
                    <img 
                      src="/images/為什麼會這樣？.png" 
                      alt="為什麼會這樣？" 
                      className="w-full max-w-2xl h-auto object-contain"
                    />
                  </div>

                  <div className="flex justify-center mb-8">
                    <button
                      onClick={() => setShowAlgoDetails(!showAlgoDetails)}
                      className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/30 backdrop-blur-md hover:bg-white/50 border border-brand-300 hover:border-brand-500 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                      <span className="relative z-10 tracking-wider">我想知道為什麼？</span>
                      <ChevronDown className={`relative z-10 w-5 h-5 ml-2 transition-transform duration-300 ${showAlgoDetails ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showAlgoDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col space-y-8 md:space-y-12 items-center max-w-4xl mx-auto pb-4">
                          {/* 盲點 1：圖表完整呈現 */}
                          <div className="w-full rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-slate-200 bg-white/40 backdrop-blur-md p-1 md:p-2 overflow-hidden hover:border-brand-400 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <Zoom>
                              <img src="/images/algo-blindspot.jpg" alt="廣告演算法盲點" className="w-full h-auto object-contain rounded-xl md:rounded-2xl" />
                            </Zoom>
                          </div>

                          {/* 盲點 2：圖表完整呈現 */}
                          <div className="w-full rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-slate-200 bg-white/40 backdrop-blur-md p-1 md:p-2 overflow-hidden hover:border-brand-400 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <Zoom>
                              <img src="/images/algo-problems.jpg" alt="廣告演算法盲點導致問題" className="w-full h-auto object-contain rounded-xl md:rounded-2xl" />
                            </Zoom>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 新增區塊：人員成交的困境 */}
                <div className="mt-16 pt-16 border-t border-slate-300/50 max-w-5xl mx-auto w-full">
                  <div className="flex justify-center mb-10 md:mb-12 drop-shadow-xl">
                    <img 
                      src="/images/如果產品服務銷售方式重度依賴人員成交.png" 
                      alt="重度依賴人員成交的問題" 
                      className="w-full max-w-2xl h-auto object-contain"
                    />
                  </div>
                </div>

                {/* 第二層解鎖選項 (移至底部) */}
                <div className="max-w-3xl mx-auto w-full mt-16 pb-4">
                  {visibleLevel === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="text-sm md:text-base text-slate-600 font-bold mb-5 text-center drop-shadow-sm">你目前的處境，是不是就卡在這個盲點裡？</p>
                      <div className="flex flex-col space-y-4">
                        <button
                          onClick={() => revealSection(3, section3Ref)}
                          className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                          <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">💡 沒錯！有時會衝出一波短期成效，然後又冷掉了。</span>
                          <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                        </button>
                        <button
                          onClick={() => revealSection(3, section3Ref)}
                          className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                          <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">💡 我的確陷入優化瓶頸，完全抓不準新受眾在哪。</span>
                          <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                        </button>
                        <button
                          onClick={() => revealSection(3, section3Ref)}
                          className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                          <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">💡 是的，團隊花了大量心力溝通，但客戶就是無回應。</span>
                          <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ======================================= */}
        {/* Section 3: 我的方法 */}
        {/* ======================================= */}
        <AnimatePresence>
          {visibleLevel >= 3 && (
            <motion.section
              ref={section3Ref}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            >
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-900 mb-4 md:mb-6 drop-shadow-sm">我從不靠感覺。</h2>
                <p className="text-base sm:text-lg font-bold text-slate-700 max-w-2xl mx-auto">
                  讓成交從靠運氣，變成可預測的結果。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:gap-12 max-w-3xl mx-auto">
                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur-md border border-slate-300 shadow-md rounded-2xl p-5 md:p-6 group hover:border-brand-400 transition-colors drop-shadow-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-brand-50/50 backdrop-blur-sm text-brand-800 flex items-center justify-center font-extrabold text-lg border border-brand-200 shadow-sm">1</div>
                      </div>
                      <div className="ml-4 w-full">
                        <h3 className="text-lg md:text-xl font-bold text-brand-900 mb-2">先用 AI 預見系統模擬用戶決策</h3>
                        <p className="text-sm md:text-base font-bold text-slate-800">看懂客戶怎麼想。</p>
                        <Zoom>
                          <img src="/images/simulation.png" alt="Simulation" className="w-full mt-4 rounded-xl border border-slate-300 shadow-sm object-contain bg-white/30 backdrop-blur-md" />
                        </Zoom>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md border border-slate-300 shadow-md rounded-2xl p-5 md:p-6 group hover:border-brand-400 transition-colors drop-shadow-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-brand-50/50 backdrop-blur-sm text-brand-800 flex items-center justify-center font-extrabold text-lg border border-brand-200 shadow-sm">2</div>
                      </div>
                      <div className="ml-4 w-full">
                        <h3 className="text-lg md:text-xl font-bold text-brand-900 mb-2">根據情境配對 Meta 代理受眾</h3>
                        <p className="text-sm md:text-base font-bold text-slate-800">不需要憑感覺猜客群。</p>
                        <Zoom>
                          <img src="/images/audience.png" alt="Audience" className="w-full mt-4 rounded-xl border border-slate-300 shadow-sm object-contain bg-white/30 backdrop-blur-md" />
                        </Zoom>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md border border-slate-300 shadow-md rounded-2xl p-5 md:p-6 group hover:border-brand-400 transition-colors drop-shadow-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-brand-50/50 backdrop-blur-sm text-brand-800 flex items-center justify-center font-extrabold text-lg border border-brand-200 shadow-sm">3</div>
                      </div>
                      <div className="ml-4 w-full">
                        <h3 className="text-lg md:text-xl font-bold text-brand-900 mb-2">創意引擎根據不同客戶屬性維度產生聯想</h3>
                        <p className="text-sm md:text-base font-bold text-slate-800">讓成交與創意內容，不再依賴運氣與試錯。</p>
                        <Zoom>
                          <img src="/images/solution.png" alt="Solution" className="w-full mt-4 rounded-xl border border-slate-300 shadow-sm object-contain bg-white/30 backdrop-blur-md" />
                        </Zoom>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md border border-slate-300 shadow-md rounded-2xl p-5 md:p-6 group hover:border-brand-400 transition-colors drop-shadow-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-brand-50/50 backdrop-blur-sm text-brand-800 flex items-center justify-center font-extrabold text-lg border border-brand-200 shadow-sm">4</div>
                      </div>
                      <div className="ml-4 w-full">
                        <h3 className="text-lg md:text-xl font-bold text-brand-900 mb-2">需求生成引擎產出執行內容</h3>
                        <p className="text-sm md:text-base font-bold text-slate-800">需求不是被捕獲，而是被生成、被升級。</p>
                        <Zoom>
                          <img src="/images/demand-generation.png" alt="Demand Generation" className="w-full mt-4 rounded-xl border border-slate-300 shadow-sm object-contain bg-white/30 backdrop-blur-md" />
                        </Zoom>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右側圖片已移除 */}
              </div>

              {/* 新增：示範案例區塊 */}
              <div className="mt-16 pt-16 border-t border-slate-300/50 max-w-6xl mx-auto w-full">
                <div className="text-center mb-8 md:mb-12">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 mb-4 drop-shadow-sm">
                    動態落地頁<span className="text-brand-600">示範案例</span>
                  </h3>
                  <p className="text-base sm:text-lg text-slate-700 font-bold max-w-2xl mx-auto px-4">
                    透過不同的互動機制，大幅提升用戶停留時間與轉換率<br className="block sm:hidden"/>
                    <span className="text-sm font-normal text-slate-500 sm:hidden">（左右滑動查看更多）</span>
                  </p>
                </div>
                
                {/* Slider UI */}
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                  <div className="overflow-hidden rounded-3xl shadow-2xl border border-slate-200 bg-white/60 backdrop-blur-md relative group">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out items-center" 
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {cases.map((cs, idx) => (
                        <div key={idx} className="w-full flex-shrink-0 relative p-1 md:p-2">
                          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md py-1 px-3 rounded-full shadow-sm border border-brand-100">
                            <h4 className="text-sm md:text-base font-bold text-brand-900">{cs.title}</h4>
                          </div>
                          <Zoom>
                            <img src={cs.img} alt={cs.title} className="w-full h-auto object-contain rounded-2xl bg-white block" loading="lazy" />
                          </Zoom>
                        </div>
                      ))}
                    </div>

                    {/* Left/Right Buttons */}
                    <button 
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-brand-900 shadow-md border border-slate-200 opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all z-20 hover:scale-105"
                    >
                      <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-brand-900 shadow-md border border-slate-200 opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all z-20 hover:scale-105"
                    >
                      <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                  </div>

                  {/* Indicators */}
                  <div className="flex justify-center mt-6 space-x-3">
                    {cases.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all rounded-full ${currentSlide === idx ? 'bg-brand-500 w-8 h-2.5' : 'bg-slate-300 hover:bg-brand-300 w-2.5 h-2.5'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <a
                      href={cases[currentSlide].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center rounded-full border border-brand-300 bg-white/40 px-5 py-3 text-sm sm:text-base font-extrabold text-brand-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:bg-white/70 hover:shadow-xl"
                    >
                      查看{cases[currentSlide].title}案例頁
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* 第三層解鎖選項 */}
              {visibleLevel === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 md:mt-16 max-w-2xl mx-auto">
                  <p className="text-sm text-slate-500 font-bold mb-4 text-center">如果我們能提早模擬客戶的決策，你怎麼看？</p>
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={() => revealSection(4, section4Ref)}
                      className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                      <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">🤝 這個作法很有層次，那我們具體該怎麼合作？</span>
                      <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                    </button>
                    <button
                      onClick={() => revealSection(4, section4Ref)}
                      className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-slate-300 hover:border-brand-400 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                      <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">🤝 聽起來很精準，那你們的收費模式是怎樣？</span>
                      <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* ======================================= */}
        {/* Section 4: 合作方式 */}
        {/* ======================================= */}
        <AnimatePresence>
          {visibleLevel >= 4 && (
            <motion.section
              ref={section4Ref}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="py-16 md:py-24 bg-transparent border-t border-slate-200 px-4 sm:px-6 shadow-sm"
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-xl border border-slate-300 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                  <div className="flex justify-center mb-8 relative z-10 drop-shadow-xl">
                    <img 
                      src="/images/用成交，代替服務費。.png" 
                      alt="用成交代替服務費" 
                      className="w-full max-w-2xl h-auto object-contain"
                    />
                  </div>

                  <div className="mt-10 md:mt-12 pt-8 border-t border-slate-200 text-center relative z-10 w-full">
                    <p className="text-slate-600 font-medium text-sm md:text-base mb-6 md:mb-8">
                      [ 無法分潤的產品怎麼辦 ]<br />
                      如果你堅持，合作也可以從高額月費開始。<br className="hidden sm:block" />
                      但我更傾向於長久、健康的合作方式。
                    </p>

                    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl p-2 sm:p-4 mb-10 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 border border-slate-300">
                      <img
                        src="/images/news-solution.png"
                        alt="無媒體解決方案零風險合作"
                        className="w-full h-auto object-contain rounded-2xl shadow-sm"
                      />
                    </div>

                    {/* 第四層解鎖選項 */}
                    {visibleLevel === 4 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto pt-4">
                        <p className="text-sm text-slate-500 font-bold mb-4">你看完這個合作方式的想法是？</p>
                        <div className="flex flex-col space-y-4">
                          <button
                            onClick={() => revealSection(5, section5Ref)}
                            className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-brand-600 hover:bg-brand-500 border border-brand-500 rounded-2xl shadow-xl hover:shadow-[0_8px_40px_rgba(42,102,170,0.5)] w-full text-left hover:-translate-y-1 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                            <span className="relative z-10 flex-1 pr-4 text-shadow-sm">💰 我很喜歡「用成交代替服務費」的健康邏輯，我想看下一步。</span>
                            <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-white/90 group-hover:text-white group-hover:translate-y-1 drop-shadow-sm" />
                          </button>
                          <button
                            onClick={() => revealSection(5, section5Ref)}
                            className="group relative flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 text-sm sm:text-base font-bold text-brand-900 transition-all duration-300 bg-white/20 backdrop-blur-md border border-slate-300 hover:border-brand-400 hover:bg-white/30 rounded-2xl w-full text-left shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                            <span className="relative z-10 flex-1 pr-4 drop-shadow-sm">🤔 月費也有好處，但我編制確實需要診斷。可以聊聊嗎？</span>
                            <ChevronDown className="relative z-10 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform text-accent-600 group-hover:translate-y-1 drop-shadow-sm" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ======================================= */}
        {/* Section 5: CTA */}
        {/* ======================================= */}
        <AnimatePresence>
          {visibleLevel >= 5 && (
            <motion.section
              ref={section5Ref}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="pt-16 pb-24 md:pt-24 md:pb-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full"
            >
              <div className="mb-12 md:mb-16">
                {/* 頂部圖片已移除 */}

                {/* 結尾視覺焦點（個人頭像） */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full bg-white/20 border-4 border-white/40 backdrop-blur-md flex items-center justify-center mb-6 md:mb-8 shadow-2xl relative overflow-hidden">
                  <img src="/images/avatar.jpg" alt="Bless Liao" className="absolute inset-0 w-full h-full object-cover" />
                </div>

                <div className="flex justify-center mb-10 drop-shadow-xl">
                  <img 
                    src="/images/把產品  廣告  落地頁連結私訊給我.png" 
                    alt="把產品廣告落地頁連結私訊給我" 
                    className="w-full max-w-3xl h-auto object-contain"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead');
                  }
                  window.location.href = 'https://liff.line.me/1654828981-Dqym5ASE/card';
                }}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white transition-all duration-300 bg-brand-600 border border-brand-500 rounded-full hover:bg-brand-500 shadow-[0_4px_20px_rgba(42,102,170,0.3)] hover:shadow-[0_8px_40px_rgba(42,102,170,0.5)] active:translate-y-1 sm:hover:-translate-y-2 focus:outline-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 tracking-wider sm:tracking-widest text-shadow-sm">先把現況丟給我</span>
                <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.section>
          )}
        </AnimatePresence>

        <Footer />
      </div>


    </div>
  );
};
