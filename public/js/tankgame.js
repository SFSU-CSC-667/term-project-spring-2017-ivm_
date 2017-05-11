var pageWidth = document.documentElement.clientWidth;
var pageHeight = 600;

var themeNumber =  getRandomInt(1, 4);
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

var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});

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

var mouseConstraint = MouseConstraint.create(engine);
MouseConstraint.create(engine);

var mouseIsDown;
var cos, sin;
var dx, dy;

Events.on(mouseConstraint, 'mousemove', function(event) {
    var mousePosition = event.mouse.position;
    mp = mousePosition;

    var angleDifference = Vector.angle(player1rifleBody.position, event.mouse.position);
    cos = Math.cos(angleDifference), sin = Math.sin(angleDifference);
    var point = {x: 0, y:215};
    dx = player1rifleBody.position.x - point.x, dy = player1rifleBody.position.y - point.y;

    Body.setAngle(player1rifleBody, Vector.angle(player1rifleBody.position, event.mouse.position));
    mouseIsDown = false;
});

var groundWidth = 391;
var groundHeight = 67;

function createGround() {
    var groundLeftOver = pageWidth * 2;
    var groundCount = 1;

    while (groundLeftOver >= 0) {
        World.add(engine.world, Bodies.rectangle((391/2) * groundCount , 570, groundWidth, groundHeight, {
            isStatic: true,
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

function createObstacles(){
    const centerHeight = getRandomInt(500, 590);

    var centerObstacle = Bodies.rectangle(pageWidth/2 - 40, centerHeight, 80, 210, {
        isStatic: true,
        render: {
            sprite: {
                texture: theme + '/obstacle.png'
            }
        }
    })

    World.add(engine.world, centerObstacle)
}

function shootTank(){
    var xc = player1rifleBody.position.x
    var yc = player1rifleBody.position.y

    var cannonBall = Bodies.circle(xc, yc, 10, {
        frictionAir : 0.019,
        friction : 0,
        restitution : 0,
        inertia : Infinity,
        mass : 10
    });
    World.add(engine.world, cannonBall)

    Body.applyForce(cannonBall, player1rifleBody.position, {x : cos, y : sin})
}

$(document).click(function(event) {
    if (event.button == 0) {
        shootTank()
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

createGround();
createObstacles();

// add all of the bodies to the world
World.add(engine.world, [player, sensor1]);

// run the engine
Engine.run(engine);


