///<reference path="Player.ts"/>
var PlayerIOS = (function () {
    function PlayerIOS(callback, playerObject) {
        this.IDLE = "idle";
        this.LOOPING = "looping";
        this.ZOOMING_OUT = "zoomingOut";
        this.ZOOMING_IN = "zoomingIn";
        this.log("IM IOSPlayer");
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
            }
        }
        else if (this.state == this.LOOPING) {
            if (this.currentTime > this.range.getLoop().getFinish()) {
            }
        }
        else if (this.state == this.ZOOMING_OUT) {
            if (this.currentTime > this.range.getFinish()) {
            }
        }
    };
    PlayerIOS.prototype.createPlayer = function (playerObject) {
        var _this = this;
        this.log("Creating iOS player...");
        this.player = playerObject;
        this.player.ready(function () { return _this.onPlayerReady(); });
        this.player.on("loadedmetadata", function () { return _this.onMetadataLoaded(); });
    };
    PlayerIOS.prototype.onPlayerReady = function () {
        this.log("-- iOS Player ready");
        //this.player = videojs('player');
        this.createListeners();
        this.callback.call(this, { handler: "playerCreationComplete" });
        this.createMetadataListener();
    };
    PlayerIOS.prototype.createMetadataListener = function () {
        // TODO переместить сюда код из resp.js касаемый vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );
    };
    PlayerIOS.prototype.onMetadataLoaded = function () {
        this.log("ON PLAYER METADATA LOADED");
        EventBus.dispatchEvent("ON_PLAYER_METADATA_LOADED", null);
    };
    PlayerIOS.prototype.createListeners = function () {
        var _this = this;
        this.player.on("timeupdate", function () { return _this.onTimeUpdate(); });
    };
    PlayerIOS.prototype.log = function (message) {
        //console.log(message);
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    };
    return PlayerIOS;
}());
//# sourceMappingURL=PlayerIOS.js.map