var Zones1 = function(){
    var $ = jQuery.noConflict();
    return{
        init:function(){
            var style = {
                fill: "#ddd",
                stroke:"none",
                opacity:"0",
                cursor: "-webkit-zoom-in"
            };

            var animationSpeed = 100;

            var hoverStyle = {
                fill: "#00FF00",
                opacity:".1"
            };
            
            $(".zoomInButton").each(function(){
                var zoomInButton = $(this);
                zoomInButton.click(function(){
                    EventBus.dispatchEvent("SCENE_BUTTON_CLICKED", $(this).data("scene"));
                });
                zoomInButton.mouseover(function(){
                    console.log("hoverStyle", hoverStyle);
                    $(this).animate(hoverStyle, animationSpeed);
                });
                zoomInButton.mouseout(function(){
                    $(this).animate(style, animationSpeed);
                });
            });
        }
    }
}
