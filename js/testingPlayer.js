var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    console.log("ready");
    
    var video = document.getElementById('player');
    var actualDimensions;
    
    video.addEventListener( "loadedmetadata", onMetadataLoaded, false );

    function onMetadataLoaded(){
        //$("#startButton").show();
        onResize();
        EventBus.dispatchEvent("ON_RESIZE", actualDimensions);
        EventBus.addEventListener("ON_ENTER_FULLSCREEN", onEnterFullscreen);
        //EventBus.addEventListener("ON_EXIT_FULLSCREEN", onExitFullscreen);
    }

    function onResize(){
        var offsetHeight = video.offsetHeight;
        actualDimensions = VideoDimensions.getDimensions(video);
        var documentWidth = $( document ).width();

        //var leftOffset = parseInt((documentWidth - actualDimensions.width)/2);
        //var topOffset = parseInt((offsetHeight - actualDimensions.height)/2);

        var leftOffset = (documentWidth - actualDimensions.width)/2;
        var topOffset = (offsetHeight - actualDimensions.height)/2;

        console.log("actualDimensions width: "+actualDimensions.width+"  height:"+actualDimensions.height+"  videoRatio: "+actualDimensions.vidRatio);

        actualDimensions.top = topOffset;
        actualDimensions.left = leftOffset;

        //console.log("left: ",actualDimensions.left, "top", actualDimensions.top);

        $("#allZonesContainer").css({top: actualDimensions.top, left: actualDimensions.left, width: actualDimensions.width, height: actualDimensions.height});

        $(".zoomOutButton").css({top: topOffset, left: leftOffset, width: actualDimensions.width, height: actualDimensions.height});
        $("#startButton").css({top: topOffset, left: leftOffset, width: actualDimensions.width - 3, height: actualDimensions.height - 3});
    }

    function onEnterFullscreen() {
        console.log("on enter fullscreen");
        onResize();
        $("#allZonesContainer").css("z-index", 2147483647);
        $(".zoomOutButton").css("z-index", 2147483647);
        $("#startButton").css("z-index", 2147483647);
        $("#pointerInfoIconContainer").css("z-index", 2147483647);
        $("#frameContainer").css("z-index", 2147483647);
        $("#hoversContainer").css("z-index", 2147483647);
    }

    $( window ).resize(function() {
        onResize();
        EventBus.dispatchEvent("ON_RESIZE", actualDimensions);
    });


    // old
    video.addEventListener('click',function(){
        videojs("player").play();
        goFullscreen();
    },false);
    
    function goFullscreen(){
        videojs("player");
        $('.vjs-fullscreen-control').click();
    }
});