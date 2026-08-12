import { ArrowDown, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { hero } from '../../content/collaborationSite';

export function CollaborationHero() {
  const trackLineContact = () => {
    window.fbq?.('track', 'Lead');
    window.sessionStorage.setItem('collaboration_contact_channel', 'line');
  };

  return (
    <header className="collab-hero" id="top">
      <nav className="collab-nav" aria-label="網站導覽">
        <a className="collab-brand" href="#top" aria-label="回到首頁">
          <img src="/images/avatar.jpg" alt="Bless Liao" />
          <span><b>Bless Liao</b><small>25MIN COLLABORATION</small></span>
        </a>
        <div className="collab-nav-links">
          <a href="#system">做成什麼</a>
          <a href="#approach">怎麼開始</a>
          <a href="#contact">聊聊現況</a>
        </div>
      </nav>

      <div className="collab-hero-grid">
        <div className="collab-hero-copy">
          <p className="collab-eyebrow">{hero.eyebrow}</p>
          <p className="collab-audience">
            <span>客戶沒跟到</span><span>進度一直問</span><span>交接靠記憶</span>
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
            <b>客戶營運總覽</b>
          </div>
          <img
            src="/images/line-chat-manager-dashboard.png"
            width="1800"
            height="1023"
            alt="整合 LINE、Meta 與門市客戶資料的企業營運系統畫面，顯示每個名單由誰負責、下一步什麼時候發生。"
            fetchPriority="high"
          />
          <ul aria-label="系統畫面重點">
            <li><Check aria-hidden="true" />每個名單由誰負責</li>
            <li><Check aria-hidden="true" />下一步什麼時候發生</li>
            <li><Check aria-hidden="true" />主管看得到流程卡在哪裡</li>
          </ul>
          <figcaption>實際開發的客戶營運系統畫面，可依公司的流程與權限調整。</figcaption>
        </figure>
      </div>

      <div className="collab-hero-footnote">
        <span>先做一小段，真的好用再往下接</span>
        <span aria-hidden="true">現有工具能接，就不全部重來</span>
      </div>
    </header>
  );
}
