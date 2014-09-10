'use strict';
var pageScripts = (function () {
    //Functions go here
    return pageScripts;
})();

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
});