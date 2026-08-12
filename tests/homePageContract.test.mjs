import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁先說清楚完整顧客營運鏈，再呈現企業會得到的改變', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /把廣告帶來的客戶，\\n一路接到成交與回購/);
  assert.match(content, /詢問進來，不再漏接/);
  assert.match(content, /名單交給誰，不再靠群組喊人/);
  assert.match(content, /哪一段正在漏錢，老闆看得到/);
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

test('首頁搜尋摘要對齊從廣告到營運的整合服務與企業案例', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /從廣告獲客到成交與營運/);
  assert.match(html, /AI 客服/);
  assert.match(html, /企業客製 AI 系統/);
  assert.match(html, /LINE 與 Meta 對話管理/);
  assert.match(llms, /廣告獲客、AI 客服、對話管理/);
  assert.match(llms, /企業合作與軟體開發商合作/);
});

