//Global Variables for physics characteristics
var canvs
var contxt;
var time = 0.05;
var g = 9.81;
var length = 120;
var mass = 10;
var x10 = 345;
var y10 = 180;
var mpht = 6 / (mass * Math.pow(length, 2));
var mpot = -0.5 * (mass * Math.pow(length, 2));
var gOvL = g / length;
var poten1 = 10;
var poten2 = 30;
var theta1 = 50 / 180 * Math.PI;
var theta2 = 65 / 180 * Math.PI;
var fOrdPoten1 = 0;
var fOrdPoten2 = 0;
var fOrdTheta1 = 0;
var fOrdTheta2 = 0;

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
    theta1 += (fOrdTheta1 * time);
    theta2 += (fOrdTheta2 * time);
    fOrdPoten1 = mpot * ((fOrdTheta1 * fOrdTheta2 * Math.sin(theta1 - theta2)) + (3 * gOvL * Math.sin(theta1)));
    fOrdPoten2 = mpot * (-(fOrdTheta1 * fOrdTheta2 * Math.sin(theta1 - theta2)) + (gOvL * Math.sin(theta2)));
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

function beginSim(canv, cxt, init) {
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

function resizeCanvas() {
    canvs.width = window.innerWidth * 0.75;
    canvs.height = window.innerHeight * 0.80;
    x10 = (canvs.width * 0.5) - 8;
    y10 = (canvs.height * 0.33) - 8;
}

function getSliderVals() {
    poten1 = $('#pot1').val();
    poten2 = $('#pot2').val();
    theta1 = $('#phet1').val();
    theta2 = $('#phet2').val();
    mass = $('#mass1').val();
    time = $('#tSteps').val();
}

$(document).ready(function (){
    var init = {};    
    canvs = document.getElementById('pendCanvas');
    contxt = canvs.getContext('2d');
    
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas, false);
    
    $('.sliders').change(function() {
        var selOfText = "#" + $(this).attr('id') + "V";
        $(selOfText).val($(this).val());
    });
    
    $('#btnSub').click(function() {
        init = {};
        getSliderVals();
        canvs  = document.getElementById('pendCanvas');
        contxt = canvs.getContext('2d');
        beginSim(canvs, contxt, init);
    });
    
    beginSim(canvs, contxt, init);
});