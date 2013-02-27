$(document).ready(function(){
  window.clicker  = new Clicker();

  $('#join-game-form').on('submit', function(evt){
    clicker.joinGame($(this).serializeArray()[0].value);
    return false;
  });
});

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var socket = io.connect('http://localhost:3000/');