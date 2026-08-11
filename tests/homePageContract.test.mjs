import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁以媒體報導目標倒推 AI 導入轉型', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /先決定希望市場看見什麼，再把值得被報導的轉型真正做出來/);
  assert.match(content, /定義報導目標/);
  assert.match(content, /倒推 AI 導入與整合/);
  assert.match(content, /驗證成果，完成專訪報導/);
  assert.doesNotMatch(content, /先上車後補票/);
});

test('首頁只承諾兩項可交付成果', async () => {
  const content = await read('src/content/collaborationSite.ts');

  for (const label of ['真正完成的 AI 導入轉型', '能對外使用的企業專訪報導']) {
    assert.match(content, new RegExp(label));
  }
});

test('首頁移除客戶案例與複雜分流，只保留結果倒推流程', async () => {
  const home = await read('src/pages/HomePage.tsx');

  for (const component of ['CollaborationHero', 'OutcomeFirstCollaboration', 'CollaborationCTA']) {
    assert.match(home, new RegExp(component));
  }
  assert.doesNotMatch(home, /AssetRouter|FeaturedEvidence|CollaborationFlywheel|CollaborationEntrances|SoftwarePartnerBlueprint|CollaborationTrust/);
});

test('首頁 CTA 直接提供 LINE、Email、電話與 Lead 事件語義', async () => {
  const cta = await read('src/components/home/CollaborationCTA.tsx');

  assert.match(cta, /https:\/\/line\.me\/ti\/p\/~reedread/);
  assert.match(cta, /mailto:bless@25min\.co/);
  assert.match(cta, /tel:0983919101/);
  assert.match(cta, /fbq\?\.\('track', 'Lead'\)/);
  assert.doesNotMatch(cta, /liff\.line\.me/);
});

test('首頁搜尋摘要對齊結果倒推商模', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /先定義值得被報導的企業轉型目標/);
  assert.match(html, /AI 導入與系統整合/);
  assert.doesNotMatch(html, /客戶案例與 B2B 商機/);
  assert.match(llms, /先定義企業專訪目標，再倒推 AI 導入、流程改造與系統整合/);
  assert.match(llms, /AI 導入轉型與企業專訪合作入口/);
});

