
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

var players = {};
var maxClicks = 100;

io.sockets.on('connection', function (socket) {
  console.log('User joined');

  socket.on('joinGame', function(name){
    console.log('player joins', players, name);
    socket.playername = name;

    if(players[name]){
      console.log('Player exists', name);
      return socket.send('Name bereits vergeben: ' + name);
    }

    players[name] = {name: name, clicks: 0, prog: 0};
    console.log('CurrentPlayers', players);
    socket.emit('enteredGame', {name: name, players: players, prog: 0});
    socket.broadcast.emit('playerJoined', {players: players});
  });

  socket.on('playerClicked', function(player){
    if(!players[player]){ return ;}
    players[player].clicks++;
    players[player].prog = (players[player].clicks / maxClicks) * 100;
    console.log(maxClicks, players[player]);
    console.log('playerClicked', player);

    if(players[player].prog >= 100){
      console.log('player wins', players[player].name);
      io.sockets.emit('gameFinished', players[player]);
    }

    socket.broadcast.emit('updateClicks', players[player]);
  });

  socket.on('disconnect', function(){
    delete players[socket.playername];
    io.sockets.emit('playerleft', socket.playername);
  });

});