'use strict';
//wrap all javascript logic in an anonymous function
(function() {
    //Global Login Credentials Object
    var loginCred = {
        loginEmail: " ",
        loginPass: " "
    };

    function onLoginSubmit() {
        var emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        
        loginCred.loginEmail = $("input[name='loginEmail']").val();
        loginCred.loginPass = $("input[name='loginPass']").val();
        
        //Check that email has a valid input.... TODO: Need to add check for password here
        if(emailRegEx.test(loginCred.loginEmail))
        {
            location.href = "home.html";
        }
        else
        {
            //need error handleing for invalid email here
        }
    }

    $(document).ready(function () {
        $('#loginSubmit').click(function() {
            onLoginSubmit();
        });
    });
})();