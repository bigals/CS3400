//Global Variables for physics characteristics
var init = {};
var stage;
var layer;
var cometLayer;
var time;
var g;
var length;
var mass;
var x10;
var y10;
var mpht;
var mpot;
var gOvL;
var poten1;
var poten2;
var theta1;
var theta2;
var fOrdPoten1;
var fOrdPoten2;
var fOrdTheta1;
var fOrdTheta2;
var displayCheck;
var pathsCheck;
var graphCheck;
var outPutCheck;

function calcNxtVals() {
    fOrdTheta1 = mpht * (((2 * poten1) - (3 * poten2 * Math.cos(theta1 - theta2))) / (16 - (9 * Math.pow((Math.cos(theta1 - theta2)), 2))));
    fOrdTheta2 = mpht * (((8 * poten2) - (3 * poten1 * Math.cos(theta1 - theta2))) / (16 - (9 * Math.pow((Math.cos(theta1 - theta2)), 2))));
    fOrdPoten1 = mpot * ((fOrdTheta1 * fOrdTheta2 * Math.sin(theta1 - theta2)) + (3 * gOvL * Math.sin(theta1)));
    fOrdPoten2 = mpot * (-(fOrdTheta1 * fOrdTheta2 * Math.sin(theta1 - theta2)) + (gOvL * Math.sin(theta2)));
    theta1 += (fOrdTheta1 * time);
    theta2 += (fOrdTheta2 * time);
    poten1 += (fOrdPoten1 * time);
    poten2 += (fOrdPoten2 * time);
}

function animatePendulum(stage, layer, cometLayer) {
    calcNxtVals();    //get the new phetas and potential energies and store into global variables
    
    var line1 = new Kinetic.Line({
        points: [x10, y10, (x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var line2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1)), (x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var circle1 = new Kinetic.Circle({
        x: x10 + (length * Math.sin(theta1)),
        y: y10 + (length * Math.cos(theta1)),
        radius: 7,
        fill: 'black'        
    });
    var circle2 = new Kinetic.Circle({
        x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2),
        y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2),
        radius: 7,
        fill: 'black'
    });        
    var comet1 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 1,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var comet2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 1,
        lineCap: 'square',
        lineJoin: 'square'
    });
    
    circle1.move((x10 + length * Math.sin(theta1)),(y10 + length * Math.cos(theta1)));
    circle2.move((x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2)));    
    
    layer.removeChildren();
    layer.draw();
    layer.clear();

    switch(displayCheck)
    {
        case 'choice-3':                                    //Both Leg Display
            layer.add(line2, line1, circle2, circle1);
            if(pathsCheck == 'choice-4')                    //No Path/Comet Trail Display   
            {
                cometLayer.removeChildren();
                cometLayer.draw();
            }
            if(pathsCheck == 'choice-3')                    //Both Path/Comet Trail Display
            {
                cometLayer.add(comet1, comet2);
            }
            if(pathsCheck == 'choice-2')                    //Leg 2 Path/Comet Trail Display
            {
                cometLayer.add(comet2);
            }
            if(pathsCheck == 'choice-1')                    //Leg 1 Path/Comet Trail Display
            {
                cometLayer.add(comet1);
            }
            break;
        case 'choice-2':                                    //Just Leg 2 Display
            layer.add(line2, circle2);
            if(pathsCheck == 'choice-4')                    //No Path/Comet Trail Display
            {
                cometLayer.removeChildren();
                cometLayer.draw();
            }
            if(pathsCheck == 'choice-3')                    //Both Path/Comet Trail Display
            {
                cometLayer.add(comet1, comet2);
            }
            if(pathsCheck == 'choice-2')                    //Leg 2 Path/Comet Trail Display
            {
                cometLayer.add(comet2);
            }
            if(pathsCheck == 'choice-1')                    //Leg 1 Path/Comet Trail Display
            {
                cometLayer.add(comet1);
            }
            break;
        case 'choice-1':                                    //Just Leg 1 Display
        default:
            layer.add(line1, circle1);
            if(pathsCheck == 'choice-4')                    //No Path/Comet Trail Display
            {
                cometLayer.removeChildren();
                cometLayer.draw();
            }
            if(pathsCheck == 'choice-3')                    //Both Path/Comet Trail Display
            {
                cometLayer.add(comet1, comet2);
            }
            if(pathsCheck == 'choice-2')                    //Leg 2 Path/Comet Trail Display
            {
                cometLayer.add(comet2);
            }
            if(pathsCheck == 'choice-1')                    //Leg 1 Path/Comet Trail Display
            {
                cometLayer.add(comet1);
            }
            break;
    }
    stage.add(layer, cometLayer);
}

