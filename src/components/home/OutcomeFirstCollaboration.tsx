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
          <p className="collab-kicker">做完後，少追三件事</p>
          <h2 id="outcomes-title">不是多一套軟體，<br />是公司少掉幾個一直靠人撐住的地方。</h2>
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
          <p className="collab-kicker">先做出改變，再留下證據</p>
          <h2 id="method-title">先讓一個可驗證的營運改變發生，<br />再整理成客戶願意相信的企業案例。</h2>
          <p>先解決一個真實問題；有結果才把它講清楚，讓它能替你帶來下一次信任。</p>
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
          <p className="collab-kicker">一件事做成，留下兩種證據</p>
          <h2 id="proof-title">公司裡的人用得到，<br />客戶也看得懂你做了什麼。</h2>
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
          <p className="collab-kicker">開始前，先把風險講清楚</p>
          <h2 id="assurance-title">不用一次押很大。</h2>
        </div>
        <ul>
          {riskReversals.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
        </ul>
      </section>

      <aside className="partner-note" id="partners" aria-labelledby="partner-title">
        <div>
          <p>給軟體、行銷與 B2B 團隊</p>
          <h2 id="partner-title">別讓一個做完的專案，只剩驗收單。</h2>
          <span>把客戶真正用起來的過程，做成下一個買家看得懂的成功案例。</span>
        </div>
        <a href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={trackPartnerContact}>
          <MessageCircle aria-hidden="true" />傳一個產品頁，先看能做什麼案例<ArrowUpRight aria-hidden="true" />
        </a>
      </aside>
    </>
  );
}
