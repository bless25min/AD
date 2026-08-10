import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { hero, mediaDemoUrl, mediaStoryLibraryUrl, portfolioUrl } from '../../content/collaborationSite';

export function CollaborationHero() {
  return (
    <header className="collab-hero" id="top">
      <nav className="collab-nav" aria-label="主要導覽">
        <a className="collab-brand" href="#top" aria-label="回到頁首">
          <img src="/images/avatar.jpg" alt="Bless Liao" />
          <span><b>Bless Liao</b><small>25MIN COLLABORATION</small></span>
        </a>
        <div className="collab-nav-links">
          <a href="#paths">合作入口</a>
          <a href="#blueprint">合作藍圖</a>
          <a href="#evidence">案例證據</a>
        </div>
      </nav>

      <div className="collab-hero-grid">
        <div className="collab-hero-copy">
          <p className="collab-eyebrow">{hero.eyebrow}</p>
          <p className="collab-audience">
            <span>軟體開發商</span><span>企業品牌</span><span>顧問／內容夥伴</span>
          </p>
          <h1>{hero.title}</h1>
          <p className="collab-hero-description">{hero.description}</p>
          <div className="collab-hero-actions">
            <a className="collab-button collab-button-primary" href="#collaborate">
              {hero.primaryCta}<ArrowDownRight aria-hidden="true" />
            </a>
            <a className="collab-text-link" href="#blueprint">
              {hero.secondaryCta}<ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="collab-hero-aside" aria-label="編輯精選與合作定位">
          <a className="collab-feature-story" href={mediaDemoUrl}>
            <span>編輯精選 · AI 導入案例</span>
            <img
              src="/images/stories/ai-manufacturing-order-visibility-demo.webp"
              alt="製造企業以平板掌握產線資訊的情境示意"
            />
            <strong>當 AI 不只省工，而是讓客戶更願意把下一張訂單交給你</strong>
            <p>看一個真實導入成果，如何被整理成企業故事、業務證據與下一個商機。</p>
            <b>閱讀示範專訪<ArrowUpRight aria-hidden="true" /></b>
          </a>
          <a className="collab-library-link" href={mediaStoryLibraryUrl}>
            <span><small>INDUSTRY STORY LIBRARY</small><b>瀏覽十個產業案例</b></span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <dl>
            <div><dt>合作角色</dt><dd>{hero.identity}</dd></div>
            <div><dt>擅長連接</dt><dd>品牌 × 開發 × 行銷</dd></div>
            <div><dt>經驗證據</dt><dd>40+ 真實專案情境</dd></div>
          </dl>
          <a href={portfolioUrl} target="_blank" rel="noreferrer">
            瀏覽完整專案庫<ArrowUpRight aria-hidden="true" />
          </a>
        </aside>
      </div>

      <div className="collab-hero-footnote">
        <span>SCROLL TO MAP THE OPPORTUNITY</span>
        <span aria-hidden="true">產品 × 開發 × 市場 × 證據</span>
      </div>
    </header>
  );
}

