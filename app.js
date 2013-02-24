
var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);



app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

server.listen(3000);

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

var playerId = 0;
var players = {};

io.sockets.on('connection', function (socket) {
  playerId++;
  players['player-' + playerId] = 0;
  console.log(players);

  socket.emit('playerJoined', { playerId: playerId });

  socket.on('click', function (data) {
    console.log(data);
    players['player-' + data.playerId]++;
    socket.broadcast.emit('clickUpdate', {playerId: data.playerId, clicks: players['player-' + data.playerId]});
  });
});