function drawInitialBars(stage, layer, cometLayer) {
    var l = resizeCanvas(stage, layer);
    
    clearInterval(init);
    
    getConditionVals(l);
    
    var line1 = new Kinetic.Line({
        points: [x10, y10, (x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var line2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1)), (x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var circle1 = new Kinetic.Circle({
        x: x10 + (length * Math.sin(theta1)),
        y: y10 + (length * Math.cos(theta1)),
        radius: 7,
        fill: 'black'        
    });
    var circle2 = new Kinetic.Circle({
        x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2),
        y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2),
        radius: 7,
        fill: 'black'
    });
    
    var comet1 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 1,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var comet2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 1,
        lineCap: 'square',
        lineJoin: 'square'
    });
    
    circle1.move((x10 + length * Math.sin(theta1)),(y10 + length * Math.cos(theta1)));
    circle2.move((x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2)));    
    
    layer.removeChildren();
    layer.draw();
    layer.clear();

    switch(displayCheck)
    {
        case 'choice-3':                                    //Both Leg Display
            layer.add(line2, line1, circle2, circle1);
            if(pathsCheck == 'choice-4')                    //No Path/Comet Trail Display   
            {
                cometLayer.removeChildren();
                cometLayer.draw();
            }
            if(pathsCheck == 'choice-3')                    //Both Path/Comet Trail Display
            {
                cometLayer.add(comet1, comet2);
            }
            if(pathsCheck == 'choice-2')                    //Leg 2 Path/Comet Trail Display
            {
                cometLayer.add(comet2);
            }
            if(pathsCheck == 'choice-1')                    //Leg 1 Path/Comet Trail Display
            {
                cometLayer.add(comet1);
            }
            break;
        case 'choice-2':                                    //Just Leg 2 Display
            layer.add(line2, circle2);
            if(pathsCheck == 'choice-4')                    //No Path/Comet Trail Display
            {
                cometLayer.removeChildren();
                cometLayer.draw();
            }
            if(pathsCheck == 'choice-3')                    //Both Path/Comet Trail Display
            {
                cometLayer.add(comet1, comet2);
            }
            if(pathsCheck == 'choice-2')                    //Leg 2 Path/Comet Trail Display
            {
                cometLayer.add(comet2);
            }
            if(pathsCheck == 'choice-1')                    //Leg 1 Path/Comet Trail Display
            {
                cometLayer.add(comet1);
            }
            break;
        case 'choice-1':                                    //Just Leg 1 Display
        default:
            layer.add(line1, circle1);
            if(pathsCheck == 'choice-4')                    //No Path/Comet Trail Display
            {
                cometLayer.removeChildren();
                cometLayer.draw();
            }
            if(pathsCheck == 'choice-3')                    //Both Path/Comet Trail Display
            {
                cometLayer.add(comet1, comet2);
            }
            if(pathsCheck == 'choice-2')                    //Leg 2 Path/Comet Trail Display
            {
                cometLayer.add(comet2);
            }
            if(pathsCheck == 'choice-1')                    //Leg 1 Path/Comet Trail Display
            {
                cometLayer.add(comet1);
            }
            break;
    }
    stage.add(layer, cometLayer);
}

