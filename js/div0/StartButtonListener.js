var StartButtonListener = (function(){
    return{
        init:function(){

            var $ = jQuery.noConflict();

            $("#startButton").click(function(){
                console.log("clicked");
                var myPlayer = videojs('player');
                myPlayer.play();
                $("#startButton").hide();
            });
        }
    }
})();
