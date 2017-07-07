var $ = jQuery.noConflict();
$( document ).ready(function($)
{
    var docWidth;
    var docHeight;

    var videoContainerWidth;
    var videoContainerHeight;
    var vid = document.getElementById("player");
    var videoAspectRatio = 1.777;

    var widthBigger = false;

    vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );

    vid.addEventListener('click',function(){
        videojs("player").play();
        goFullscreen();
    },false);


    function onMetadataLoaded(){
        onResize();
    }

    function onResize(){
        docWidth = $( document ).width();
        docHeight = $( document ).height();

        if(docWidth>docHeight){
            widthBigger = true;
            videoContainerHeight = docHeight;
            videoContainerWidth = parseInt(videoContainerHeight*videoAspectRatio);
        }
        else{
            videoContainerWidth = docWidth;
            videoContainerHeight = videoContainerWidth*videoAspectRatio;
        }
        resizeVideoContainer();
    }

    function resizeVideoContainer(){
        var isMobile = MobileDetector.detect();
        $(".wrapper").width(videoContainerWidth);
        $(".wrapper").height(videoContainerHeight);
        var actualDimensions = VideoDimensions.getDimensions(vid);

        $(".zonesWrapper").width(videoContainerWidth);
        $(".zonesWrapper").height(videoContainerHeight);

        $("#allZonesContainer").show();

        var offsetHeight = vid.offsetHeight;
        var offsetWidth = vid.offsetWidth;

        if(isMobile){
            $("#logContainer").text("IS mobile");
            var playerAbsolutePosition = {x:(docWidth-actualDimensions.width)/2, y:(docHeight - actualDimensions.height)/2};
            $("#allZonesContainer").css({ top: playerAbsolutePosition.y+'px', left: playerAbsolutePosition.x+'px'});
        }
        else{
            $("#logContainer").text("not mobile");
        }
    }

    function goFullscreen(){
        toggleFullScreen(document.getElementById("appContainer"));
        $("#logContainer").css("z-index", 2147483647);
        $(".zonesWrapper").css("z-index", 2147483647);
    }


    function toggleFullScreen(elem) {
        // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (elem.requestFullScreen) {
                elem.requestFullScreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }


    $( window ).resize(function() {
        onResize();
    });
});
