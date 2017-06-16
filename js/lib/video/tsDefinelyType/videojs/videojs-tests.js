// Tests for Video.js API
/// <reference path="videojs.d.ts" />
videojs("example_video_1").ready(function () {
    var myPlayer = this;
    // EXAMPLE: Start playing the video.
    myPlayer.play();
    myPlayer.pause();
    var isPaused = myPlayer.paused();
    var isPlaying = !myPlayer.paused();
    myPlayer.src("http://www.example.com/path/to/video.mp4");
    myPlayer.src({ type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" });
    myPlayer.src([
        { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" },
        { type: "video/webm", src: "http://www.example.com/path/to/video.webm" },
        { type: "video/ogg", src: "http://www.example.com/path/to/video.ogv" }
    ]);
    var whereYouAt = myPlayer.currentTime();
    myPlayer.currentTime(120); // 2 minutes into the video
    var howLongIsThis = myPlayer.duration();
    var bufferedTimeRange = myPlayer.buffered();
    // Number of different ranges of time have been buffered. Usually 1.
    var numberOfRanges = bufferedTimeRange.length;
    // Time in seconds when the first range starts. Usually 0.
    var firstRangeStart = bufferedTimeRange.start(0);
    // Time in seconds when the first range ends
    var firstRangeEnd = bufferedTimeRange.end(0);
    // Length in seconds of the first time range
    var firstRangeLength = firstRangeEnd - firstRangeStart;
    var howMuchIsDownloaded = myPlayer.bufferedPercent();
    var howLoudIsIt = myPlayer.volume();
    myPlayer.volume(0.5); // Set volume to half
    var howWideIsIt = myPlayer.width();
    myPlayer.width(640);
    var howTallIsIt = myPlayer.height();
    myPlayer.height(480);
    myPlayer.size(640, 480);
    myPlayer.requestFullScreen();
    myPlayer.cancelFullScreen();
    var myFunc = function () {
        var myPlayer = this;
        // Do something when the event is fired
    };
    //myPlayer.addEvent("volumechange", myFunc);
    //myPlayer.removeEvent("volumechange", myFunc);
});
//# sourceMappingURL=videojs-tests.js.map