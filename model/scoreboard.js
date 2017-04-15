var db = require('.././server/models/db.js');

exports.getScores = function(dataReady){
    db.query('SELECT * FROM Player;', function(error, result){
        if (error){
            console.log('Error loading scoreboard. ' + error.status);
        }
        console.log("Here : " + result);
        dataReady(result, error);
    });
};


