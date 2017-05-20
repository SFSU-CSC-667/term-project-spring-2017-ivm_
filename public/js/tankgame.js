var socket = io();
var players = [];
var playerIndex;
var tanks = [];
var rifles = [];
var ground = [];
var i = 0;
var centerHeight, theme;
var player;
var player2;
var player1rifleBody;
var player2rifleBody;
var player1Tank, player1rifle, player1Turret, player1Base, player1Wheel, player1Wheel2;
var player2Tank, player2rifle, player2Turret, player2Base, player2Wheel, player2Wheel2;
var cos, sin;
var player1Coordinates = [];
var player2Coordinates = [];
var mouseConstraint;
var ball;
var opposingPlayer;
var wall1, wall2;

var playerId = $("#userid").text();

// sends user information and joins socket room associated with game id (req.params.id)
socket.emit('game', { user: $("#userid").text(), game: $("#gameid").text(), numberPlayers: $("#numberPlayers").text(), username: $("#userName").text()});

var players = [];

socket.on('gameEnter', function(data) {
    $('#game-stats').hide()
    var numberOfPlayers = parseInt($("#numberPlayers").text());
    $("#numberPlayers").text(data.numberPlayers);

    if (numberOfPlayers !== parseInt($("#numberPlayers").text())) {
        //document.getElementById("players").appendChild(document.createElement("P").appendChild(document.createTextNode(data.user)));
    }

    // only the 2nd player will enter this block.
    if (numberOfPlayers > 1) {
        console.log("HERE AT NUMPLAYERS===2");

        $('#players').find('p').each(function() {
            players.push($(this).text());
        });
        initializeBackground();

        console.log("gameGround: " + ground + ", gameCenterHeight: " + centerHeight + ", gameTheme: " +  theme )
        socket.emit('playerJoins', { game: $("#gameid").text(), playerArray: players, /*gameGround: ground, */ gameCenterHeight: centerHeight, gameTheme:  theme });
    }

    //document.getElementById("check").innerHTML += "user id: " + data.user + " has entered game " + data.game + " ! NumPlayers: " + $("#numberPlayers").text() + "(" + $("#players").text() + ")";
});

// only first player gets here. CONTINUE HERE
if (parseInt($("#numberPlayers").text()) === 1) {
    // finally, after 2nd player joins, this gets executed.
    socket.on('anotherPlayerJoins', function(data) {

        players = data.playerArray;
        console.log("inside anotherPlayerJoins, theme: " + data.gameTheme + " | center: " + data.gameCenterHeight )



        // signifies that the opposing player has the tank in the 2nd index of the array.
        // first player emits this to start the game.
        //console.log()l
        socket.emit('startGame', { game: $("#gameid").text(), centerHeight: data.gameCenterHeight, theme:  data.gameTheme});

        //CONTINUE HERE. NEED TO: IMPORT TANK, SHOT AND GAME MODELS. NEED TO FIND A WAY TO SEND PLAYERS FROM 2ND PLAYER TO 1ST PLAYERS
        // CURRENT IMPLEMENTATION: 2ND PLAYER HAS BOTH IDS STORED IN PLAYERS[]
    });
} else {
    //socket.emit('playerJoins', {game: $("#gameid").text() ,msg: 'ready to start Game!', playerArray: players});
}

// finally, game starts and tanks are initialized.
socket.on('gameStart', function(data) {
    playerIndex = players.indexOf(playerId);
    createBackground(data.theme);
    determineOpposingPlayer();
    initializeTanks();
    console.log("theme: " + data.theme + " | center: " + centerHeight + " | ground: " + ground );
    createObstacles(data.centerHeight, data.theme);
    createGround(data.theme);
    World.add(engine.world, wall1);
    World.add(engine.world, wall2);
    $('#loadingDiv').hide()
    $('#game-stats').show()
    document.getElementById("playerChats").style.position = "fixed";
    document.getElementById("playerChats").style.bottom = "0%";
    console.log("tanks 1: " + tanks[0].mass);
    console.log("tanks 2: " + tanks[1].mass);

    console.log("tanks rifle 1: " + rifles[0].mass);
    console.log("tanks rifle 2: " + rifles[1].mass);


});

function reduceHealthFromPlayer(elementid){
    var currentHealth = $(elementid).text()
    var newHealth = currentHealth.slice(0, -1);

    if (newHealth.length <= 1){
        gameOver(elementid)
    }
    $(elementid).html(newHealth)
}

