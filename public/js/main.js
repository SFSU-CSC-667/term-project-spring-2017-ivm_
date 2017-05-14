var socket = io();

$( ".send-message" ).click(function() {
  socket.emit('user_message', $('#username').text() + ": " + $('.user-message-input').val());
  console.log("inside lobby messages");
  $.post( "/lobby", {message: $('.user-message-input').val()});

  $('.user-message-input').val('');

  return false;
});

socket.on('user_message', function( message ){
  $( '#messages').append( "<tr><td>" + message + "</td></tr>" + '<br />')
});

// for game - client
$( ".game-send-message" ).click(function() {
    // if incoming game_id != url's game_id
    socket.emit('game_user_message', {game: $("#gameid").text(), message: $('#username').text() + ": " + $('.user-message-input').val()});

    $.post( "/game", {message: $('.user-message-input').val()});

    $('.user-message-input').val('');

    return false;
});

socket.on('updateGameChatHistory', function( message ){
    $( '#game-messages').append( "<tr><td>" + message + "</td></tr>" + '<br />')
});