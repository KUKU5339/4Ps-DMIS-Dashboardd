const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT ? Number(process.env.PORT) : 5173;
const root = process.cwd();

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(root, url === '/' ? 'index.html' : url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not found');
      return;
    }
    res.statusCode = 200;
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Preview URL: http://localhost:${port}/`);
});
