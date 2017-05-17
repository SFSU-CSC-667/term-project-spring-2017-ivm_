// var gameSocket = require('../socket/index.js')
// const tankTable = require('../.././model/tank.js');
// const shotTable = require('../.././model/tank.js');
var socket = io();
var players = [];
var tanks = [];
var rifles = [];
var i = 0;
var player;
var player2;
var player1rifleBody;
var player2rifleBody;
var player1Tank, player1rifle, player1Turret, player1Base, player1Wheel, player1Wheel2;
var player2Tank, player2rifle, player2Turret, player2Base, player2Wheel, player2Wheel2;
var cos, sin;
var player1Coordinates = [];
var player2Coordinates = [];

var opposingPlayer;

// $("#userid").text() is different for each player since it was set upon the user visiting page, and
// it has the player_id of the user. playerId will be used to know which tank the player controls.
var playerId = $("#userid").text();
// socket.game($("#gameid").text());
// sends user information and joins socket room associated with game id (req.params.id)
socket.emit('game', { user: $("#userid").text(), game: $("#gameid").text(), numberPlayers: $("#numberPlayers").text() });

var players = [];

socket.on('gameEnter', function(data) {
    //console.log("Client user id: " + data.user + " has entered game " + data.game);
    //var numberOfPlayers = $("#numberPlayers").text();
    //var numberOfPlayers = parseInt(numberOfPlayers) + 1;
    //$("#numberPlayers").text(parseInt($("#numberPlayers").text()) + 1);
    var numberOfPlayers = parseInt($("#numberPlayers").text());
    $("#numberPlayers").text(data.numberPlayers);
    if (numberOfPlayers !== parseInt($("#numberPlayers").text())) {
        // document.createElement("P");
        // var t = document.createTextNode("This is a paragraph.")
        document.getElementById("players").appendChild(document.createElement("P").appendChild(document.createTextNode(data.user)));
    }
    // only the 2nd player will enter this block.
    if (numberOfPlayers > 1) {
        console.log("HERE AT NUMPLAYERS===2");
        //document.getElementById("check").innerHTML += "... OK";
        $('#players').find('p').each(function() {
            players.push($(this).text());
            //document.getElementById("check").innerHTML += $(this).text() + " got pushed | ";
        });
        // for(i = 0; i < players.length; i++) {
        //   //document.getElementById("check").innerHTML += players[i] + " in player | ";
        // }
        // sends message to other player
        socket.emit('playerJoins', { game: $("#gameid").text(), msg: 'ready to start Game!', playerArray: players });
    }
    //$("#players").text(data.user);
    //}else{
    //document.getElementById("players").appendChild(document.createElement("P").appendChild(document.createTextNode(data.user)));
    // $("#players").text($("#players").text() + " " + data.user);
    //}
    document.getElementById("check").innerHTML += "user id: " + data.user + " has entered game " + data.game + " ! NumPlayers: " + $("#numberPlayers").text() + "(" + $("#players").text() + ")";
});

// only first player gets here. CONTINUE HERE
if (parseInt($("#numberPlayers").text()) === 1) {
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
        //document.getElementById("check").innerHTML += "DADADDSADSA";
        // for(i = 0; i < players.length; i++) {
        //   document.getElementById("check").innerHTML += players[i] + " in player | ";
        // }

        // signifies that the opposing player has the tank in the 2nd index of the array.
        // first player emits this to start the game.
        socket.emit('startGame', { game: $("#gameid").text() });

        //CONTINUE HERE. NEED TO: IMPORT TANK, SHOT AND GAME MODELS. NEED TO FIND A WAY TO SEND PLAYERS FROM 2ND PLAYER TO 1ST PLAYERS
        // CURRENT IMPLEMENTATION: 2ND PLAYER HAS BOTH IDS STORED IN PLAYERS[]
    });
} else {
    //socket.emit('playerJoins', {game: $("#gameid").text() ,msg: 'ready to start Game!', playerArray: players});
}

// setInterval(printPlayers, 3000);

function printPlayers() {
    // for(i = 0; i < players.length; i++) {
    //   document.getElementById("check").innerHTML += players[i] + " in player | ";
    // }
    document.getElementById("check").innerHTML += $("#userid").text();
}

// finally, game starts and tanks are initialized.
socket.on('gameStart', function(data) {
    determineOpposingPlayer();
    initializeTanks();
});

// sets the index of opponent
function determineOpposingPlayer() {
    // for(var i = 0; i< players.length; i++){
    //   document.getElementById("check").innerHTML +=  players[i] + " joined, ";
    // }
    opposingPlayer = players.indexOf(playerId) === 0 ? 1 : 0;
    //document.getElementById("check").innerHTML += " OPPONENT: " + opposingPlayer;
}

