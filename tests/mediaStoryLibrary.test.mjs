import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const siteOrigin = 'https://ad.25min.co';
const expectedIndustries = [
  '精密製造',
  '紡織染整',
  '食品加工',
  '農業合作社',
  '建築材料',
  '工業機械維修',
  '冷鏈物流',
  '汽車零件',
  '傳統批發',
  '健身服務品牌',
];

const read = (path) => readFile(new URL(path, root), 'utf8').catch(() => '');

async function loadStories() {
  const moduleUrl = new URL('content/media-stories.mjs', root);
  try {
    await access(moduleUrl);
    const module = await import(`${moduleUrl.href}?test=${Date.now()}`);
    return module.mediaStories ?? [];
  } catch {
    return [];
  }
}

function extractStructuredData(html) {
  const match = html.match(/<script[^>]+id="structured-data"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(match, '每頁都必須有可定位的 JSON-LD');
  return JSON.parse(match[1]);
}

test('內容資料提供十個不同產業與完整的編輯契約', async () => {
  const stories = await loadStories();

  assert.equal(stories.length, 10);
  assert.deepEqual(stories.map((story) => story.industry), expectedIndustries);
  assert.equal(new Set(stories.map((story) => story.slug)).size, 10);
  assert.equal(new Set(stories.map((story) => story.headline)).size, 10);

  for (const story of stories) {
    assert.match(story.slug, /^[a-z0-9-]+-demo$/);
    assert.ok(story.headline.length >= 24, `${story.industry} 需要完整媒體標題`);
    assert.ok(story.metaDescription.length >= 55 && story.metaDescription.length <= 160);
    assert.ok(story.answerSummary.length >= 60, `${story.industry} 需要可直接引用的回答摘要`);
    assert.ok(story.sections.length >= 3, `${story.industry} 需要三段以上文章`);
    assert.equal(story.businessValues.length, 3);
    assert.deepEqual(story.businessValues.map((item) => item.audience), ['買方／客戶', '導入企業', '軟體／服務商']);
    assert.ok(story.evidenceGates.length >= 4);
    assert.ok(story.reuse.length >= 6);
    assert.ok(story.faq.length >= 3);
    assert.equal(new Set(story.faq.map((item) => item.question)).size, story.faq.length);
  }
});

test('每篇摘要與正文都以案例企業的 AI 競爭力為主角', async () => {
  const stories = await loadStories();

  for (const story of stories) {
    const articleCopy = [
      ...story.lead,
      ...story.sections.flatMap((section) => section.paragraphs),
      story.closing,
    ].join('');

    assert.match(story.dek, /AI/, `${story.slug} 摘要必須直接交代 AI 導入`);
    assert.match(
      story.dek,
      /競爭力|訂單|合作|續約|指定|貨架|接單|再購|長約|詢價|成長/,
      `${story.slug} 摘要必須說明對市場競爭的意義`,
    );
    assert.match(articleCopy, /AI/, `${story.slug} 正文必須呈現企業如何導入 AI`);
    assert.doesNotMatch(
      articleCopy,
      /示範方案|軟體商|案例內容也能|一篇經核准的企業故事/,
      `${story.slug} 正文不應混入合作企劃或服務商視角`,
    );
  }
});

test('十篇靜態文章都以媒體報導正文為唯一閱讀主體', async () => {
  const stories = await loadStories();
  assert.equal(stories.length, 10, '內容資料尚未建立');

  for (const story of stories) {
    const html = await read(`public/stories/${story.slug}/index.html`);
    const image = await stat(new URL(`public${story.heroImage}`, root)).catch(() => null);

    assert.ok(html.length > 8_000, `${story.slug} 必須是完整長文頁`);
    assert.ok(image && image.size > 50_000, `${story.slug} 主視覺必須存在`);
    assert.match(html, /合作情境示範/);
    assert.match(html, /非真實企業報導/);
    assert.match(html, new RegExp(story.industry));
    assert.match(html, new RegExp(story.headline.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(html, new RegExp(story.dek.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(html, /class="article-body"/);
    assert.match(html, /class="article-conclusion"/);
    for (const planningBlock of [
      'answer-summary',
      'story-rail',
      'concept-panel',
      'value-grid',
      'evidence-box',
      'faq-section',
      'reuse-section',
      'story-cta',
    ]) {
      assert.doesNotMatch(html, new RegExp(`class="${planningBlock}`), `${story.slug} 不應顯示 ${planningBlock}`);
    }
    assert.doesNotMatch(html, /ANSWER-FIRST SUMMARY|STORY AT A GLANCE|ONE STORY · THREE BUSINESS WINS|QUESTIONS DECISION-MAKERS ASK|AFTER PUBLISHING/);
    assert.doesNotMatch(html, /商業周刊|商周|天下雜誌/);
  }
});

test('每篇都有一致且真實對應可見內容的搜尋結構', async () => {
  const stories = await loadStories();
  assert.equal(stories.length, 10, '內容資料尚未建立');

  for (const story of stories) {
    const html = await read(`public/stories/${story.slug}/index.html`);
    const canonical = `${siteOrigin}/stories/${story.slug}/`;

    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
    assert.match(html, /<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"/);
    assert.match(html, new RegExp(`<meta name="description" content="${story.metaDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    assert.match(html, new RegExp(`<meta property="og:url" content="${canonical}"`));
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);

    const data = extractStructuredData(html);
    assert.equal(data['@context'], 'https://schema.org');
    const graph = data['@graph'];
    assert.ok(Array.isArray(graph));
    const types = graph.map((item) => item['@type']);
    assert.ok(types.includes('Article'));
    assert.ok(types.includes('BreadcrumbList'));
    assert.ok(types.includes('Organization'));
    assert.ok(!types.includes('NewsArticle'), '示範案例不得冒充新聞報導');
    assert.ok(!types.includes('FAQPage'), '非政府／醫療網站不以 FAQ rich result 作為優化手段');

    const article = graph.find((item) => item['@type'] === 'Article');
    assert.equal(article.headline, story.headline);
    assert.equal(article.description, story.metaDescription);
    assert.equal(article.mainEntityOfPage['@id'], canonical);
    assert.equal(article.author['@type'], 'Person');
    assert.ok(article.image.startsWith(siteOrigin));
    assert.equal(article.inLanguage, 'zh-Hant');
    assert.equal(article.abstract, story.dek, '結構化摘要必須直接對應標題下方可見導言');
  }
});

test('案例索引、sitemap、robots 與 llms 清單讓搜尋及對話模型可發現十篇內容', async () => {
  const stories = await loadStories();
  const [library, sitemap, robots, llms] = await Promise.all([
    read('public/stories/index.html'),
    read('public/sitemap.xml'),
    read('public/robots.txt'),
    read('public/llms.txt'),
  ]);

  assert.equal(stories.length, 10, '內容資料尚未建立');
  assert.match(library, /十個產業/);
  assert.match(library, /CollectionPage/);
  assert.match(library, /ItemList/);
  assert.doesNotMatch(library, /library-answer|library-integrity|FOR SEARCH & DECISION|EDITORIAL INTEGRITY/);
  assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/ad\.25min\.co\/sitemap\.xml/);
  assert.match(llms, /合作情境示範，非真實企業報導/);

  for (const story of stories) {
    const url = `${siteOrigin}/stories/${story.slug}/`;
    assert.match(library, new RegExp(`href="/stories/${story.slug}/"`));
    assert.match(sitemap, new RegExp(`<loc>${url}</loc>`));
    assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    assert.match(llms, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('建置流程保留十篇文章，但首頁只連結目標成品示範', async () => {
  const [packageJson, content, hero] = await Promise.all([
    read('package.json'),
    read('src/content/collaborationSite.ts'),
    read('src/components/home/CollaborationHero.tsx'),
  ]);

  const pkg = JSON.parse(packageJson);
  assert.equal(pkg.scripts['generate:stories'], 'node scripts/generate-media-stories.mjs');
  assert.match(pkg.scripts.build, /generate:stories/);
  assert.match(content, /mediaDemoUrl/);
  assert.match(hero, /mediaDemoUrl/);
  assert.match(hero, /先看報導完成後的樣子|查看目標成品示範/);
  assert.doesNotMatch(hero, /mediaStoryLibraryUrl|瀏覽十個產業案例/);
});

test('產生的文章不留下會污染版本差異的行尾空白', async () => {
  const stories = await loadStories();
  assert.equal(stories.length, 10, '內容資料尚未建立');

  for (const story of stories) {
    const html = await read(`public/stories/${story.slug}/index.html`);
    assert.doesNotMatch(html, /[ \t]+$/m, `${story.slug} 含有行尾空白`);
  }
});
