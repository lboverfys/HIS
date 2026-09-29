import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = new URL('./', import.meta.url);
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/src/app.js', ['src/app.js', 'text/javascript; charset=utf-8']],
  ['/src/records.js', ['src/records.js', 'text/javascript; charset=utf-8']],
  ['/src/styles.css', ['src/styles.css', 'text/css; charset=utf-8']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
]);

export function createAppServer() {
  return createServer(async (request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end('Method not allowed');
      return;
    }
    const asset = assets.get(request.url.split('?')[0]);
    if (!asset) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    try {
      const content = await readFile(new URL(asset[0], root));
      response.writeHead(200, {
        'Content-Type': asset[1],
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end('Unable to read application asset');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createAppServer();
  server.on('error', (error) => {
    console.error(`服务启动失败：${error.message}`);
    process.exitCode = 1;
  });
  server.listen(4173, '127.0.0.1', () => {
    console.log('HIS 就诊记录：http://127.0.0.1:4173');
    console.log(`项目目录：${fileURLToPath(root)}`);
    console.log('按 Ctrl+C 停止服务。');
  });
}
