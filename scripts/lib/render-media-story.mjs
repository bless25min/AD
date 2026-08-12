const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => htmlEntities[char]);

const absoluteUrl = (site, path) => new URL(path, site.origin).href;
const safeJson = (value) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');

function renderStructuredData(story, site) {
  const canonical = absoluteUrl(site, `/stories/${story.slug}/`);
  const organizationId = `${site.origin}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        alternateName: site.alternateName,
        url: site.origin,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '合作首頁', item: `${site.origin}/` },
          { '@type': 'ListItem', position: 2, name: '產業案例', item: `${site.origin}/stories/` },
          { '@type': 'ListItem', position: 3, name: story.industry, item: canonical },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        mainEntityOfPage: { '@id': canonical },
        headline: story.headline,
        description: story.metaDescription,
        image: absoluteUrl(site, story.heroImage),
        datePublished: story.publishedAt,
        dateModified: story.modifiedAt,
        author: {
          '@type': 'Person',
          name: site.authorName,
          url: site.authorUrl,
        },
        publisher: { '@id': organizationId },
        isAccessibleForFree: true,
        inLanguage: 'zh-Hant',
        articleSection: story.industry,
        keywords: story.keywords.join(', '),
        about: story.categoryTags.map((name) => ({ '@type': 'Thing', name })),
        abstract: story.dek,
      },
    ],
  };
}

const renderParagraphs = (paragraphs) => paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n');

function renderSection(section) {
  return `
    <section id="section-${section.number}">
      <h2>${escapeHtml(section.title)}</h2>
      ${renderParagraphs(section.paragraphs)}
      ${section.quote ? `<blockquote>${escapeHtml(section.quote)}</blockquote>` : ''}
    </section>`;
}

export function renderStoryPage(story, relatedStories, site) {
  const canonical = absoluteUrl(site, `/stories/${story.slug}/`);
  const image = absoluteUrl(site, story.heroImage);
  const structuredData = renderStructuredData(story, site);

  return `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <title>${escapeHtml(story.headline)}｜25MIN BUSINESS STORY</title>
    <meta name="description" content="${escapeHtml(story.metaDescription)}" />
    <meta name="author" content="${escapeHtml(site.authorName)}" />
    <meta name="keywords" content="${escapeHtml(story.keywords.join(', '))}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="zh-Hant" href="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:title" content="${escapeHtml(story.headline)}" />
    <meta property="og:description" content="${escapeHtml(story.metaDescription)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${escapeHtml(story.heroAlt)}" />
    <meta property="article:published_time" content="${story.publishedAt}" />
    <meta property="article:modified_time" content="${story.modifiedAt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(story.headline)}" />
    <meta name="twitter:description" content="${escapeHtml(story.metaDescription)}" />
    <meta name="twitter:image" content="${image}" />
    <link rel="stylesheet" href="/stories/story.css?v=20260811-2" />
    <script defer src="/stories/story.js?v=20260811-2"></script>
    <script type="application/ld+json" id="structured-data">${safeJson(structuredData)}</script>
  </head>
  <body>
    <div class="reading-progress" id="reading-progress" aria-hidden="true"></div>
    <div class="demo-disclosure" role="note">
      <strong>合作情境示範</strong>
      <span>非真實企業報導｜文中企業、數據與情節僅用於呈現合作成品形式</span>
    </div>

    <header class="story-header">
      <a class="story-masthead" href="/" aria-label="回到 25MIN 合作首頁">
        <span>25MIN</span><strong>BUSINESS STORY</strong><small>共創商業誌</small>
      </a>
      <nav aria-label="專訪頁導覽">
        <a href="/stories/">十個產業</a>
        <a class="story-nav-cta" href="/#collaborate">洽談案例製作</a>
      </nav>
    </header>

    <main id="story">
      <article>
        <nav class="breadcrumbs" aria-label="麵包屑">
          <a href="/">合作首頁</a><span>／</span><a href="/stories/">產業案例</a><span>／</span><b>${escapeHtml(story.industry)}</b>
        </nav>
        <header class="article-header">
          <div class="article-category">${story.categoryTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
          <h1>${escapeHtml(story.headline)}</h1>
          <p class="article-dek">${escapeHtml(story.dek)}</p>
          <div class="article-meta">
            <p>文／${escapeHtml(site.authorName)}</p>
            <p><time datetime="${story.publishedAt}">${story.publishedAt}</time></p>
            <p>合作情境示範</p>
          </div>
        </header>

        <figure class="story-hero">
          <img src="${escapeHtml(story.heroImage)}" width="1536" height="864" fetchpriority="high" alt="${escapeHtml(story.heroAlt)}" />
          <figcaption><span>情境示意圖，非真實企業現場</span>${escapeHtml(story.heroCaption)}</figcaption>
        </figure>

        <div class="article-body">
          <p class="lead">${escapeHtml(story.lead[0])}</p>
          ${story.lead.slice(1).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          ${story.sections.map((section) => renderSection(section)).join('')}
        </div>

        <section class="article-conclusion">
          <p>當企業決定導入新技術，真正值得追問的不是「有沒有AI」，而是：</p>
          <blockquote>「${escapeHtml(story.closingQuestion)}」</blockquote>
          <p>${escapeHtml(story.closing)}</p>
        </section>

        <aside class="article-endnote" role="note">
          <span>本頁為合作情境示範，非真實企業報導。</span>
          <a href="/#collaborate">了解案例合作方式 →</a>
        </aside>

        <section class="related-stories" aria-labelledby="related-title">
          <div><h2 id="related-title">延伸閱讀</h2></div>
          <div>${relatedStories.map((related) => `
            <a href="/stories/${related.slug}/"><span>${escapeHtml(related.industry)}</span><b>${escapeHtml(related.shortHeadline)}</b><small>閱讀全文 →</small></a>`).join('')}</div>
          <a class="related-all" href="/stories/">瀏覽全部產業案例</a>
        </section>
      </article>
    </main>

    <footer class="story-footer">
      <a href="/">${escapeHtml(site.name)}</a><span>PRODUCT × BUILD × GROWTH</span><a href="#story">回到文章頂端 ↑</a>
    </footer>
  </body>
</html>`;
}

function renderLibraryStructuredData(stories, site) {
  const url = `${site.origin}/stories/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.origin}/#organization`,
        name: site.name,
        url: site.origin,
      },
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        url,
        name: '十個產業 AI 導入與 B2B 品牌案例',
        description: '十個不同產業的合作情境示範，呈現數位與AI導入如何轉成買方信任、品牌證據與共同商機。',
        inLanguage: 'zh-Hant',
        mainEntity: { '@id': `${url}#list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#list`,
        numberOfItems: stories.length,
        itemListElement: stories.map((story, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: story.headline,
          url: `${site.origin}/stories/${story.slug}/`,
        })),
      },
    ],
  };
}

