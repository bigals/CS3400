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

function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        
        //Output to Screen      
        document.getElementById("ldedFile").value = textFromFileLoaded;     
        
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function init() {
    var canvas = document.getElementById('drawSurface'); // A static variable, due to the fact that one or more local functions access it.
    var context = canvas.getContext('2d'); // A static variable, due to the fact that one or more local functions access it.

    context.fillStyle = "purple";

    if (window.navigator.msPointerEnabled) {
        canvas.addEventListener('MSPointerMove', paintCanvas, false);
    }
    else {
        canvas.addEventListener('mousemove', paintCanvas, false);
    }

    document.getElementById('erase').addEventListener('click', eraseCanvas, false);
    document.getElementById('save').addEventListener('click', saveCanvas, false);
    document.getElementById('load').addEventListener('click', loadCanvas, false);

    function paintCanvas(event) { // The "event" object contains the position of the pointer/mouse.
        context.fillRect(event.offsetX, event.offsetY, 4, 4); // Draw a 4x4 rectangle at the given coordinates (relative to the canvas box). As of this writing, not all browsers support offsetX and offsetY.
    } // paintCanvas

    function saveCanvas() {
        window.localStorage.canvasImage = canvas.toDataURL(); // Save the user's drawing to persistent local storage.
    } // saveCanvas

    function eraseCanvas() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    } // eraseCanvas

    function loadCanvas() {
        var img = new Image(); // The canvas drawImage() method expects an image object.

        img.src = window.localStorage.canvasImage; // Retrieve the last saved artistic achievement from persistent local storage.
        img.onload = function() { // Only render the saved drawing when the image object has fully loaded the drawing into memory.
            context.drawImage(img, 0, 0); // Draw the image starting at canvas coordinate (0, 0) - the upper left-hand corner of the canvas.
        } // onload
    } // loadCanvas
} // init

function checkAndInitLStoreCanv() {
    if($('#content-2').hasClass('htmlStorCanv')) {
        window.addEventListener('load', init, false); // Safety first.        
    }
}

function checkAndCreateGLCube() {
    if($('#content-6').hasClass('webGLDemo'))
    {
        var CANVAS=document.getElementById("rotCube");
        //CANVAS.width=window.innerWidth;
        //CANVAS.height=window.innerHeight;

        /*========================= GET WEBGL CONTEXT ========================= */
        try {
            var GL = CANVAS.getContext("experimental-webgl", {antialias: true});
        } catch (e) {
            alert("You are not webgl compatible :(") ;
            return false;
        } ;

        /*========================= SHADERS ========================= */

        var shader_vertex_source="\n\
        attribute vec3 position;\n\
        uniform mat4 Pmatrix;\n\
        uniform mat4 Vmatrix;\n\
        uniform mat4 Mmatrix;\n\
        attribute vec3 color; //the color of the point\n\
        varying vec3 vColor;\n\
        void main(void) { //pre-built function\n\
        gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
        vColor=color;\n\
        }";

        var shader_fragment_source="\n\
        precision mediump float;\n\
        varying vec3 vColor;\n\
        void main(void) {\n\
        gl_FragColor = vec4(vColor, 1.);\n\
        }";

        var get_shader=function(source, type, typeString) {
        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
          alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
          return false;
        }
        return shader;
        };

        var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
        var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

        var SHADER_PROGRAM=GL.createProgram();
        GL.attachShader(SHADER_PROGRAM, shader_vertex);
        GL.attachShader(SHADER_PROGRAM, shader_fragment);

        GL.linkProgram(SHADER_PROGRAM);

        var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
        var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
        var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

        var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
        var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

        GL.enableVertexAttribArray(_color);
        GL.enableVertexAttribArray(_position);

        GL.useProgram(SHADER_PROGRAM);

        /*========================= THE CUBE ========================= */
        //POINTS :
        var cube_vertex=[
        -1,-1,-1,

        0,0,0,

        1,-1,-1,

        1,0,0,

        1,1,-1,

        1,1,0,

        -1,1,-1,

        0,1,0,

        -1,-1,1,

        0,0,1,

        1,-1,1,

        1,0,1,

        1,1,1,

        1,1,1,

        -1,1,1,

        0,1,1
        ];

        var CUBE_VERTEX= GL.createBuffer ();
        GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER,
                    new Float32Array(cube_vertex),
        GL.STATIC_DRAW);

        //FACES :
        var cube_faces = [
        0,1,2,
        0,2,3,

        4,5,6,
        4,6,7,

        0,3,7,
        0,4,7,

        1,2,6,
        1,5,6,

        2,3,6,
        3,7,6,

        0,1,5,
        0,4,5

        ];
        var CUBE_FACES= GL.createBuffer ();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(cube_faces),
        GL.STATIC_DRAW);

        /*========================= MATRIX ========================= */

        var PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
        var MOVEMATRIX=LIBS.get_I4();
        var VIEWMATRIX=LIBS.get_I4();



        LIBS.translateZ(VIEWMATRIX, -6);

        /*========================= DRAWING ========================= */
        GL.enable(GL.DEPTH_TEST);
        GL.depthFunc(GL.LEQUAL);
        GL.clearColor(0.0, 0.0, 0.0, 0.0);
        GL.clearDepth(1.0);

        var time_old=0;
        var animate=function(time) {
        var dt=time-time_old;
        LIBS.rotateZ(MOVEMATRIX, dt*0.001);
        LIBS.rotateY(MOVEMATRIX, dt*0.002);
        LIBS.rotateX(MOVEMATRIX, dt*0.003);
        time_old=time;

        GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
        GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
        GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false,4*(3+3),0) ;
        GL.vertexAttribPointer(_color, 3, GL.FLOAT, false,4*(3+3),3*4) ;
        GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
        GL.drawElements(GL.TRIANGLES, 6*2*3, GL.UNSIGNED_SHORT, 0);

        GL.flush();

        window.requestAnimationFrame(animate);
        };
        animate(0);
    }
}

function mouseOver() {
    document.getElementById("demo").style.color = "red";
}

function mouseOut() {
    document.getElementById("demo").style.color = "black";
}

//dropdown menu example
var timeout = 500;
var closetimer  = 0;
var ddmenuitem  = 0;

// open hidden layer
function mopen(id)
{   
    // cancel close timer
    mcancelclosetime();

    // close old layer
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

    // get new layer and show it
    ddmenuitem = document.getElementById(id);
    ddmenuitem.style.visibility = 'visible';

}
// close showed layer
function mclose()
{
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime()
{
    closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
    if(closetimer)
    {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}

// close layer when click-out
document.onclick = mclose;

$(document).ready(function() {
    
    var selectorArr = getQueryString();
    openPane(selectorArr[0], selectorArr[1]);
    
    //Run the Appropriate JavaScript for each of the Examples panels
    checkAndInitLStoreCanv();
    checkAndRenderCanvas();
    checkAndCreateGLCube();
    
    //Click event handler for the left bar of content nav buttons
    $("div.contentBtn").click(function() {
        var btnSel = '#' + this.id;
        var panelIndex = this.id.split("-")[1];
        var panelSel = '#content-' + panelIndex;
        
        $('.contentBtn').removeClass('selected');
        
        openPane(btnSel, panelSel);
    });
    
    $('#loadFileBtn').click(function() {
        loadFileAsText();
    });
});