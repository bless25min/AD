import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁首屏直接說明營運系統開發陪跑，並給低摩擦的開始方式', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /免大筆建置費，營運系統邊用邊做/);
  assert.match(content, /客戶追蹤、進度管理或門市交接/);
  assert.match(content, /聊聊你想改善的流程/);
  assert.match(content, /一張截圖、Excel 或一段語音/);
  assert.match(content, /先看做出來的系統/);
});

test('首頁首屏以真實系統 Dashboard 為主證據並直接聯絡 LINE', async () => {
  const hero = await read('src/components/home/CollaborationHero.tsx');

  assert.match(hero, /line-chat-manager-dashboard\.png/);
  assert.match(hero, /每個名單由誰負責/);
  assert.match(hero, /下一步什麼時候發生/);
  assert.doesNotMatch(hero, /ai-transformation-business-story\.jpg/);
  assert.match(hero, /https:\/\/line\.me\/ti\/p\/~reedread/);
  assert.match(hero, /fbq\?\.\('track', 'Lead'\)/);
  assert.doesNotMatch(hero, /collab-goal-card|THE REPORTING GOAL/);
});

test('首頁只保留必要的成交信念：改變、證據、風險與低門檻行動', async () => {
  const [content, component] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
  ]);

  assert.match(component, /你會先感受到的改變/);
  assert.match(component, /合作怎麼開始/);
  assert.match(component, /最後會留下什麼/);
  assert.match(component, /先從一個問題開始就好/);
  assert.match(content, /原本的 CRM、ERP 或表單能接/);
  assert.match(content, /客戶與營運資料，仍然是你的/);
  assert.doesNotMatch(component, /advantage-section|risk-reversal|system-section|operating-loop|build-model/);
});

test('首頁搜尋資料以陪跑服務、合作模式與主視覺建立可抽取語意', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /免大筆建置費/);
  assert.match(html, /營運系統開發陪跑/);
  assert.match(html, /https:\/\/ad\.25min\.co\/images\/line-chat-manager-dashboard\.png/);
  assert.match(html, /"@type": "OfferCatalog"/);
  assert.match(html, /"@type": "ImageObject"/);
  assert.match(html, /企業客製 AI 系統/);
  assert.match(html, /軟體開發商成功案例合作/);
  assert.match(llms, /營運系統開發陪跑/);
  assert.match(llms, /企業合作與軟體開發商合作/);
});

test('首頁主視覺使用可辨識營運狀態的系統畫面', async () => {
  const dashboard = await stat(new URL('../public/images/line-chat-manager-dashboard.png', import.meta.url));

  assert.ok(dashboard.size > 100_000);
  assert.ok(dashboard.size < 2_000_000);
});

test('首頁樣式為精簡的成交證據與行動入口提供響應式版面', async () => {
  const css = await read('src/pages/home.css');

  assert.match(css, /\.collab-system-visual/);
  assert.match(css, /\.dual-outcomes/);
  assert.match(css, /\.conversion-outcomes/);
  assert.match(css, /\.method-strip/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\) minmax\(0, 1\.08fr\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-hero-copy\s*\{\s*display:\s*contents/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-hero-actions\s*\{[^}]*order:\s*6/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-system-visual\s*\{[^}]*order:\s*7/s);
});
