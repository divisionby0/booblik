///<reference path="collections/Map.ts"/>
///<reference path="events/EventBus.ts"/>
var VideoSources = (function () {
    function VideoSources() {
        this.HIGH_QUALITY = "HQ";
        this.MED_QUALITY = "MQ";
        this.LOW_QUALITY = "LQ";
        this.currentQuality = this.HIGH_QUALITY;
        this.collection = new Map("sources");
        this.collection.add("HQ", [
            { type: "video/mp4", src: "assets/HD_overlayed.mp4" },
            { type: "video/webm", src: "assets/HD_overlayed.webm" },
            { type: "video/ogg", src: "assets/HD_overlayed.ogv" }
        ]);
        this.collection.add("MQ", [
            { type: "video/mp4", src: "assets/MED_overlayed.mp4" },
            { type: "video/webm", src: "assets/MED_overlayed.webm" },
            { type: "video/ogg", src: "assets/MED_overlayed.ogv" }
        ]);
        this.collection.add("LQ", [
            { type: "video/mp4", src: "assets/LOW_overlayed.mp4" },
            { type: "video/webm", src: "assets/LOW_overlayed.webm" },
            { type: "video/ogg", src: "assets/LOW_overlayed.ogv" }
        ]);
    }
    /*
    public getSources(key:string):any[]{
        return this.collection.get(key);
    }
    */
    VideoSources.prototype.updateSources = function (dimentions) {
        if (dimentions.width > 960) {
            this.onHighQualityDimensions();
        }
        else if (dimentions.width > 480 && dimentions.width < 960) {
            this.onMedQualityDimensions();
        }
        else {
            this.onLowQualityDimensions();
        }
    };
    VideoSources.prototype.onHighQualityDimensions = function () {
        if (this.currentQuality != this.HIGH_QUALITY) {
            this.currentQuality = this.HIGH_QUALITY;
            this.changePlayerSources();
        }
    };
    VideoSources.prototype.onMedQualityDimensions = function () {
        if (this.currentQuality != this.MED_QUALITY) {
            this.currentQuality = this.MED_QUALITY;
            this.changePlayerSources();
        }
    };
    VideoSources.prototype.onLowQualityDimensions = function () {
        if (this.currentQuality != this.LOW_QUALITY) {
            this.currentQuality = this.LOW_QUALITY;
            this.changePlayerSources();
        }
    };
    VideoSources.prototype.changePlayerSources = function () {
        this.sources = this.collection.get(this.currentQuality);
        // dispatch event
        EventBus.dispatchEvent("CHANGE_PLAYER_SOURCES", this.sources);
    };
    return VideoSources;
}());
//# sourceMappingURL=VideoSources.js.map