const startGame = function() {
    setInterval(changeTurn, 20000);
    // $("#userid").text() is different for each player since it was set upon the user visiting page, and
    // it has the player_id of the user.
    if ($("#userid").text() == players[i]) {

    }
}

var pageWidth = document.documentElement.clientWidth;
var pageHeight = 600;

var themeNumber = getRandomInt(1, 4);
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
// <<<<<<< HEAD





// create an engine
//var canvas = document.getElementById('gameCanvas');
//var engine = Engine.create(canvas);
// =======
// >>>>>>> development

var engine = Engine.create(document.body, {
    render: {
        options: {
            wireframes: false,
            background: theme + "/Full.png",
            width: pageWidth,
            height: pageHeight
        }
    }
});

// <<<<<<< HEAD
// Bodies.rectangle(0, 0, 100, 100, {
//     render: {
//          fillStyle: 'red',
//          strokeStyle: 'blue',
//          lineWidth: 3
//     }
// });
//
//
// // engine.render.setBackground( engine.render, "white" );
// var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
//     return Bodies.rectangle(x, y, 25, 40);
// });
// var pageWidth = document.documentElement.clientWidth;
//
// var player1Tank = Bodies.rectangle(50,235,100,25,{density:0.002, friction:0});
// var player1Base = Bodies.rectangle(50,215,60,25,{density:0.002, friction:0});
// var player1Turret = Bodies.circle(50,215,20, {density:0.002, friction:0});
// var player1rifle = Bodies.rectangle(100,215,10,10,{density:0.002, friction:0});
//
// var sensor1 = Bodies.rectangle(150,215,49,10, {density:0, friction:0, isSensor: true});
//
// var player1rifleBody = Body.create({parts: [ player1rifle,player1Turret], friction:0, isSensor: true});
// player1rifleBody.render.fillStyle = 'DarkGreen';
//
// var player1Wheel = Bodies.circle(10,250,10,{density:0, friction:0});
// var player1Wheel2 = Bodies.circle(90,250,10,{density:0, friction:0, opacity: 0.5});
// var player = Body.create({
//             parts: [player1Tank,  player1Base,player1rifleBody,  player1Wheel, player1Wheel2],
//             friction:0
// });
// player1Base.render.fillStyle = player1Tank.render.fillStyle = 'green';
// player1Wheel.render.fillStyle = player1Wheel2.render.fillStyle = 'black';
//
// Body.setAngle(player, 0);
// Body.setAngle(player1rifleBody, 0);
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



var ground = Bodies.rectangle(pageWidth / 2, 600, pageWidth, 60, { isStatic: true });


var mouseConstraint = MouseConstraint.create(engine
    /*, {
                        element: canvas
    }*/
);

MouseConstraint.create(engine
    /*, {
     element: canvas
    }*/
);

var mouseIsDown;

// Events.on(mouseConstraint, 'mousedown', function(event) {
//     var mousePosition = event.mouse.position;
//     mp = mousePosition;
//     Matter.Body.rotate(player1rifleBody, 3);
//     mouseIsDown = true;
// });


// create two boxes and a ground
var boxA = Bodies.rectangle(400, 400, 80, 80, { isStatic: true });
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(67 * 2, 610, 391, 67, {
    isStatic: true,
    render: {
        sprite: {
            texture: theme + '/platform.png'
        }
    }
})


var ground2 = Bodies.rectangle(67 * 4, 610, 391, 67, {
        isStatic: true,
        render: {
            sprite: {
                texture: theme + '/platform.png'
            }
        }
    })
    // =======
    // var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
    //     return Bodies.rectangle(x, y, 25, 40);
    // });
var barrelAngle;

