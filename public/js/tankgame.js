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
    Composites = Matter.Composites;

// create an engine
var engine = Engine.create();

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
var pageWidth = document.documentElement.clientWidth;
// create two boxes and a ground.
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var wheel1 = Bodies.circle(400, 200, 10);
var wheel2 = Bodies.circle(400, 200, 10);
var scale = 0.9;
var tank1 = Composites.car(150, 100, 100 * scale, 40 * scale, 30 * scale);
scale = 0.8;
var tank2 = Composites.car(300, 300, 100 * scale, 40 * scale, 30 * scale);
// rectangle are (x, y, width, height).. position x and y in matter-js are the CENTER of the body
var ground = Bodies.rectangle(pageWidth/2, 610, pageWidth, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, wheel1,wheel2, boxB, tank1, tank2, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
