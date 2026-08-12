import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MessageCircle,
} from 'lucide-react';
import {
  collaborationOutcomes,
  collaborationSteps,
  customCapabilities,
  enterpriseProblems,
  foundationCapabilities,
  mediaDemoUrl,
  operatingLoop,
  riskReversals,
} from '../../content/collaborationSite';

export function OutcomeFirstCollaboration() {
  const trackPartnerContact = () => {
    window.fbq?.('track', 'Lead', { content_name: 'software_partner_collaboration' });
    window.sessionStorage.setItem('collaboration_contact_channel', 'software-partner-line');
  };

  return (
    <>
      <section className="collab-section problem-section" aria-labelledby="problem-title">
        <div className="compact-heading">
          <p className="collab-kicker">企業每天真正失去的東西</p>
          <h2 id="problem-title">你每天都在花錢取得客戶，<br />但有多少人在公司的流程裡消失了？</h2>
        </div>
        <div className="problem-grid">
          {enterpriseProblems.map((problem) => (
            <article key={problem.number}>
              <span>{problem.number}</span>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <strong>{problem.loss}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="collab-section system-section" id="system" aria-labelledby="system-title">
        <div className="system-intro">
          <div>
            <p className="collab-kicker">不是多一個會回答問題的工具</p>
            <h2 id="system-title">讓每一次生意，<br />都為下一次留下可以使用的資料。</h2>
          </div>
          <p>AI 負責整理大量資訊、找出問題與提供判斷依據；真正的服務與決策，仍然由企業掌握。</p>
        </div>
        <ol className="operating-loop">
          {operatingLoop.map((step, index) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
              {index < operatingLoop.length - 1 && <ArrowRight aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </section>

      <section className="collab-section risk-reversal" aria-labelledby="risk-title">
        <div className="compact-heading">
          <p className="collab-kicker">從最值得改善的一段開始</p>
          <h2 id="risk-title">不必重做整家公司，<br />也不必配合一套永遠不能改的軟體。</h2>
          <p>共通功能不用重做；真正影響競爭力的流程，再依照企業實際使用持續開發。</p>
        </div>
        <div className="build-model">
          <article>
            <span>已經準備好的底座</span>
            <h3>先讓基本流程跑起來</h3>
            <ul>{foundationCapabilities.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </article>
          <div className="build-model-plus" aria-hidden="true">＋</div>
          <article className="is-custom">
            <span>依照企業持續客製</span>
            <h3>讓系統配合公司的做法</h3>
            <ul>{customCapabilities.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="advantage-section" id="advantage" aria-labelledby="advantage-title">
        <div>
          <p>真正難以追回的先發優勢</p>
          <h2 id="advantage-title">AI 功能可以抄，<br />但領先一年累積的企業經驗抄不了。</h2>
          <div className="learning-loop" aria-label="企業經驗累積循環">
            <span>顧客詢問</span><ArrowRight aria-hidden="true" />
            <span>採取行動</span><ArrowRight aria-hidden="true" />
            <span>成交／沒成交</span><ArrowRight aria-hidden="true" />
            <span>留下原因</span><ArrowRight aria-hidden="true" />
            <span>改善下一次</span>
          </div>
          <blockquote>最可怕的不是對手有 AI，而是他的公司每做一次生意，就比昨天更會做生意。</blockquote>
        </div>
      </section>

      <section className="collab-section approach-section" id="approach" aria-labelledby="approach-title">
        <div className="approach-intro">
          <p className="collab-kicker">先定義成果，再投入開發</p>
          <h2 id="approach-title">如果半年後真的被報導，<br />你希望客戶看見公司完成了什麼改變？</h2>
          <p>企業專訪不是替還沒發生的成果包裝，而是先把目標說清楚，再把改變真的做出來。</p>
        </div>
        <ol className="approach-steps">
          {collaborationSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="collab-section outcomes-section" aria-labelledby="outcomes-title">
        <div className="compact-heading">
          <p className="collab-kicker">系統在公司裡運作，成果在市場上繼續說話</p>
          <h2 id="outcomes-title">一個合作，最後留下兩種價值。</h2>
        </div>
        <div className="dual-outcomes">
          {collaborationOutcomes.map((outcome) => (
            <article key={outcome.number}>
              <figure>
                <img src={outcome.image} alt={outcome.title} loading="lazy" />
              </figure>
              <div>
                <span>{outcome.number}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
                {outcome.number === '02' && (
                  <a href={mediaDemoUrl}>閱讀完整專訪示範<ArrowUpRight aria-hidden="true" /></a>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="outcome-disclosure">專訪內容以可驗證成果為基礎；自有發布、付費刊登與自然媒體報導會清楚區分。</p>
      </section>

      <section className="collab-section assurance-section" aria-labelledby="assurance-title">
        <div>
          <p className="collab-kicker">先讓合作風險可控</p>
          <h2 id="assurance-title">不需要先承諾一場巨大的數位轉型。</h2>
        </div>
        <ul>
          {riskReversals.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
        </ul>
      </section>

      <section className="partner-band" id="partners" aria-labelledby="partner-title">
        <div>
          <p>給軟體開發商、行銷公司與品牌夥伴</p>
          <h2 id="partner-title">你有產品、技術或企業客戶，也可以一起完成導入與成功案例。</h2>
          <span>把一次客製合作，變成客戶、開發商與市場都能繼續使用的 B2B 資產。</span>
        </div>
        <a href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={trackPartnerContact}>
          <MessageCircle aria-hidden="true" />討論共同提案或客戶合作<ArrowUpRight aria-hidden="true" />
        </a>
      </section>
    </>
  );
}
