import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('首頁以多方合作而非求職作為核心定位', async () => {
  const content = await read('src/content/collaborationSite.ts');

  assert.match(content, /把你的產品、客戶與成功案例，變成下一個可成交的合作機會/);
  assert.match(content, /Product × Build × Growth Partner/);
  assert.doesNotMatch(content, /邀請我加入團隊|應聘|求職|AI 應用規劃師/);
});

test('首頁提供品牌、開發與行銷三個可組合入口', async () => {
  const content = await read('src/content/collaborationSite.ts');

  for (const label of ['品牌合作', '開發合作', '行銷合作']) {
    assert.match(content, new RegExp(label));
  }

  for (const asset of ['產品／技術', '品牌／客戶', '成功案例', '內容／通路', '尚未成形的構想']) {
    assert.match(content, new RegExp(asset));
  }
});

test('首頁呈現軟體商多贏藍圖與五個真實能力證據', async () => {
  const content = await read('src/content/collaborationSite.ts');

  for (const party of ['軟體開發商', '企業客戶', 'Bless', '內容／媒體夥伴']) {
    assert.match(content, new RegExp(party));
  }

  for (const project of ['line-chat-manager', 'TALO', 'FightNight', 'RoleFit', 'dr-julia']) {
    assert.match(content, new RegExp(project, 'i'));
  }
});

test('首頁元件包含資產分流、合作飛輪、合作藍圖與聯絡入口', async () => {
  const home = await read('src/pages/HomePage.tsx');

  for (const component of [
    'CollaborationHero',
    'AssetRouter',
    'CollaborationFlywheel',
    'CollaborationEntrances',
    'SoftwarePartnerBlueprint',
    'FeaturedEvidence',
    'CollaborationTrust',
    'CollaborationCTA',
  ]) {
    assert.match(home, new RegExp(component));
  }
});

test('首頁保留正式 LINE destination 與 Lead 事件語義', async () => {
  const cta = await read('src/components/home/CollaborationCTA.tsx');

  assert.match(cta, /https:\/\/liff\.line\.me\/1654828981-Dqym5ASE\/card/);
  assert.match(cta, /fbq\?\.\('track', 'Lead'\)/);
});

