var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    console.log("ready");
    var actualDimensions;

    var vid = document.getElementById("player");
    vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );

    $("#startButton").click(function(){
        console.log("clicked start button");
        var myPlayer = videojs('player');
        //$('.vjs-fullscreen-control').click();

        myPlayer.play();
        $("#startButton").hide();
    });
    
    function onMetadataLoaded(){
        console.log("on Metadata Loaded");
        onResize();
        $("#startButton").show();
    }

    function onResize(){
        var offsetHeight = vid.offsetHeight;
        actualDimensions = VideoDimensions.getDimensions(vid);
        var documentWidth = $( document ).width();
        var leftOffset = (documentWidth - actualDimensions.width)/2;
        var topOffset = (offsetHeight - actualDimensions.height)/2;
        actualDimensions.top = topOffset;
        actualDimensions.left = leftOffset;
        $("#startButton").css({top: topOffset, left: leftOffset, width: actualDimensions.width - 3, height: actualDimensions.height - 3});
    }
});
