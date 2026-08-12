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
          <p className="collab-kicker">通常不是沒人做，而是沒人看得完整</p>
          <h2 id="problem-title">廣告有名單、業務有在追，<br />老闆最後還是只能問：「現在到底到哪了？」</h2>
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
            <p className="collab-kicker">我做的不是聊天機器人</p>
            <h2 id="system-title">把客人接進來、一路跟到成交，<br />中間哪裡斷掉，畫面上就看得到。</h2>
          </div>
          <p>AI 可以整理對話、提醒該追的人、把異常挑出來；要怎麼回、什麼時候交給真人，還是照你公司的規矩。</p>
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
          <p className="collab-kicker">不用一開始就做一套大系統</p>
          <h2 id="risk-title">先挑一個最痛的地方，<br />接起來、跑順了，再往下做。</h2>
          <p>預約、名單、權限這些基本功能不用從零寫；你們跟別人不一樣的做法，才另外做。</p>
        </div>
        <div className="build-model">
          <article>
            <span>先用現成的底座</span>
            <h3>不用為了基本功能多等幾個月</h3>
            <ul>{foundationCapabilities.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </article>
          <div className="build-model-plus" aria-hidden="true">＋</div>
          <article className="is-custom">
            <span>再改成你們的做法</span>
            <h3>不是叫員工遷就軟體</h3>
            <ul>{customCapabilities.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="advantage-section" id="advantage" aria-labelledby="advantage-title">
        <div>
          <p>差距不是誰先買 AI</p>
          <h2 id="advantage-title">對手早你一年開始記錄：<br />哪些客人會買、哪種回法有效、哪一步最容易流失。</h2>
          <div className="learning-loop" aria-label="企業經驗累積循環">
            <span>顧客詢問</span><ArrowRight aria-hidden="true" />
            <span>採取行動</span><ArrowRight aria-hidden="true" />
            <span>成交／沒成交</span><ArrowRight aria-hidden="true" />
            <span>留下原因</span><ArrowRight aria-hidden="true" />
            <span>改善下一次</span>
          </div>
          <blockquote>一年後，他多的不只是一套系統，而是一整年做生意留下來的答案。</blockquote>
        </div>
      </section>

      <section className="collab-section approach-section" id="approach" aria-labelledby="approach-title">
        <div className="approach-intro">
          <p className="collab-kicker">我會怎麼開始</p>
          <h2 id="approach-title">先別談「全面導入 AI」。<br />把你最想改掉的一件事說清楚。</h2>
          <p>例如：名單不要再漏、店長每天看得到進度，或新人照著流程也能把客人接好。</p>
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
          <p className="collab-kicker">做完不只拿到一份簡報</p>
          <h2 id="outcomes-title">公司裡多一套能用的系統，<br />對外多一個能讓客戶相信你的故事。</h2>
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
        <p className="outcome-disclosure">專訪只寫能確認的事實。自有內容、付費刊登和媒體採訪，也會講清楚。</p>
      </section>

      <section className="collab-section assurance-section" aria-labelledby="assurance-title">
        <div>
          <p className="collab-kicker">先把你最擔心的幾件事講清楚</p>
          <h2 id="assurance-title">可以小做、可以接舊系統，<br />資料也不會被我拿走。</h2>
        </div>
        <ul>
          {riskReversals.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
        </ul>
      </section>

      <section className="partner-band" id="partners" aria-labelledby="partner-title">
        <div>
          <p>如果你是軟體公司或行銷公司</p>
          <h2 id="partner-title">你負責產品或客戶，我來補上導入、整合和案例內容。</h2>
          <span>一起把客戶真的用起來的過程，做成下一次提案拿得出手的成功案例。</span>
        </div>
        <a href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={trackPartnerContact}>
          <MessageCircle aria-hidden="true" />聊一個正在談的客戶<ArrowUpRight aria-hidden="true" />
        </a>
      </section>
    </>
  );
}
