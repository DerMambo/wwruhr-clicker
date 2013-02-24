// like "import" or "use" in other languages
// we receive the http-Object
http = require('http');
fs = require('fs');

var renderResponse = function (files){
  var response = '<ul>';
  var i = 0;
  var max = files.length;
  for(i; i < max; i++){
    response += '<li>' + files[i] + '</li>';
  }
  return response += '</ul>';
};

server = http.createServer(function(req, res){
  ///////////
  // classical synchronous approach
  ///////////
  //var files = fs.readdirSync(__dirname);

  //res.writeHeader(200, {'Content-Type' : 'text/html'});
  //return res.end(renderResponse(files));


  ///////////
  // Node.js asynchronous style
  ///////////
  fs.readdir(__dirname, function(err, files){
    // readdir calls the callback-function when ready
    // in the meantime other stuff can be done.
    // No waiting like in synchronous way.
    res.writeHeader(200, {'Content-Type' : 'text/html'});
    return res.end(renderResponse(files));
  });


}).listen(3000, 'localhost');

console.log('Server running at http://localhost:3000');