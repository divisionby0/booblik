var $ = jQuery.noConflict();
$( document ).ready(function()
{

    videojs("player").ready(function(){
        //alert("player ready");

        $("#startButton").click(function(){
            alert("play clicked");
            var myPlayer = videojs('player');
            myPlayer.play();

            $("#startButton").hide();

        });
    });
});

