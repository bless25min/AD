import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁第一屏直接說明適合的合作對象與具體能力', async () => {
  const [content, hero] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/CollaborationHero.tsx'),
  ]);

  assert.match(content, /把你的產品、客戶與成功案例，變成下一個可成交的合作機會/);
  assert.match(content, /帶一個合作案來聊/);
  assert.match(hero, /collab-audience/);
  assert.match(hero, /軟體開發商/);
  assert.match(hero, /企業品牌/);
  assert.match(hero, /顧問／內容夥伴/);
});

test('首頁在解釋合作方法前先提供五個案例證據', async () => {
  const page = await read('src/pages/HomePage.tsx');
  const evidence = page.indexOf('<FeaturedEvidence />');
  const flywheel = page.indexOf('<CollaborationFlywheel />');

  assert.ok(evidence > 0, '首頁應包含五個案例證據');
  assert.ok(flywheel > 0, '首頁應包含合作方法');
  assert.ok(evidence < flywheel, '案例證據應在合作方法之前出現');
});

test('專訪靜態資產有版本號，避免線上沿用舊版巨型字級', async () => {
  const html = await read('public/stories/ai-manufacturing-order-visibility-demo/index.html');

  assert.match(html, /href="\.\/story\.css\?v=20260810-2"/);
  assert.match(html, /src="\.\/story\.js\?v=20260810-2"/);
  assert.match(html, /洽談案例製作/);
});

test('專訪標題維持媒體文章尺度並縮短首屏留白', async () => {
  const css = await read('public/stories/ai-manufacturing-order-visibility-demo/story.css');

  assert.match(css, /--story-title:\s*clamp\(2\.25rem,\s*4\.2vw,\s*3\.5rem\)/);
  assert.match(css, /\.article-header\s*\{[^}]*980px[^}]*padding:\s*clamp\(44px,\s*5vw,\s*64px\)\s+0\s+40px/s);
  assert.match(css, /@media \(max-width:\s*560px\)[\s\S]*?\.article-header h1\s*\{\s*font-size:\s*2\.25rem/);
  assert.doesNotMatch(css, /--story-title:[^;]*4rem/);
});

test('專訪手機刊名與合作按鈕維持單行', async () => {
  const css = await read('public/stories/ai-manufacturing-order-visibility-demo/story.css');

  assert.match(css, /\.story-nav-cta\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /@media \(max-width:\s*560px\)[\s\S]*?\.story-masthead strong\s*\{[^}]*white-space:\s*nowrap/s);
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
