//Global Variables for physics characteristics
var init = {};
var stage;
var layer;
var cometLayer;
var comet1;
var comet2;
var line1;
var line2;
var circle1;
var circle2;
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
var initialScale;
var initialWidth;
var initialHeight;

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

function animatePendulum(stage, layer) {
    calcNxtVals();    //get the new phetas and potential energies and store into global variables
    
    line1.points([x10, y10, (x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))]);
    line2.points([(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1)), (x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))]);
    
    circle1.position({ x: x10 + (length * Math.sin(theta1)), y: y10 + (length * Math.cos(theta1)) });
    circle2.position({ x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2), y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2) });
    
    comet1.points.push({x: (x10 + length * Math.sin(theta1)), y: (y10 + length * Math.cos(theta1))});
    comet2.points.push({x: (x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), y: (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))});
    
    layer.removeChildren();
    layer.draw();
    layer.clear();

    switch(displayCheck)
    {
        case 'choice-3':                                    //Both Leg Display
            layer.add(line2, line1, circle2, circle1);
            break;
        case 'choice-2':                                    //Just Leg 2 Display
            layer.add(line2, circle2);
            break;
        case 'choice-1':                                    //Just Leg 1 Display
        default:
            layer.add(line1, circle1);
            break;
    }
    switch(pathsCheck)
    {
        case 'choice-1':
            cometLayer.add(comet1);
            break;
        case 'choice-2':
            cometLayer.add(comet2);
            break;
        case 'choice-3':
            cometLayer.add(comet1, comet2);
            break;
        case 'choice-4':
            cometLayer.removeChildren();
            cometLayer.draw();
            break;
    }
    stage.add(cometLayer, layer);
}

function drawInitialBars(stage, layer, cometLayer) {
    var l = resizeCanvas(stage, layer);
    
    clearInterval(init);
    
    getConditionVals(l);
    
    line1 = new Kinetic.Line({
        points: [x10, y10, (x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    line2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1)), (x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    circle1 = new Kinetic.Circle({
        x: x10 + (length * Math.sin(theta1)),
        y: y10 + (length * Math.cos(theta1)),
        radius: 7,
        fill: 'black'        
    });
    circle2 = new Kinetic.Circle({
        x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2),
        y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2),
        radius: 7,
        fill: 'black'
    });
    
    comet1 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'round',
        tension: 1
    });
    comet2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 10,
        lineCap: 'round',
        tension: 1
    });
    
    circle1.move((x10 + length * Math.sin(theta1)),(y10 + length * Math.cos(theta1)));
    circle2.move((x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2)));    
    
    layer.removeChildren();
    layer.draw();
    layer.clear();
    
    cometLayer.removeChildren();
    cometLayer.draw();
    cometLayer.clear();

    switch(displayCheck)
    {
        case 'choice-3':                                    //Both Leg Display
            layer.add(line2, line1, circle2, circle1);
            break;
        case 'choice-2':                                    //Just Leg 2 Display
            layer.add(line2, circle2);
            break;
        case 'choice-1':                                    //Just Leg 1 Display
        default:
            layer.add(line1, circle1);
            break;
    }
    switch(pathsCheck)
    {
        case 'choice-1':
            cometLayer.add(comet1);
            break;
        case 'choice-2':
            cometLayer.add(comet2);
            break;
        case 'choice-3':
            cometLayer.add(comet1, comet2);
            break;
        case 'choice-4':
            cometLayer.removeChildren();
            cometLayer.draw();
            break;
    }
    stage.add(cometLayer, layer);
}

function beginSim(stage, layer, cometLayer) {
    line1 = new Kinetic.Line({
        points: [x10, y10, 0, 0],
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    line2 = new Kinetic.Line({
        points: [0, 0, 0, 0],
        stroke: 'blue',
        strokeWidth: 10,
        lineCap: 'square',
        lineJoin: 'square'
    });
    circle1 = new Kinetic.Circle({
        x: x10 + (length * Math.sin(theta1)),
        y: y10 + (length * Math.cos(theta1)),
        radius: 7,
        fill: 'black'        
    });
    circle2 = new Kinetic.Circle({
        x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2),
        y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2),
        radius: 7,
        fill: 'black'
    });
        
    comet1 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1)), (y10 + length * Math.cos(theta1))],
        stroke: 'red',
        strokeWidth: 10,
        lineCap: 'round',
        tension: 1
    });
    comet2 = new Kinetic.Line({
        points: [(x10 + length * Math.sin(theta1) + length * Math.sin(theta2)), (y10 + length * Math.cos(theta1) + length * Math.cos(theta2))],
        stroke: 'blue',
        strokeWidth: 10,
        lineCap: 'round',
        tension: 1
    });
    
    clearInterval(init);
    layer.removeChildren();
    layer.draw();
    layer.clear();
    
    init = setInterval(function () {
        animatePendulum(stage, layer, cometLayer);
    }, 10);
}

function resizeCanvas(stage, layer) {
    var width = window.innerWidth * 0.86;
    var height = window.innerHeight * 0.76;
    
    var xScale = (width / initialWidth) * initialScale.x;
    var yScale = (height / initialHeight) * initialScale.y;
    var newScale = {x: xScale, y: yScale};
    
    stage.setAttr('width', width);
    stage.setAttr('height', height);
    stage.setAttr('scale', newScale);
    stage.draw();
    
    x10 = parseInt(((width * 0.5) - 6));
    y10 = parseInt(((height * 0.33) - 6));
    
    return ((Math.min(width, height) / 4) - 6);
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

function submitHandler(stage, layer, cometLayer,  l) {
    $('#myPanel').panel('close');
    getConditionVals(l);
    stage  = new Kinetic.Stage({
        container: 'kinetic-container',
        width: window.innerWidth * 0.86,
        height: window.innerHeight * 0.76
    });
    layer = new Kinetic.Layer();
    cometLayer = new Kinetic.Layer();
    beginSim(stage, layer, cometLayer);
}

$(document).ready(function (){
   stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: window.innerWidth * 0.86,
        height: window.innerHeight * 0.76
    });
    
    initialWidth = window.innerWidth * 0.86;
    initialHeight = window.innerHeight * 0.76;    
    initialScale = stage.scale();
    
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
        //lngth = resizeCanvas(stage, layer);
        submitHandler(stage, layer, cometLayer, lngth);
    });
    
    $('#btnSub').bind('tap', function() {
        //lngth = resizeCanvas(stage, layer);
        submitHandler(stage, layer, cometLayer, lngth);
    });
    
    lngth = resizeCanvas(stage, layer);
    getConditionVals(lngth);    
    beginSim(stage, layer, cometLayer);
});