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
      <div className="cta-index">先聊聊，不用先寫規格</div>
      <h2 id="cta-title">把你們現在怎麼做，<br />傳給我看。</h2>
      <p>一張畫面、Excel，或一段語音就可以。我會先告訴你：這件事值不值得做，第一版可以從哪裡開始。</p>
      <div className="contact-links" aria-label="Bless Liao 聯絡方式">
        <a className="contact-link is-primary" href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={() => trackContact('line')}>
          <MessageCircle aria-hidden="true" /><span><small>LINE</small><b>用 LINE 傳給我</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="mailto:bless@25min.co" onClick={() => trackContact('email')}>
          <Mail aria-hidden="true" /><span><small>EMAIL</small><b>bless@25min.co</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="tel:0983919101" onClick={() => trackContact('phone')}>
          <Phone aria-hidden="true" /><span><small>PHONE</small><b>0983-919-101</b></span><ArrowRight aria-hidden="true" />
        </a>
      </div>
      <p className="cta-reassurance">不用先整理規格，有問題的那一段就夠了。</p>
      <footer className="collab-footer">
        <span>© 25MIN × BLESS LIAO</span>
        <span>CUSTOM AI SYSTEMS × BUSINESS STORY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
