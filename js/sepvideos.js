var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    var video = videojs("player");
    var actualDimensions;
    var player = document.getElementById('player');
    var selectedScene = 0;
    var videoAspectRatio = 1.7777;
    var actualVideoBounds;
    var documentBounds;
    var preloader = $("#preloader");

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
            case -1:
                sceneSrc = "assets/video/separated/11_full_overlayed_converted_with_pointer_info.mp4";
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

    function onMetadataLoaded(){
        onResize();
        hidePreloader();
    }

    function showPreloader(){
        preloader.show();
    }

    function hidePreloader(){
        preloader.hide();
    }

    function resizePreloader(){
        preloader.width(actualVideoBounds.width);
        preloader.height(actualVideoBounds.height);
    }

    function onResize(){
        var documentWidth = $( window ).width();
        var documentHeight = $( window ).height();

        documentBounds = {width:$(document).width(), height:$(document).height()};

        var videoHeight = documentHeight;
        var videoWidth = videoHeight*videoAspectRatio;

        console.log(videoWidth, videoHeight);
        actualVideoBounds = {width:videoWidth, height:videoHeight};
        resizePreloader();
    }
    
    video.on('loadedmetadata', function() {
        onMetadataLoaded();
    });
});
