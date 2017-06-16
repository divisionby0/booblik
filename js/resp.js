var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    var vid = document.getElementById("player");
    var actualDimensions;

    var borderWeight = 2;

    var zonesWidth;
    var zonesHeight;
    
    vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );

    function onMetadataLoaded(){
        $("#startButton").show();
        onResize();
        EventBus.dispatchEvent("ON_RESIZE", actualDimensions);
        EventBus.addEventListener("ON_ENTER_FULLSCREEN", onEnterFullscreen);
        //EventBus.addEventListener("ON_EXIT_FULLSCREEN", onExitFullscreen);
    }

    function onResize(){
        //vid = document.getElementById("player");
        var offsetHeight = vid.offsetHeight;
        actualDimensions = VideoDimensions.getDimensions(vid);
        var documentWidth = $( document ).width();
        //var leftOffset = parseInt((documentWidth - actualDimensions.width)/2);
        //var topOffset = parseInt((offsetHeight - actualDimensions.height)/2);
        var leftOffset = (documentWidth - actualDimensions.width)/2;
        var topOffset = (offsetHeight - actualDimensions.height)/2;

        actualDimensions.left = leftOffset;
        actualDimensions.top = topOffset;

        console.log("actualDimensions width: "+actualDimensions.width+"  height:"+actualDimensions.height+"  videoRatio: "+actualDimensions.vidRatio);

        //zonesWidth = actualDimensions.width;
        //zonesHeight = zonesWidth/1.777778;
        zonesWidth = actualDimensions.width;
        //zonesHeight = zonesWidth/1.777778;

        //$("#allZonesContainer").css({top: topOffset, left: leftOffset, width: actualDimensions.width, height: actualDimensions.height});
        $("#allZonesContainer").css({top: topOffset, left: leftOffset, width: zonesWidth, height: zonesHeight});
        //$("#hoversContainer").css({top: topOffset, left: leftOffset, width: zonesWidth, height: zonesHeight});

        //$("#allZonesContainer").css({top: topOffset, left: leftOffset});
        //$("#allZonesContainer").width(actualDimensions.width);
        //$("#allZonesContainer").height(actualDimensions.height);
        //$("#allZonesContainer").css({top: topOffset, left: leftOffset, width: actualDimensions.width, height: actualDimensions.height});
        //$("#allZonesContainer").css({top: 0, left: 0, width: actualDimensions.width, height: actualDimensions.height});

        $(".zoomOutButton").css({top: topOffset, left: leftOffset, width: actualDimensions.width, height: actualDimensions.height});
        $("#startButton").css({top: topOffset, left: leftOffset, width: actualDimensions.width - 3, height: actualDimensions.height - 3});
        drawFrame(leftOffset, topOffset);
    }

    function drawFrame(leftOffset, topOffset){
        $("#frameContainer").css({top: topOffset - borderWeight/2, left: leftOffset - borderWeight/2 , width: zonesWidth, height: zonesHeight});
        $("#frameContainer").width(actualDimensions.width - borderWeight*2);
        $("#frameContainer").height(actualDimensions.height - borderWeight*2);

        //$("#allZonesContainer").css({top: topOffset - borderWeight/2, left: leftOffset - borderWeight/2 , width: actualDimensions.width, height: actualDimensions.height});
    }

    function onEnterFullscreen() {
        //console.log("on enter fullscreen");
        //onResize();
        $("#allZonesContainer").css("z-index", 2147483647);
        $(".zoomOutButton").css("z-index", 2147483647);
        $("#startButton").css("z-index", 2147483647);
        $("#pointerInfoIconContainer").css("z-index", 2147483647);
        $("#frameContainer").css("z-index", 2147483647);
        //$("#hoversContainer").css("z-index", 2147483647);
    }

    $( window ).resize(function() {
        onResize();
        EventBus.dispatchEvent("ON_RESIZE", actualDimensions);
    });
});


