'use strict';

//Global Login Credentials Object
var loginCred = {
    loginUname: " ",
    loginPass: " "
};

function onLoginSubmit() {
    loginCred.loginUname = $("#loginUName").val();
    loginCred.loginPass = $("#loginPass").val();
    
    localStorage.setItem("username", loginCred.loginUname);
    localStorage.setItem("password", loginCred.loginPass);

    //TODO: Authenticate
    window.location = "home.html"
    //location.href = "./home.html?uName=" + loginCred.loginUname + "&uPass=" + loginCred.loginPass;
}

function getLocalStoreData() {
    if(localStorage.getItem('username') !== 'undefined')
    {
        loginCred.loginUname = localStorage.getItem('username');
        loginCred.loginPass = localStorage.getItem('password');
    }
}

//JQuery Mobile Equivilent of $(document).ready()
$(document).on('pageinit', function() {
    getLocalStoreData();
    
    $('#loginSubmit').click(function() {
        onLoginSubmit();
    });
});