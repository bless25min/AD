import { flywheel } from '../../content/collaborationSite';

export function CollaborationFlywheel() {
  return (
    <section className="collab-section flywheel-section" aria-labelledby="flywheel-title">
      <div className="collab-section-heading is-inverted">
        <p className="collab-kicker">THE COLLABORATION FLYWHEEL</p>
        <h2 id="flywheel-title">合作不在交件時結束。<br />成果應該成為下一次合作的起點。</h2>
      </div>
      <ol className="flywheel-list">
        {flywheel.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <h3>{step.label}</h3>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="flywheel-thesis">BUILD IT → PROVE IT → TELL IT → GROW IT</p>
    </section>
  );
}

