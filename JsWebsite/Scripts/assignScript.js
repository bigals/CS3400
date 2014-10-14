/* Function to detect if touch feature is available for device */
function has_touch() {
  return !!('ontouchstart' in window);
}

/* Function to determine if the max screen-width is 650px */
function is_Small() {
  return window.matchMedia("(max-width: 650px)").matches;
}

/* Function to return the type of device that the page is being displayed on */
function detect_Device() {
    var device = '';
    if(has_touch()) {
        if(is_Small()) {        //Max-Width is 650px
            device = 'phone';
        }
        else {                  //Max-Width is greater than 650px
            device = 'tablet';
        }
    }
    else {                      //Device does not have touch feature
        device = 'desktop';
    }
    
    return device;
}

function main() {
    switch(detect_Device()) {
        case 'phone':
            break;
        case 'tablet':
            break;
        case 'desktop':
            break;            
    }
}

window.onload = main();