var Clicker;

Clicker = (function(){

  function Clicker(clicker){
    this.createListeners();
    this.clicks = 0;
    this.prog = 0;
    this.joinGame = __bind(this.joinGame, this);
    this.onPlayerJoined = __bind(this.onPlayerJoined, this);
    this.renderPlayerList = __bind(this.renderPlayerList, this);
  }

  Clicker.prototype = {
    createListeners: function(){
      socket.on('playerJoined', this.onPlayerJoined);
      socket.on('message', this.onMessage);
      socket.on('updateClicks', this.onUpdateClicks);
      socket.on('enteredGame', this.onEnteredGame);
      socket.on('gameFinished', this.onGameFinished);
      $('#clicker-button').on('click', this.onClick);
    },

    onClick: function(evt){
      clicker.clicks++;
      clicker.prog = (clicker.clicks / 100) * 100;
      clicker.onUpdateClicks({name: clicker.name, clicks: clicker.clicks, prog: clicker.prog});
      socket.emit('playerClicked', clicker.name);
    },

    joinGame: function(name){
      if(clicker.name === undefined){
        socket.emit('joinGame', name);
      }
    },

    onMessage: function(data){
      alert(data);
    },

    onEnteredGame: function(data){
      clicker.name = data.name;
      $('#join-wrapper').fadeOut(500, function(){
        clicker.renderPlayerList(data.players);
        $('#clicker-button').fadeIn();
      });
    },

    onPlayerJoined: function(data){
      clicker.renderPlayerList(data.players);
    },

    renderPlayerList: function(players){
      var list = '<table class="table table-striped"><thead><tr><th width="25%">Player</th><th>Progress</th></tr></thead>';
      var i = 0;
      var max = players.length;
      var prog = 0;
      var clickCount = 100;
      $.each(players, function(key, player){
        prog = 0;
        list += '<tr>';
        list += '<td>' + player.name + '</td>';
        list += '<td><div class="progress"><div id="player-progress-' + player.name + '" class="bar" style="width: ' + prog + '%;"></div></div></td>';
        list += '</tr>';
      });

      list += '</table>';

      $('#game-wrapper').html(list).fadeIn();
    },

    onUpdateClicks: function(data){
      console.log('onUpdateClicks', data);
      $('#player-progress-' + data.name).css('width', data.prog + '%');
    },

    onGameFinished: function(data){
      $('#clicker-button').unbind();
      alert('And the winner is: ' + data.name);
    }
  };

  return Clicker;
})();