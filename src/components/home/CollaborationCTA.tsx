import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const lineDestination = 'https://liff.line.me/1654828981-Dqym5ASE/card';
const choices = ['產品／技術', '品牌／客戶', '成功案例', '內容／通路', '尚未成形的構想'];

export function CollaborationCTA() {
  const [selected, setSelected] = useState(choices[0]);

  const startConversation = () => {
    window.fbq?.('track', 'Lead');
    window.sessionStorage.setItem('collaboration_asset', selected);
    window.location.href = lineDestination;
  };

  return (
    <section className="collab-section cta-section" id="collaborate" aria-labelledby="cta-title">
      <div className="cta-index">LET'S BUILD THE NEXT PROOF</div>
      <h2 id="cta-title">提出一個可以<br />一起放大的合作。</h2>
      <p>不需要先寫完整需求。告訴我你已經擁有什麼、希望哪一方也能受益，以及現在最缺的那一段。</p>
      <div className="cta-choices" role="group" aria-label="選擇你目前擁有的資產">
        {choices.map((choice) => (
          <button key={choice} type="button" className={selected === choice ? 'is-selected' : ''} onClick={() => setSelected(choice)} aria-pressed={selected === choice}>{choice}</button>
        ))}
      </div>
      <button className="cta-main-button" type="button" onClick={startConversation}>
        從「{selected}」開始談<ArrowRight aria-hidden="true" />
      </button>
      <footer className="collab-footer">
        <span>© 25MIN · BLESS LIAO</span>
        <span>BRAND × BUILD × MARKETING</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}

