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
        abstract: story.answerSummary,
      },
    ],
  };
}

const renderParagraphs = (paragraphs) => paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n');

function renderSection(section, index, story) {
  const concept = index === 1 ? `
    <div class="concept-panel" aria-label="${escapeHtml(story.concept.title)}">
      <div class="concept-panel__top">
        <span>${escapeHtml(story.concept.label)}</span>
        <small>合作情境介面</small>
      </div>
      <h3>${escapeHtml(story.concept.title)}</h3>
      <div class="concept-prompt"><b>企業問題</b><p>${escapeHtml(story.concept.prompt)}</p></div>
      <div class="concept-response">
        <b>可追溯回答</b>
        <ul>${story.concept.response.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <p class="concept-note">${escapeHtml(story.concept.note)}</p>
    </div>` : '';

  return `
    <section id="section-${section.number}">
      <p class="section-number">${escapeHtml(section.number)}</p>
      <h2>${escapeHtml(section.title)}</h2>
      ${renderParagraphs(section.paragraphs)}
      ${section.quote ? `<blockquote>${escapeHtml(section.quote)}<cite>— 示範訪談論點，正式發布前需由受訪者核准</cite></blockquote>` : ''}
      ${concept}
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
    <link rel="stylesheet" href="/stories/story.css?v=20260811-1" />
    <script defer src="/stories/story.js?v=20260811-1"></script>
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
        <a href="#answer">案例摘要</a>
        <a href="#business-value">商業價值</a>
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
            <p><b>企劃製作</b>${escapeHtml(site.name)}</p>
            <p><b>文字</b>${escapeHtml(site.authorName)}</p>
            <p><b>發布</b><time datetime="${story.publishedAt}">${story.publishedAt}</time></p>
            <p><b>內容性質</b>合作情境示範</p>
          </div>
        </header>

        <figure class="story-hero">
          <img src="${escapeHtml(story.heroImage)}" width="1536" height="864" fetchpriority="high" alt="${escapeHtml(story.heroAlt)}" />
          <figcaption><span>情境示意圖，非真實企業現場</span>${escapeHtml(story.heroCaption)}</figcaption>
        </figure>

        <section class="answer-summary" id="answer" data-answer-summary aria-labelledby="answer-title">
          <p>ANSWER-FIRST SUMMARY</p>
          <h2 id="answer-title">這個案例在解決什麼？</h2>
          <p>${escapeHtml(story.answerSummary)}</p>
          <dl>
            <div><dt>產業</dt><dd>${escapeHtml(story.industry)}</dd></div>
            <div><dt>核心問題</dt><dd>${escapeHtml(story.theme)}</dd></div>
            <div><dt>主要價值</dt><dd>${escapeHtml(story.businessValues[1].title)}</dd></div>
            <div><dt>證據狀態</dt><dd>示範情境；正式發布前逐項核准</dd></div>
          </dl>
        </section>

        <div class="story-layout">
          <aside class="story-rail" aria-label="文章重點">
            <p class="rail-label">STORY AT A GLANCE</p>
            <dl>${story.atAGlance.map((item) => `<div><dt>${escapeHtml(item.value)}</dt><dd>${escapeHtml(item.label)}</dd></div>`).join('')}</dl>
            <p class="approval-note">以上為情境設定。正式合作時，所有企業名稱、數據與引用皆須完成查證與書面核准。</p>
          </aside>
          <div class="article-body">
            <p class="lead">${escapeHtml(story.lead[0])}</p>
            ${story.lead.slice(1).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
            ${story.sections.map((section, index) => renderSection(section, index, story)).join('')}
          </div>
        </div>

        <section class="value-grid" id="business-value" aria-labelledby="value-title">
          <div class="value-heading">
            <p>ONE STORY · THREE BUSINESS WINS</p>
            <h2 id="value-title">同一個導入成果，對三種決策角色創造不同價值。</h2>
          </div>
          <div class="value-cards">${story.businessValues.map((value, index) => `
            <article><span>${String(index + 1).padStart(2, '0')}</span><small>${escapeHtml(value.audience)}</small><h3>${escapeHtml(value.title)}</h3><p>${escapeHtml(value.text)}</p></article>`).join('')}
          </div>
        </section>

        <section class="evidence-box" aria-labelledby="evidence-title">
          <div><p>EDITOR'S NOTE</p><h2 id="evidence-title">故事可以有張力，證據不能含糊。</h2></div>
          <ul>${story.evidenceGates.map((gate) => `<li><span>${escapeHtml(gate.label)}</span>${escapeHtml(gate.text)}</li>`).join('')}</ul>
        </section>

        <section class="article-conclusion">
          <p class="section-number">ENDING</p>
          <p>當企業決定導入新技術，真正值得追問的不是「有沒有AI」，而是：</p>
          <blockquote>「${escapeHtml(story.closingQuestion)}」</blockquote>
          <p>${escapeHtml(story.closing)}</p>
        </section>

        <section class="faq-section" aria-labelledby="faq-title">
          <p>QUESTIONS DECISION-MAKERS ASK</p>
          <h2 id="faq-title">${escapeHtml(story.industry)}導入常見問題</h2>
          <div class="faq-list">${story.faq.map((item) => `
            <article><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></article>`).join('')}
          </div>
        </section>

        <section class="reuse-section" id="reuse" aria-labelledby="reuse-title">
          <div class="reuse-intro"><p>AFTER PUBLISHING</p><h2 id="reuse-title">這篇內容，不只發布一次。</h2><span>一篇經過查證的企業故事，可以在不同成交節點重複工作。</span></div>
          <div class="reuse-list">${story.reuse.map((item, index) => `
            <article><b>${String(index + 1).padStart(2, '0')}</b><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('')}
          </div>
        </section>

        <section class="related-stories" aria-labelledby="related-title">
          <div><p>EXPLORE MORE INDUSTRIES</p><h2 id="related-title">同一套合作方法，也能進入其他產業。</h2></div>
          <div>${relatedStories.map((related) => `
            <a href="/stories/${related.slug}/"><span>${escapeHtml(related.industry)}</span><b>${escapeHtml(related.shortHeadline)}</b><small>閱讀案例 →</small></a>`).join('')}</div>
          <a class="related-all" href="/stories/">瀏覽十個產業案例</a>
        </section>
      </article>

      <aside class="story-cta" aria-labelledby="story-cta-title">
        <p>TURN YOUR DELIVERY INTO THE NEXT OPPORTUNITY</p>
        <h2 id="story-cta-title">把你的導入成果，做成下一個客戶看得懂的商業故事。</h2>
        <a href="/#collaborate">提出一個可以一起放大的合作 <span>→</span></a>
        <small>本頁是合作成品示範，不代表媒體採用、自然曝光、營收或 leads 保證。</small>
      </aside>
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
    <link rel="stylesheet" href="/stories/story.css?v=20260811-1" />
    <link rel="stylesheet" href="/stories/library.css?v=20260811-1" />
    <script defer src="/stories/story.js?v=20260811-1"></script>
    <script type="application/ld+json" id="structured-data">${safeJson(renderLibraryStructuredData(stories, site))}</script>
  </head>
  <body class="library-page">
    <div class="demo-disclosure" role="note"><strong>合作情境示範</strong><span>十篇皆為非真實企業報導，用於展示可共同製作的內容形式</span></div>
    <header class="story-header">
      <a class="story-masthead" href="/"><span>25MIN</span><strong>BUSINESS STORY</strong><small>共創商業誌</small></a>
      <nav aria-label="案例庫導覽"><a href="#industries">產業案例</a><a href="#method">合作方法</a><a class="story-nav-cta" href="/#collaborate">帶案例來聊</a></nav>
    </header>
    <main>
      <header class="library-hero">
        <p>INDUSTRY STORY LIBRARY · 01—10</p>
        <h1>十個產業，十種讓客戶更願意合作的理由。</h1>
        <p>不是把AI寫成省人力工具，而是示範它如何變成買方能感受的服務、企業能累積的品牌證據，以及軟體商能共同放大的成功案例。</p>
        <dl><div><dt>10</dt><dd>不同產業長篇案例</dd></div><div><dt>3</dt><dd>買方、企業與夥伴價值</dd></div><div><dt>100%</dt><dd>清楚揭露示範與證據邊界</dd></div></dl>
      </header>

      <section class="library-answer" id="method" data-answer-summary>
        <p>FOR SEARCH & DECISION</p><h2>這個案例庫能幫企業做什麼？</h2>
        <p>它把一項數位或AI導入，重新整理成決策者能搜尋、理解、查證與轉寄的商業故事。每篇同時交代企業問題、概念方案、三方價值、證據限制與可重複使用場景，讓一次交付成為下一次業務、品牌與夥伴合作的入口。</p>
      </section>

      <section class="story-library" id="industries" aria-labelledby="industries-title">
        <div class="library-heading"><p>SELECTED INDUSTRIES</p><h2 id="industries-title">從傳統製造到服務品牌，依你面對的問題進入。</h2></div>
        <div class="story-card-grid">${stories.map((story, index) => `
          <article class="story-card">
            <a href="/stories/${story.slug}/" aria-label="閱讀${escapeHtml(story.industry)}案例：${escapeHtml(story.shortHeadline)}">
              <div class="story-card__image"><img src="${escapeHtml(story.heroImage)}" width="720" height="405" loading="${index < 2 ? 'eager' : 'lazy'}" alt="${escapeHtml(story.heroAlt)}" /><span>${String(index + 1).padStart(2, '0')}</span></div>
              <div class="story-card__copy"><p>${escapeHtml(story.industry)} · ${escapeHtml(story.theme)}</p><h3>${escapeHtml(story.shortHeadline)}</h3><span>${escapeHtml(story.answerSummary)}</span><b>閱讀完整報導示範 →</b></div>
            </a>
          </article>`).join('')}</div>
      </section>

      <section class="library-integrity">
        <p>EDITORIAL INTEGRITY</p><h2>看起來像媒體，證據標準也必須像媒體。</h2>
        <div><article><b>01</b><h3>示範清楚揭露</h3><p>不把虛構企業、情節或成效包裝成真實客戶新聞。</p></article><article><b>02</b><h3>資料可以回查</h3><p>正式案例的數字、引用、系統畫面與權利逐項核准。</p></article><article><b>03</b><h3>搜尋內容與頁面一致</h3><p>JSON-LD、摘要與問答只描述使用者實際看得到的內容。</p></article></div>
      </section>
    </main>
    <aside class="story-cta"><p>BRING ONE REAL DELIVERY</p><h2>把一個已完成的導入，做成市場看得懂的下一個機會。</h2><a href="/#collaborate">提出合作 <span>→</span></a><small>不保證媒體採用、自然曝光、營收或 leads。</small></aside>
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

> 25MIN BUSINESS STORY 是產品、開發與市場合作案例庫，說明 AI 與數位導入如何轉成 B2B 信任、品牌證據與下一個合作機會。

重要揭露：以下皆為合作情境示範，非真實企業報導；企業名稱、數據、引用與成果在正式發布前必須逐項查證與取得書面同意。

## 案例索引

- [十個產業案例](${site.origin}/stories/): 完整案例庫與編輯原則
${stories.map((story) => `- [${story.industry}：${story.shortHeadline}](${site.origin}/stories/${story.slug}/): ${story.answerSummary}`).join('\n')}

## 合作與作者

- [25MIN 合作首頁](${site.origin}/): 品牌合作、開發合作與行銷合作入口
- 作者與案例製作：${site.authorName}
`;
}
