var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    console.log("ready");

    var video = document.getElementById('player');


    video.addEventListener('click',function(){
        console.log("play clicked");
        video.play();
        //console.log("vjs-fullscreen-control="+$('.vjs-fullscreen-control'));
        goFullscreen();
    },false);

    
    function onEnterFullscreen(){
        console.log("on fullscreen - hiding control bar");
    }

    function goFullscreen(){
        videojs("player").play();
        $('.vjs-fullscreen-control').click();
    }
    
    EventBus.addEventListener("ON_ENTER_FULLSCREEN", onEnterFullscreen);
});