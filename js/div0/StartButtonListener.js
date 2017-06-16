var StartButtonListener = (function(){
    return{
        init:function(){

            var $ = jQuery.noConflict();

            $("#startButton").click(function(){
                var myPlayer = videojs('player');
                myPlayer.play();
                $("#startButton").hide();
            });
        }
    }
})();
