import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁先賣企業想完成的改變，而不是某一種 CRM 功能', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /把那件你一直想改善，\\n卻只能靠人盯的事，做成公司自己的系統/);
  assert.match(content, /少漏掉已經來詢問的客戶/);
  assert.match(content, /不用每天追著人問進度/);
  assert.match(content, /讓會做的人把做法留下來/);
  assert.doesNotMatch(content, /LINE 一批、Meta 一批/);
});

test('首頁把系統導入與企業專訪串成前後因果', async () => {
  const [content, component] = await Promise.all([
    read('src/content/collaborationSite.ts'),
    read('src/components/home/OutcomeFirstCollaboration.tsx'),
  ]);

  assert.match(component, /先讓一個可驗證的營運改變發生/);
  assert.match(component, /再整理成客戶願意相信的企業案例/);
  assert.match(content, /團隊每天會用的系統/);
  assert.match(content, /業務敢放進提案的企業案例/);
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

  assert.match(cta, /傳一張你現在的流程給我/);
  assert.match(cta, /截圖、Excel 或一段語音都可以/);
  assert.match(cta, /值不值得做，最小可以從哪裡開始/);
  assert.match(cta, /https:\/\/line\.me\/ti\/p\/~reedread/);
  assert.match(cta, /mailto:bless@25min\.co/);
  assert.match(cta, /tel:0983919101/);
  assert.match(cta, /fbq\?\.\('track', 'Lead'\)/);
  assert.doesNotMatch(cta, /liff\.line\.me/);
});

test('首頁搜尋摘要對齊企業客製系統、可驗證改變與企業案例', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /把那件你一直想改善/);
  assert.match(html, /企業客製 AI 系統/);
  assert.match(html, /可驗證改變/);
  assert.match(llms, /企業客製 AI 系統/);
  assert.match(llms, /企業合作與軟體開發商合作/);
});

