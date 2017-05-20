var game = require('.././model/game.js');
const socketIo = new require('socket.io')

const init = function(app, server) {
        const io = socketIo(server)

        app.set('io', io)

        io.on('connection', function(socket) {

            socket.on('disconnect', function() {
                console.log('USER_DISCONNECTED_FROM_CHAT');
            })

            socket.on("user_message", function(msg) {
                io.emit("user_message", msg)
            })


            socket.on("game_user_message", function(msg) {
                io.emit("game_user_message", msg)
            })

            socket.on("game", function(data) {
                socket.join(data.game);

                socket.on('disconnect', function() {
                    io.to(data.game).emit("otherPlayerLeft", data);

                    game.getGameUserById(data.game, function(gameAcquired) {
                            if (gameAcquired.rows.length === 1) {
                                game.deleteGameById(data.game, function(anyError) {
                                    if (anyError) {
                                        console.log("ERROR DELETING GAME")
                                    }
                                    socket.leave(data.game);
                                });
                            } else {
                                game.deleteGameUserByPlayerIdAndGameId(data.game, data.user, function(err, result) {

                                })
                                socket.leave(data.game);
                            }

                        })

                });
                io.to(data.game).emit("gameEnter", data);
            })

            socket.on('playerJoins', function(data) {
                io.to(data.game).emit("anotherPlayerJoins", data);
            })

            socket.on('startGame', function(data) {
                io.to(data.game).emit("gameStart", data);
            })

            socket.on('shoot', function(data) {
                io.to(data.game).emit("shootFromOpposingPlayer", data);
            })

            socket.on('sendAngle', function(data) {
                io.to(data.game).emit("animateOpponentAngle", data);
            })

            socket.on('moveTank', function(data) {
                io.to(data.game).emit("playerMoved", data);
            })

            socket.on('leftGame', function(data) {
                io.to(data.game).emit("removePlayer", data);
            });

            socket.on('"backgroundInitialization"', function(data){
              io.to(data.game).emit("backgroundCreation", data);
            });

            socket.on("gameOver", function(data){
              io.to(data.game).emit("displayWinner", data);
            });
    })
}


module.exports.init = init
