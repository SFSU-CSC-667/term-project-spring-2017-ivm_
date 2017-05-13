 var db = require('.././server/db.js');

// newGameUser inserts a new GameUser row, whether it has a
// new game_id (for the case where no new games available)
// or if it has the same game_id as an existing game (case where there is a game available)
 var newGameUser = function(playerId, gameId, tankId, callBack) {
   console.log("playerID = " + playerId + ", gameID = " + gameId + ", tankID=" + tankId);
   db.query('INSERT INTO GameUser( game_id, player_id, tank_id) VALUES(' + gameId + ', ' + playerId + ', '+ tankId +') RETURNING *;',
     function(err, result){

       if(err){
         console.log("newGameUser fail to insert ");
         callBack(0);
       }else {
         console.log("newGameUser inserted ");
         callBack(1);
       }
     })
 }

 // gets called if no new games are available in the GameUser table (i.e. no row exist such that its game_id is unique from all other rows)
 exports.newGame = function(playerId, tankId, callBack) {
   db.query('INSERT INTO Game(score) '
           + 'VALUES ( \'5 : 5 \') RETURNING game_id; ',
             function(err, result){
               console.log('game: ' + result.rows[0].game_id + ', and tank: ' + tankId);
               console.log('playerID in newGame: ' + playerId);
               newGameUser( playerId, result.rows[0].game_id, tankId, function(insertedGameUser){
                 if(insertedGameUser){
                   console.log("new game added: " + result.rows[0]);
                   callBack(result.rows[0].game_id);
                 }
               });
             });
   }



   exports.getGameAvailable = function(playerId, callBack) {
     // selects a game_id from GameUser table, where the row does not have the playerId of the player entering a game
     // , and the game_id does not appear twice in the table.
     db.query('SELECT g1.game_id FROM GameUser g1 WHERE g1.game_id NOT IN (SELECT g.game_id FROM GameUser g WHERE g.player_id = '+ playerId +') GROUP BY game_id HAVING COUNT(game_id) < 2;',
               function(err, result){
                 console.log("THERES A GAME: " + result);
                 if(err || result.rows.length === 0){
                   callBack(0);
                 }else {
                   console.log("the available game: " + result.rows[0].game_id);
                   callBack(result.rows[0].game_id);
                 }
               });
     }

     // gets called if an available game exists in GameUser
    exports.enterGame = function(playerId, gameId, tankId, callBack) {
      newGameUser( playerId, gameId, tankId, callBack);
    }

    exports.loadGame = function(gameId, callBack) {
      db.query('SELECT * FROM GameUser WHERE game_id = ' + gameId + ";", function(err, result){
        callBack(result);
      })
    }

    exports.getTankByPlayerAndGame = function(gameId, playerId, callBack) {
      db.query('SELECT tank_id FROM GameUser WHERE game_id = ' + gameId + " AND player_id = " + playerId + ";",
                function(err, result){
                  callBack(result.rows[0]);
                });
    }
