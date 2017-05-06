/**
 * Created by Maroun on 3/18/17.
 */
var db = require('.././server/db.js');

exports.getTankById = function(res, req, callBack) {
  var tank = req.body;
  db.query('SELECT * FROM Tank WHERE tank_id = ' + tank.tank_id + ';',
  function(err, result){
    // if(result.rows.length!== 1 || err) return callBack(null);
    // else return callBack(result.rows[0]); // else return the 1 and only row
    if(err){ console.log("tank.js error"); return callBack(err);}
    // callBack(0,..) means that no error occurred.
    else if(result.rows.length!== 1){ return callBack(0, null);}
    // 0 as first argument to callback means no error occurred.
    else{ console.log("findname here"); return callBack(0, result.rows[0]);}
  });
}

exports.updateTank = function(tank, callBack) {
  db.query('UPDATE Tank SET coordinate_x = ' + tank.coordinate_x
         + ', coordinate_y = ' + tank.coordinate_y
         + ' WHERE tank_id = ' + tank.tank_id + ';'
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

// callBack gets id of new tank
exports.newTank = function(callBack) {
  // REMOVE SHOTID FROM DATABASE AND THESE CODES LATER.
  db.query('INSERT INTO Tank(shot_id, coordinate_x, coordinate_y) VALUES('
  + 0 +', ' + 25 + ', ' + 0 + ') RETURNING *;', function(err, result){
    if(err){
      console.log("error inserting newTank");
    }else{
      console.log("new tank created: " +result.rows[0].tank_id);
      callBack(result.rows[0].tank_id);
    }
  });
}
