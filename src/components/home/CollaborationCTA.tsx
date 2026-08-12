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
      <div className="cta-index">先傳現況，我先幫你看</div>
      <h2 id="cta-title">你一直想改的那件事，<br />現在可以先不用從規格書開始。</h2>
      <p>傳一張現場在用的截圖、Excel 或語音。先看問題值不值得做，第一版最小能從哪裡開始。</p>
      <div className="contact-links" aria-label="Bless Liao 聯絡方式">
        <a className="contact-link is-primary" href="https://line.me/ti/p/~reedread" target="_blank" rel="noreferrer" onClick={() => trackContact('line')}>
          <MessageCircle aria-hidden="true" /><span><small>LINE</small><b>傳一張你現在的流程給我</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="mailto:bless@25min.co" onClick={() => trackContact('email')}>
          <Mail aria-hidden="true" /><span><small>EMAIL</small><b>bless@25min.co</b></span><ArrowRight aria-hidden="true" />
        </a>
        <a className="contact-link" href="tel:0983919101" onClick={() => trackContact('phone')}>
          <Phone aria-hidden="true" /><span><small>PHONE</small><b>0983-919-101</b></span><ArrowRight aria-hidden="true" />
        </a>
      </div>
      <p className="cta-reassurance">截圖、Excel 或一段語音都可以。我先回你：值不值得做，最小可以從哪裡開始。</p>
      <footer className="collab-footer">
        <span>© 25MIN × BLESS LIAO</span>
        <span>CUSTOM AI SYSTEMS × BUSINESS STORY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
