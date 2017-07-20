///<reference path="collections/Map.ts"/>
///<reference path="events/EventBus.ts"/>
var VideoSources = (function () {
    function VideoSources() {
        this.HIGH_QUALITY = "HQ";
        this.MED_QUALITY = "MQ";
        this.LOW_QUALITY = "LQ";
        this.currentQuality = this.HIGH_QUALITY;
        this.collection = new Map("sources");
        this.create();
    }
    VideoSources.prototype.create = function () {
        this.collection.add("HQ", [
            { type: "video/mp4", src: "assets/video/HD.mp4" },
            { type: "video/webm", src: "assets/video/HD.webm" },
            { type: "video/ogg", src: "assets/video/HD.ogv" }
        ]);
        this.collection.add("MQ", [
            { type: "video/mp4", src: "assets/video/MED.mp4" },
            { type: "video/webm", src: "assets/video/MED.webm" },
            { type: "video/ogg", src: "assets/video/MED.ogv" }
        ]);
        this.collection.add("LQ", [
            { type: "video/mp4", src: "assets/video/LOW.mp4" },
            { type: "video/webm", src: "assets/video/LOW.webm" },
            { type: "video/ogg", src: "assets/video/LOW.ogv" }
        ]);
    };
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