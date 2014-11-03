

function onLoginSubmit() {
    var url = $.url(document.location);

    loginCred.loginUname = $("#loginUName").val();
    loginCred.loginPass = $("#loginPass").val();

    //Check that email has a valid input.... TODO: Need to add check for password here
    $.mobile.navigate("./home.html", {data:{uName:loginCred.loginUname, uPass:loginCred.loginPass}});
    //location.href = "./home.html?uName=" + loginCred.loginUname + "&uPass=" + loginCred.loginPass;
}

function parseParamsFromQueryString() {
    var url = $.url(document.location);

    var uNm = url.param("uName");
    if (uNm != undefined) {
        loginCred.loginUname = uNm;
    }
    var uPass = url.param("uPass");
    if (uPass != undefined) {
        loginCred.loginPass = uPass;
    }
    return url;
}

//JQuery Mobile Equivilent of $(document).ready()
$(document).on('pageinit', function() {
    parseParamsFromQueryString();
    
    $('#loginSubmit').click(function() {
        onLoginSubmit();
    });
    
    $('a.navBLinks').on('click', function() {
        parseParamsFromQueryString();
        switch($(this).text())
        {
                case 'Repos':                
                    $.mobile.navigate("./repos.html", {data:{uName:loginCred.loginUname, uPass:loginCred.loginPass}});
                    break;
        }
    });
    
    $('a.repoDetailLink').on('click', function() {
        var index = $(this).attr('id').substring(5);
        $.mobile.navigate("./detailedRepos.html", {data:{uName:loginCred.loginUname, uPass:loginCred.loginPass}});        
    });
});