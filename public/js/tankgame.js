var pageWidth = document.documentElement.clientWidth;
var themeNumber =  Math.floor((Math.random() * 4) + 1);
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
World.add(engine.world, [boxA, boxB, ground, ground2, ground3, ground4]);

// run the engine
Engine.run(engine);

