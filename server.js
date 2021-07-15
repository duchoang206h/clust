const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  for(let i=0;i<1e6;i++){}
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, () => {
  console.log(`Server running`);
});