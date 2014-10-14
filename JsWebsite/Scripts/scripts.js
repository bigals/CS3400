function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/html", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    ev.target.appendChild(document.getElementById(data));
}

function openPane(btnSelector, panelSelector) {
    $(btnSelector).addClass('selected', 200, 'easeOutSine');
    $('.contentPanels').hide();
    $(panelSelector).show();
}

function getQueryString() {
    var currentURL = document.URL;  //Get the URL of the current window location
    var queryString = currentURL.split('?')[1];    //Split out the query string from the URL
    var selectors = ['#cNav-', '#content-'];    //Screate array to hold values to be returned with their base values
    var keyValPairs = queryString.split('=');   //Split the key and value pair
    
    if(keyValPairs[0] === 'tOpVal') {       //Ensure that the correct key has been picked up
        selectors[0] += keyValPairs[1];     //Set the selectors with the value from the key picked up
        selectors[1] += keyValPairs[1];
    }
    
    //If value from query string was not picked up, then set the selectors to the default
    if ((selectors[0] === '#cNav-') && (selectors[1] === '#content-')) {
        selectors[0] += '1';
        selectors[1] += '1';
    }
    
    return selectors;
}

function checkAndRenderCanvas() {
    //Ensure the Simple Canvases panel is being displayed
    if($('#content-3').hasClass('canvases'))
    {
        /* Script for #canvas1 */
        var c = document.getElementById("canvas1");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,0,150,75);

        /* Script for #canvas2 */
        var c = document.getElementById("canvas2");
        var ctx = c.getContext("2d");
        ctx.moveTo(0,0);
        ctx.lineTo(200,100);
        ctx.stroke();

        /* Script for #canvas3 */
        var c = document.getElementById("canvas3");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(95,50,40,0,2*Math.PI);
        ctx.stroke();

        /* Script for #canvas4 */
        var c = document.getElementById("canvas4");
        var ctx = c.getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillText("Hello World",10,50);

        /* Script for #canvas5 */
        var c = document.getElementById("canvas5");
        var ctx = c.getContext("2d");
        ctx.font = "30px Arial";
        ctx.strokeText("Hello World",10,50);

        /* Script for #canvas6 */
        var c = document.getElementById("canvas6");
        var ctx = c.getContext("2d");

        // Create gradient
        var grd = ctx.createLinearGradient(0,0,200,0);
        grd.addColorStop(0,"red");
        grd.addColorStop(1,"white");

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(10,10,150,80);

        /* Script for #canvas7 */
        var c = document.getElementById("canvas7");
        var ctx = c.getContext("2d");

        // Create gradient
        var grd = ctx.createRadialGradient(75,50,5,90,60,100);
        grd.addColorStop(0,"red");
        grd.addColorStop(1,"white");

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(10,10,150,80);


        /* Script for #canvas8 */
        var c = document.getElementById("canvas8");
        var ctx = c.getContext("2d");
        var img = document.getElementById("scream");
        ctx.drawImage(img,10,10);
    }
}

$(document).ready(function() {
    
    var selectorArr = getQueryString();
    openPane(selectorArr[0], selectorArr[1]);
    
    checkAndRenderCanvas();
    
    //Click event handler for the left bar of content nav buttons
    $("div.contentBtn").click(function() {
        var btnSel = '#' + this.id;
        var panelIndex = this.id.split("-")[1];
        var panelSel = '#content-' + panelIndex;
        
        $('.contentBtn').removeClass('selected');
        
        openPane(btnSel, panelSel);
    });
});