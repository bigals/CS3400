function openPane(btnSelector, panelSelector) {
    $(btnSelector).addClass('selected', 200, 'easeOutSine');
    $('.contentPanels').hide();
    $(panelSelector).show();
}

function getQueryString() {
    var currentURL = window.location.href;  //Get the URL of the current window location
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

$(document).ready(function() {
    
    var selectorArr = getQueryString();
    openPane(selectorArr[0], selectorArr[1]);
    
    //Click event handler for the left bar of content nav buttons
    $("div.contentBtn").click(function() {
        var btnSel = '#' + this.id;
        var panelIndex = this.id.split("-")[1];
        var panelSel = '#content-' + panelIndex;
        
        $('.contentBtn').removeClass('selected');
        
        openPane(btnSel, panelSel);
    });
});