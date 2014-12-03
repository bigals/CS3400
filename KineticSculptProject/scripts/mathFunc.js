//Global Variables for physics characteristics
var init = {};
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
var sOrdPoten1;
var sOrdPoten2;
var sOrdTheta1;
var sOrdTheta2;


//draws circle based on a context passed in, and our defined circle object thats passed in
function drawCircle(myCircle, context) {
    context.beginPath();
    context.arc(myCircle.x, myCircle.y, myCircle.mass, 0, 2 * Math.PI, false);
    context.fillStyle = '#000';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
}

//draws line based on a context passed in, and our defined line object thats passed in
function drawLine(myLine, context) {
    context.beginPath();
    context.moveTo(myLine.x0, myLine.y0);
    context.lineTo(myLine.x, myLine.y);
    context.lineWidth = 10;
    if (myLine.name === "1") {
        context.strokeStyle = 'red';
    } else {
        context.strokeStyle = 'blue';
    }
    context.stroke();
}

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

function animatePendulum(circle1, circle2, line1, line2, canvas, canContext) {
    calcNxtVals();    //get the new phetas and potential energies and store into global variables
    
    circle1.x = x10 + length * Math.sin(theta1);
    circle1.y = y10 + length * Math.cos(theta1);
    circle2.x = x10 + length * Math.sin(theta1) + length * Math.sin(theta2);
    circle2.y = y10 + length * Math.cos(theta1) + length * Math.cos(theta2);
    
    line1.x  = circle1.x;
    line1.y  = circle1.y;
    line2.x0 = circle1.x;
    line2.y0 = circle1.y;
    line2.x  = circle2.x;
    line2.y  = circle2.y;
    
    canContext.clearRect(0, 0, canvas.width, canvas.height);

    drawLine(line1, canContext);
    drawLine(line2, canContext);
    drawCircle(circle1, canContext);
    drawCircle(circle2, canContext);
}

function drawInitialBars(canv, cxt) {
    var l = resizeCanvas(canv, cxt);
    
    clearInterval(init);
    
    getSliderVals(l);
    
    var line1 = {
        name: "1",
        x0: x10,
        y0: y10,
        x: 0,
        y: 0
    };
    var line2 = {
        name: "2",
        x0: 0,
        y0: 0,
        x: 0,
        y: 0
    };
    var circle1 = {
        x: x10 + (length * Math.sin(theta1)),
        y: y10 + (length * Math.cos(theta1)),
        mass: 2
    };
    var circle2 = {
        x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2),
        y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2),
        mass: 2
    };
    
    circle1.x = x10 + length * Math.sin(theta1);
    circle1.y = y10 + length * Math.cos(theta1);
    circle2.x = x10 + length * Math.sin(theta1) + length * Math.sin(theta2);
    circle2.y = y10 + length * Math.cos(theta1) + length * Math.cos(theta2);
    
    line1.x  = circle1.x;
    line1.y  = circle1.y;
    line2.x0 = circle1.x;
    line2.y0 = circle1.y;
    line2.x  = circle2.x;
    line2.y  = circle2.y;
    
    cxt.clearRect(0, 0, canv.width, canv.height);

    drawLine(line1, cxt);
    drawLine(line2, cxt);
    drawCircle(circle1, cxt);
    drawCircle(circle2, cxt);
}

function beginSim(canv, cxt) {
    var line1 = {
        name: "1",
        x0: x10,
        y0: y10,
        x: 0,
        y: 0
    };
    var line2 = {
        name: "2",
        x0: 0,
        y0: 0,
        x: 0,
        y: 0
    };
    var circle1 = {
        x: x10 + (length * Math.sin(theta1)),
        y: y10 + (length * Math.cos(theta1)),
        mass: 2
    };
    var circle2 = {
        x: x10 + length * Math.sin(theta1) + length * Math.sin(theta2),
        y: y10 + length * Math.cos(theta1) + length * Math.cos(theta2),
        mass: 2
    };
    
    clearInterval(init);
    
    init = setInterval(function () {
        animatePendulum(circle1, circle2, line1, line2, canv, cxt);
    }, 10);
}

function resizeCanvas(canvs, context) {
    var canWidth = window.innerWidth * 0.86;
    var canHeight = window.innerHeight * 0.76;
    
    canvs.width = canWidth;
    canvs.height = canHeight;
    
    x10 = parseInt(((canvs.width * 0.5) - 6));
    y10 = parseInt(((canvs.height * 0.33) - 6));
    
    return ((Math.min(canWidth, canHeight) / 4) - 6);
}

function getSliderVals(ln) {
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
}

function submitHandler(can, cxt, l) {
    $('#myPanel').panel('close');
    getSliderVals(l);
    can  = document.getElementById('pendCanvas');
    cxt = can.getContext('2d');
    beginSim(can, cxt);
}

var data = [[1, 130], [2, 40], [3, 80], [4, 160], [5, 159], [6, 370], [7, 330], [8, 350], [9, 370], [10, 400], [11, 330], [12, 350]];

var dataset = [{label: "line1",data: data}];

var options = {
    series: {
        lines: { show: true },
        points: {
            radius: 3,
            show: true
        }
    }
};

$(document).ready(function (){
    var canvs  = document.getElementById('pendCanvas');
    var contxt = canvs.getContext('2d');
    var lngth = 0;
    $.plot($("#placeholder"), dataset, options);
/*    
    var xVal = 0;
    var data = [[],[]];
    var plot = $.plot( $("#placeholder"), data);

    function getData(){
        // This could be an ajax call back.
        var yVal1 = Math.floor(Math.random()*11);
        var yVal2 = Math.floor(Math.random()*11);
        var datum1 = [xVal, yVal1];
        var datum2 = [xVal, yVal2];
        data[0].push(datum1);
        data[1].push(datum2);
        if(data[0].length>10){
            // only allow ten points
            data[0] = data[0].splice(1);
            data[1] = data[1].splice(1);
        }
        xVal++;
        plot.setData(data);
        plot.setupGrid();
        plot.draw();
    }

    setInterval(getData, 1000);
*/
    $('#myPanel').on('panelbeforeopen', function(event, ui) {
        drawInitialBars(canvs, contxt);
    });
    
    $( ".sliders" ).on('slidestop', function(event) {
        drawInitialBars(canvs, contxt);
    });
    
    $('#btnSub').click(function() {
        submitHandler(canvs, contxt, lngth);
    });
    
    $('#btnSub').bind('tap', function() {
        submitHandler(canvs, contxt, lngth);
    });
    
    lngth = resizeCanvas(canvs, contxt);
    getSliderVals(lngth);    
    beginSim(canvs, contxt, init);
});