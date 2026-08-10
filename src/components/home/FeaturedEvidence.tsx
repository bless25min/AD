import { ArrowUpRight } from 'lucide-react';
import { evidenceCases, portfolioUrl } from '../../content/collaborationSite';

export function FeaturedEvidence() {
  return (
    <section className="collab-section evidence-section" id="evidence" aria-labelledby="evidence-title">
      <div className="collab-section-heading">
        <p className="collab-kicker">SELECTED EVIDENCE · NOT A SERVICE MENU</p>
        <h2 id="evidence-title">不同專案，證明的是同一件事：<br />我能補上合作中最容易斷掉的那一段。</h2>
      </div>

      <div className="evidence-list">
        {evidenceCases.map((item, index) => (
          <article className="evidence-card" key={item.name}>
            <div className="evidence-number">{String(index + 1).padStart(2, '0')}</div>
            <div className={item.image ? 'evidence-visual has-image' : 'evidence-visual'}>
              {item.image ? <img src={item.image} alt={`${item.name} 專案畫面`} loading="lazy" /> : <span>{item.name.slice(0, 2).toUpperCase()}</span>}
            </div>
            <div className="evidence-copy">
              <p>{item.label}</p>
              <h3>{item.name}</h3>
              <strong>{item.thesis}</strong>
              <p className="evidence-contribution">{item.contribution}</p>
              <div>{item.outputs.map((output) => <span key={output}>{output}</span>)}</div>
            </div>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer" aria-label={`查看 ${item.name} 相關案例`}><ArrowUpRight aria-hidden="true" /></a>
            ) : (
              <span className="evidence-private" aria-label={`${item.name} 客製專案，不公開連結`}>客製專案<br />不公開連結</span>
            )}
          </article>
        ))}
      </div>

      <div className="supporting-proof">
        <p><span>RELATED PROOF</span><b>Senior</b> 補充 AI 品質、fallback 與營運邊界的實作證據。</p>
        <a href={portfolioUrl} target="_blank" rel="noreferrer">查看完整專案庫<ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}

