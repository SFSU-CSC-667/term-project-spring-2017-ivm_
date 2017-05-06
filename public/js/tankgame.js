// var canvas = document.getElementById("gameCanvas");
// var ctx = canvas.getContext("2d");
// ctx.moveTo(0,0);
// ctx.lineTo(200,100);
// ctx.stroke();

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composites = Matter.Composites;

// create an engine
var engine = Engine.create(document.getElementById('gameCanvas'));

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      // makes it so the screen takes up entire width of page
            width: document.documentElement.clientWidth,
            height: Math.min(document.documentElement.clientHeight, 600),
            showAngleIndicator: true
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
// create two boxes and a ground.
/*var boxA = Bodies.rectangle(400, 550, 80, 80, {isStatic: true});
var boxB = Bodies.rectangle(450, 50, 80, 80);
var wheel1 = Bodies.circle(400, 200, 10);
var wheel2 = Bodies.circle(400, 200, 10);
var scale = 0.9;
var tank1 = Composites.car(150, 100, 100 * scale, 40 * scale, 30 * scale, {isStatic: true});
scale = 0.8;
var tank2 = Composites.car(300, 300, 100 * scale, 40 * scale, 30 * scale);
*/

var player1Tank = Bodies.rectangle(50,235,100,20,{density:0.002, friction:0});
var player1Turret = Bodies.rectangle(50,215,80,20,{density:0.002, friction:0});
var player1rifle = Bodies.rectangle(100,215,100,10,{density:0.002, friction:0});
var player1Wheel = Bodies.circle(10,250,10,{density:0, friction:0});
var player1Wheel2 = Bodies.circle(90,250,10,{density:0, friction:0});
 var player = Body.create({
            parts: [player1Tank, player1Turret, player1rifle, player1Wheel, player1Wheel2],
            friction:0
});
//Matter.Body.setVelocity(player, 0);
// rectangle are (x, y, width, height).. position x and y in matter-js are the CENTER of the body
var ground = Bodies.rectangle(pageWidth/2, 600, pageWidth, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [player, /* boxA, wheel1,wheel2, boxB, pyramid, tank1, tank2,*/ ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
