var changeHandler = function(){
    //NB the following line requrires the libary from John Dyer                         
    //var fs = window.fullScreenApi.isFullScreen();
    var fs = isFullScreen();
    //console.log("f" + (fs ? 'yes' : 'no' ));
    if (fs) {
        //console.log("In fullscreen, I should do something here");
        EventBus.dispatchEvent("ON_ENTER_FULLSCREEN",null);
    }
    else {
        //console.log("NOT In fullscreen, I should do something here");
        EventBus.dispatchEvent("ON_EXIT_FULLSCREEN",null);
    }
}

function isFullScreen()
{
    return (document.fullScreenElement && document.fullScreenElement !== null)
        || document.mozFullScreen
        || document.webkitIsFullScreen;
}

document.addEventListener("fullscreenchange", changeHandler, false);
document.addEventListener("webkitfullscreenchange", changeHandler, false);
document.addEventListener("mozfullscreenchange", changeHandler, false);