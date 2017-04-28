/**
 * Created by Maroun on 3/18/17.
 */
 exports.newGame = function(req, res, callBack) {
   // if any of the fields in the submitted form is blank, redirect to the same page but with an error message.

   db.query('INSERT INTO Game(score) '
           + 'VALUES ( \'5 : 5 \'); ',
             function(err, result){
               // if insertion fails because it violated constraints (like the constraint that
               // all password and username should be unique), then the error message will be displayed
               if(err){
                 callBack(0);
               }else {
                 // if registration is successful, go back to the homepage, and the url will have a query string registration=complete
                 // in index.js, having this query string will print 'Registration Successful' in the rendered page.
                 callBack(1);
               }
             });
   }


   exports.checkIfGameAvailable = function(res, reqBody, callBack) {
     const user = reqBody.body;
     // if any of the fields in the submitted form is blank, redirect to the same page but with an error message.

     db.query('SELECT FROM GameUsers ',
               function(err, result){
                 // if insertion fails because it violated constraints (like the constraint that
                 // all password and username should be unique), then the error message will be displayed
                 if(err){
                   callBack(0);
                 }else {
                   // if registration is successful, go back to the homepage, and the url will have a query string registration=complete
                   // in index.js, having this query string will print 'Registration Successful' in the rendered page.
                   callBack(1);
                 }
               });
     }
