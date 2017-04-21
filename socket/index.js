const socketIo = new require( 'socket.io' )

const init = function( app, server ){
    const io = socketIo( server )

    app.set( 'io', io )

    io.on('connection', function(socket){

        console.log('USER_CONNECTED_TO_CHAT');

        socket.on('disconnect', function(){
            console.log('USER_DISCONNECTED_FROM_CHAT');
        })

        // this is for testing - will be changed
        socket.on("user_message", function(data){
            io.emit("user_message", data)
        })

    })
}

module.exports.init = init