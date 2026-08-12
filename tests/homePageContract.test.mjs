import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁先說清楚營運系統開發陪跑，再呈現企業會得到的改變', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /免大筆建置費，營運系統邊用邊做/);
  assert.match(content, /詢問進來，不再沒人接/);
  assert.match(content, /進度到哪，不用逐一問/);
  assert.match(content, /做得好的方法，留在公司裡/);
  assert.doesNotMatch(content, /LINE 一批、Meta 一批/);
});

test('首頁把系統導入與企業專訪串成前後因果', async () => {
  const [content, component] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
  ]);

  assert.match(component, /先挑一件最值得改善的事/);
  assert.match(content, /有成果，再對外說/);
  assert.match(content, /一套公司真的在用的系統/);
  assert.match(content, /一個客戶看得懂的成果/);
});

test('首頁移除客戶案例與複雜分流，只保留結果倒推流程', async () => {
  const home = await read('src/pages/HomePage.tsx');

  for (const component of ['CollaborationHero', 'OutcomeFirstCollaboration', 'CollaborationCTA']) {
    assert.match(home, new RegExp(component));
  }
  assert.doesNotMatch(home, /AssetRouter|FeaturedEvidence|CollaborationFlywheel|CollaborationEntrances|SoftwarePartnerBlueprint|CollaborationTrust/);
});

test('首頁 CTA 允許直接傳現況，不要求客戶先寫規格', async () => {
  const cta = await read('src/components/home/CollaborationCTA.tsx');

  assert.match(cta, /用 LINE 傳給我/);
  assert.match(cta, /一張畫面、Excel，或一段語音/);
  assert.match(cta, /不用先整理規格/);
  assert.match(cta, /https:\/\/line\.me\/ti\/p\/~reedread/);
  assert.match(cta, /mailto:bless@25min\.co/);
  assert.match(cta, /tel:0983919101/);
  assert.match(cta, /fbq\?\.\('track', 'Lead'\)/);
  assert.doesNotMatch(cta, /liff\.line\.me/);
});

test('首頁搜尋摘要對齊營運系統開發陪跑、導入方式與企業案例', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /免大筆建置費/);
  assert.match(html, /營運系統開發陪跑/);
  assert.match(html, /企業客製 AI 系統/);
  assert.match(html, /邊用邊改/);
  assert.match(llms, /營運系統開發陪跑/);
  assert.match(llms, /企業合作與軟體開發商合作/);
});

