import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁首屏直接說明 AI 導入、系統整合與企業專訪成果', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /把 AI 導入做成企業競爭力，再把成果寫成客戶願意相信的專訪/);
  assert.match(content, /流程盤點、AI 導入、系統整合與營運落地/);
  assert.match(content, /用 LINE 討論一個企業問題/);
  assert.match(content, /看完整專訪示範/);
});

test('首頁首屏以生成的雜誌成果圖取代抽象目標卡並直接聯絡 LINE', async () => {
  const hero = await read('src/components/home/CollaborationHero.tsx');

  assert.match(hero, /ai-transformation-business-story-mobile\.jpg/);
  assert.match(hero, /ai-transformation-business-story\.jpg/);
  assert.match(hero, /AI 導入成果與企業專訪成品示範/);
  assert.match(hero, /https:\/\/line\.me\/ti\/p\/~reedread/);
  assert.match(hero, /fbq\?\.\('track', 'Lead'\)/);
  assert.doesNotMatch(hero, /collab-goal-card|THE REPORTING GOAL/);
});

test('首頁用三步流程與企業、軟體開發商兩條合作入口取代長篇企劃文字', async () => {
  const [content, component] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
  ]);

  assert.match(component, /不是先寫新聞，[\s\S]*而是先把新聞裡的改變做出來/);
  assert.match(component, /collaborationPaths\.map/);
  assert.match(content, /企業合作/);
  assert.match(content, /軟體開發商合作/);
  assert.match(content, /客戶真正完成導入/);
  assert.match(content, /可重複使用的 B2B 成功案例/);
});

test('首頁搜尋資料以服務、合作模式與主視覺建立可抽取語意', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /把 AI 導入做成企業競爭力，再把成果寫成客戶願意相信的專訪/);
  assert.match(html, /https:\/\/ad\.25min\.co\/images\/home\/ai-transformation-business-story\.jpg/);
  assert.match(html, /"@type": "OfferCatalog"/);
  assert.match(html, /"@type": "ImageObject"/);
  assert.match(html, /企業 AI 導入與系統整合/);
  assert.match(html, /軟體開發商成功案例合作/);
  assert.match(llms, /企業 AI 導入、系統整合與企業專訪服務/);
  assert.match(llms, /企業合作與軟體開發商合作/);
});

test('首頁提供桌機與手機主視覺資產', async () => {
  const [desktop, mobile] = await Promise.all([
    stat(new URL('../public/images/home/ai-transformation-business-story.jpg', import.meta.url)),
    stat(new URL('../public/images/home/ai-transformation-business-story-mobile.jpg', import.meta.url)),
  ]);

  assert.ok(desktop.size > 100_000);
  assert.ok(mobile.size > 60_000);
  assert.ok(desktop.size < 900_000);
  assert.ok(mobile.size < 600_000);
});

test('首頁樣式為成果圖、精簡流程與合作入口提供響應式版面', async () => {
  const css = await read('src/pages/home.css');

  assert.match(css, /\.collab-outcome-visual/);
  assert.match(css, /\.outcome-paths/);
  assert.match(css, /grid-template-columns: minmax\(0, 5fr\) minmax\(0, 7fr\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-hero-copy\s*\{\s*display:\s*contents/s);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.collab-outcome-visual\s*\{[^}]*order:\s*4/s);
});
