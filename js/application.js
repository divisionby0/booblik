var zone1ZoomInLoopTime = 1.2;
var zone1LoopFinish = 6.83;

var player = videojs('player');

player.on("ended", function () {
    console.log("complete");
    player.play();
});

player.on("timeupdate", function () {
    var currentTime = player.currentTime();
    if(currentTime > zone1LoopFinish && currentTime < zone1LoopFinish + 1){
        player.currentTime(zone1ZoomInLoopTime);
        console.log("start loop");
    }
    //console.log("time "+player.currentTime());
});
