import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁用企業主會說的話交代顧客流程問題', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /客人從 LINE 進來，\\n誰接、接到哪裡，老闆應該隨時看得到/);
  assert.match(content, /不用整間公司砍掉重練/);
  assert.match(content, /名單進來了，沒人知道輪到誰接/);
  assert.match(content, /公司最會賣的人一請假，整組人跟著卡住/);
  assert.doesNotMatch(content, /先上車後補票/);
});

test('首頁清楚區分每天使用的系統與對外使用的企業專訪', async () => {
  const content = await read('src/content/collaborationSite.ts');

  for (const label of ['團隊每天會打開的系統', '客戶願意轉傳給老闆看的專訪']) {
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

test('首頁 CTA 以低壓流程討論為主要意圖並保留直接聯絡方式', async () => {
  const cta = await read('src/components/home/CollaborationCTA.tsx');

  assert.match(cta, /用 LINE 跟我說最想改哪一段/);
  assert.match(cta, /https:\/\/line\.me\/ti\/p\/~reedread/);
  assert.match(cta, /mailto:bless@25min\.co/);
  assert.match(cta, /tel:0983919101/);
  assert.match(cta, /fbq\?\.\('track', 'Lead'\)/);
  assert.doesNotMatch(cta, /liff\.line\.me/);
});

test('首頁搜尋摘要對齊企業客製 AI 系統與雙成果商模', async () => {
  const [html, llms] = await Promise.all([read('index.html'), read('public/llms.txt')]);

  assert.match(html, /客人從 LINE 進來，誰接、接到哪裡，老闆應該隨時看得到/);
  assert.match(html, /企業客製 AI 系統/);
  assert.doesNotMatch(html, /客戶案例與 B2B 商機/);
  assert.match(llms, /企業客製 AI 系統/);
  assert.match(llms, /企業合作與軟體開發商合作/);
});

