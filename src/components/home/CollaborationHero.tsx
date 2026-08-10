import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { hero, portfolioUrl } from '../../content/collaborationSite';

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

        <aside className="collab-hero-aside" aria-label="合作定位">
          <div className="collab-aside-index">01 — 06</div>
          <p>我不替每個角色做完所有事。</p>
          <strong>我把彼此已經有的能力，接成一個能落地、能被證明、也能繼續長大的合作。</strong>
          <dl>
            <div><dt>ROLE</dt><dd>{hero.identity}</dd></div>
            <div><dt>MODE</dt><dd>Brand · Build · Marketing</dd></div>
            <div><dt>PROOF</dt><dd>40+ real project contexts</dd></div>
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

