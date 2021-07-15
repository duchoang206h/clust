
const cluster = require('cluster')
const http = require('http')
const {cpus} = require('os')
const process = require('process')
const numCPUs = cpus().length;
if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const server =http.createServer((req, res) => {
    for(let i=0;i<1e6;i++){}
    res.writeHead(200);
    res.end('hello world\n');
  })
  server.listen(3000,()=>console.log(`Worker ${process.pid} started`))
}