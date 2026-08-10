import { ShieldCheck } from 'lucide-react';
import { trustPrinciples } from '../../content/collaborationSite';

export function CollaborationTrust() {
  return (
    <section className="collab-section trust-section" aria-labelledby="trust-title">
      <div className="trust-heading">
        <ShieldCheck aria-hidden="true" />
        <p className="collab-kicker">TRUST IS PART OF THE DELIVERABLE</p>
        <h2 id="trust-title">有說服力，不等於可以模糊證據。</h2>
        <p>多方合作最容易出問題的，不是畫面，而是誰能說什麼、數據從哪裡來，以及成果之後歸誰使用。</p>
      </div>
      <ol>
        {trustPrinciples.map((principle, index) => <li key={principle}><span>{index + 1}</span><p>{principle}</p></li>)}
      </ol>
    </section>
  );
}