export function renderStoryLibrary(stories, site) {
  const canonical = `${site.origin}/stories/`;
  const description = '十個傳統產業、B2B與服務品牌的AI導入合作情境，示範如何把產品成果轉成買方信任、品牌證據與下一個商機。';
  return `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <title>十個產業 AI 導入與 B2B 品牌案例｜25MIN BUSINESS STORY</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="十個產業 AI 導入與 B2B 品牌案例" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${site.origin}/images/stories/ai-manufacturing-order-visibility-demo.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="/stories/story.css?v=20260811-2" />
    <link rel="stylesheet" href="/stories/library.css?v=20260811-2" />
    <script defer src="/stories/story.js?v=20260811-2"></script>
    <script type="application/ld+json" id="structured-data">${safeJson(renderLibraryStructuredData(stories, site))}</script>
  </head>
  <body class="library-page">
    <div class="demo-disclosure" role="note"><strong>合作情境示範</strong><span>十篇皆為非真實企業報導，用於展示可共同製作的內容形式</span></div>
    <header class="story-header">
      <a class="story-masthead" href="/"><span>25MIN</span><strong>BUSINESS STORY</strong><small>共創商業誌</small></a>
      <nav aria-label="案例庫導覽"><a href="#industries">產業案例</a><a class="story-nav-cta" href="/#collaborate">案例合作</a></nav>
    </header>
    <main>
      <header class="library-hero">
        <p>產業案例</p>
        <h1>十個產業，十種讓客戶更願意合作的理由。</h1>
        <p>不是把AI寫成省人力工具，而是示範它如何變成買方能感受的服務、企業能累積的品牌證據，以及軟體商能共同放大的成功案例。</p>
      </header>

      <section class="story-library" id="industries" aria-labelledby="industries-title">
        <div class="library-heading"><h2 id="industries-title">最新案例</h2></div>
        <div class="story-card-grid">${stories.map((story, index) => `
          <article class="story-card">
            <a href="/stories/${story.slug}/" aria-label="閱讀${escapeHtml(story.industry)}案例：${escapeHtml(story.shortHeadline)}">
              <div class="story-card__image"><img src="${escapeHtml(story.heroImage)}" width="720" height="405" loading="${index < 2 ? 'eager' : 'lazy'}" alt="${escapeHtml(story.heroAlt)}" /><span>${String(index + 1).padStart(2, '0')}</span></div>
              <div class="story-card__copy"><p>${escapeHtml(story.industry)} · ${escapeHtml(story.theme)}</p><h3>${escapeHtml(story.shortHeadline)}</h3><span>${escapeHtml(story.dek)}</span><b>閱讀全文 →</b></div>
            </a>
          </article>`).join('')}</div>
      </section>

    </main>
    <footer class="story-footer"><a href="/">${escapeHtml(site.name)}</a><span>PRODUCT × BUILD × GROWTH</span><a href="#industries">瀏覽產業 ↑</a></footer>
  </body>
</html>`;
}

