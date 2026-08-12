import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { hero } from '../../content/collaborationSite';

const customerFlow = [
  { label: '廣告獲客', detail: '知道客戶從哪裡來' },
  { label: 'AI 客服', detail: '即時接住每次詢問' },
  { label: '對話管理', detail: 'LINE、Meta 集中' },
  { label: '名單追蹤', detail: '自動分派與提醒' },
  { label: '成交回購', detail: '看見流失與機會' },
  { label: '營運管理', detail: '主管掌握每一段' },
];

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
          <h1>{hero.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
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
          <figcaption>實際開發的客戶營運系統：名單負責人、跟進狀態與下一步集中管理。</figcaption>
        </figure>
      </div>

      <ol className="collab-customer-flow" aria-label="從廣告到營運的顧客流程">
        {customerFlow.map((step, index) => (
          <li key={step.label}>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
    </header>
  );
}