function initializeTanks() {
    barrelAngle = 0;
    // create tank for player 1
    player1Tank = Bodies.rectangle(50, 235, 100, 25, {
        label: "player1",
        density: 0.002,
        friction: 0
    });

    player1Base = Bodies.rectangle(50, 215, 60, 25, {
        label: "player1",
        density: 0.002,
        friction: 0
    });

    player1Turret = Bodies.circle(50, 215, 20, {
        label: "player1",
        density: 0.002,
        friction: 0
    });

    player1rifle = Bodies.rectangle(100, 215, 10, 10, {
        label: "player1",
        density: 0.002,
        friction: 0
    });

    sensor1 = Bodies.rectangle(150, 215, 49, 10, {
        label: "player1",
        density: 0,
        friction: 0,
        isSensor: true
    });

    player1rifleBody = Body.create({ parts: [player1rifle, player1Turret], friction: 0, isSensor: true });
    player1rifleBody.render.fillStyle = 'DarkGreen';

    player1Wheel = Bodies.circle(10, 250, 10, { density: 0, friction: 0 });
    player1Wheel2 = Bodies.circle(90, 250, 10, { density: 0, friction: 0, opacity: 0.5 });
    player = Body.create({
        label: "player1",
        parts: [player1Tank, player1Base, player1rifleBody, player1Wheel, player1Wheel2],
        friction: 0
    });

    player1Base.render.fillStyle = player1Tank.render.fillStyle = 'green';
    player1Wheel.render.fillStyle = player1Wheel2.render.fillStyle = 'black';

    Body.setAngle(player, 0);
    Body.setAngle(player1rifleBody, 0);


    // create tank for player 2
    player2Tank = Bodies.rectangle(pageWidth - 50, 235, 100, 25, {
        label: "player2",
        density: 0.002,
        friction: 0
    });

    player2Base = Bodies.rectangle(pageWidth - 50, 215, 60, 25, {
        label: "player2",
        density: 0.002,
        friction: 0
    });

    player2Turret = Bodies.circle(pageWidth - 50, 215, 20, {
        label: "player2",
        density: 0.002,
        friction: 0
    });

    player2rifle = Bodies.rectangle(pageWidth - 100, 215, 10, 10, {
        label: "player2",
        density: 0.002,
        friction: 0
    });

    sensor2 = Bodies.rectangle(pageWidth - 150, 215, 49, 10, {
        label: "player2",
        density: 0,
        friction: 0,
        isSensor: true
    });

    player2rifleBody = Body.create({ parts: [player2rifle, player2Turret], friction: 0, isSensor: true });
    player2rifleBody.render.fillStyle = 'Tan';

    player2Wheel = Bodies.circle(pageWidth - 10, 250, 10, { density: 0, friction: 0 });
    player2Wheel2 = Bodies.circle(pageWidth - 90, 250, 10, { density: 0, friction: 0, opacity: 0.5 });
    player2 = Body.create({
        label: "player2",
        parts: [player2Tank, player2Base, player2rifleBody, player2Wheel, player2Wheel2],
        friction: 0
    });

    player2Base.render.fillStyle = player2Tank.render.fillStyle = 'Wheat';
    player2Wheel.render.fillStyle = player2Wheel2.render.fillStyle = 'black';

    Body.setAngle(player2, 0);
    Body.setAngle(player2rifleBody, 0);

    tanks.push(player);
    rifles.push(player1rifleBody);
    tanks.push(player2);
    rifles.push(player2rifleBody);

    World.add(engine.world, [player, sensor1]);
    World.add(engine.world, [player2, sensor2]);


    Events.on(mouseConstraint, 'mousemove', function(event) {
        var mousePosition = event.mouse.position;
        mp = mousePosition;
        var angleDifference = Matter.Vector.angle(rifles[players.indexOf(playerId)].position, event.mouse.position);
        cos = Math.cos(angleDifference), sin = Math.sin(angleDifference);
        var point = { x: 0, y: 215 };
        //var dx = player1rifleBody.position.x - point.x, dy = player1rifleBody.position.y - point.y;
        //var playerId = $("#userid").text();
        var dx = rifles[players.indexOf(playerId)].position.x - point.x,
            dy = rifles[players.indexOf(playerId)].position.y - point.y;
        //Body.setPosition(player1rifleBody, {x: point.x + (dx * cos - dy * sin),
        //                      y: point.y + (dx * sin + dy * cos) } );
        // first player's tank barrel moves to angle relative to the right side, which it points to
        if (players.indexOf(playerId) === 0) {
            barrelAngle = Matter.Vector.angle(rifles[players.indexOf(playerId)].position, event.mouse.position);
            Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
            //Body.setAngle(rifles[players.indexOf(playerId)], Matter.Vector.angle(rifles[players.indexOf(playerId)].position, event.mouse.position));
        } else {

            //second player's tank barrel moves to angle relative to left side, which it points to
            barrelAngle = Matter.Vector.angle(event.mouse.position, rifles[players.indexOf(playerId)].position);
            Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
            //Body.setAngle(rifles[players.indexOf(playerId)], Matter.Vector.angle(event.mouse.position, rifles[players.indexOf(playerId)].position));
        }
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


        //socket.emit("sendAngle", {game: $("#gameid").text(), user: playerId, angle: barrelAngle});
        mouseIsDown = false;
    });

    // setInterval(sendBarrelAngle, 4000);
    // function sendBarrelAngle(){
    //   socket.emit("sendAngle", {game: $("#gameid").text(), user: playerId, angle: barrelAngle});
    // }

    // doesn't work currently
    socket.on("animateOpponentAngle", function(data) {
        document.getElementById("check").innerHTML += "OPP: " + data.user + " & OPPANGLE: " + data.angle + " | ";
        if (parseInt(data.user) !== opposingPlayer)
            Body.setAngle(rifles[players.indexOf(data.user)], data.angle);
    })

    // $(document).click(function(event) {
    //     if (event.button == 0) {
    //         shootTank()
    //     }
    // });

    // Events.on(mouseConstraint, 'mousemove', function(event) {
    //     var mousePosition = event.mouse.position;
    //     mp = mousePosition;
    //
    //     var angleDifference = Vector.angle(player1rifleBody.position, event.mouse.position);
    //     cos = Math.cos(angleDifference), sin = Math.sin(angleDifference);
    //     var point = {x: 0, y:215};
    //     dx = player1rifleBody.position.x - point.x, dy = player1rifleBody.position.y - point.y;
    //
    //     Body.setAngle(player1rifleBody, Vector.angle(player1rifleBody.position, event.mouse.position));
    //     mouseIsDown = false;
    // });

    window.addEventListener("keydown", function(event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {
            case "ArrowDown":
                barrelAngle -= 0.1;
                Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
                break;
            case "ArrowUp":
                barrelAngle += 0.1;
                Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
                break;
            case "ArrowLeft":
                moveTankLeft();
                break;
            case "ArrowRight":
                moveTankRight();
                break;
            case " ":
                shootTank();
                break;
            default:
                return;
        }

        event.preventDefault();
    }, true);
} //end initializeTanks()

