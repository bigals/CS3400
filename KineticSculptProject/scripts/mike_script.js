// do cool things with the context
context.font = '40pt Calibri';
context.fillStyle = 'blue';
context.fillText('Hello World!', 150, 100);

var line1 = {
        name: "l1",
        x0: x10,
        y0: y10,
        x: 0,
        y: 0
};

var line2 = {
	name: "l2",
	x0: 10,
	y0: 20,
	x: 12,
	y: 32
};	

function drawLine(myLine, context) {
	context.beginPath();
	context.moveTo(myLine.x0, myLine.y0);
	context.lineTo(myLine.x, myLine.y);
	context.strokeStyle = 'red';
	context.stroke();
}

$(document).ready(function (){

    var canvs  = document.getElementById('myCanvas');
    var context = canvs.getContext('2d');

    drawLine(l2, context);
});