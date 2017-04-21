var db = require('.././server/models/db.js');

exports.getLobbyChats = function(dataStream){
    db.query('SELECT player_id, message FROM Chat WHERE chat_id = 1;', function(error, result){
        if (error){
            console.log("getLobbyChats error: " + error);
        }
        dataStream(error, result);
    })
};

exports.getChatById = function(dataStream){
    db.query('SELECT ', function(error, result){
        if (error){
            console.log('getChatById error: ' + error);
        }
        dataStream(error, result);
    });
};

