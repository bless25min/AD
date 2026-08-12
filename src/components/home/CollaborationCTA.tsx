import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function CollaborationCTA() {
  const trackContact = (channel: 'line' | 'email' | 'phone') => {
    window.fbq?.('track', 'Lead');
    window.sessionStorage.setItem('collaboration_contact_channel', channel);
  };

  return (
    <section className="collab-section cta-section" id="contact" aria-labelledby="cta-title">
      <div className="cta-index">從一個真實問題開始</div>
      <h2 id="cta-title">你腦中那個一直覺得<br />「如果可以這樣就好了」的東西是什麼？</h2>
      <p>先不用想技術，也不用先規劃一套完整系統。從現在最常重複、最容易漏掉，或最想看清楚的一段流程開始。</p>
      <div className="contact-links" aria-label="Bless Liao 聯絡方式">
        <a className="contact-link is-primary" href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={() => trackContact('line')}>
          <MessageCircle aria-hidden="true" /><span><small>LINE</small><b>用 LINE 說一個我一直想改善的流程</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="mailto:bless@25min.co" onClick={() => trackContact('email')}>
          <Mail aria-hidden="true" /><span><small>EMAIL</small><b>bless@25min.co</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="tel:0983919101" onClick={() => trackContact('phone')}>
          <Phone aria-hidden="true" /><span><small>PHONE</small><b>0983-919-101</b></span><ArrowRight aria-hidden="true" />
        </a>
      </div>
      <p className="cta-reassurance">不用準備 PRD。我們先判斷能不能做、值不值得做，以及適合從哪一小段開始。</p>
      <footer className="collab-footer">
        <span>© 25MIN · BLESS LIAO</span>
        <span>CUSTOM AI SYSTEMS × BUSINESS STORY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
