import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁第一眼直接說明免大筆建置費的營運系統開發陪跑', async () => {
  const [content, hero, html] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/CollaborationHero.tsx'),
    read('index.html'),
  ]);

  assert.match(content, /營運系統開發陪跑/);
  assert.match(content, /免大筆建置費/);
  assert.match(content, /不用先買一套大系統，也不用先寫完整規格/);
  assert.match(content, /邊用邊改，跑順再擴大/);
  assert.match(hero, /免大筆建置費/);
  assert.match(hero, /不用先寫規格/);
  assert.match(hero, /邊用邊改/);
  assert.match(html, /免大筆建置費/);
});

test('首頁用企業主日常會說的話解釋服務，不用企劃式抽象句', async () => {
  const [content, outcome, cta] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
    read('src/components/home/CollaborationCTA.tsx'),
  ]);

  assert.match(content, /免大筆建置費，營運系統邊用邊做/);
  assert.match(content, /從客戶追蹤、進度管理或門市交接的一段開始/);
  assert.match(outcome, /該追誰、進度到哪、下一步做什麼/);
  assert.match(outcome, /先挑一件最值得改善的事，[\s\S]*做出第一版/);
  assert.match(cta, /不用先整理規格/);
  assert.doesNotMatch(`${content}\n${outcome}\n${cta}`, /可驗證的營運改變|帶來下一次信任|做完後，少追三件事|一件事做成，留下兩種證據/);
});

test('首頁字級、區塊留白與卡片高度保持商業網站閱讀尺度', async () => {
  const css = await read('src/pages/home.css');

  assert.match(css, /--type-hero:\s*clamp\(2\.25rem,\s*3\.45vw,\s*3\.25rem\)/);
  assert.match(css, /--type-section:\s*clamp\(1\.65rem,\s*2\.4vw,\s*2\.15rem\)/);
  assert.match(css, /\.collab-section\s*\{[^}]*padding-block:\s*clamp\(52px,\s*6vw,\s*72px\)/s);
  assert.match(css, /\.problem-grid article\s*\{[^}]*min-height:\s*220px/s);
  assert.match(css, /\.method-strip li\s*\{[^}]*min-height:\s*190px/s);
  assert.match(css, /@media \(max-width:\s*680px\)[\s\S]*?\.collab-hero h1\s*\{[^}]*font-size:\s*clamp\(2rem,\s*8vw,\s*2\.25rem\)/s);
});
