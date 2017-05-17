var db = require('.././server/db.js');

exports.getShotByTankId = function(tankId, callBack) {
  //var shot = req.body;
  db.query('SELECT * FROM Shot WHERE tank_id = ' + tankId + ';',
  function(err, result){
    // if(result.rows.length!== 1 || err) return callBack(null);
    // else return callBack(result.rows[0]); // else return the 1 and only row
    if(err){ console.log("shot.js error"); return callBack(err);}
    // callBack(0,..) means that no error occurred.
    else if(result.rows.length!== 1){ return callBack(0, null);}
    // 0 as first argument to callback means no error occurred.
    else{ console.log("findname here"); return callBack(0, result.rows[0]);}
  });
}

exports.insertShot = function(shot, updateComplete){
    db.query('INSERT INTO Shot (tank_id, angle, tank_power) VALUES (' + shot.tank_id + ', ' + shot.angle + ', ' + shot.tank_power + ');',
        function(error, result){

        if (error){
            console.log("Error insertMessageForGameId: " + error);
        }

        updateComplete(error, result);
    });
}

exports.newShot = function(tankId, callBack) {
  db.query('INSERT INTO Shot (tank_id, angle, tank_power) VALUES (' + tankId + ', ' + 0 + ', ' + 5 + ') RETURNING *;',
        function(error, result) {
          if(error) console.log(error);
          else callBack(result.rows[0]);
        });
}

exports.updateShot = function(shot, callBack) {
  db.query('UPDATE Shot SET angle = ' + shot.angle
         + ', tank_power = ' + shot.tank_power
         + ' WHERE tank_id = ' + shot.tank_id + ';'
  ,
  function(err, result){
    // if(result.rows.length!== 1 || err) return callBack(null);
    // else return callBack(result.rows[0]); // else return the 1 and only row
    if(err){ return callBack(err);}
    // callBack(0,..) means that no error occurred.
    else if(result.rows.length!== 1){ return callBack(0, null);}
    // 0 as first argument to callback means no error occurred.
    else{ return callBack(err, result);}
  });
}
