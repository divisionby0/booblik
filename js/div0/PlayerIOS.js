///<reference path="Player.ts"/>
var PlayerIOS = (function () {
    function PlayerIOS(callback, playerObject) {
        this.IDLE = "idle";
        this.LOOPING = "looping";
        this.ZOOMING_OUT = "zoomingOut";
        this.ZOOMING_IN = "zoomingIn";
        this.$j = jQuery.noConflict();
        this.callback = callback;
        //this.disableSpinner();
        this.createPlayer(playerObject);
    }
    PlayerIOS.prototype.onTimeUpdate = function () {
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
            }
        }
    };
    PlayerIOS.prototype.play = function (range) {
        if (range === void 0) { range = null; }
        if (range) {
            this.state = this.ZOOMING_IN;
            //this.enableVideoPreloader();
            this.onStateChanged();
            this.range = range;
            this.player.currentTime(this.range.getStart());
            this.startPlay();
        }
        else {
            this.player.play();
        }
    };
    PlayerIOS.prototype.goFullScreen = function () {
        this.$j('.vjs-fullscreen-control').click();
        this.log("PlayerIOS go fullscreen");
    };
    PlayerIOS.prototype.onLoopComplete = function () {
        this.player.currentTime(this.range.getLoop().getStart());
        this.state = this.LOOPING;
        this.onStateChanged();
    };
    /*
    private disableVideoPreloader():void {
        //this.$j(".vjs-loading-spinner").css("display","none");
    }
    private enableVideoPreloader():void {
        //this.$j(".vjs-loading-spinner").css("display","block");
        //setTimeout(()=>this.disableVideoPreloader(), 300);
    }
    */
    PlayerIOS.prototype.startPlay = function () {
        this.player.play();
    };
    PlayerIOS.prototype.stopPlay = function () {
        this.player.pause();
    };
    PlayerIOS.prototype.onStateChanged = function () {
        this.callback.call(this, { handler: "playerStateChanged", state: this.state });
        if (this.state == this.LOOPING) {
        }
        else {
        }
    };
    PlayerIOS.prototype.createPlayer = function (playerObject) {
        var _this = this;
        this.player = playerObject;
        this.player.ready(function () { return _this.onPlayerReady(); });
        this.player.on("loadedmetadata", function () { return _this.onMetadataLoaded(); });
    };
    PlayerIOS.prototype.onPlayerReady = function () {
        //this.player = videojs('player');
        this.createListeners();
        this.callback.call(this, { handler: "playerCreationComplete" });
        this.createMetadataListener();
    };
    PlayerIOS.prototype.createMetadataListener = function () {
        // TODO переместить сюда код из resp.js касаемый vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );
    };
    PlayerIOS.prototype.onMetadataLoaded = function () {
        EventBus.dispatchEvent("ON_PLAYER_METADATA_LOADED", null);
    };
    PlayerIOS.prototype.createListeners = function () {
        var _this = this;
        this.player.on("timeupdate", function () { return _this.onTimeUpdate(); });
    };
    PlayerIOS.prototype.log = function (message) {
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    };
    return PlayerIOS;
}());
//# sourceMappingURL=PlayerIOS.js.map