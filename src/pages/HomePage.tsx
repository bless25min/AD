import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, CheckCircle2, UserCircle } from 'lucide-react';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  const navigate = useNavigate();
  // 管理漸進式揭露的狀態，1 代表只有第一段可見
  const [visibleLevel, setVisibleLevel] = useState(1);

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
    <div className="flex flex-col min-h-screen bg-white text-slate-800 font-sans selection:bg-brand-500 selection:text-white pb-0">
      
      {/* ======================================= */}
      {/* Section 1: Hero */}
      {/* ======================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* 左側文字 */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-bold tracking-wider">
                <UserCircle className="w-4 h-4 mr-2" />
                廖天佑 Bless Liao｜AI顧問式成交引擎
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight whitespace-pre-line text-brand-900">
                你的廣告，到底是在賺你的錢，<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-600">
                  還是在賺客戶的錢？
                </span>
              </h1>

              <div className="space-y-6 text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                <p>
                  廣告費丟了，石沉大海。<br />
                  短影音拍了，有流量，卻不一定有訂單。
                </p>
                <div className="p-5 bg-brand-50 border-l-4 border-brand-500 rounded-r-xl shadow-sm">
                  <p className="text-brand-900">
                    問題不是沒行銷。<br/>
                    是沒有一套把<span className="text-accent-600 font-bold">流量接成成交</span>的系統。
                  </p>
                </div>
              </div>

              {/* 第一層解鎖選項 */}
              {visibleLevel === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1 }}
                  className="pt-6 space-y-3"
                >
                  <p className="text-sm text-slate-500 font-bold mb-4">你的現況是哪一種？</p>
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => revealSection(2, section2Ref)}
                      className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm hover:shadow-md"
                    >
                      <span>📌 廣告一直砸，但成本越來越高</span>
                      <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
                    </button>
                    <button
                      onClick={() => revealSection(2, section2Ref)}
                      className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm hover:shadow-md"
                    >
                      <span>📌 流量很多，但實際轉換變少</span>
                      <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
                    </button>
                    <button
                      onClick={() => revealSection(2, section2Ref)}
                      className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm hover:shadow-md"
                    >
                      <span>📌 換過行銷團隊，但仍找不出問題在哪</span>
                      <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 右側圖片 */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/3] rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-100/30 to-transparent"></div>
                <img src="/images/這套方式適合誰.jpg" alt="這套方式適合誰" className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity hover:opacity-100" />
              </div>
            </div>
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
            className="relative py-24 bg-slate-50 border-y border-slate-100"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                {/* 左側圖片 */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="aspect-[4/3] rounded-3xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center relative group shadow-lg">
                    <img src="/images/舊框架問題.jpg" alt="舊框架問題" className="absolute inset-0 w-full h-full object-contain p-2" />
                  </div>
                </div>

                {/* 右側文字 */}
                <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 leading-tight">
                    有做，不代表有賺。
                  </h2>
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-left">
                    <p>
                      廣告有人點。<br/>
                      短影音有人看。<br/>
                      有時候還會衝出一波短期成效。
                    </p>
                    <p>
                      但過沒多久，<br/>
                      又回到缺單、缺預約、缺穩定成交。
                    </p>
                    <p className="text-xl text-brand-800 border-l-4 border-accent-500 pl-4 py-2 bg-white/50 rounded-r-lg">
                       你已經有做行銷，也接近目標。<br />
                       只是沒有讓客戶輕鬆的認識你，<span className="text-brand-600 font-bold block mt-1">自然而然的轉變成訂單。</span>
                    </p>
                    <img src="/images/共通點.jpg" alt="共通點" className="w-full rounded-2xl mt-8 border border-slate-200 shadow-md" />
                  </div>

                  {/* 第二層解鎖選項 */}
                  {visibleLevel === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6">
                      <p className="text-sm text-slate-500 font-bold mb-4 text-center lg:text-left">這聽起來像你的處境嗎？</p>
                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={() => revealSection(3, section3Ref)}
                          className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm"
                        >
                          <span>💡 有時會衝出一波短期成效，然後又冷掉了。</span>
                          <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
                        </button>
                        <button
                          onClick={() => revealSection(3, section3Ref)}
                          className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm"
                        >
                          <span>💡 連客戶到底為什麼不買單都抓不太準。</span>
                          <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
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
            className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-900 mb-6">我從不靠感覺。</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                讓成交從靠運氣，變成可預測的結果。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 group hover:border-brand-400 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg border border-brand-100">1</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-brand-900 mb-2">先用 AI 預見系統模擬用戶決策</h3>
                      <p className="text-slate-600">看懂客戶怎麼想。</p>
                      <img src="/images/simulation.png" alt="Simulation" className="w-full mt-4 rounded-xl border border-slate-100 shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 group hover:border-brand-400 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg border border-brand-100">2</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-brand-900 mb-2">根據不同痛點與解方，勾勒受眾輪廓與分布</h3>
                      <p className="text-slate-600">不是憑感覺猜客群。</p>
                      <img src="/images/audience.png" alt="Audience" className="w-full mt-4 rounded-xl border border-slate-100 shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 group hover:border-brand-400 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg border border-brand-100">3</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-brand-900 mb-2">根據真實問題與期待做內容與創意</h3>
                      <p className="text-slate-600">讓成交從靠運氣，變成比較可預測。</p>
                      <img src="/images/solution.png" alt="Solution" className="w-full mt-4 rounded-xl border border-slate-100 shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

               {/* 右側圖片大圖 */}
               <div className="w-full relative h-full min-h-[300px]">
                <div className="absolute inset-0 rounded-3xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center group shadow-xl">
                  <img src="/images/新框架做法.jpg" alt="新框架做法" className="absolute inset-0 w-full h-full object-contain p-4" />
                </div>
              </div>
            </div>

            {/* 第三層解鎖選項 */}
            {visibleLevel === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 max-w-2xl mx-auto">
                <p className="text-sm text-slate-500 font-bold mb-4 text-center">如果我們能提早模擬客戶的決策，你怎麼看？</p>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => revealSection(4, section4Ref)}
                    className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm"
                  >
                    <span>🤝 這個作法很有層次，那我們具體該怎麼合作？</span>
                    <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
                  </button>
                  <button
                    onClick={() => revealSection(4, section4Ref)}
                    className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm"
                  >
                    <span>🤝 聽起來很精準，那你們的收費模式是怎樣？</span>
                    <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
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
            className="py-24 bg-gradient-to-b from-white to-brand-50/50 border-t border-slate-100"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-8 text-center relative z-10">
                  用成交，代替服務費。
                </h2>
                
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed relative z-10">
                  <p>
                    你專心做好營運，<br className="sm:hidden" /> 決定要投入多少廣告預算。
                  </p>
                  <p>
                    剩下市場銷售這段，<br className="sm:hidden" /> 我來幫你規劃、製作、優化。
                  </p>
                  <p>
                    中間所有廣告、媒體、內容、執行費用，都不是付給我，<br className="hidden sm:block" /> 依照發票實報實銷。
                  </p>
                  
                  <div className="inline-block px-5 py-3 mt-6 bg-accent-50 border border-accent-200 rounded-xl">
                    <p className="text-brand-900 font-bold text-xl">
                      我只從真實成交 / 預約轉換，收取服務費。
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-center relative z-10">
                  <p className="text-slate-500 text-sm md:text-base mb-6">
                    [ 補一句 ]<br/>
                    如果你堅持，合作也可以從高額月費開始。<br className="hidden sm:block"/>
                    但我更傾向於長久、健康的合作方式。
                  </p>

                  <div className="w-full max-w-2xl mx-auto rounded-xl bg-white flex items-center justify-center border border-slate-200 mb-8 overflow-hidden shadow-lg shadow-brand-900/5">
                    <img src="/images/服務內容及方案.jpg" alt="服務內容及方案" className="w-full h-auto object-contain" />
                  </div>

                  {/* 第四層解鎖選項 */}
                  {visibleLevel === 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto pt-4">
                      <p className="text-sm text-slate-500 font-bold mb-4">你看完這個合作方式的想法是？</p>
                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={() => revealSection(5, section5Ref)}
                          className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-white transition-all duration-300 bg-brand-600 hover:bg-brand-500 border border-brand-600 hover:border-brand-500 rounded-2xl shadow-md hover:shadow-brand-500/30 w-full text-left"
                        >
                          <span>💰 我很喜歡「用成交代替服務費」的健康邏輯，我想看下一步。</span>
                          <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-white" />
                        </button>
                        <button
                          onClick={() => revealSection(5, section5Ref)}
                          className="group relative flex items-center justify-between px-6 py-4 text-base font-bold text-brand-900 transition-all duration-300 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-500 rounded-2xl w-full text-left shadow-sm"
                        >
                          <span>🤔 月費也有月費的好處，但我這編制確實需要你們幫我診斷。可以聊聊嗎？</span>
                          <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform text-accent-500" />
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
            className="pt-24 pb-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <div className="mb-16">
              {/* 第五區塊視覺焦點 */}
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-white border border-slate-100 flex items-center justify-center mb-8 shadow-2xl shadow-brand-900/10 relative overflow-hidden">
                <img src="/images/logo.jpg" alt="Logo" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-900 mb-10 leading-tight">
                把你現在的產品 / 廣告 / 落地頁丟給我。
              </h2>
              
              <div className="text-lg md:text-xl text-slate-700 space-y-6 max-w-2xl mx-auto text-left md:text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p>我先做出一版我腦中勾勒的標準參考頁給你看。</p>
                <p>如果你看了，<br className="sm:hidden" />能接受這樣的銷售頁邏輯與合作模式，<br/> 我們再來盤點：</p>
                
                <ul className="text-left max-w-sm mx-auto space-y-3 pt-4 border-t border-slate-100">
                  <li className="flex items-center text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent-500 mr-3 shrink-0" /> 還缺哪些內容
                  </li>
                  <li className="flex items-center text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent-500 mr-3 shrink-0" /> 哪些你補
                  </li>
                  <li className="flex items-center text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent-500 mr-3 shrink-0" /> 哪些我協助完成
                  </li>
                  <li className="flex items-center text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent-500 mr-3 shrink-0" /> 哪些額外採買值得做
                  </li>
                </ul>

                <img src="/images/如何開始.jpg" alt="如何開始" className="w-full max-w-xl mx-auto rounded-2xl mt-8 mb-6 border border-slate-200 shadow-lg" />
                
                <p className="pt-6 font-bold text-brand-900 text-xl border-t border-slate-100 text-center">
                  一切完成後，你就只需要專注在營運上，<span className="text-accent-600">煩惱如何消化訂單</span>。
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/liff')}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-300 bg-brand-600 border border-brand-500 rounded-full hover:bg-brand-500 shadow-[0_0_30px_rgba(42,102,170,0.3)] hover:shadow-[0_0_50px_rgba(42,102,170,0.5)] hover:-translate-y-2 focus:outline-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 tracking-widest text-shadow-sm">先把現況丟給我</span>
              <ArrowRight className="relative z-10 w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};