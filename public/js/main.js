<<<<<<< HEAD
// var chats = require('../.././model/chat.js');
=======
>>>>>>> maroun
var socket = io();

$( "#send-message" ).click(function() {
  socket.emit('user_message', $('#username').text() + ": " + $('#user-message-input').val());
  $('#user-message-input').val('');

  return false;
});

socket.on('user_message', function( message ){
<<<<<<< HEAD
    $( '.messages' ).append( $('#username').text() + ": " + message + '<br />')
});
=======
  $( '.messages' ).append( message + '<br />')
});
>>>>>>> maroun