function beginSim(stage, layer, cometLayer) {
    var line1 = new Kinetic.Line({
        points: [x10, y10, 0, 0],
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var line2 = new Kinetic.Line({
        points: [0, 0, 0, 0],
        stroke: 'blue',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var circle1 = new Kinetic.Circle({
        x: x10 + (length * Math.sin(theta1)),
        y: y10 + (length * Math.cos(theta1)),
        radius: 7,
        fill: 'black'        
    });
    var circle2 = new Kinetic.Circle({
        x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2),
        y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2),
        radius: 7,
        fill: 'black'
    });
        
    var comet1 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 1,
        lineCap: 'square',
        lineJoin: 'square'
    });
    var comet2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 1,
        lineCap: 'square',
        lineJoin: 'square'
    });
    
    clearInterval(init);
    layer.clear();
    
    init = setInterval(function () {
        animatePendulum(stage, layer, cometLayer);
    }, 10);
}

function resizeCanvas(stage, layer) {
    var stageWidth = window.innerWidth * 0.86;
    var stageHeight = window.innerHeight * 0.76;
    
    stage.setWidth(stageWidth);
    stage.setHeight(stageHeight);
    
    x10 = parseInt(((stage.getWidth() * 0.5) - 6));
    y10 = parseInt(((stage.getHeight() * 0.33) - 6));
    
    return ((Math.min(stageWidth, stageHeight) / 4) - 6);
}

function getConditionVals(ln) {
    g = 9.81;
    length = ln;
    gOvL = g / length;
    mass = 10;
    mass = parseInt($('#mass1').val());
    mpht = 6 / (mass * Math.pow(length, 2));
    mpot = -0.5 * (mass * Math.pow(length, 2));
    
    time = parseFloat($('#tSteps').val());
    
    poten1 = parseInt($('#pot1').val());
    poten2 = parseInt($('#pot2').val());
    theta1 = parseInt($('#phet1').val()) / 180 * Math.PI;
    theta2 = parseInt($('#phet2').val()) / 180 * Math.PI;
    
    fOrdPoten1 = 0;
    fOrdPoten2 = 0;
    fOrdTheta1 = 0;
    fOrdTheta2 = 0;
    
    displayCheck = $('input[name="legDisplay"]:checked').val();
    pathsCheck = $('input[name="pathDisplay"]:checked').val();
    graphCheck = $('input[name="graphDisplay"]:checked').val();
    outPutCheck = $('input[name="outputData"]:checked').val();
}

function submitHandler(stage, layer, cometLayer, l) {
    $('#myPanel').panel('close');
    getConditionVals(l);
    stage  = new Kinetic.Stage({
        container: 'kinetic-container',
        width: 500,
        height: 700
    });
    layer = new Kinetic.Layer();
    cometLayer = new Kinetic.Layer();
    beginSim(stage, layer, cometLayer);
}

$(document).ready(function (){
   stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: 500,
        height: 700
    });
    
    layer = new Kinetic.Layer();
    cometLayer = new Kinetic.Layer();
    var lngth = 0;
    
    $('#myPanel').on('panelbeforeopen', function(event, ui) {
        drawInitialBars(stage, layer, cometLayer);
    });
    
    $( ".sliders" ).on('slidestop', function(event) {
        drawInitialBars(stage, layer, cometLayer);
    }); 
    
    $('input[type="radio"]').bind('change', function() {
        drawInitialBars(stage, layer, cometLayer);
    });
    
    $('#btnSub').click(function() {
        lngth = resizeCanvas(stage, layer);
        submitHandler(stage, layer, cometLayer, lngth);
    });
    
    $('#btnSub').bind('tap', function() {
        lngth = resizeCanvas(stage, layer);
        submitHandler(stage, layer, cometLayer, lngth);
    });
    
    lngth = resizeCanvas(stage, layer);
    getConditionVals(lngth);    
    beginSim(stage, layer, cometLayer);
});