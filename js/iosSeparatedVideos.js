var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    var video = videojs("player");
    var player = document.getElementById('player');
    var selectedScene = -1;
    var actualDimensions;
    var videoAspectRatio = 1.777;

    var videoActualWidth;
    var videoActualHeight;

    var isFirstRun = true;

    var videoOffsetHeight;
    var videoOffsetWidth;

    var baseWidth = 960;
    var baseImageWidth= 64;
    var baseImageHeight = 64;
    var screenWidth;
    var screenHeight;

    var videoLeftOffset;
    var videoTopOffset;
    var mediumScreenWidth = 800;

    player.addEventListener( "loadedmetadata", onMetadataLoaded, true );

    addPlayerClickEventListener();
    addBackButtonListener();

    function onMetadataLoaded(){
        onResize();
        if(selectedScene == -1){
            if(!isFirstRun){
                enableZones();
            }
        }
        else{
            showBackButton();
        }
    }

    function onResize(){
        videoOffsetHeight = player.offsetHeight;
        //videoOffsetWidth = player.offsetWidth;
        videoOffsetWidth = parseInt(videoOffsetHeight*videoAspectRatio);

        actualDimensions = VideoDimensions.getDimensions(player);
        videoActualWidth = actualDimensions.width;
        videoActualHeight = actualDimensions.height;

        if(isNaN(videoActualHeight)){
            videoActualHeight = Math.round(videoActualWidth/videoAspectRatio);
        }
        //alert("actual "+videoActualWidth+":"+videoActualHeight+" offset bounds "+videoOffsetWidth+":"+videoOffsetHeight);
        resizeZones();
        centerZones();
        resizeBackButton();
    }

    // TODO попробовать переделать БЕЗ постера, заметить его просто картинкой при нажатии на которую начинать видео
    function addPlayerClickEventListener(){
        $("#player").on("click",function(){
            removePlayerClickEventListener();
            //goFullscreen();
            enableZones();
            isFirstRun = false;
        });
    }

    function goFullscreen(){
        $('.vjs-fullscreen-control').click();
    }
    
    function addBackButtonListener(){
        $("#backButton").click(function(){
            selectedScene = -1;
            hideBackButton();
            loadScene();
        });
    }

    function removePlayerClickEventListener(){
        $("#player").off("click");
    }

    function hideZones(){
        $("#allZonesContainer").hide();
    }
    function enableZones(){
        $("#allZonesContainer").removeClass("zonesDisabled");
        $("#allZonesContainer").addClass("zonesEnabled");

        $("#allZonesContainer").show();
        $("#allZonesContainer").css("display", "block");
    }

    function resizeBackButton(){
        var coefficient = screenWidth/baseWidth;

        $("#zoomOutMagnifierImage").width(baseImageWidth*coefficient);
        $("#zoomOutMagnifierImage").height(baseImageHeight*coefficient);

        $(".overlay_back_button").css({left:videoLeftOffset + $("#allZonesContainer").width() - $("#zoomOutMagnifierImage").width() - $("#zoomOutMagnifierImage").width()/14, top:videoTopOffset + $("#allZonesContainer").height() - $("#zoomOutMagnifierImage").height() - $("#zoomOutMagnifierImage").height()/16});
    }

    function showBackButton(){
        $(".overlay_back_button").show();
    }
    function hideBackButton(){
        $(".overlay_back_button").hide();
    }

    function resizeZones(){
        //console.log("resize zones to "+videoActualWidth+" : "+videoActualHeight);
        $("#allZonesContainer").width(videoActualWidth);
        $("#allZonesContainer").height(videoActualHeight);
    }

    function centerZones(){
        //$("#allZonesContainer").css({ top: '0', left: '0' });

        /*
        if(window.innerWidth < window.innerHeight){
            $("#allZonesContainer").css({left: '50%' });
        }
        */
        //$("#allZonesContainer").css({ top: '50%', left: '50%' });

        screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        screenHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

        console.log(screenWidth, screenHeight);
        //var leftOffset = ($(document).width() - videoActualWidth)/2;
        //var topOffset = ($(document).height() - videoActualHeight)/2;

        videoLeftOffset = parseInt((screenWidth - videoActualWidth)/2);
        videoTopOffset = parseInt((screenHeight - videoActualHeight)/2);

        //alert("videoLeftOffset="+videoLeftOffset+" screenHeight="+screenHeight+"  videoTopOffset="+videoTopOffset);

        $("#allZonesContainer").css({top: 0, left:0});

        if(screenWidth<screenHeight){
            $("#allZonesContainer").css({top: videoTopOffset, left:videoLeftOffset});
        }
        else{
            if(screenWidth > mediumScreenWidth){
                // maybe ipad
                $("#allZonesContainer").css({top: videoTopOffset, left:videoLeftOffset});
            }
        }
    }

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
            case 5:
                sceneSrc = "assets/video/separated/5_loop_overlayed_converted.mp4";
                break;
            case 6:
                sceneSrc = "assets/video/separated/6_loop_overlayed_converted.mp4";
                break;
            case 7:
                sceneSrc = "assets/video/separated/7_loop_overlayed_converted.mp4";
                break;
            case 8:
                sceneSrc = "assets/video/separated/8_loop_overlayed_converted.mp4";
                break;
            case 9:
                sceneSrc = "assets/video/separated/9_loop_overlayed_converted.mp4";
                break;
            case 10:
                sceneSrc = "assets/video/separated/10_loop_overlayed_converted.mp4";
                break;
            case 11:
                sceneSrc = "assets/video/separated/11_loop_overlayed_converted.mp4";
                break;
        }
        video.src(sceneSrc);
    }

    function onZoneButtonClicked(){
        hideZones();
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

    $( window ).resize(function() {
        //alert("on window resized");
        onResize();
    });
});
