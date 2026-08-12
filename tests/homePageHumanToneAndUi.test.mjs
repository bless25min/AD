import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁第一眼直接說明從廣告獲客到成交營運的完整服務', async () => {
  const [content, hero, html] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/CollaborationHero.tsx'),
    read('index.html'),
  ]);

  assert.match(content, /廣告 × AI 客服 × 顧客營運系統/);
  assert.match(content, /免大筆建置費，\\n行銷落地及營運系統開發陪跑。/);
  assert.match(content, /不用一開始就押一大筆預算/);
  assert.match(hero, /廣告獲客/);
  assert.match(hero, /AI 客服/);
  assert.match(hero, /對話管理/);
  assert.match(hero, /營運管理/);
  assert.doesNotMatch(hero, /collab-audience|secondaryCta/);
  assert.match(html, /行銷落地及營運系統開發陪跑/);
});

test('首頁用企業主日常會說的話解釋服務，不用企劃式抽象句', async () => {
  const [content, outcome, cta] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
    read('src/components/home/CollaborationCTA.tsx'),
  ]);

  assert.match(content, /把原本分散的工具和流程，接成一套/);
  assert.match(content, /先從最容易漏掉客戶的一段開始/);
  assert.match(outcome, /該追誰、進度到哪、下一步做什麼/);
  assert.match(outcome, /先挑一件最值得改善的事，[\s\S]*做出第一版/);
  assert.match(cta, /不用先整理規格/);
  assert.doesNotMatch(`${content}\n${outcome}\n${cta}`, /可驗證的營運改變|帶來下一次信任|做完後，少追三件事|一件事做成，留下兩種證據/);
});

test('首頁字級、區塊留白與卡片高度保持商業網站閱讀尺度', async () => {
  const css = await read('src/pages/home.css');

  assert.match(css, /--type-hero:\s*clamp\(2\.2rem,\s*3\.15vw,\s*2\.65rem\)/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1\.12fr\)\s*minmax\(0,\s*\.88fr\)/);
  assert.match(css, /--type-section:\s*clamp\(1\.65rem,\s*2\.4vw,\s*2\.15rem\)/);
  assert.match(css, /\.collab-section\s*\{[^}]*padding-block:\s*clamp\(52px,\s*6vw,\s*72px\)/s);
  assert.match(css, /\.problem-grid article\s*\{[^}]*min-height:\s*220px/s);
  assert.match(css, /\.method-strip li\s*\{[^}]*min-height:\s*190px/s);
  assert.match(css, /\.collab-hero h1 span:first-child\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /\.collab-hero h1 span:last-child\s*\{[^}]*text-wrap:\s*balance/s);
  assert.doesNotMatch(css, /\.collab-hero h1\s*\{[^}]*text-wrap:\s*balance/s);
  assert.match(css, /@media \(max-width:\s*680px\)[\s\S]*?\.collab-hero h1\s*\{[^}]*font-size:\s*clamp\(1\.72rem,\s*8vw,\s*2\.1rem\)/s);
});
