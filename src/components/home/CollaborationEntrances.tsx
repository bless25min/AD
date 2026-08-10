import { ArrowDownRight } from 'lucide-react';
import { entrances } from '../../content/collaborationSite';

export function CollaborationEntrances() {
  return (
    <section className="collab-section entrances-section" aria-labelledby="entrances-title">
      <div className="collab-section-heading">
        <p className="collab-kicker">THREE WAYS IN · ONE SHARED OUTCOME</p>
        <h2 id="entrances-title">三個入口可以單獨開始，<br />也可以組成一個更大的合作。</h2>
      </div>
      <div className="entrance-grid">
        {entrances.map((entrance) => (
          <article className="entrance-card" key={entrance.number}>
            <div className="entrance-card-top"><span>{entrance.number}</span><ArrowDownRight aria-hidden="true" /></div>
            <h3>{entrance.title}</h3>
            <dl>
              <div><dt>你帶來</dt><dd>{entrance.partnerBrings}</dd></div>
              <div><dt>我補上</dt><dd>{entrance.blessAdds}</dd></div>
            </dl>
            <div className="entrance-outputs">
              {entrance.outputs.map((output) => <span key={output}>{output}</span>)}
            </div>
            <p className="entrance-first"><b>第一步</b>{entrance.firstStep}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