export function renderSitemap(stories, site) {
  const urls = [
    { loc: `${site.origin}/`, lastmod: stories[0].modifiedAt },
    { loc: `${site.origin}/stories/`, lastmod: stories[0].modifiedAt },
    ...stories.map((story) => ({ loc: `${site.origin}/stories/${story.slug}/`, lastmod: story.modifiedAt })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, lastmod }) => `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>\n`;
}

export function renderRobots(site) {
  return `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`;
}

export function renderLlms(stories, site) {
  return `# ${site.name}

> 25MIN BUSINESS STORY 協助企業把 LINE、Meta、門市與業務流程接成每天會用的企業客製 AI 系統。先解決最容易漏單、最花時間的一段；做出能確認的改變後，再製作企業專訪，讓客戶看懂這家公司為什麼更值得合作。

重要揭露：以下皆為合作情境示範，非真實企業報導；企業名稱、數據、引用與成果在正式發布前必須逐項查證與取得書面同意。

## 案例索引

- [十個產業案例](${site.origin}/stories/): 完整案例庫與編輯原則
${stories.map((story) => `- [${story.industry}：${story.shortHeadline}](${site.origin}/stories/${story.slug}/): ${story.dek}`).join('\n')}

## 合作與作者

- [25MIN 合作首頁](${site.origin}/): 企業客製 AI 系統、顧客營運整合與企業專訪服務
- 合作方式：企業合作與軟體開發商合作。企業可以從訂單、客戶信任或營運效率問題開始；軟體開發商可以把客戶導入成果整理成可重複使用的 B2B 成功案例。
- 主要交付：真正運作的 AI 流程與系統，以及經企業確認、可供業務使用的企業專訪內容。
- 作者與案例製作：${site.authorName}
`;
}
