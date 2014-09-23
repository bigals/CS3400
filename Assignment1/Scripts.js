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

document.onclick = closeMenu;

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
};

function drag(ev) {
    ev.dataTransfer.setData("text/html", ev.target.id);
};

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    ev.target.appendChild(document.getElementById(data));
};

/* For Geolocation Example */
var locationBtn = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        locationBtn.innerHTML = "Geolocation is not supported by this browser.";
    }
};

function showPosition(position) {
    locationBtn.innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
};

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
	
    });
       

    /*For Local storage name-value pair example */
    // Check browser support
	function checkBrowserSupport(){
    if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("lastname", "Smith");
        // Retrieve
        document.getElementById("nameValResult").innerHTML = localStorage.getItem("lastname");
    } else {
        document.getElementById("nameValResult").innerHTML = "Sorry, your browser does not support Web Storage...";
    };
	};