// socket.on("shootFromOpposingPlayer", function(data){
//
// });


var mouseConstraint = MouseConstraint.create(engine);
MouseConstraint.create(engine);

var mouseIsDown;
var cos, sin;
var dx, dy;



var groundWidth = 391;
var groundHeight = 67;

function createGround() {
    var groundLeftOver = pageWidth * 2;
    var groundCount = 1;

    while (groundLeftOver >= 0) {
        World.add(engine.world, Bodies.rectangle((391 / 2) * groundCount, 570, groundWidth, groundHeight, {
            isStatic: true,
            frictionAir: 0,
            friction: 0,
            label: "ground " + groundCount,
            render: {
                sprite: {
                    texture: theme + '/platform.png'
                }
            }
        }))
        groundLeftOver -= groundWidth;
        groundCount++;
        // >>>>>>> development
    }
}

function createObstacles() {
    const centerHeight = getRandomInt(500, 590);

    var centerObstacle = Bodies.rectangle(pageWidth / 2 - 40, centerHeight, 80, 210, {
        isStatic: true,
        label: "obstacle",
        render: {
            sprite: {
                texture: theme + '/obstacle.png'
            }
        }
    })

    World.add(engine.world, centerObstacle)
}
var cannonBall;

function shootTank() {

    // playerId is the
    //var playerId = $("#userid").text();
    //var angleDifference = Matter.Vector.angle(rifles[players.indexOf(playerId)].position, event.mouse.position);
    //var cos = Math.cos(angleDifference), sin = Math.sin(angleDifference);
    var xc = rifles[players.indexOf(playerId)].position.x
        //document.getElementById("check").innerHTML += "x: " + rifles[players.indexOf(playerId)].position.x + " y: " +rifles[players.indexOf(playerId)].position.y +
        //                                            "cos: " + cos + " sin: " + sin + " shoot works"
    var yc = rifles[players.indexOf(playerId)].position.y
        // var xc = player1rifleBody.position.x
        // var yc = player1rifleBody.position.y

    cannonBall = Bodies.circle(xc, yc, 10, {
        label: "cannon ball",
        frictionAir: 0.019,
        friction: 0,
        restitution: 0,
        inertia: Infinity,
        mass: 10,
        mask: 1
    });
    World.add(engine.world, cannonBall)

    Body.applyForce(cannonBall, rifles[players.indexOf(playerId)].position, { x: cos, y: sin })


    socket.emit("shoot", { game: $("#gameid").text(), user: playerId, cos: cos, sin: sin, xc: rifles[players.indexOf(playerId)].position.x, yc: rifles[players.indexOf(playerId)].position.y, angle: barrelAngle });
}

