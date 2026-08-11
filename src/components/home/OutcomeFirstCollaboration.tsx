import { ArrowUpRight, Check } from 'lucide-react';
import {
  collaborationFit,
  collaborationOutcomes,
  collaborationSteps,
  mediaDemoUrl,
} from '../../content/collaborationSite';

export function OutcomeFirstCollaboration() {
  return (
    <>
      <section className="collab-section outcome-process-section" id="process" aria-labelledby="process-title">
        <div className="outcome-process-intro">
          <p className="collab-kicker">THE OUTCOME-FIRST METHOD</p>
          <h2 id="process-title">先把報導寫成企業目標，<br />再把內容做成事實。</h2>
          <div>
            <p>一般做法是先買工具、做系統，最後才思考它替企業創造了什麼價值。</p>
            <p>這套合作反過來：先確認市場值得知道的改變，再倒推必須完成的 AI 導入、流程改造與系統整合。</p>
          </div>
        </div>

        <ol className="outcome-steps">
          {collaborationSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <p>{step.eyebrow}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <strong>{step.result}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="collab-section outcome-deliverables-section" id="outcomes" aria-labelledby="outcomes-title">
        <div className="collab-section-heading">
          <p className="collab-kicker">TWO REAL OUTCOMES</p>
          <div>
            <h2 id="outcomes-title">最後得到的不是一份 AI 企劃，<br />而是兩項可以繼續使用的成果。</h2>
            <p>報導不是替尚未發生的成果包裝，而是把已經完成、可以查證的企業改變說清楚。</p>
          </div>
        </div>
        <div className="outcome-deliverables">
          {collaborationOutcomes.map((outcome) => (
            <article key={outcome.number}>
              <span>{outcome.number}</span>
              <p>{outcome.eyebrow}</p>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
            </article>
          ))}
        </div>
        <a className="outcome-demo-link" href={mediaDemoUrl}>
          <span><small>REPORTING GOAL DEMO</small><b>先看企業專訪完成後的樣子</b></span>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </section>

      <section className="collab-section outcome-fit-section" aria-labelledby="fit-title">
        <div>
          <p className="collab-kicker">A GOOD STARTING POINT</p>
          <h2 id="fit-title">適合從一個真實、重要，<br />而且值得被市場看見的問題開始。</h2>
        </div>
        <ul>
          {collaborationFit.map((item) => (
            <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>
          ))}
        </ul>
        <p className="outcome-boundary">所有數據、名稱、引用與成果都需經企業確認；自有發布、付費刊登與自然媒體報導會清楚區分，不保證媒體採用。</p>
      </section>
    </>
  );
}
