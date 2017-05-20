var db = require('.././server/db.js');

exports.getShotByTankId = function(tankId, callBack) {
  db.query('SELECT * FROM Shot WHERE tank_id = ' + tankId + ';',
  function(err, result){
    if(err){
      console.log("shot.js error");
      return callBack(err);
    }else if(result.rows.length!== 1){
      return callBack(0, null);
    }else{
      return callBack(0, result.rows[0]);
    }
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
    if(err){ return callBack(err);}
    else if(result.rows.length!== 1){
      return callBack(0, null);
    }
    else{
       return callBack(err, result);
     }
  });
}
