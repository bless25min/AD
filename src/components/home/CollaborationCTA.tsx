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
      <div className="cta-index">先從一件最煩的事聊起</div>
      <h2 id="cta-title">哪一段工作，你每天都覺得<br />「這件事早就該自動了」？</h2>
      <p>把現在怎麼做、卡在哪裡告訴我。我會先跟你一起看：值不值得做，第一版可以小到什麼程度。</p>
      <div className="contact-links" aria-label="Bless Liao 聯絡方式">
        <a className="contact-link is-primary" href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={() => trackContact('line')}>
          <MessageCircle aria-hidden="true" /><span><small>LINE</small><b>用 LINE 跟我說最想改哪一段</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="mailto:bless@25min.co" onClick={() => trackContact('email')}>
          <Mail aria-hidden="true" /><span><small>EMAIL</small><b>bless@25min.co</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="tel:0983919101" onClick={() => trackContact('phone')}>
          <Phone aria-hidden="true" /><span><small>PHONE</small><b>0983-919-101</b></span><ArrowRight aria-hidden="true" />
        </a>
      </div>
      <p className="cta-reassurance">不用 PRD，也不用先決定預算。先把問題講清楚再說。</p>
      <footer className="collab-footer">
        <span>© 25MIN · BLESS LIAO</span>
        <span>CUSTOM AI SYSTEMS × BUSINESS STORY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
