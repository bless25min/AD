import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { hero, mediaDemoUrl } from '../../content/collaborationSite';

export function CollaborationHero() {
  return (
    <header className="collab-hero" id="top">
      <nav className="collab-nav" aria-label="主要導覽">
        <a className="collab-brand" href="#top" aria-label="回到頁首">
          <img src="/images/avatar.jpg" alt="Bless Liao" />
          <span><b>Bless Liao</b><small>25MIN COLLABORATION</small></span>
        </a>
        <div className="collab-nav-links">
          <a href="#process">合作方式</a>
          <a href="#outcomes">最終成果</a>
          <a href="#contact">聯絡我</a>
        </div>
      </nav>

      <div className="collab-hero-grid">
        <div className="collab-hero-copy">
          <p className="collab-eyebrow">{hero.eyebrow}</p>
          <p className="collab-audience">
            <span>企業主</span><span>轉型負責人</span><span>軟體合作夥伴</span>
          </p>
          <h1>{hero.title}</h1>
          <p className="collab-hero-description">{hero.description}</p>
          <div className="collab-hero-actions">
            <a className="collab-button collab-button-primary" href="#contact">
              {hero.primaryCta}<ArrowDownRight aria-hidden="true" />
            </a>
            <a className="collab-text-link" href={mediaDemoUrl}>
              {hero.secondaryCta}<ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="collab-goal-card" aria-label="合作終點示範">
          <p>我們先寫下終點</p>
          <span>THE REPORTING GOAL</span>
          <h2>這家公司完成了什麼改變，讓客戶更願意選擇它？</h2>
          <div className="goal-card-path">
            <p><b>報導目標</b>市場值得知道的企業改變</p>
            <p><b>執行過程</b>AI 導入、系統整合與營運落地</p>
            <p><b>最後交付</b>真實轉型成果與企業專訪報導</p>
          </div>
          <a href={mediaDemoUrl}>查看目標成品示範<ArrowUpRight aria-hidden="true" /></a>
        </aside>
      </div>

      <div className="collab-hero-footnote">
        <span>START WITH THE END IN MIND</span>
        <span aria-hidden="true">報導目標 × AI 轉型 × 可驗證成果</span>
      </div>
    </header>
  );
}
