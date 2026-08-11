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
      <div className="cta-index">START WITH THE CHANGE</div>
      <h2 id="cta-title">你希望下一篇報導，<br />說明公司完成了什麼改變？</h2>
      <p>不用先準備完整需求。帶著一個真正想解決的企業問題，以及你希望客戶最後看見的改變來聊。</p>
      <div className="contact-links" aria-label="Bless Liao 聯絡方式">
        <a className="contact-link is-primary" href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={() => trackContact('line')}>
          <MessageCircle aria-hidden="true" /><span><small>LINE</small><b>加 LINE 討論轉型目標</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="mailto:bless@25min.co" onClick={() => trackContact('email')}>
          <Mail aria-hidden="true" /><span><small>EMAIL</small><b>bless@25min.co</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="tel:0983919101" onClick={() => trackContact('phone')}>
          <Phone aria-hidden="true" /><span><small>PHONE</small><b>0983-919-101</b></span><ArrowRight aria-hidden="true" />
        </a>
      </div>
      <footer className="collab-footer">
        <span>© 25MIN · BLESS LIAO</span>
        <span>AI TRANSFORMATION × BUSINESS STORY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
