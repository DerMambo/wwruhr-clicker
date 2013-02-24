// like "import" or "use" in other languages
// we receive the http-Object
http = require('http');

server = http.createServer(function(req, res){
  res.writeHeader(200, {'Content-Type' : 'text/html'});
  res.end('<h1>Hello World</h1>');
}).listen(3000, 'localhost');

console.log('Server running at http://localhost:3000');