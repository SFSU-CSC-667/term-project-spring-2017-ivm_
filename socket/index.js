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

        // for game - server
        socket.on("game_user_message", function(msg) {
            console.log('GAME_user_message: ' + msg);
            io.emit("game_user_message", msg)
        })

    })
}

module.exports.init = init