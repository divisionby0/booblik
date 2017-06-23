var ZoomInButtonListenerJS = function(){

    var $ = jQuery.noConflict();

    var style = {
        fill: "#ddd",
        stroke:"none",
        opacity:"0",
        cursor: "-webkit-zoom-in"
    };

    var animationSpeed = 100;
    var hoverStyle = {
        fill: "#00ff00",
        opacity:"0.4"
    };

    var HOVER_ENABLED = "HOVER ENABLED";
    var HOVER_DISABLED = "HOVER_DISABLED";
    var state = HOVER_DISABLED;
    
    function createHoverListeners(){
        if(state == HOVER_DISABLED){
            $(".zoomInButton").each(function(){
                var zoomInButton = $(this);
                zoomInButton.attr(style);
                zoomInButton.on("mouseover", function(){
                    $(this).animate(hoverStyle, animationSpeed);
                    EventBus.dispatchEvent("ZOOM_IN_BUTTON_MOUSE_OVER", $(this).data("scene"));
                });
                zoomInButton.on("mouseout", function(){
                    $(this).animate(style, animationSpeed);
                    EventBus.dispatchEvent("ZOOM_IN_BUTTON_MOUSE_OUT");
                });
            });
            state = HOVER_ENABLED;
        }
    }

    function removeHoverListeners(){
        $(".zoomInButton").each(function(){
            var zoomInButton = $(this);
            zoomInButton.attr(style);
            zoomInButton.off("mouseover");
            zoomInButton.off("mouseout");
        });

        state = HOVER_DISABLED;
    }

    function createClickListener(){
        $(".zoomInButton").each(function(){
            var zoomInButton = $(this);
            zoomInButton.attr(style);
            zoomInButton.click(function(){
                $(this).animate(style, animationSpeed);
                EventBus.dispatchEvent("SCENE_BUTTON_CLICKED", $(this).data("scene"));

            });
        });
    }
    
    return{
        init:function(){
            createClickListener();
            createHoverListeners();
        },
        create:function(){
            createHoverListeners();
        },
        remove:function(){
            console.log("remove hover listener");
            removeHoverListeners();
        }
    }
}
