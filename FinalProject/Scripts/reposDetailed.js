'use strict';

//Global Login Credentials Object
var loginCred = {
    loginUname: " ",
    loginPass: " "
};

var repoNames = ["Repo #1", "Repo #2", "Repo #3", "Repo #4"];

function changeDetailRepoText(repoIndex) {
    $('#repoTitle').text("Repository #" + (repoIndex + 1) + " Detailed View");
    $('#repoDescript').text("This is the detailed view of the Repository titled:    " + "Repository #" + (repoIndex + 1));
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

$(document).on('pageinit', function() {
    
    changeDetailRepoText(index);
});