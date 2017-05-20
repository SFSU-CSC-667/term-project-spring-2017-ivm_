var db = require('.././server/db.js');

exports.getTankById = function(tankId, callBack) {
  var tank = req.body;
  db.query('SELECT * FROM Tank WHERE tank_id = ' + tankId + ';',
  function(err, result){
    if(err){
      console.log("tank.js error");
      return callBack(err);
    } else{
      return callBack(result.rows[0]);
    }
  });
}

exports.updateTank = function(tank, callBack) {
  db.query('UPDATE Tank SET coordinate_x = ' + tank.coordinate_x
         + ', coordinate_y = ' + tank.coordinate_y
         + ' WHERE tank_id = ' + tank.tank_id + ';'
  ,
  function(err, result){
    if(err){
      return callBack(err);
    }else if(result.rows.length!== 1){
      return callBack(0, null);
    }else{
      return callBack(err, result);
    }
  });
}

exports.newTank = function(callBack) {
  db.query('INSERT INTO Tank(shot_id, coordinate_x, coordinate_y) VALUES('
  + 0 +', ' + 25 + ', ' + 0 + ') RETURNING *;', function(err, result){
    if(err){
      console.log("error inserting newTank");
    }else{
      callBack(result.rows[0].tank_id);
    }
  });
}
