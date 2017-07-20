///<reference path="VideoSources.ts"/>
class VideoSourcesNoZoomOut extends VideoSources{
    protected create():void{
        console.log("create video sources no zoom Out");
        this.collection.add("HQ", [
            {type: "video/mp4", src: "assets/video/noZoomOut/HD_noZoomOut.mp4"},
            {type: "video/webm", src: "assets/video/noZoomOut/HD_noZoomOut.webm"},
            {type: "video/ogg", src: "assets/video/noZoomOut/HD_noZoomOut.ogv"}
        ]);


        this.collection.add("MQ", [
            {type: "video/mp4", src: "assets/video/noZoomOut/MED_noZoomOut.mp4"},
            {type: "video/webm", src: "assets/video/noZoomOut/MED_noZoomOut.webm"},
            {type: "video/ogg", src: "assets/video/noZoomOut/MED_noZoomOut.ogv"}
        ]);

        this.collection.add("LQ", [
            {type: "video/mp4", src: "assets/video/noZoomOut/LOW_noZoomOut.mp4"},
            {type: "video/webm", src: "assets/video/noZoomOut/LOW_noZoomOut.webm"},
            {type: "video/ogg", src: "assets/video/noZoomOut/LOW_noZoomOut.ogv"}
        ]);
    }
}
