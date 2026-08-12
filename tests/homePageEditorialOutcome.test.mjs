import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁首屏先說清楚企業客製 AI 系統與低風險起點', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /公司要成長，\\n不能一直只靠人記得怎麼做/);
  assert.match(content, /LINE、Meta、門市、Excel 與員工腦中/);
  assert.match(content, /用 LINE 說說現在最卡的流程/);
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

test('首頁依序解除顧客流失、導入風險與客製疑慮', async () => {
  const [content, component] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
  ]);

  assert.match(component, /你每天都在花錢取得客戶/);
  assert.match(component, /不必重做整家公司/);
  assert.match(component, /AI 功能可以抄/);
  assert.match(component, /一個合作，最後留下兩種價值/);
  assert.match(content, /可串接或延續既有系統/);
  assert.match(content, /顧客資料與營運資料歸企業所有/);
});

test('首頁搜尋資料以服務、合作模式與主視覺建立可抽取語意', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /公司要成長，不能一直只靠人記得怎麼做/);
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

test('首頁樣式為系統證據、低風險導入與雙成果提供響應式版面', async () => {
  const css = await read('src/pages/home.css');

  assert.match(css, /\.collab-system-visual/);
  assert.match(css, /\.risk-reversal/);
  assert.match(css, /\.dual-outcomes/);
  assert.match(css, /grid-template-columns: minmax\(0, 5fr\) minmax\(0, 7fr\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-hero-copy\s*\{\s*display:\s*contents/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-hero-actions\s*\{[^}]*order:\s*5/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-system-visual\s*\{[^}]*order:\s*6/s);
});
