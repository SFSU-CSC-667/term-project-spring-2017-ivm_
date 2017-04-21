var db = require('.././server/models/db.js');

// 1
exports.getLobbyChats = function(dataStream){
    db.query('SELECT player_id, message FROM Chat WHERE game_id=' + 1 + ';', function(error, result){

        if (error){
            console.log("getLobbyChats error: " + error);
        }

        dataStream(error, result);
    })
};

exports.getAllChatsWithId = function(cid, dataStream){
    db.query('SELECT * FROM Chat WHERE chat_id=' + cid, function(error, result){

        if (error){
            console.log('getChatById error: ' + error);
        }

        dataStream(error, result);
    });
};

