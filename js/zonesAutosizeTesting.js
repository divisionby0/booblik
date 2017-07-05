var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    var vid = document.getElementById("player");

    vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );

    function onMetadataLoaded(){
        var videoWidth = vid.videoWidth;
        var videoHeight = vid.videoHeight;
        var offsetWidth = vid.offsetWidth;
        var offsetHeight = vid.offsetHeight;
        var ratio = 1.77777;

        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var actualWidth = windowHeight * ratio;
        var actualHeight = offsetHeight;
        
        var leftOffset = (windowWidth - actualWidth)/2;
        var topOffset = (windowHeight - actualHeight)/2;
        
        $(".hoverZoneImage").css({top: topOffset, left: leftOffset, width: actualWidth, height: actualHeight});
    }
});