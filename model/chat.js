var db = require('../server/db.js');

exports.getLobbyChats = function(dataStream){
    db.query('SELECT username, message FROM Chat WHERE game_id=' + 0 + ' ORDER BY created_at DESC;', function(error, result){

        if (error){
            console.log("getLobbyChats error: " + error);
        }

        dataStream(error, result);
    })
};

exports.getAllChatsWithGameId = function(gid, dataStream){
    db.query('SELECT * FROM Chat WHERE game_id=' + gid, function(error, result){
        console.log("Getting chats where game_id=" + gid);
        if (error){
            console.log('getChatById = ' + gid + ' error: ' + error);
        }

        dataStream(error, result);
    });
};

exports.insertMessageForGameId = function(gid, pid, username, message, updateComplete){
    db.query('INSERT INTO Chat (game_id, player_id, username, message) VALUES (' + gid + ', ' + pid + ', ' + '\'' + username + '\'' + ', ' + '\'' + message + '\'' + ');',
        function(error, result){
            console.log('Insert chat with gid: ' + gid + ' username:' + username);

            if (error){
                console.log("Error insertMessageForGameId: " + error);
            }

            updateComplete(error, result);
        });
}

exports.insertMessageForLobby = function(pid, username, message, updateComplete){
    this.insertMessageForGameId(0, pid, username, message, function(error, result){
        updateComplete(error, result)
    })
}