function gameOver(elementid){
    World.remove(engine.world, player);
    World.remove(engine.world, player2);
    $('#left-player-life').html("")
    $('#right-player-life').html("")

    // winning player emits his/her name to be displayed as winner
    if(elementid === '#left-player-life'){
      if(playerId === players[1]){
        //addWinTotal(parseInt($("#userid").text()));
        document.getElementById('playerUpdate').value = parseInt(playerId);
        document.getElementById("winUpdateForm").submit();
        socket.emit('gameOver', {game: $("#gameid").text(), username: $("#username").text()});
      }
    } else {
      if(playerId === players[0]){
        //addWinTotal(parseInt($("#userid").text()));
        document.getElementById('playerUpdate').value = parseInt(playerId);
        document.getElementById("winUpdateForm").submit();
        socket.emit('gameOver', {game: $("#gameid").text(), username: $("#username").text()});
      }
    }
      //$('#gameStatus').html("GAME OVER!!!")
}

socket.on("displayWinner", function(data){
  $('#gameStatus').html("GAME OVER!!! " + data.username + " wins");
  var disconnectionMessage = document.getElementById("disconnectionMessage");
  disconnectionMessage.style.display = "";
  disconnectionMessage.style.top = "0%";
  disconnectionMessage.style.left = "0%";
  disconnectionMessage.zIndex = "100";
  disconnectionMessage.style.width = "100%";
  disconnectionMessage.style.height = "100%";
  disconnectionMessage.style.textAlign = "center";
  disconnectionMessage.innerHTML = '<p style = "position: relative; top: 50%; margin: auto; font-size: 2.5em; font-color: black; width: 60%; height: 70%" />' + data.username + " has won the game, click to return to the Lobby! </p>";
});


// sets the index of opponent
function determineOpposingPlayer() {
    opposingPlayer = players.indexOf(playerId) === 0 ? 1 : 0;
}

const startGame = function() {
    // setInterval(changeTurn, 20000);
    // if ($("#userid").text() == players[i]) {}
}

var pageWidth = document.documentElement.clientWidth;
var pageHeight = 400;


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

// var themeNumber, theme;
function createBackground(theme){

  engine = Engine.create(document.body, {
      render: {
          options: {
              wireframes: false,
              background: theme + "/Full.png",
              width: pageWidth,
              height: pageHeight
          }
      }
  });
  mouseConstraint = MouseConstraint.create(engine);
  MouseConstraint.create(engine);
  Engine.run(engine);
}
socket.on('otherPlayerLeft', function(data){
  //document.getElementById("check").innerHTML += data.username + " has left the game";
  //document.getElementById("check").innerHTML += data.user + " has left the game";
  // if(data.user === playerId){
  //   document.getElementById('deleteGameForm').submit();
  // } else {
  //   document.getElementById("check").innerHTML += data.user + " has left the game";
  // }
  var disconnectionMessage = document.getElementById("disconnectionMessage");
  disconnectionMessage.style.display = "";
  disconnectionMessage.style.top = "0%";
  disconnectionMessage.style.left = "0%";
  disconnectionMessage.zIndex = "100";
  disconnectionMessage.style.width = "100%";
  disconnectionMessage.style.height = "100%";
  disconnectionMessage.style.textAlign = "center";
  disconnectionMessage.innerHTML = '<p style = "position: relative; top: 50%; margin: auto; font-size: 2.5em; font-color: black; width: 60%; height: 70%" />' + data.username + " HAS LEFT THE GAME, CLICK TO RETURN TO LOBBY </p>";


  //$("#returnToLobby").val("<div> " +  data.username + " has left the game, click to Return to Lobby" + "</div>");
  Matter.World.remove(engine.world, [tanks[players.indexOf(data.user)]])
  //socket.emit("leaveGame", {user: playerId, game: data.game});//leave(data.game);
});

var mouseIsDown;
var barrelAngle;

