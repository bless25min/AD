import { ArrowDown, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { hero } from '../../content/collaborationSite';

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
          <a href="#system">系統怎麼運作</a>
          <a href="#approach">合作方式</a>
          <a href="#contact">聯絡我</a>
        </div>
      </nav>

      <div className="collab-hero-grid">
        <div className="collab-hero-copy">
          <p className="collab-eyebrow">{hero.eyebrow}</p>
          <p className="collab-audience">
            <span>LINE／Meta 名單</span><span>業務追蹤</span><span>多門市管理</span>
          </p>
          <h1>{hero.title}</h1>
          <p className="collab-hero-description">{hero.description}</p>
          <p className="collab-hero-assurance"><Check aria-hidden="true" />{hero.assurance}</p>
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
            <a className="collab-text-link" href="#system">
              {hero.secondaryCta}<ArrowDown aria-hidden="true" />
            </a>
          </div>
          <p className="collab-hero-microcopy">{hero.microcopy}</p>
        </div>

        <figure className="collab-system-visual">
          <div className="system-window-bar" aria-hidden="true">
            <span /><span /><span />
            <b>客戶進度總覽</b>
          </div>
          <img
            src="/images/line-chat-manager-dashboard.png"
            width="1800"
            height="1023"
            alt="整合 LINE、Meta、預約、到店、成交與追蹤狀態的企業顧客營運系統示意畫面"
            fetchPriority="high"
          />
          <ul aria-label="系統畫面重點">
            <li><Check aria-hidden="true" />每個名單由誰負責</li>
            <li><Check aria-hidden="true" />下一步什麼時候發生</li>
            <li><Check aria-hidden="true" />哪個環節正在漏掉客戶</li>
          </ul>
          <figcaption>這是實際開發的系統畫面；欄位、權限和流程會依公司調整。</figcaption>
        </figure>
      </div>

      <div className="collab-hero-footnote">
        <span>讓老闆看得到，讓團隊接得下去。</span>
        <span aria-hidden="true">先解決一件最煩的事</span>
      </div>
    </header>
  );
}
