var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    Logger.init();
    var ver = "0.2.0";
    var vid;

    var video = document.getElementById('player');
    var actualDimensions;

    var isMobile = false;
    
    log("Im VideoOverlayTesting ver "+ver);

    function onEnterFullscreen(){
        changeDepth();
    }
    function onExitFullscreen(){
    }

    function startVideo(){
        alert("starting video");
        videojs("player").play();
    }

    function changeDepth(){
        $("#player").css("z-index", 2147483647);
        $("#overlayContainer").css("z-index", 2147483647);
        $("#allZonesContainer").css("z-index", 2147483647);
        $("#startButton").css("z-index", 2147483647);
    }

    function showZones(){
        alert("show zones");
        $("#allZonesContainer").show();
    }

    function onResize(){
        var offsetHeight = video.offsetHeight;
        actualDimensions = VideoDimensions.getDimensions(video);
        var documentWidth = $( document ).width();

        var leftOffset = (documentWidth - actualDimensions.width)/2;
        var topOffset = (offsetHeight - actualDimensions.height)/2;

        log("documentWidth="+documentWidth);
        log("actualDimensions width: "+actualDimensions.width+"  height:"+actualDimensions.height+"  videoRatio: "+actualDimensions.vidRatio);

        actualDimensions.top = topOffset;
        actualDimensions.left = leftOffset;

        if(isMobile){
            $("#allZonesContainer").css({top: actualDimensions.top, width: actualDimensions.width, height: actualDimensions.height});
            $("#startButton").css({top: actualDimensions.top, width: actualDimensions.width, height: actualDimensions.height});
        }
        else{
            $("#allZonesContainer").css({top: actualDimensions.top, left: actualDimensions.left, width: actualDimensions.width, height: actualDimensions.height});
            $("#startButton").css({top: actualDimensions.top, left: actualDimensions.left, width: actualDimensions.width, height: actualDimensions.height});
        }

        $("#player").css({top: 0, left: 0});
    }

    function createElementsListener(){
        //$("#player").click(function(){
            //onPlayerClicked();
        //});
        $("#overlayContainer").click(function(){
            onOverlayContainerClicked();
        });
        $("#startButton").click(function(){
            onStartButtonClicked();
        });
    }

    function onPlayerClicked(){
        log("on player clicked");
        alert("on player clicked");
        showZones();
    }
    function onStartButtonClicked(){
        log("onStartButtonClicked");
        alert("onStartButtonClicked");
        showZones();
        hideStartButton();
        startVideo();
    }

    function hideStartButton(){
        $("#startButton").hide();
    }

    function onOverlayContainerClicked(){
        log("onOverlayContainerClicked");
    }

    function onMetadataLoaded(){
        log("VOD_onMetadataLoaded");
        
        onResize();
        changeDepth();
        EventBus.dispatchEvent("ON_RESIZE", actualDimensions);
        EventBus.addEventListener("ON_ENTER_FULLSCREEN", onEnterFullscreen);
        EventBus.addEventListener("ON_EXIT_FULLSCREEN", onExitFullscreen);
    }

    function log(message){
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    }

    video.addEventListener( "loadedmetadata", onMetadataLoaded, false );

    //$("#allZonesContainer").width(300);
    //$("#allZonesContainer").height(300);

    createElementsListener();


    changeDepth();
    EventBus.addEventListener("ON_ENTER_FULLSCREEN", onEnterFullscreen);

    EventBus.addEventListener("ON_EXIT_FULLSCREEN", onExitFullscreen);
});
