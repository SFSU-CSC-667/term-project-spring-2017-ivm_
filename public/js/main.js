var socket = io();

$( "#send-message" ).click(function() {
  socket.emit('user_message', $('#username').text() + ": " + $('#user-message-input').val());
  $('#user-message-input').val('');

  return false;
});

socket.on('user_message', function( message ){
  $( '.messages' ).append( message + '<br />')
});

