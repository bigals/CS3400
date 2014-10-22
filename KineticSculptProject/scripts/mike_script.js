function doThings(ctx) {
	ctx.moveTo(0,0);
	ctx.lineTo(200,100);
	ctx.stroke();
}


$(document).ready(function() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	doThings(ctx);
});