function initializeTanks() {
    barrelAngle = 0;
    // create tank for player 1
    player1Tank = Bodies.rectangle(75, 235, 100, 25, {
        label: "player1",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    player1Base = Bodies.rectangle(75, 215, 60, 25, {
        label: "player1",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    player1Turret = Bodies.circle(75, 215, 20, {
        label: "player1",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    player1rifle = Bodies.rectangle(125, 215, 10, 10, {
        label: "player1",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    sensor1 = Bodies.rectangle(175, 215, 49, 10, {
        label: "player1",
        density: 0,
        frictionStatic: 1,
        friction: 1,
        //frictionAir: 1,
        //restitution: 0,
        isSensor: true
    });

    player1rifleBody = Body.create({ parts: [player1rifle, player1Turret], friction: 1,  frictionStatic: 1, isSensor: true });
    player1rifleBody.render.fillStyle = 'DarkGreen';

    player1Wheel = Bodies.circle(35, 250, 10, { density: 0, friction: 1 });
    player1Wheel2 = Bodies.circle(115, 250, 10, { density: 0, friction: 1, opacity: 0.5 });
    player = Body.create({
        label: "player1",
        parts: [player1Tank, player1Base, player1rifleBody, player1Wheel, player1Wheel2],
        friction: 1,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        static: true
    });

    player1Base.render.fillStyle = player1Tank.render.fillStyle = 'green';
    player1Wheel.render.fillStyle = player1Wheel2.render.fillStyle = 'black';

    Body.setAngle(player, 0);
    Body.setAngle(player1rifleBody, 0);

    // create tank for player 2
    player2Tank = Bodies.rectangle(pageWidth - 75, 235, 100, 25, {
        label: "player2",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    player2Base = Bodies.rectangle(pageWidth - 75, 215, 60, 25, {
        label: "player2",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    player2Turret = Bodies.circle(pageWidth - 75, 215, 20, {
        label: "player2",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    player2rifle = Bodies.rectangle(pageWidth - 125, 215, 10, 10, {
        label: "player2",
        density: 0.002,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        friction: 1
    });

    sensor2 = Bodies.rectangle(pageWidth - 175, 215, 49, 10, {
        label: "player2",
        density: 0,
        friction: 1,
        frictionStatic: 1,
        //frictionAir: 1,
        //restitution: 0,
        isSensor: true
    });

    player2rifleBody = Body.create({ parts: [player2rifle, player2Turret], friction: 1, frictionStatic: 1, isSensor: true });
    player2rifleBody.render.fillStyle = 'Tan';

    player2Wheel = Bodies.circle(pageWidth - 35, 250, 10, { density: 0, friction: 1 });
    player2Wheel2 = Bodies.circle(pageWidth - 115, 250, 10, { density: 0, friction: 1, opacity: 0.5 });
    player2 = Body.create({
        label: "player2",
        parts: [player2Tank, player2Base, player2rifleBody, player2Wheel, player2Wheel2],
        friction: 1,
        frictionStatic: 1,
        // frictionAir: 1,
        // restitution: 0,
        static: true
    });

    player2Base.render.fillStyle = player2Tank.render.fillStyle = 'Wheat';
    player2Wheel.render.fillStyle = player2Wheel2.render.fillStyle = 'black';

    Body.setAngle(player2, 0);
    Body.setAngle(player2rifleBody, 0);

    tanks.push(player);
    rifles.push(player1rifleBody);
    tanks.push(player2);
    rifles.push(player2rifleBody);

    ball = Bodies.rectangle(300, 25, 30, 30);
    World.add(engine.world, [player, sensor1]);
    World.add(engine.world, [player2, sensor2]);
    //World.add(engine.world, [ball]);
    //var enableMovement = true;
    window.addEventListener("keydown", function(event) {
        if (/*event.repeat ||*/ event.defaultPrevented /*|| (enableMovement = !enableMovement ? true : false)*/) {
            return; // Do nothing if the event was already processed
        }

        // if(!enableMovement){
        //   setInterval(function(){ enableMovement = true}, 2000)
        // }

        switch (event.key) {
            case "ArrowLeft":
                socket.emit("moveTank", { game: $("#gameid").text(), tankIndex: playerIndex, /*xc: tanks[players.indexOf(playerId)].position.x, yc: tanks[players.indexOf(playerId)].position.y,*/ force: -0.015})
                //enableMovement = false;
                //Body.applyForce(ball,ball.position, { x: -2, y: 0, friction: 0 } );
                //moveTankLeft();
                break;
            case "ArrowRight":
                socket.emit("moveTank", { game: $("#gameid").text(), tankIndex: playerIndex, /*user: playerId, /*xc: tanks[players.indexOf(playerId)].position.x, yc: tanks[players.indexOf(playerId)].position.y,*/ force: 0.015})
                //Body.applyForce(ball,ball.position, { x: 2, y: 0, friction: 0 } );
                //enableMovement = false;
                //moveTankRight();
                break;
            case "ArrowDown":
                barrelAngle -= 0.1;
                Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
                break;
            case "ArrowUp":
                barrelAngle += 0.1;
                Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
                break;

                // case " ":
                //     shootTank();
                //     break;
            default:
                return;
        }
        //
        // if(enableMovement){
        //   enableMovement = false;
        //   setTimeout(function(){ enableMovement = true}, 2000)
        // }

        event.preventDefault();
    }, true);

    Events.on(mouseConstraint, 'mousemove', function(event) {
        var mousePosition = event.mouse.position;
        mp = mousePosition;

        var angleDifference = Matter.Vector.angle(rifles[players.indexOf(playerId)].position, event.mouse.position);
        cos = Math.cos(angleDifference), sin = Math.sin(angleDifference);

        var point = { x: 0, y: 215 };
        var dx = rifles[players.indexOf(playerId)].position.x - point.x,
            dy = rifles[players.indexOf(playerId)].position.y - point.y;

        if (players.indexOf(playerId) === 0) {
            barrelAngle = Matter.Vector.angle(rifles[players.indexOf(playerId)].position, event.mouse.position);
            Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
        } else {
            //second player's tank barrel moves to angle relative to left side, which it points to
            barrelAngle = Matter.Vector.angle(event.mouse.position, rifles[players.indexOf(playerId)].position);
            Body.setAngle(rifles[players.indexOf(playerId)], barrelAngle);
        }

        mouseIsDown = false;
    });

    $(document).click(function(event) {
        if (event.button == 0) {
            shootTank()
        }
    });
}

// doesn't work currently
socket.on("animateOpponentAngle", function(data) {
    //document.getElementById("check").innerHTML += "OPP: " + data.user + " & OPPANGLE: " + data.angle + " | ";
    if (parseInt(data.user) !== opposingPlayer)
        Body.setAngle(rifles[players.indexOf(data.user)], data.angle);
})

var mouseIsDown;
var cos, sin;
var dx, dy;

var groundWidth = 391;
var groundHeight = 67;

var centerHeight, theme;
function initializeBackground(){
  var groundWidth = 391;
  var groundHeight = 67;
    console.log("inside initializeBackground");
    var themeNumber = getRandomInt(1, 4);
    theme = "../images/gameThemes/theme" + themeNumber
    centerHeight = getRandomInt(pageHeight - 100, pageHeight - 20);
    wall1 = Bodies.rectangle(10, 235, 15 ,pageHeight, {restitution: 0, isStatic: true});
    wall2 = Bodies.rectangle(pageWidth-10, 235, 15 ,pageHeight, {restitution: 0, isStatic: true});
}

function createGround(theme) {
    var groundLeftOver = pageWidth * 2;
    var groundCount = 1;

    while (groundLeftOver >= 0) {
        World.add(engine.world, Bodies.rectangle((391 / 2) * groundCount, pageHeight - 30, groundWidth, groundHeight, {
            isStatic: true,
            frictionAir: 0,
            friction: 1,
            frictionStatic: 1,
            label: "ground " + groundCount,
            render: {
                sprite: {
                    texture: theme + '/platform.png'
                }
            }
        }))
        groundLeftOver -= groundWidth;
        groundCount++;
    }
}


function createObstacles(centerHeight, theme) {
    //const centerHeight = getRandomInt(pageHeight - 100, pageHeight - 20);
    var centerObstacle = Bodies.rectangle(pageWidth / 2 - 40, centerHeight, 80, 210, {
        isStatic: true,
        label: "obstacle",
        render: {
            sprite: {
                texture: theme + '/obstacle.png'
            }
        }
    })

    Events.on(engine, 'collisionActive', function(e) {
        var i, pair, length = e.pairs.length;
        console.log(e.pairs.length)

        for (i = 0; i < length; i++) {
            pair = e.pairs[i];

            if (pair.bodyB.label == 'cannon ball' && pair.bodyA.label == 'player1') {
                World.remove(engine.world, pair.bodyA)
                reduceHealthFromPlayer("#left-player-life")
                console.log("player1")
                break;
            } else if (pair.bodyA.label == 'cannon ball' && pair.bodyB.label == 'player1') {
                World.remove(engine.world, pair.bodyB)
                reduceHealthFromPlayer("#left-player-life")
                console.log("player1")
                break;
            }else if (pair.bodyB.label == 'cannon ball' && pair.bodyA.label == 'player2') {
                World.remove(engine.world, pair.bodyB)
                reduceHealthFromPlayer("#right-player-life")
                console.log("player2")
                break;
            } else if (pair.bodyA.label == 'cannon ball' && pair.bodyB.label == 'player2') {
                World.remove(engine.world, pair.bodyA)
                reduceHealthFromPlayer("#right-player-life")
                console.log("player2")
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

    World.add(engine.world, centerObstacle)
}

var cannonBall;

function shootTank() {
    var xc = rifles[players.indexOf(playerId)].position.x
    var yc = rifles[players.indexOf(playerId)].position.y

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
    let force = (-0.0001 * tanks[players.indexOf(playerId)].mass);
    let localPlayer = tanks[players.indexOf(playerId)];
    let localPleyerRifelBody = rifles[players.indexOf(playerId)];
    Body.applyForce(localPlayer, localPlayer.position, { x: force, y: 0, friction: 1 });
    Body.update(localPlayer, 1, 1, 1);
    socket.emit("moveTank", { game: $("#gameid").text(), user: playerId, xc: tanks[players.indexOf(playerId)].position.x, yc: tanks[players.indexOf(playerId)].position.y, force: force });
}

function moveTankRight() {
    let force = (0.0001 * tanks[players.indexOf(playerId)].mass);
    let localPlayer = tanks[players.indexOf(playerId)];
    let localPleyerRifelBody = rifles[players.indexOf(playerId)];
    Body.applyForce(localPlayer, localPlayer.position, { x: force, y: 0, friction: 1 });
    //Body.applyForce(localPleyerRifelBody, localPleyerRifelBody.position, { x: force, y: 0, friction: 0 });
    socket.emit("moveTank", { game: $("#gameid").text(), user: playerId, xc: tanks[players.indexOf(playerId)].position.x, yc: tanks[players.indexOf(playerId)].position.y, force: force });
}

socket.on("shootFromOpposingPlayer", function(data) {
    Body.setAngle(rifles[players.indexOf(data.user)], data.angle);
    animateOpponentShot(data.user, data.cos, data.sin, data.xc, data.yc);
});

function animateOpponentShot(userId, cos, sin, xc, yc) {
    if (userId == players[opposingPlayer]) {
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
    }
}

socket.on("shootFromOpposingPlayer", function(data) {
    //document.getElementById("check").innerHTML += "animateOpponentShot(" + data.user+","+data.cos+","+data.sin+","+data.xc+","+data.yc+")";
    Body.setAngle(rifles[players.indexOf(data.user)], data.angle);
    animateOpponentShot(data.user, data.cos, data.sin, data.xc, data.yc);
});

//   continue here
socket.on("playerMoved", function(data) {
    Body.applyForce(tanks[data.tankIndex], tanks[data.tankIndex].position, { x: data.force, y: Math.abs(data.force), friction: 1 , frictionStatic: 1});
    //Body.applyForce(tanks[players.indexOf(data.user)], tanks[players.indexOf(data.user)].position, { x: data.force, y: 0, friction: 1 });
    // let force = data.force;
    // let localPlayer = tanks[players.indexOf(data.user)];
    // let localPlayerRifleBody = rifles[players.indexOf(playerId)];
    // //var xCoordinateFromOpponentScreen = data.xc;
    // Body.applyForce(localPlayer, localPlayer.position, { x: force, y: 0, friction: 0 });
    // Body.applyForce(localPlayerRifleBody, localPlayerRifleBody.position, { x: force, y: 0, friction: 0 });
    // //document.getElementById("check").innerHTML +="on opponent's screen: " + data.user + " moved by " + data.force + ", now position is " + data.xc + ", " +data.yc;
    // Body.applyForce(localPlayer, localPlayer.position, { x: force, y: 0, friction: 0 });
});

function animateOpponentShot(userId, cos, sin, xc, yc) {
    if (userId == players[opposingPlayer]) {
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
