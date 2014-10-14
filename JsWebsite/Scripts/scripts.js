function openPane(btnSelector, panelSelector) {
    $(btnSelector).addClass('selected', 200, 'easeOutSine');
    $('.contentPanels').hide();
    $(panelSelector).show();
}

$(document).ready(function() {
    
    openPane('#cNav-1', '#content-1');
    
    //Click event handler for the left bar of content nav buttons
    $("div.contentBtn").click(function() {
        var btnSel = '#' + this.id;
        var panelIndex = this.id.split("-")[1];
        var panelSel = '#content-' + panelIndex;
        
        $('.contentBtn').removeClass('selected');
        
        openPane(btnSel, panelSel);
    });
});