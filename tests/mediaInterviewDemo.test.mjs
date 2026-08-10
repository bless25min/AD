import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const base = '../public/stories/ai-manufacturing-order-visibility-demo/';
const read = (file) => readFile(new URL(`${base}${file}`, import.meta.url), 'utf8');

test('示範專訪使用原創刊名並明確揭露非真實報導', async () => {
  const html = await read('index.html');

  assert.match(html, /25MIN BUSINESS STORY/);
  assert.match(html, /合作情境示範/);
  assert.match(html, /非真實企業報導/);
  assert.doesNotMatch(html, /商業周刊|商周|天下雜誌/);
});

test('示範專訪呈現製造業 AI 與下一張訂單的商業論點', async () => {
  const html = await read('index.html');

  assert.match(html, /34年老廠不再讓客戶「追單」/);
  assert.match(html, /全球買家一句話就能直問產線/);
  assert.match(html, /供應鏈情報/);
  assert.match(html, /下一張訂單/);
  assert.match(html, /Telegram/);
});

test('示範專訪區分待核准數據與內容再利用情境', async () => {
  const html = await read('index.html');

  assert.match(html, /待客戶核准/);
  for (const reuse of ['官網', '業務提案', '展會 QR', 'newsletter']) {
    assert.match(html, new RegExp(reuse, 'i'));
  }
  assert.match(html, /把你的導入成果，做成下一個客戶看得懂的商業故事/);
});

test('示範專訪具有獨立樣式、閱讀進度與情境主視覺', async () => {
  const [css, script, image] = await Promise.all([
    read('story.css'),
    read('story.js'),
    stat(new URL('../public/images/stories/ai-manufacturing-order-visibility-demo.webp', import.meta.url)),
  ]);

  assert.match(css, /--story-paper/);
  assert.match(css, /@media \(max-width:/);
  assert.match(script, /reading-progress/);
  assert.ok(image.size > 50_000, '情境主視覺應為可用的完整圖片資產');
});
