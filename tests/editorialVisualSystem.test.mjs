import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁使用克制且一致的商業媒體字級系統', async () => {
  const css = await read('src/pages/home.css');

  assert.match(css, /--type-hero:\s*clamp\(2\.2rem,\s*3\.15vw,\s*2\.65rem\)/);
  assert.match(css, /--type-section:\s*clamp\(1\.65rem,\s*2\.4vw,\s*2\.15rem\)/);
  assert.match(css, /--type-body:\s*clamp\(\.975rem,\s*1vw,\s*1\.075rem\)/);
  assert.match(css, /--type-label:\s*0\.75rem/);
  assert.doesNotMatch(css, /font-size:[^;]*(?:15vw|16vw|116px|130px)/);
});

test('首頁採固定內容框、核心主張與系統證據首屏', async () => {
  const [css, hero] = await Promise.all([
    read('src/pages/home.css'),
    read('src/components/home/CollaborationHero.tsx'),
  ]);

  assert.match(css, /--content-width:\s*1120px/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1\.12fr\)\s+minmax\(0,\s*\.88fr\)/);
  assert.doesNotMatch(css, /min-height:\s*100svh/);
  assert.match(hero, /collab-system-visual/);
  assert.match(hero, /line-chat-manager-dashboard\.png/);
  assert.doesNotMatch(hero, /mediaDemoUrl/);
  assert.doesNotMatch(hero, /collab-goal-card/);
  assert.doesNotMatch(hero, /編輯精選|客戶案例|mediaStoryLibraryUrl/);
});

test('首頁行動版維持可讀字級與緊湊垂直節奏', async () => {
  const css = await read('src/pages/home.css');

  assert.match(css, /@media \(max-width:\s*680px\)/);
  assert.match(css, /\.collab-hero h1 span:first-child\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /\.collab-hero h1 span:last-child\s*\{[^}]*text-wrap:\s*balance/s);
  assert.match(css, /@media \(min-width:\s*1180px\)[\s\S]*\.collab-hero h1 span:last-child\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /\.collab-hero h1\s*\{[^}]*font-size:\s*clamp\(1\.72rem,\s*8vw,\s*2\.1rem\)/s);
  assert.match(css, /\.collab-section\s*\{[^}]*padding-block:\s*3rem/s);
  assert.match(css, /min-height:\s*44px/);
});

test('示範專訪使用文章字級而不是海報字級', async () => {
  const css = await read('public/stories/story.css');

  assert.match(css, /--story-title:\s*clamp\(2\.25rem,\s*3\.2vw,\s*2\.9rem\)/);
  assert.match(css, /--story-dek:\s*1\.125rem/);
  assert.match(css, /--story-body:\s*1\.125rem/);
  assert.match(css, /--reading-width:\s*700px/);
  assert.match(css, /\.story-hero\s*\{[^}]*1080px/s);
  assert.doesNotMatch(css, /\.answer-summary|\.story-rail|\.concept-panel|\.value-grid|\.evidence-box|\.faq-section|\.reuse-section|\.story-cta/);
});

test('十產業案例庫手機標題避免單字孤行與海報式巨型字級', async () => {
  const css = await read('public/stories/library.css');

  assert.match(css, /\.library-hero h1\s*\{[^}]*text-wrap:\s*balance/s);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?\.library-hero h1\s*\{[^}]*font-size:\s*2\.7rem/s);
});

test('報導主視覺維持16比9且不被HTML尺寸固定高度', async () => {
  const css = await read('public/stories/story.css');

  assert.match(css, /img\s*\{[^}]*height:\s*auto/s);
  assert.match(css, /\.story-hero img\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
});
