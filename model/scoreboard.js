var db = require('.././server/models/db.js');

exports.getScores = function(dataReady){
    db.query('SELECT first_name, wins FROM Player;', function(error, result){
        if (error){
            console.log('Error loading scoreboard. ' + error.status);
        }
        dataReady(result, error);
    });
};


