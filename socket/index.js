var game = require('.././model/game.js');
const socketIo = new require('socket.io')

const init = function(app, server) {
        const io = socketIo(server)

        app.set('io', io)

        io.on('connection', function(socket) {

            console.log('USER_CONNECTED_TO_CHAT');

            socket.on('disconnect', function() {
                console.log('USER_DISCONNECTED_FROM_CHAT');
            })

            socket.on("user_message", function(msg) {
                console.log('user_message: ' + msg);
                io.emit("user_message", msg)
            })


            // for game - server
            socket.on("game_user_message", function(msg) {
                console.log('GAME_user_message: ' + msg);
                io.emit("game_user_message", msg)
            })

            // socket.on("gamePlayer",function(user){
            //    console.log('gamePlayer: ' + req.user.username);
            //    io.emit("gamePlayer", {user: req.user})
            // });
            // io.of('/game/:id').emit('connection', function(socket){
            //                           console.log('inside game socket...');
            //                           socket.emit('gamePlayer', {user: req.user} )
            //                    });

            socket.on("game", function(data) {
                socket.join(data.game);

                // allows users to disconnect from room
                socket.on('disconnect', function() {
                    console.log("USER DISCONNECTED FROM ROOM " + data.game);
                    io.to(data.game).emit("otherPlayerLeft", data);


                    game.getGameUserById(data.game, function(gameAcquired) {
                            console.log("inside socket getGameUserById");
                            if (gameAcquired.rows.length === 1) {
                                game.deleteGameById(data.game, function(anyError) {
                                    if (anyError) {
                                        console.log("ERROR DELETING GAME")
                                    } else {
                                        console.log("DELETED GAME " + data.game)
                                    }
                                    socket.leave(data.game);
                                });
                            } else {
                                game.deleteGameUserByPlayerIdAndGameId(data.game, data.user, function(err, result) {
                                    console.log('game has been deleted');
                                })
                                console.log("DELETED GAME USER " + data.game + " only.")
                                socket.leave(data.game);
                            }

                        })
                        //socket.leave(data.game);
                    console.log(data.game + " game deleted")
                        //next();
                        //gameRoutes.deleteGame();
                        // $.post({
                        //   url: "/game",
                        //   type: "DELETE",
                        //   data: {
                        //       "playerId": data.user,
                        //       "gameId": data.game
                        //   }
                        // });
                        //socket.emit("leaveGame", {data});
                        //$.post( "/gameDelete", data);
                        //window.location.href = 'game/';
                        // $.ajax({
                        //     url: urlCall + '?' + $.param({"Id": Id, "bolDeleteReq" : bolDeleteReq}),
                        //     type: 'DELETE',
                        //     success: callback || $.noop,
                        //     error: errorCallback || $.noop
                        // });

                });
                console.log("userid: " + data.username + "enters game " + data.game + " through socket");
                console.log("room " + data.game + " joined")
                io.to(data.game).emit("gameEnter", data);
            })

            socket.on('playerJoins', function(data) {
                console.log('ready to go ' + data.gameTheme + " " + data.gameCenterHeight);
                io.to(data.game).emit("anotherPlayerJoins", data);
            })

            socket.on('startGame', function(data) {
                console.log("GAME STARTS NOW");
                console.log("theme: " + data.theme + " | center: " + data.centerHeight + " | ground: " + data.ground );
                io.to(data.game).emit("gameStart", data);
            })

            socket.on('shoot', function(data) {
                console.log(data.user + "shoots");
                io.to(data.game).emit("shootFromOpposingPlayer", data);
            })

            socket.on('sendAngle', function(data) {
                //console.log(data.user + " rotates by " + data.angle);
                io.to(data.game).emit("animateOpponentAngle", data);
            })

            socket.on('moveTank', function(data) {
                io.to(data.game).emit("playerMoved", data);
                //console.log(data.user + " moved by " + data.force + ", now position is " + data.xc + ", " +data.yc);
            })

            //added 5/17
            socket.on('leftGame', function(data) {
                io.to(data.game).emit("removePlayer", data);
            });

            socket.on('"backgroundInitialization"', function(data){
              io.to(data.game).emit("backgroundCreation", data);
            });

        // socket.on('leaveGame', function(data){
        //   //socket.leave(data.game);
        // });

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
