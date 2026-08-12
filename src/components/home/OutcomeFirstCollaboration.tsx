import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import {
  businessOutcomes,
  mediaDemoUrl,
  proofOutcomes,
  riskReversals,
  transformationMethod,
} from '../../content/collaborationSite';

export function OutcomeFirstCollaboration() {
  const trackPartnerContact = () => {
    window.fbq?.('track', 'Lead', { content_name: 'software_partner_collaboration' });
    window.sessionStorage.setItem('collaboration_contact_channel', 'software-partner-line');
  };

  return (
    <>
      <section className="collab-section conversion-outcomes" aria-labelledby="outcomes-title">
        <div className="compact-heading">
          <p className="collab-kicker">你會先感受到的改變</p>
          <h2 id="outcomes-title">該追誰、進度到哪、下一步做什麼，<br />不必再靠人記。</h2>
        </div>
        <div className="problem-grid">
          {businessOutcomes.map((outcome) => (
            <article key={outcome.number}>
              <span>{outcome.number}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="collab-section method-section" id="approach" aria-labelledby="method-title">
        <div className="method-intro">
          <p className="collab-kicker">合作怎麼開始</p>
          <h2 id="method-title">先挑一件最值得改善的事，<br />做出第一版。</h2>
          <p>我會先看你們現在怎麼做。能沿用的工具就留下，只改最影響生意的那一段。</p>
        </div>
        <ol className="method-strip">
          {transformationMethod.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="collab-section proof-section" id="system" aria-labelledby="proof-title">
        <div className="compact-heading">
          <p className="collab-kicker">最後會留下什麼</p>
          <h2 id="proof-title">一套公司真的在用的系統，<br />一個客戶看得懂的成果。</h2>
        </div>
        <div className="dual-outcomes">
          {proofOutcomes.map((outcome) => (
            <article key={outcome.number}>
              <figure>
                <img src={outcome.image} alt={outcome.title} loading="lazy" />
              </figure>
              <div>
                <span>{outcome.eyebrow}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
                {outcome.number === '02' && (
                  <a href={mediaDemoUrl}>閱讀完整專訪示範<ArrowUpRight aria-hidden="true" /></a>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="outcome-disclosure">案例只寫能確認的事實；自有內容、付費刊登和媒體採訪會清楚區分。</p>
      </section>

      <section className="collab-section assurance-section" aria-labelledby="assurance-title">
        <div>
          <p className="collab-kicker">不用一次做完所有事</p>
          <h2 id="assurance-title">先從一個問題開始就好。</h2>
        </div>
        <ul>
          {riskReversals.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
        </ul>
      </section>

      <aside className="partner-note" id="partners" aria-labelledby="partner-title">
        <div>
          <p>給軟體、行銷與 B2B 團隊</p>
          <h2 id="partner-title">專案做完了，下一個客戶卻看不懂它的價值？</h2>
          <span>把客戶實際用起來的過程，整理成業務能繼續使用的成功案例。</span>
        </div>
        <a href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={trackPartnerContact}>
          <MessageCircle aria-hidden="true" />把產品頁傳給我，我先看看<ArrowUpRight aria-hidden="true" />
        </a>
      </aside>
    </>
  );
}