function moveTankLeft() {
    let force = (-0.0004 * player.mass);
    let localPlayer = tanks[players.indexOf(playerId)];
    let localPleyerRifelBody = rifles[players.indexOf(playerId)];
    Body.applyForce(localPlayer, localPlayer.position, { x: force, y: 0, friction: 0 });
    Body.applyForce(localPleyerRifelBody, localPleyerRifelBody.position, { x: force, y: 0, friction: 0 });
    socket.emit("moveTank", { game: $("#gameid").text(), user: playerId, xc: tanks[players.indexOf(playerId)].position.x, yc: tanks[players.indexOf(playerId)].position.y, force: force });
}

function moveTankRight() {
    let force = (0.0004 * player.mass);
    let localPlayer = tanks[players.indexOf(playerId)];
    let localPleyerRifelBody = rifles[players.indexOf(playerId)];
    Body.applyForce(localPlayer, localPlayer.position, { x: force, y: 0, friction: 0 });
    Body.applyForce(localPleyerRifelBody, localPleyerRifelBody.position, { x: force, y: 0, friction: 0 });
    socket.emit("moveTank", { game: $("#gameid").text(), user: playerId, xc: tanks[players.indexOf(playerId)].position.x, yc: tanks[players.indexOf(playerId)].position.y, force: force });
}


$(document).click(function(event) {
    //document.getElementById("check").innerHTML += "| EVENT BUTTON: " + event.button + " | ";
    if (event.button == 0) {
        shootTank()
    }
});

// $(document).click(function(event) {
//     let keyPressed;
//     keyPressed = event.key;

//     if (keyPressed == "ArrowLeft") {
//         console.log("left arrow clicked");
//         moveTankLeft();
//     }

//     if (keyPressed == "ArrowRight") {
//         console.log("right arrow clicked");
//         moveTankRight();
//     }
// });


socket.on("shootFromOpposingPlayer", function(data) {
    //document.getElementById("check").innerHTML += "animateOpponentShot(" + data.user+","+data.cos+","+data.sin+","+data.xc+","+data.yc+")";
    Body.setAngle(rifles[players.indexOf(data.user)], data.angle);
    animateOpponentShot(data.user, data.cos, data.sin, data.xc, data.yc);
});

socket.on("playerMoved", function(data) {
    let force = (2 * data.force);
    let localPlayer = tanks[players.indexOf(data.user)];
    Body.applyForce(tanks[players.indexOf(data.user)], localPlayer.position, { x: force, y: 0, friction: 0 });
});

function animateOpponentShot(userId, cos, sin, xc, yc) {
    if (userId == players[opposingPlayer]) {

        // var xc = player1rifleBody.position.x
        // var yc = player1rifleBody.position.y
        //document.getElementById("check").innerHTML += "HIT!!!!";
        cannonBall = Bodies.circle(xc, yc, 10, {
            label: "cannon ball",
            frictionAir: 0.019,
            friction: 0,
            restitution: 0,
            inertia: Infinity,
            mass: 10,
            mask: 1
        });
        World.add(engine.world, cannonBall)

        Body.applyForce(cannonBall, rifles[players.indexOf(userId)].position, { x: cos, y: sin })
    }
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

createGround();
createObstacles();

Events.on(engine, 'collisionActive', function(e) {
    var i, pair, length = e.pairs.length;
    console.log(e.pairs.length)

    for (i = 0; i < length; i++) {
        pair = e.pairs[i];

        if (pair.bodyB.label == 'cannon ball' && pair.bodyA.label == 'player1') {
            World.remove(engine.world, pair.bodyA)
            console.log("player1")
            break;
        } else if (pair.bodyA.label == 'cannon ball' && pair.bodyB.label == 'player1') {
            World.remove(engine.world, pair.bodyB)
            console.log("player1")
            break;
        } else if ((pair.bodyA.label === 'cannon ball')) {
            World.remove(engine.world, pair.bodyA)
            console.log("cannon ball A " + pair.bodyA.label + " " + pair.bodyB.label)
            break;
        } else if (pair.bodyB.label === 'cannon ball') {
            World.remove(engine.world, pair.bodyB)
            console.log("cannon ball B " + pair.bodyA.label + " " + pair.bodyB.label)
            break;
        }
    }
});

// add all of the bodies to the world
// <<<<<<< HEAD
//
// World.add(engine.world, [player, sensor1, boxA, boxB, ground, ground2, ground3, ground4]);
//
//
// // run the engine
// Engine.run(engine);
// =======
// World.add(engine.world, [player, sensor1]);
// World.add(engine.world, [player2, sensor2]);

// run the engine
Engine.run(engine);


// >>>>>>> development