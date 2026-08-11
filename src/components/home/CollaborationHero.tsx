import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { hero, mediaDemoUrl } from '../../content/collaborationSite';

export function CollaborationHero() {
  const trackLineContact = () => {
    window.fbq?.('track', 'Lead');
    window.sessionStorage.setItem('collaboration_contact_channel', 'line');
  };

  return (
    <header className="collab-hero" id="top">
      <nav className="collab-nav" aria-label="主要導覽">
        <a className="collab-brand" href="#top" aria-label="回到頁首">
          <img src="/images/avatar.jpg" alt="Bless Liao" />
          <span><b>Bless Liao</b><small>25MIN COLLABORATION</small></span>
        </a>
        <div className="collab-nav-links">
          <a href="#process">合作流程</a>
          <a href="#partners">合作對象</a>
          <a href="#contact">聯絡我</a>
        </div>
      </nav>

      <div className="collab-hero-grid">
        <div className="collab-hero-copy">
          <p className="collab-eyebrow">{hero.eyebrow}</p>
          <p className="collab-audience">
            <span>AI 導入</span><span>系統整合</span><span>企業專訪</span>
          </p>
          <h1>{hero.title}</h1>
          <p className="collab-hero-description">{hero.description}</p>
          <div className="collab-hero-actions">
            <a
              className="collab-button collab-button-primary"
              href="https://line.me/ti/p/~reedread"
              target="_blank"
              rel="noreferrer"
              onClick={trackLineContact}
            >
              <MessageCircle aria-hidden="true" />{hero.primaryCta}<ArrowUpRight aria-hidden="true" />
            </a>
            <a className="collab-text-link" href={mediaDemoUrl}>
              {hero.secondaryCta}<ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="collab-outcome-visual">
          <a href={mediaDemoUrl} aria-label="閱讀 AI 導入成果與企業專訪成品示範">
            <picture>
              <source media="(max-width: 680px)" srcSet="/images/home/ai-transformation-business-story-mobile.jpg" />
              <img
                src="/images/home/ai-transformation-business-story.jpg"
                width="1600"
                height="908"
                alt="25MIN BUSINESS STORY 雜誌與平板呈現製造業 AI 導入成果的企業專訪成品示範"
                fetchPriority="high"
              />
            </picture>
            <figcaption>
              <span>AI 導入成果 × 企業專訪成品示範</span>
              <small>點擊閱讀完整示範專訪 <ArrowUpRight aria-hidden="true" /></small>
            </figcaption>
          </a>
        </figure>
      </div>

      <div className="collab-hero-footnote">
        <span>MAKE THE CHANGE. PROVE THE VALUE. TELL THE STORY.</span>
        <span aria-hidden="true">AI 導入 × 系統整合 × 企業專訪</span>
      </div>
    </header>
  );
}
