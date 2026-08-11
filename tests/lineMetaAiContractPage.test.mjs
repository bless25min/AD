import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('LINE / Meta AI service contract is renderable from its own route', async () => {
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true },
  });

  try {
    const { LineMetaAiContractPage } = await vite.ssrLoadModule(
      '/src/pages/LineMetaAiContractPage.tsx',
    );
    const html = renderToStaticMarkup(
      React.createElement(LineMetaAiContractPage),
    );
    const appSource = await readFile(
      new URL('../src/App.tsx', import.meta.url),
      'utf8',
    );

    assert.match(html, /LINE \/ Meta 顧客對話暨 AI 業務管理系統/);
    assert.match(html, /NT\$315,000/);
    assert.match(html, /服務期間：12 個月/);
    assert.match(html, /本案年度統包優惠價/);
    assert.match(html, /七、AI 使用額度/);
    assert.match(html, /5,000 次 AI 回覆/);
    assert.match(html, /約 1,000 位用戶，每位約 5 次對話/);
    assert.match(html, /此額度僅計算 AI Agent 實際產生之 AI 回覆/);
    assert.match(html, /LINE \/ Meta 一般訊息/);
    assert.match(html, /超出 AI 回覆額度前將另行通知/);
    assert.match(html, /八、客製開發與技術服務/);
    assert.match(html, /20 小時客製開發與技術服務額度/);
    assert.match(html, /第三方 API 串接/);
    assert.match(html, /十、第三方費用/);
    assert.match(html, /指定特殊高成本 AI 模型/);
    assert.match(html, /上述費用依第三方實際收費標準計算/);
    assert.doesNotMatch(html, />年度統包優惠價</);
    assert.doesNotMatch(html, /九、使用範圍/);
    assert.match(html, /顧客資料歸甲方所有/);
    assert.match(html, /name="companyName"/);
    assert.match(html, /name="vat"/);
    assert.match(html, /name="representative"/);
    assert.match(html, /name="serviceStartDate"/);
    assert.match(html, /name="serviceEndDate"/);
    assert.match(html, /服務期間：自 ＿＿年＿＿月＿＿日 起至 ＿＿年＿＿月＿＿日 止，共 12 個月。/);
    assert.match(html, /本方案不依門市／館別數量、LINE 官方帳號數量、Meta 粉絲專頁數量或後台使用者數量另行加價。/);
    assert.match(html, /歷史對話紀錄/);
    assert.doesNotMatch(html, /完整歷史對話紀錄/);
    assert.match(html, /付款方式：<\/span>年度費用一次支付。/);
    assert.match(html, /年度費用採一次支付，甲方應於本合約簽訂後 7 日內完成付款/);
    assert.match(html, /建立分享連結/);
    assert.match(html, /連結有效 12 個月/);
    assert.match(html, /取得連結的人可查看/);
    assert.match(html, /007001004263/);
    assert.match(html, /貳拾伍數據顧問企業社[\s\S]*統一編號：79808871/);
    assert.doesNotMatch(html, /地址：/);
    assert.match(appSource, /path="\/contract\/line-meta-ai"/);
    assert.match(appSource, /path="\/c\/:shareId"/);
  } finally {
    await vite.close();
  }
});

