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
  '大學產學合作',
];

const universityStorySlug = 'university-offline-ai-medical-lab-demo';

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

test('內容資料提供十一個不同產業與完整的編輯契約', async () => {
  const stories = await loadStories();

  assert.equal(stories.length, 11);
  assert.deepEqual(stories.map((story) => story.industry), expectedIndustries);
  assert.equal(new Set(stories.map((story) => story.slug)).size, 11);
  assert.equal(new Set(stories.map((story) => story.headline)).size, 11);

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

test('大學產學案例隱去真實機構名稱並串起少子化、離線 AI、醫療人才與商品化', async () => {
  const stories = await loadStories();
  const story = stories.find((item) => item.slug === universityStorySlug);

  assert.ok(story, '應保留大學離線 AI 產學案例');
  assert.equal(story.headline, '少子化下，空教室變 AI 實驗場：學生直接解醫療產業真問題');
  assert.equal(story.publishedAt, '2026-08-17');
  assert.equal(story.modifiedAt, '2026-08-17');
  assert.match(story.dek, /少子化/);
  assert.match(story.dek, /一所大學/);
  assert.match(story.dek, /技術夥伴/);
  assert.match(story.dek, /資料不能上雲/);
  assert.match(story.dek, /離線 AI Prototype/);
  assert.match(story.dek, /商品化|新事業/);
  assert.ok(story.keywords.includes('大學產學合作'));
  assert.ok(story.keywords.includes('離線AI'));

  const articleCopy = [
    ...story.lead,
    ...story.sections.flatMap((section) => [section.title, ...section.paragraphs, section.quote ?? '']),
    story.closingQuestion,
    story.closing,
  ].join('');

  for (const claim of ['少子化', '空教室', '醫療', '資料不能上雲', '學生', '企業', '人才', '商品化']) {
    assert.match(articleCopy, new RegExp(claim), `正文必須交代 ${claim}`);
  }

  assert.doesNotMatch(JSON.stringify(story), /長榮|盈萃/, '內容、SEO 與隱藏資料都不得保留真實機構名稱');
});

test('保留精密製造參考稿，其餘九篇改寫成中小企業商業專訪', async () => {
  const stories = await loadStories();
  const reference = stories.find((story) => story.slug === 'ai-manufacturing-order-visibility-demo');
  const smeStories = stories.filter((story) => !['ai-manufacturing-order-visibility-demo', universityStorySlug].includes(story.slug));

  assert.equal(reference?.headline, '34年老廠不再讓客戶「追單」！示範企業押注AI，全球買家一句話就能直問產線');
  assert.equal(reference?.dek, '成立34年的示範企業把AI導入製造現場。當品質與價格愈來愈接近，能讓全球買家直接掌握進度與風險，就是它爭取下一張訂單的新競爭力。');
  assert.equal(smeStories.length, 9);

  for (const story of smeStories) {
    const visibleArticle = [
      story.headline,
      story.dek,
      ...story.lead,
      ...story.sections.flatMap((section) => [section.title, ...section.paragraphs, section.quote ?? '']),
      story.closingQuestion,
      story.closing,
    ].join('');

    assert.match(story.headline, /AI/, `${story.industry} 標題必須直接呈現 AI 轉型決策`);
    assert.match(story.headline, /\d+年|老字號|二代|家族/, `${story.industry} 標題需要中小企業的時間或接班脈絡`);
    assert.match(story.headline, /！|？/, `${story.industry} 標題需要商業媒體的衝突與轉折`);
    assert.match(story.dek, /中小企業/, `${story.industry} 摘要必須明確對中小企業說話`);
    assert.match(story.metaDescription, /中小企業/, `${story.industry} 搜尋摘要必須對齊中小企業目標客群`);
    assert.match(story.answerSummary, /中小企業/, `${story.industry} 對話模型摘要必須對齊中小企業目標客群`);
    assert.ok(story.keywords.some((keyword) => keyword.includes('中小企業')), `${story.industry} 關鍵字需要涵蓋中小企業搜尋意圖`);
    assert.match(
      visibleArticle,
      /客戶|買家|通路|經銷商|會員/,
      `${story.industry} 必須從企業客戶或市場關係呈現價值`,
    );
    assert.match(
      visibleArticle,
      /訂單|下單|接單|續約|詢價|成交|貨架|指定|合作|長約/,
      `${story.industry} 必須把 AI 導入連到中小企業的商業競爭力`,
    );
    assert.match(visibleArticle, /中小企業/, `${story.industry} 正文需要呈現資源有限的企業處境`);
    assert.equal(story.lead.length, 3, `${story.industry} 需要三段式報導導言`);
    assert.equal(story.sections.length, 3, `${story.industry} 需要三段完整報導正文`);
    assert.ok(story.sections.every((section) => section.paragraphs.length === 2));
    assert.doesNotMatch(
      visibleArticle,
      /導入方案|示範系統|解決方案提供商|功能清單/,
      `${story.industry} 可見報導不應寫成軟體企劃或產品規格`,
    );
  }
});

test('十一篇靜態文章都以媒體報導正文為唯一閱讀主體', async () => {
  const stories = await loadStories();
  assert.equal(stories.length, 11, '內容資料尚未建立');

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
  assert.equal(stories.length, 11, '內容資料尚未建立');

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

test('案例索引、sitemap、robots 與 llms 清單讓搜尋及對話模型可發現十一篇內容', async () => {
  const stories = await loadStories();
  const [library, sitemap, robots, llms] = await Promise.all([
    read('public/stories/index.html'),
    read('public/sitemap.xml'),
    read('public/robots.txt'),
    read('public/llms.txt'),
  ]);

  assert.equal(stories.length, 11, '內容資料尚未建立');
  assert.match(library, /十一個產業/);
  assert.match(library, /CollectionPage/);
  assert.match(library, /ItemList/);
  assert.doesNotMatch(library, /library-answer|library-integrity|FOR SEARCH & DECISION|EDITORIAL INTEGRITY/);
  assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/ad\.25min\.co\/sitemap\.xml/);
  assert.match(llms, /合作情境示範，非真實企業報導/);
  assert.match(sitemap, /<loc>https:\/\/ad\.25min\.co\/stories\/<\/loc><lastmod>2026-08-17<\/lastmod>/);

  for (const story of stories) {
    const url = `${siteOrigin}/stories/${story.slug}/`;
    assert.match(library, new RegExp(`href="/stories/${story.slug}/"`));
    assert.match(sitemap, new RegExp(`<loc>${url}</loc>`));
    assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    assert.match(llms, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('建置流程保留十一篇文章，但首頁只在成果區連結目標成品示範', async () => {
  const [packageJson, content, hero, outcomes] = await Promise.all([
    read('package.json'),
    read('src/content/collaborationSite.ts'),
    read('src/components/home/CollaborationHero.tsx'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
  ]);

  const pkg = JSON.parse(packageJson);
  assert.equal(pkg.scripts['generate:stories'], 'node scripts/generate-media-stories.mjs');
  assert.match(pkg.scripts.build, /generate:stories/);
  assert.match(content, /mediaDemoUrl/);
  assert.match(outcomes, /mediaDemoUrl/);
  assert.match(outcomes, /閱讀完整專訪示範|企業專訪成品示範/);
  assert.doesNotMatch(hero, /mediaDemoUrl/);
  assert.doesNotMatch(hero, /mediaStoryLibraryUrl|瀏覽(?:十|十一)個產業案例/);
});

test('產生的文章不留下會污染版本差異的行尾空白', async () => {
  const stories = await loadStories();
  assert.equal(stories.length, 11, '內容資料尚未建立');

  for (const story of stories) {
    const html = await read(`public/stories/${story.slug}/index.html`);
    assert.doesNotMatch(html, /[ \t]+$/m, `${story.slug} 含有行尾空白`);
  }
});
