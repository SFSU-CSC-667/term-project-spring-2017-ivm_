var db = require('../server/db.js');

exports.getLobbyChats = function(dataStream){
    db.query('SELECT player_id, message FROM Chat WHERE game_id=' + 1 + ';', function(error, result){

        if (error){
            console.log("getLobbyChats error: " + error);
        }

        dataStream(error, result);
    })
};

exports.getAllChatsWithGameId = function(gid, dataStream){
    db.query('SELECT * FROM Chat WHERE game_id=' + gid, function(error, result){

        if (error){
            console.log('getChatById error: ' + error);
        }

        dataStream(error, result);
    });
};

exports.insertMessageForGameId = function(gid, pid, message, updateComplete){
    db.query('INSERT INTO Chat (game_id, player_id, message) VALUES (\''+ gid + ' ' + pid + ' ' + message + ');',
        function(error, result){

        if (error){
            console.log("Error insertMessageForGameId: " + error);
        }

        updateComplete(error, result);
    });
}
