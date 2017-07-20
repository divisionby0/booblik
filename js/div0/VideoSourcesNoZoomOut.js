var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="VideoSources.ts"/>
var VideoSourcesNoZoomOut = (function (_super) {
    __extends(VideoSourcesNoZoomOut, _super);
    function VideoSourcesNoZoomOut() {
        _super.apply(this, arguments);
    }
    VideoSourcesNoZoomOut.prototype.create = function () {
        console.log("create video sources no zoom Out");
        this.collection.add("HQ", [
            { type: "video/mp4", src: "assets/video/noZoomOut/HD_noZoomOut.mp4" },
            { type: "video/webm", src: "assets/video/noZoomOut/HD_noZoomOut.webm" },
            { type: "video/ogg", src: "assets/video/noZoomOut/HD_noZoomOut.ogv" }
        ]);
        this.collection.add("MQ", [
            { type: "video/mp4", src: "assets/video/noZoomOut/MED_noZoomOut.mp4" },
            { type: "video/webm", src: "assets/video/noZoomOut/MED_noZoomOut.webm" },
            { type: "video/ogg", src: "assets/video/noZoomOut/MED_noZoomOut.ogv" }
        ]);
        this.collection.add("LQ", [
            { type: "video/mp4", src: "assets/video/noZoomOut/LOW_noZoomOut.mp4" },
            { type: "video/webm", src: "assets/video/noZoomOut/LOW_noZoomOut.webm" },
            { type: "video/ogg", src: "assets/video/noZoomOut/LOW_noZoomOut.ogv" }
        ]);
    };
    return VideoSourcesNoZoomOut;
}(VideoSources));
//# sourceMappingURL=VideoSourcesNoZoomOut.js.map