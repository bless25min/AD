import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0a0f18] py-12 px-6 border-t border-slate-800">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-6">
        
        <div className="text-slate-400 text-sm space-y-2">
          <p>Email: <a href="mailto:bless@25min.co" className="hover:text-brand-500 transition-colors">bless@25min.co</a></p>
          <p>電話: <a href="tel:+88622724261" className="hover:text-brand-500 transition-colors">(02) 2272-4261</a></p>
          <p>地址: 220新北市板橋區重慶路60-1號5樓</p>
        </div>

        <div className="w-16 h-px bg-slate-800 my-4"></div>

        <div className="text-slate-500 text-xs leading-relaxed space-y-2">
          <p>
            本頁面由 <a href="https://25min.co/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors inline-block pb-0.5 border-b border-transparent hover:border-brand-500/50">25min</a>{' '}
            <a href="https://blessliao.25min.co/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors inline-block pb-0.5 border-b border-transparent hover:border-brand-500/50">廖天佑</a> 製作
          </p>
          <p>
            <a href="https://25min.co/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-slate-500">
              Privacy Policy
            </a>
          </p>
          <p className="mt-4 text-slate-600">
            &copy; {new Date().getFullYear()} 貳拾伍數據顧問企業社. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
