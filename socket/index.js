const socketIo = new require( 'socket.io' )

const init = function( app, server ){
    const io = socketIo( server )

    app.set( 'io', io )

    io.on('connection', function(socket){

        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
        })

        socket.on("user_message", function(data){
            io.emit("user_message", data)
        })

    })
}

module.exports.init = init