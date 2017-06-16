///<reference path="TimeRange.ts"/>
///<reference path="../lib/video/tsDefinelyType/videojs/videojs.d.ts"/>
///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="events/EventBus.ts"/>
//declare var videojs:any;
var Player = (function () {
    function Player(callback) {
        var _this = this;
        this.IDLE = "idle";
        this.LOOPING = "looping";
        this.ZOOMING_OUT = "zoomingOut";
        this.ZOOMING_IN = "zoomingIn";
        this.$j = jQuery.noConflict();
        this.callback = callback;
        //this.disableSpinner();
        var player = videojs('player');
        videojs('player').ready(function () { return _this.onPlayerReady(); });
    }
    Player.prototype.onPlayerReady = function () {
        this.player = videojs('player');
        this.createListeners();
        this.callback.call(this, { handler: "playerCreationComplete" });
        this.createMetadataListener();
    };
    Player.prototype.changeSources = function (sources) {
        videojs('player').src(sources);
    };
    Player.prototype.play = function (range) {
        if (range === void 0) { range = null; }
        if (range) {
            this.state = this.ZOOMING_IN;
            this.enableVideoPreloader();
            this.onStateChanged();
            this.range = range;
            this.player.currentTime(this.range.getStart());
            this.startPlay();
        }
    };
    Player.prototype.finishRange = function () {
        if (this.range.getLoop().getFinish() == this.range.getFinish()) {
            this.stopPlay();
            this.onRangeComplete();
        }
        else {
            this.state = this.ZOOMING_OUT;
            this.onStateChanged();
            this.player.currentTime(this.range.getLoop().getFinish());
        }
    };
    Player.prototype.stopPlaying = function () {
        this.stopPlay();
    };
    Player.prototype.goFullScreen = function () {
        this.$j('.vjs-fullscreen-control').click();
        //EventBus.dispatchEvent("ON_ENTER_FULLSCREEN",null);
        //this.$j("#player").css("z-index:20 !important;")
        //console.log("");
    };
    Player.prototype.createListeners = function () {
        var _this = this;
        this.player.on("timeupdate", function () { return _this.onTimeUpdate(); });
    };
    Player.prototype.onTimeUpdate = function () {
        this.currentTime = this.player.currentTime();
        if (this.state == this.ZOOMING_IN) {
            if (this.currentTime > this.range.getLoop().getStart()) {
                this.state = this.LOOPING;
                this.onStateChanged();
            }
        }
        else if (this.state == this.LOOPING) {
            if (this.currentTime > this.range.getLoop().getFinish()) {
                this.onLoopComplete();
            }
        }
        else if (this.state == this.ZOOMING_OUT) {
            if (this.currentTime > this.range.getFinish()) {
                this.onRangeComplete();
            }
        }
    };
    Player.prototype.startPlay = function () {
        this.player.play();
    };
    Player.prototype.stopPlay = function () {
        this.player.pause();
    };
    Player.prototype.onStateChanged = function () {
        this.callback.call(this, { handler: "playerStateChanged", state: this.state });
        if (this.state == this.LOOPING) {
            this.disableVideoPreloader();
        }
        else {
            this.enableVideoPreloader();
        }
    };
    Player.prototype.onRangeComplete = function () {
        this.state = this.IDLE;
        this.stopPlay();
        this.callback.call(this, { handler: "rangeComplete" });
    };
    Player.prototype.onLoopComplete = function () {
        //console.log("on loop complete");
        //console.log("starting loop from "+this.range.getLoop().getStart());
        this.player.currentTime(this.range.getLoop().getStart());
        this.state = this.LOOPING;
        this.onStateChanged();
    };
    Player.prototype.createMetadataListener = function () {
        // TODO переместить сюда код из resp.js касаемый vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );
    };
    Player.prototype.disableVideoPreloader = function () {
        this.$j(".vjs-loading-spinner").css("display", "none");
    };
    Player.prototype.enableVideoPreloader = function () {
        var _this = this;
        this.$j(".vjs-loading-spinner").css("display", "block");
        setTimeout(function () { return _this.disableVideoPreloader(); }, 300);
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map