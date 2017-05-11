var pageWidth = document.documentElement.clientWidth;
var themeNumber =  getRandomInt(1, 4);
var theme = "../images/gameThemes/theme" + themeNumber

var Engine = Matter.Engine,
    Composites = Matter.Composites,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create(document.body, {
    render: {
        options: {
            wireframes: false,
            background: theme + "/Full.png",
            width: pageWidth
        }
    }
});


// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(750, 50, 80, 80);

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB]);

var groundWidth = 391;
var groundHeight = 67;

function createGround() {
    var groundLeftOver = pageWidth * 2;
    var groundCount = 1;

    while (groundLeftOver >= 0) {
        World.add(engine.world, Bodies.rectangle((391/2) * groundCount , 610, groundWidth, groundHeight, {
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
    const centerHeight = getRandomInt(500, 610);

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

createGround();
createObstacles();

// run the engine
Engine.run(engine);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}