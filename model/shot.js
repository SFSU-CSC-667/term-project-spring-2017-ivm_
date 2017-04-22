var db = require('.././server/models/db.js');

exports.getShotByTankId = function(res, req, callBack) {
  var shot = req.body;
  db.query('SELECT * FROM Shot WHERE tank_id = ' + shot.tank_id + ';',
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

exports.updatShot = function(shot, callBack) {
  db.query('UPDATE Shot SET angle = ' + shot.angle
         + ', power = ' + shot.power
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
