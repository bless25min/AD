import { ArrowUpRight, Check } from 'lucide-react';
import { blueprintParties, blueprintSteps, mediaStoryLibraryUrl } from '../../content/collaborationSite';

export function SoftwarePartnerBlueprint() {
  return (
    <section className="collab-section blueprint-section" id="blueprint" aria-labelledby="blueprint-title">
      <div className="blueprint-intro">
        <p className="collab-kicker">FLAGSHIP COLLABORATION BLUEPRINT</p>
        <h2 id="blueprint-title">一個 AI 導入，如何同時變成四方都需要的商業資產？</h2>
        <p>軟體商有產品與客戶、企業有導入成果、內容夥伴有觸及。我把它們接成可信的案例、可使用的業務證據與下一個詢問入口。</p>
      </div>

      <div className="party-map" aria-label="四方價值交換">
        {blueprintParties.map((party, index) => (
          <article key={party.name}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{party.name}</h3>
            <p><b>帶來</b>{party.asset}</p>
            <p><b>得到</b>{party.return}</p>
          </article>
        ))}
        <div className="party-map-center" aria-hidden="true">共同<br />成果</div>
      </div>

      <div className="blueprint-process">
        <div className="blueprint-process-heading">
          <p>從成功導入到市場證據</p>
          <strong>8 steps · one reusable asset system</strong>
        </div>
        <ol>
          {blueprintSteps.map((step, index) => (
            <li key={step}><span>{index + 1}</span><p>{step}</p><Check aria-hidden="true" /></li>
          ))}
        </ol>
      </div>

      <a className="media-demo-link" href={mediaStoryLibraryUrl}>
        <span><small>10 INDUSTRY DEMONSTRATION STORIES</small><b>瀏覽十個產業媒體報導示範</b></span>
        <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  );
}

