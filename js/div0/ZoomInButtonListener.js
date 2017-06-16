var $ = jQuery.noConflict();
$( document ).ready(function($)
{
    var style = {
        fill: "#ddd",
        stroke:"none",
        opacity:"0",
        cursor: "-webkit-zoom-in"
    };

    var animationSpeed = 100;
    var hoverStyle = {
        fill: "#00ff00"
    };

    
    createHoverListeners(hoverStyle, animationSpeed);
    
    $(".zoomInButton").each(function(){
        var zoomInButton = $(this);
        zoomInButton.attr(style);
        zoomInButton.click(function(){
            EventBus.dispatchEvent("SCENE_BUTTON_CLICKED", $(this).data("scene"));
        });
    });
});
function destroyHoverListeners(){
    
}

function createHoverListeners(){
    $(".zoomInButton").each(function(){
        var zoomInButton = $(this);
        zoomInButton.attr(style);
        zoomInButton.mouseover(function(){
            $(this).animate(hoverStyle, animationSpeed);
            //console.log("scene: ",$(this).data("scene"));
            EventBus.dispatchEvent("ZOOM_IN_BUTTON_MOUSE_OVER", $(this).data("scene"));
        });
        zoomInButton.mouseout(function(){
            $(this).animate(style, animationSpeed);
            EventBus.dispatchEvent("ZOOM_IN_BUTTON_MOUSE_OUT");
        });
    });
}
