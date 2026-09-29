import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createAppServer } from '../server.mjs';
import { records, recordHash, findRecordByHash } from '../src/records.js';

test('每条记录生成的详情链接都能解析回同一患者', () => {
  assert.equal(new Set(records.map((record) => record.id)).size, records.length);
  for (const record of records) assert.equal(findRecordByHash(recordHash(record.id)), record);
});

test('错误前缀、未知编号和非法路径不会误返回患者', () => {
  for (const hash of ['#/records/BROKEN-VIS-20260929-006', '#/records/NOT-FOUND', '#/records/', '#/other/VIS-20260929-006', '#/records/<script>']) {
    assert.equal(findRecordByHash(hash), undefined, hash);
  }
});

test('本地 HTTP 服务提供页面和模块，同时阻止暴露仓库文件', async (t) => {
  const server = createAppServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const path of ['/', '/src/app.js', '/src/records.js', '/src/styles.css', '/favicon.svg']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.ok((await response.text()).length > 0, path);
  }
  for (const path of ['/.git/config', '/package.json', '/README.md', '/missing', '/%2e%2e/package.json']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 404, path);
    await response.text();
  }
  const head = await fetch(base, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  const post = await fetch(base, { method: 'POST' });
  assert.equal(post.status, 405);
  await post.text();
});
