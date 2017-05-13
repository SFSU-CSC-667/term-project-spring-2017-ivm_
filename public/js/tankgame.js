// var gameSocket = require('../socket/index.js')
// const tankTable = require('../.././model/tank.js');
// const shotTable = require('../.././model/tank.js');
var socket = io();
var players = [];
var i =0;
// socket.game($("#gameid").text());
// sends user information and joins socket room associated with game id (req.params.id)
socket.emit('game', { user: $("#userid").text(), game: $("#gameid").text(), numberPlayers: $("#numberPlayers").text()});

var players = [];

socket.on('gameEnter', function (data) {
    //console.log("Client user id: " + data.user + " has entered game " + data.game);
    //var numberOfPlayers = $("#numberPlayers").text();
    //var numberOfPlayers = parseInt(numberOfPlayers) + 1;
    //$("#numberPlayers").text(parseInt($("#numberPlayers").text()) + 1);
    var numberOfPlayers = parseInt($("#numberPlayers").text());
    $("#numberPlayers").text(data.numberPlayers);
    if(numberOfPlayers !== parseInt($("#numberPlayers").text())){
      // document.createElement("P");
      // var t = document.createTextNode("This is a paragraph.")
      document.getElementById("players").appendChild(document.createElement("P").appendChild(document.createTextNode(data.user)));
    }
    // only the 2nd player will enter this block.
    if(numberOfPlayers > 1){
      console.log("HERE AT NUMPLAYERS===2");
      document.getElementById("check").innerHTML += "... OK";
      $('#players').find('p').each(function(){
        players.push($(this).text());
        document.getElementById("check").innerHTML += $(this).text() + " got pushed | ";
      });
      for(i = 0; i < players.length; i++) {
        document.getElementById("check").innerHTML += players[i] + " in player | ";
      }
      // sends message to other player
      socket.emit('playerJoins', {game: $("#gameid").text() ,msg: 'ready to start Game!', playerArray: players});
    }
      //$("#players").text(data.user);
    //}else{
      //document.getElementById("players").appendChild(document.createElement("P").appendChild(document.createTextNode(data.user)));
      // $("#players").text($("#players").text() + " " + data.user);
    //}
    document.getElementById("check").innerHTML += "user id: " + data.user + " has entered game " + data.game +" ! NumPlayers: " + $("#numberPlayers").text() + "(" + $("#players").text() +")";
});

// only first player gets here. CONTINUE HERE
if(parseInt($("#numberPlayers").text()) === 1) {
  // finally, after 2nd player joins, this gets executed.
  socket.on('anotherPlayerJoins', function(data) {
    // console.log('i incremented ' + i);
    // if(++i == 2){
    //   console.log('inside another player joibs. msg: ' + data);
    //   $('#players').find('p').each(function(){
    //     players.push($(this).text());
    //     console.log($(this).text() + " got pushed");
    //   });
    // }
    // player 1's array becomes player 2's array
    players = data.playerArray;
    //CONTINUE HERE: START THE GAME
    document.getElementById("check").innerHTML += "DADADDSADSA";
    for(i = 0; i < players.length; i++) {
      document.getElementById("check").innerHTML += players[i] + " in player | ";
    }
    //CONTINUE HERE. NEED TO: IMPORT TANK, SHOT AND GAME MODELS. NEED TO FIND A WAY TO SEND PLAYERS FROM 2ND PLAYER TO 1ST PLAYERS
    // CURRENT IMPLEMENTATION: 2ND PLAYER HAS BOTH IDS STORED IN PLAYERS[]
  });
} else {
    //socket.emit('playerJoins', {game: $("#gameid").text() ,msg: 'ready to start Game!', playerArray: players});
}

setInterval(printPlayers, 5000);

function printPlayers(){
  for(i = 0; i < players.length; i++) {
    document.getElementById("check").innerHTML += players[i] + " in player | ";
  }
}





const startGame = function(){

}

var pageWidth = document.documentElement.clientWidth;
var themeNumber =  Math.floor((Math.random() * 4) + 1);
var theme = "../images/gameThemes/theme" + themeNumber

var Engine = Matter.Engine,
    Composites = Matter.Composites,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Vector = Matter.Vector,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composites = Matter.Composites;





// create an engine
//var canvas = document.getElementById('gameCanvas');
//var engine = Engine.create(canvas);

var engine = Engine.create(document.body, {
    render: {
        options: {
            wireframes: false,
            background: theme + "/Full.png",
            width: pageWidth
        }
    }
});

Bodies.rectangle(0, 0, 100, 100, {
    render: {
         fillStyle: 'red',
         strokeStyle: 'blue',
         lineWidth: 3
    }
});


// engine.render.setBackground( engine.render, "white" );
var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});
var pageWidth = document.documentElement.clientWidth;

var player1Tank = Bodies.rectangle(50,235,100,25,{density:0.002, friction:0});
var player1Base = Bodies.rectangle(50,215,60,25,{density:0.002, friction:0});
var player1Turret = Bodies.circle(50,215,20, {density:0.002, friction:0});
var player1rifle = Bodies.rectangle(100,215,10,10,{density:0.002, friction:0});

var sensor1 = Bodies.rectangle(150,215,49,10, {density:0, friction:0, isSensor: true});

var player1rifleBody = Body.create({parts: [ player1rifle,player1Turret], friction:0, isSensor: true});
player1rifleBody.render.fillStyle = 'DarkGreen';

