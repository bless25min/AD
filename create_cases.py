import os

cases_section_code = '''import { motion } from 'framer-motion'

export function CasesSection() {
  const cases = [
    { title: '醫美術後模擬落地頁', src: '/images/醫美術後模擬落地頁.jpg' },
    { title: '遊戲化落地頁', src: '/images/遊戲化落地頁.jpg' },
    { title: '知識解鎖落地頁', src: '/images/知識解鎖落地頁.jpg' }
  ];

  return (
    <section id="cases-section" className="py-12 bg-neutral-50 px-4 md:px-0">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 leading-snug">
            動態落地頁<span className="text-brand-primary">示範案例</span>
          </h2>
          <div className="gold-divider mt-4 mx-auto" />
          <p className="mt-4 text-neutral-600 text-sm md:text-base">
            透過不同的互動機制，大幅提升用戶停留時間與轉換率
          </p>
        </motion.div>

        <div className="space-y-12">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full"
            >
              <h3 className="text-lg font-semibold text-neutral-800 mb-3 ml-2 border-l-4 border-brand-primary pl-3">
                {c.title}
              </h3>
              <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-200">
                <img src={c.src} alt={c.title} className="w-full h-auto block" loading="lazy" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'''

with open('../dr-julia/src/features/landing/sections/CasesSection.tsx', 'w', encoding='utf-8') as f:
    f.write(cases_section_code)
print('CasesSection created')
