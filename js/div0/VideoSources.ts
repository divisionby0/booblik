///<reference path="collections/Map.ts"/>
///<reference path="events/EventBus.ts"/>
class VideoSources{

    private collection:Map<any[]>;

    private HIGH_QUALITY:string = "HQ";
    private MED_QUALITY:string = "MQ";
    private LOW_QUALITY:string = "LQ";

    private currentQuality = this.HIGH_QUALITY;

    private sources:any[];

    constructor(){
        this.collection = new Map<any[]>("sources");

        this.collection.add("HQ", [
            {type: "video/mp4", src: "assets/video/HD_overlayed.mp4"},
            {type: "video/webm", src: "assets/video/HD_overlayed.webm"},
            {type: "video/ogg", src: "assets/video/HD_overlayed.ogv"}
        ]);


        this.collection.add("MQ", [
            {type: "video/mp4", src: "assets/video/MED_overlayed.mp4"},
            {type: "video/webm", src: "assets/video/MED_overlayed.webm"},
            {type: "video/ogg", src: "assets/video/MED_overlayed.ogv"}
        ]);

        this.collection.add("LQ", [
            {type: "video/mp4", src: "assets/video/LOW_overlayed.mp4"},
            {type: "video/webm", src: "assets/video/LOW_overlayed.webm"},
            {type: "video/ogg", src: "assets/video/LOW_overlayed.ogv"}
        ]);
    }

    /*
    public getSources(key:string):any[]{
        return this.collection.get(key);
    }
    */

    public updateSources(dimentions:any):void{
        if(dimentions.width > 960){
            this.onHighQualityDimensions();
        }
        else if(dimentions.width > 480 && dimentions.width < 960){
            this.onMedQualityDimensions();
        }
        else{
            this.onLowQualityDimensions();
        }
    }

    private onHighQualityDimensions():void{
        if(this.currentQuality!=this.HIGH_QUALITY){
            this.currentQuality = this.HIGH_QUALITY;
            this.changePlayerSources();
        }
    }

    private onMedQualityDimensions():void{
        if(this.currentQuality!=this.MED_QUALITY){
            this.currentQuality = this.MED_QUALITY;
            this.changePlayerSources();
        }
    }

    private onLowQualityDimensions():void{
        if(this.currentQuality!=this.LOW_QUALITY){
            this.currentQuality = this.LOW_QUALITY;
            this.changePlayerSources();
        }
    }

    private changePlayerSources():void{
        this.sources = this.collection.get(this.currentQuality);

        // dispatch event
        EventBus.dispatchEvent("CHANGE_PLAYER_SOURCES", this.sources);
    }
}
