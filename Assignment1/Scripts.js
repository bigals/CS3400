'use strict';
var pageScripts = (function () {
    //Functions go here
    return pageScripts;
})();

var timer = 0;
var item = 0;

//function for opening of submenu elements
function openMenu(id) {
    //log('openMenu('+id+')');
    window.clearTimeout(timer);

  if(item) item.style.visibility = 'hidden';

    item = document.getElementById(id);
    item.style.visibility = 'visible';
}

function closeMenu() {
  // sets timer to close the open submenu in 0.5 seconds
    if(item) {
        //log('closeMenu, schedule timer for ' + item.id);
    timer = window.setTimeout(
       "if(item) { item.style.visibility = 'hidden';}",
      500);
  }
}

function keepMenuOpen() {
    //log('keepMenuOpen');
    window.clearTimeout(timer);
}

/* for local storage example */
function localClickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("localSresult").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
    } else {
        document.getElementById("localSresult").innerHTML = "Sorry, your browser does not support web storage...";
    }
}
/*for session storage example */
function sessionClickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (sessionStorage.clickcount) {
            sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
        } else {
            sessionStorage.clickcount = 1;
        }
        document.getElementById("codeSresult").innerHTML = "You have clicked the button " + sessionStorage.clickcount + " time(s) in this session.";
    } else {
        document.getElementById("codeSresult").innerHTML = "Sorry, your browser does not support web storage...";
    }
}



/*For Drag and Drop */
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

/* For Geolocation Example */
var locationBtn = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        locationBtn.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    locationBtn.innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
}

$(document).ready(function() {
    $("#btnHome").click(function() {
        window.location.href = "index.html";
    });
    $("#btnTool").click(function() {
        window.location.href = "helpfullTools.html";
    });
    $("#btnHtEx").click(function() {
        window.location.href = "htmlExamples.html";
    });
    $("#btnCsEx").click(function() {
        window.location.href = "cssExamples.html";
    });
    $("#btnJsEx").click(function() {
        window.location.href = "jsExamples.html";
    });
    
    $("#btnHtEx").hover(function() {
    
    }, function() {
    
    });
    
    /* Script for #canvas1 */
    var c1 = document.getElementById("canvas1");
    var ctx1 = c1.getContext("2d");
    ctx1.fillStyle = "#FF0000";
    ctx1.fillRect(0,0,150,75);

    /* Script for #canvas2 */
    var c2 = document.getElementById("canvas2");
    var ctx2 = c2.getContext("2d");
    ctx2.moveTo(0,0);
    ctx2.lineTo(200,100);
    ctx2.stroke();

    /* Script for #canvas3 */
    var c3 = document.getElementById("canvas3");
    var ctx3 = c3.getContext("2d");
    ctx3.beginPath();
    ctx3.arc(95,50,40,0,2*Math.PI);
    ctx3.stroke();

    /* Script for #canvas4 */
    var c4 = document.getElementById("canvas4");
    var ctx4 = c4.getContext("2d");
    ctx4.font = "30px Arial";
    ctx4.fillText("Hello World",10,50);

    /* Script for #canvas5 */
    var c5 = document.getElementById("canvas5");
    var ctx5 = c5.getContext("2d");
    ctx5.font = "30px Arial";
    ctx5.strokeText("Hello World",10,50);

    /* Script for #canvas6 */
    var c6 = document.getElementById("canvas6");
    var ctx6 = c6.getContext("2d");

    // Create gradient
    var grd6 = ctx6.createLinearGradient(0,0,200,0);
    grd6.addColorStop(0,"red");
    grd6.addColorStop(1,"white");

    // Fill with gradient
    ctx6.fillStyle = grd6;
    ctx6.fillRect(10,10,150,80);

    /* Script for #canvas7 */
    var c7 = document.getElementById("canvas7");
    var ctx7 = c7.getContext("2d");

    // Create gradient
    var grd7 = ctx7.createRadialGradient(75,50,5,90,60,100);
    grd7.addColorStop(0,"red");
    grd7.addColorStop(1,"white");

    // Fill with gradient
    ctx7.fillStyle = grd7;
    ctx7.fillRect(10,10,150,80);


    /* Script for #canvas8 */
    var c8 = document.getElementById("canvas8");
    var ctx8 = c8.getContext("2d");
    var img8 = document.getElementById("scream");
    ctx8.drawImage(img8,10,10);   

    /*For Local storage name-value pair example */
    // Check browser support
    if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("lastname", "Smith");
        // Retrieve
        document.getElementById("nameValResult").innerHTML = localStorage.getItem("lastname");
    } else {
        document.getElementById("nameValResult").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
});