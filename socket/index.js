const socketIo = new require( 'socket.io' )

const init = function( app, server ){
    const io = socketIo( server )

    app.set( 'io', io )

    io.on('connection', function(socket){

        console.log('USER_CONNECTED_TO_CHAT');

        socket.on('disconnect', function(){
            console.log('USER_DISCONNECTED_FROM_CHAT');
        })

        socket.on("user_message", function(msg){
            console.log('user_message: ' + msg);
            io.emit("user_message", msg)
        })

        // socket.on("gamePlayer",function(user){
        //    console.log('gamePlayer: ' + req.user.username);
        //    io.emit("gamePlayer", {user: req.user})
        // });
        // io.of('/game/:id').emit('connection', function(socket){
        //                           console.log('inside game socket...');
        //                           socket.emit('gamePlayer', {user: req.user} )
        //                    });

        socket.on("game", function(data){
          socket.join(data.game);
          console.log("userid: " + data.user + "enters game " + data.game +" through socket");
          console.log("room " + data.game + " joined" )
          io.to(data.game).emit("gameEnter", data);
        })

        socket.on('playerJoins', function(data){
          console.log('ready to go ' + data);
          io.to(data.game).emit("anotherPlayerJoins", data);
        })

        socket.on('startGame', function(data){
          console.log("GAME STARTS NOW");
          io.to(data.game).emit("gameStart", data);
        })
    })
}
// const game = function(gameId) {
//     var game = io.of('/game/' +  gameId)
//                   .on('connection', function(socket){
//                       socket.emit('gamePlayer', {message: 'player has joined game socket'});
//                   });
// }

module.exports.init = init
// module.exports.game = game
