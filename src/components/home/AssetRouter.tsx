import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { assetPaths } from '../../content/collaborationSite';

export function AssetRouter() {
  const [activeId, setActiveId] = useState(assetPaths[0].id);
  const active = assetPaths.find((path) => path.id === activeId) ?? assetPaths[0];

  return (
    <section className="collab-section asset-router" id="paths" aria-labelledby="asset-router-title">
      <div className="collab-section-heading">
        <p className="collab-kicker">START WITH WHAT YOU HAVE</p>
        <h2 id="asset-router-title">你不需要先整理成服務需求。<br />先告訴我，你已經擁有什麼。</h2>
      </div>

      <div className="asset-router-grid">
        <div className="asset-options" role="list" aria-label="選擇目前擁有的資產">
          {assetPaths.map((path, index) => {
            const selected = path.id === active.id;
            return (
              <button
                key={path.id}
                type="button"
                className={selected ? 'asset-option is-active' : 'asset-option'}
                onClick={() => setActiveId(path.id)}
                aria-expanded={selected}
                aria-controls="asset-result"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{path.title}</b>
                <ArrowRight aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <article className="asset-result" id="asset-result" aria-live="polite">
          <p className="asset-result-label">你帶來：{active.shortLabel}</p>
          <h3>{active.title}</h3>
          <div className="asset-result-block">
            <span>現在的缺口</span>
            <p>{active.gap}</p>
          </div>
          <div className="asset-result-block is-highlighted">
            <span>可以一起完成</span>
            <p>{active.outcome}</p>
          </div>
          <div className="asset-result-evidence">
            <span>相關證據</span>
            {active.evidence.map((item) => <b key={item}>{item}</b>)}
          </div>
          <a href="#collaborate">從這個資產開始談<ArrowRight aria-hidden="true" /></a>
        </article>
      </div>
    </section>
  );
}

