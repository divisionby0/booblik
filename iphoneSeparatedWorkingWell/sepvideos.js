var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    var video = videojs("player");

    var selectedScene = 0;

    function loadScene(){
        var sceneSrc = "";
        switch(selectedScene){
            case 0:
                sceneSrc = "assets/video/separated/1_loop_overlayed_converted.mp4";
                break;
            case 1:
                sceneSrc = "assets/video/separated/2_loop_overlayed_converted.mp4";
                break;
            case 2:
                sceneSrc = "assets/video/separated/3_loop_overlayed_converted.mp4";
                break;
            case 3:
                sceneSrc = "assets/video/separated/4_loop_overlayed_converted.mp4";
                break;
        }
        video.src(sceneSrc);
    }

    function onZoneButtonClicked(){
        loadScene();
    }
    
    $(".zoneButton").click(function(){
        selectedScene = parseInt($(this).data("sceneid"));
        onZoneButtonClicked();
    });
});
