var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    var video = videojs("player");

    var selectedScene = 0;

    function loadScene(){
        var sceneSrc = "";
        switch(selectedScene){
            case -1:
                sceneSrc = "assets/video/separated/11_full_overlayed_converted_with_pointer_info.mp4";
                break;
            case 1:
                sceneSrc = "assets/video/separated/1_loop_overlayed_converted.mp4";
                break;
            case 2:
                sceneSrc = "assets/video/separated/2_loop_overlayed_converted.mp4";
                break;
            case 3:
                sceneSrc = "assets/video/separated/3_loop_overlayed_converted.mp4";
                break;
            case 4:
                sceneSrc = "assets/video/separated/4_loop_overlayed_converted.mp4";
                break;
        }
        video.src(sceneSrc);
    }

    function onZoneButtonClicked(){
        changePosterToPreloader();
        loadScene();
    }

    function changePosterToPreloader(){
        var poster = "url('assets/preloaderImage1.jpg')";
        $('video').attr('poster', "assets/preloaderImage1.jpg");
    }

    $(".zoomInButton").click(function(){
        selectedScene = parseInt($(this).data("scene"));
        onZoneButtonClicked();
    });


    $(".zoneButton").click(function(){
        selectedScene = parseInt($(this).data("sceneid"));
        onZoneButtonClicked();
    });
});
