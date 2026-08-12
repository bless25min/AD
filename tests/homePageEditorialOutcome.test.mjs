import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁首屏用企業想改善的工作切入，並給低摩擦的開始方式', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /把那件你一直想改善，\\n卻只能靠人盯的事，做成公司自己的系統/);
  assert.match(content, /AI、資料和現有工具接起來/);
  assert.match(content, /傳一張你現在的流程給我/);
  assert.match(content, /截圖、Excel 或一段語音/);
  assert.match(content, /看系統怎麼運作/);
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

  assert.match(component, /做完後，少追三件事/);
  assert.match(component, /先讓一個可驗證的營運改變發生/);
  assert.match(component, /再整理成客戶願意相信的企業案例/);
  assert.match(component, /不用一次押很大/);
  assert.match(content, /能接原本的 CRM、ERP 或表單/);
  assert.match(content, /客戶資料和營運資料都是你的/);
  assert.doesNotMatch(component, /advantage-section|risk-reversal|system-section|operating-loop|build-model/);
});

test('首頁搜尋資料以服務、合作模式與主視覺建立可抽取語意', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /把那件你一直想改善/);
  assert.match(html, /https:\/\/ad\.25min\.co\/images\/line-chat-manager-dashboard\.png/);
  assert.match(html, /"@type": "OfferCatalog"/);
  assert.match(html, /"@type": "ImageObject"/);
  assert.match(html, /企業客製 AI 系統/);
  assert.match(html, /軟體開發商成功案例合作/);
  assert.match(llms, /企業客製 AI 系統/);
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
  assert.match(css, /grid-template-columns: minmax\(0, 5fr\) minmax\(0, 7fr\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-hero-copy\s*\{\s*display:\s*contents/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-hero-actions\s*\{[^}]*order:\s*6/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-system-visual\s*\{[^}]*order:\s*7/s);
});
