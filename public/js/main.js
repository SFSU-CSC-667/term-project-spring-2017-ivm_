var socket = io();

$(function() {
    setTimeout(
        function()
        {
            autoScroll("#messages")
        }, 1000);
});

$( ".send-lobby-message" ).click(function() {
  socket.emit('user_message', $('#username').text() + ": " + $('.user-lobby-input').val());
  console.log("inside lobby messages");
  $.post( "/lobby", {message: $('.user-lobby-input').val()});

  $('.user-lobby-input').val('');

  return false;
});

socket.on('user_message', function( message ){
  $( '#lobby-messages').append( "<li>" + message + "</li>" + '<br />')
    autoScroll("#messages")
});

// for game - client
$( ".game-send-message" ).click(function() {
    // if incoming game_id != url's game_id
    socket.emit('game_user_message', {game: $("#gameid").text(), message: $('#username').text() + ": " + $('.user-message-input').val()});
    $.post( "/game", {message: $('.user-message-input').val()});

    $('.user-message-input').val('');

    return false;
});

socket.on('game_user_message', function( message ){
    if (message["game"] === $('#gameid').text()){
        $( '#game-messages').append( "<tr><td>" + message["message"] + "</td></tr>" + '<br />')
    }
});

function autoScroll(elementId){
    $(elementId).animate({ scrollTop: $(elementId).prop("scrollHeight")}, 500);
}