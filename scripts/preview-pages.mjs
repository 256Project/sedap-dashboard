import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist/pages');
const prefix = '/sedap-dashboard/';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (!url.pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
  const pathname = decodeURIComponent(url.pathname.slice(prefix.length));
  const file = resolve(root, pathname + (pathname.endsWith('/') || !pathname ? 'index.html' : ''));
  if (!file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
  try { const data = await readFile(file); response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(data); }
  catch { response.writeHead(404).end('Not found'); }
}).listen(5175, '127.0.0.1', () => console.log('Pages preview: http://127.0.0.1:5175/sedap-dashboard/'));
