var socket = io();

$( ".send-message" ).click(function() {
  socket.emit('user_message', $('#username').text() + ": " + $('.user-message-input').val());

  $.post( "/lobby", {message: $('.user-message-input').val()});

  $('.user-message-input').val('');

  return false;
});

socket.on('user_message', function( message ){
  $( '#messages').append( "<tr><td>" + message + "</td></tr>" + '<br />')
});

// for game
$( ".send-message" ).click(function() {
    socket.emit('user_message', $('#username').text() + ": " + $('.user-message-input').val());

    $.post( "/game", {message: $('.user-message-input').val()});

    $('.user-message-input').val('');

    return false;
});