var player1Wheel = Bodies.circle(10,250,10,{density:0, friction:0});
var player1Wheel2 = Bodies.circle(90,250,10,{density:0, friction:0, opacity: 0.5});
var player = Body.create({
            parts: [player1Tank,  player1Base,player1rifleBody,  player1Wheel, player1Wheel2],
            friction:0
});
player1Base.render.fillStyle = player1Tank.render.fillStyle = 'green';
player1Wheel.render.fillStyle = player1Wheel2.render.fillStyle = 'black';

Body.setAngle(player, 0);
Body.setAngle(player1rifleBody, 0);
/*var myVar = setInterval(rot, 3000);
function rot(){
  setInterval(r, 1);
  myVar = null;
}
//player1rifleOffset.render.fillStyle = 'transparent';
function r(){
  Body.setAngle(player1rifleBody, player1rifleBody.angle + .01);
  //Body.setPosition(player1rifleBody, {x: 50,y: 235} )
  // for(var i = .01; i<2; i+= .01){
  //   Body.setAngle(player1rifleBody, player1rifleBody.angle + i);
  // }
}*/
//Body.applyForce(player1rifleBody, {x: 100, y:215 }, {x: -10, y: 100});
//Body.setPosition(player1rifleBody, {x: 100, y: 215});
// Body.setPosition(player1rifleBody, {x: player1rifleBody.position.x + 30 ,
//                         y: player1rifleBody.position.y + 30
//                       });
//Body.setVertices(player1rifleBody, [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]);
//Matter.Body.setVelocity(player, 0);
// rectangle are (x, y, width, height).. position x and y in matter-js are the CENTER of the body

// uncomment for player 2
// var player2Tank = Bodies.rectangle(500,235,100,20,{density:0.002, friction:0});
// var player2Turret = Bodies.rectangle(500,215,80,20,{density:0.002, friction:0});
// var player2rifle = Bodies.rectangle(650,215,100,10,{density:0.002, friction:0});
//
// var player2rifleBody = Body.create({parts: [player1rifle], friction:0});
// //var player1rifleBody = Composite.add(player1)
// var player2Wheel = Bodies.circle(460,250,10,{density:0, friction:0});
// var player2Wheel2 = Bodies.circle(540,250,10,{density:0, friction:0});
// var player2 = Body.create({
//             parts: [player2Tank, player2Turret, player2rifle, player2Wheel, player2Wheel2],
//             friction:0
// });



var ground = Bodies.rectangle(pageWidth/2, 600, pageWidth, 60, { isStatic: true });


var mouseConstraint = MouseConstraint.create(engine/*, {
                    element: canvas
}*/);

MouseConstraint.create(engine/*, {
 element: canvas
}*/);

var mouseIsDown;

// Events.on(mouseConstraint, 'mousedown', function(event) {
//     var mousePosition = event.mouse.position;
//     mp = mousePosition;
//     Matter.Body.rotate(player1rifleBody, 3);
//     mouseIsDown = true;
// });

Events.on(mouseConstraint, 'mousemove', function(event) {
    var mousePosition = event.mouse.position;
    mp = mousePosition;
    var angleDifference = Matter.Vector.angle(player1rifleBody.position, event.mouse.position);
    var cos = Math.cos(angleDifference), sin = Math.sin(angleDifference);
    var point = {x: 0, y:215};
    var dx = player1rifleBody.position.x - point.x, dy = player1rifleBody.position.y - point.y;
    //Body.setPosition(player1rifleBody, {x: point.x + (dx * cos - dy * sin),
      //                      y: point.y + (dx * sin + dy * cos) } );
    Body.setAngle(player1rifleBody, Matter.Vector.angle(player1rifleBody.position, event.mouse.position));
    //Body.applyForce(player1rifleBody, {x: 50, })
    // Body.setPosition(player1rifleBody, {x: player1rifleBody.position.x - event.mouse.position ,
    //                         y: player1rifleBody.position.y - event.mouse.position
    //                         });
    //Body.rotate(player1rifleBody, angleDifference);
    //Matter.Body.rotate(player1rifleBody, player1rifleBody.angle - 1);
    //var targetAngle = Matter.Vector.angle(player1rifleBody.position, event.mouse.position);

    //Matter.Vector.rotateAbout(player1rifleBody.position, targetAngle, 99,player1rifleBody);
    //Matter.Body.rotate(player1rifleBody, targetAngle - player1rifleBody.angle);
    //Matter.Body.setAngle(player1rifleBody, targetAngle - player1rifleBody.angle);
    mouseIsDown = false;
});



// create two boxes and a ground
var boxA = Bodies.rectangle(400, 400, 80, 80, {isStatic: true});
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(67*2, 610, 391, 67, {
    isStatic: true,
    render: {
        sprite: {
            texture: theme + '/platform.png'
        }
    }
})


var ground2 = Bodies.rectangle(67*4, 610, 391, 67, {
    isStatic: true,
    render: {
        sprite: {
            texture: theme + '/platform.png'
        }
    }
})

var ground3 = Bodies.rectangle(67*8, 610, 391, 67, {
    isStatic: true,
    render: {
        sprite: {
            texture: theme + '/platform.png'
        }
    }
})
var ground4 = Bodies.rectangle(67*16, 610, 391, 67, {
    isStatic: true,
    render: {
        sprite: {
            texture: theme + '/platform.png'
        }
    }
})
// add all of the bodies to the world

World.add(engine.world, [player, sensor1, boxA, boxB, ground, ground2, ground3, ground4]);


// run the engine
Engine.run(engine);
