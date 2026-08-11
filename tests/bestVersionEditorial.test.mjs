import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁第一屏直接說明報導目標與 AI 轉型倒推方法', async () => {
  const [content, hero] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/CollaborationHero.tsx'),
  ]);

  assert.match(content, /先決定希望市場看見什麼，再把值得被報導的轉型真正做出來/);
  assert.match(content, /談談你想被報導的改變/);
  assert.match(hero, /collab-audience/);
  assert.match(hero, /企業主/);
  assert.match(hero, /轉型負責人/);
  assert.match(hero, /軟體合作夥伴/);
});

test('首頁不放客戶案例並讓三階段流程緊接首屏', async () => {
  const page = await read('src/pages/HomePage.tsx');
  const hero = page.indexOf('<CollaborationHero />');
  const process = page.indexOf('<OutcomeFirstCollaboration />');

  assert.ok(hero >= 0, '首頁應包含清楚首屏');
  assert.ok(process > hero, '三階段流程應緊接首屏');
  assert.doesNotMatch(page, /FeaturedEvidence|mediaStoryLibraryUrl/);
});

test('專訪靜態資產有版本號，避免線上沿用舊版巨型字級', async () => {
  const html = await read('public/stories/ai-manufacturing-order-visibility-demo/index.html');

  assert.match(html, /href="\/stories\/story\.css\?v=20260811-2"/);
  assert.match(html, /src="\/stories\/story\.js\?v=20260811-2"/);
  assert.match(html, /洽談案例製作/);
});

test('專訪標題、摘要與正文維持商業媒體閱讀尺度', async () => {
  const css = await read('public/stories/story.css');

  assert.match(css, /--story-title:\s*clamp\(2\.25rem,\s*3\.2vw,\s*2\.9rem\)/);
  assert.match(css, /--story-dek:\s*1\.125rem/);
  assert.match(css, /--story-body:\s*1\.125rem/);
  assert.match(css, /\.article-header\s*\{[^}]*padding:\s*38px\s+0\s+32px/s);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?--story-title:\s*clamp\(2rem,\s*9\.6vw,\s*2\.35rem\)/);
});

test('專訪手機刊名與合作按鈕維持單行', async () => {
  const css = await read('public/stories/story.css');

  assert.match(css, /\.story-nav-cta\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?\.story-masthead small\s*\{\s*display:\s*none/s);
});

test('RoleFit 使用正式網址與預覽圖', async () => {
  const content = await read('src/content/collaborationSite.ts');
  const rolefit = content.match(/name: 'RoleFit',[\s\S]*?\n  },/)?.[0] ?? '';

  assert.match(rolefit, /href: 'https:\/\/rolefit\.25min\.co\/'/);
  assert.match(rolefit, /image: '\/images\/rolefit-og\.png'/);
  await access(new URL('../public/images/rolefit-og.png', import.meta.url));
});

test('LINE Chat Manager 使用指定預覽圖且不提供公開連結', async () => {
  const [content, component] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/FeaturedEvidence.tsx'),
  ]);
  const lineChatManager = content.match(/name: 'line-chat-manager',[\s\S]*?\n  },/)?.[0] ?? '';

  assert.match(lineChatManager, /image: '\/images\/line-chat-manager-dashboard\.png'/);
  assert.doesNotMatch(lineChatManager, /href:/);
  assert.match(component, /item\.href \?/);
  assert.match(component, /客製專案，不公開連結/);
  await access(new URL('../public/images/line-chat-manager-dashboard.png', import.meta.url));
});

test('正式建置資產帶版本參數，避免 Pages 回退頁污染長效快取', async () => {
  const config = await read('vite.config.ts');

  assert.match(config, /assetCacheKey/);
  assert.match(config, /transformIndexHtml/);
  assert.match(config, /order:\s*'post'/);
  assert.match(config, /assets/);
});
