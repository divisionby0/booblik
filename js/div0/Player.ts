///<reference path="TimeRange.ts"/>
///<reference path="../lib/video/tsDefinelyType/videojs/videojs.d.ts"/>
///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="events/EventBus.ts"/>
//declare var videojs:any;
class Player{
    private player:any;
    private callback:Function;
    private range:TimeRange;
    private currentTime:number;
    private state:string;

    private IDLE:string = "idle";
    private LOOPING:string = "looping";
    private ZOOMING_OUT:string = "zoomingOut";
    private ZOOMING_IN:string = "zoomingIn";

    private $j:any;

    constructor(callback:any){
        this.$j = jQuery.noConflict();
        this.callback = callback;
        //this.disableSpinner();
        var player = videojs('player');
        videojs('player').ready(()=>this.onPlayerReady());
    }

    private onPlayerReady():void {
        this.player = videojs('player');
        this.createListeners();
        this.callback.call(this, {handler:"playerCreationComplete"});
        this.createMetadataListener();
    }
    
    public changeSources(sources:any[]):void{
        videojs('player').src(sources);
    }
    
    public play(range:TimeRange = null):void{
        if(range){
            this.state = this.ZOOMING_IN;
            this.enableVideoPreloader();
            this.onStateChanged();
            this.range = range;
            this.player.currentTime(this.range.getStart());
            this.startPlay();
        }
    }
    public finishRange():void{
        if(this.range.getLoop().getFinish()==this.range.getFinish()){
            this.stopPlay();
            this.onRangeComplete();
        }
        else{
            this.state = this.ZOOMING_OUT;
            this.onStateChanged();
            this.player.currentTime(this.range.getLoop().getFinish());
        }
    }
    
    public stopPlaying():void{
        this.stopPlay();
    }
    public goFullScreen():void{
        this.$j('.vjs-fullscreen-control').click();
        //EventBus.dispatchEvent("ON_ENTER_FULLSCREEN",null);
        //this.$j("#player").css("z-index:20 !important;")
        //console.log("");
    }
    
    private createListeners():void {
        this.player.on("timeupdate", ()=>this.onTimeUpdate());
    }

    private onTimeUpdate():void {
        this.currentTime = this.player.currentTime();

        if(this.state == this.ZOOMING_IN){
            if(this.currentTime > this.range.getLoop().getStart()){
                this.state = this.LOOPING;
                this.onStateChanged();
            }
        }
        else if(this.state == this.LOOPING){
            if(this.currentTime > this.range.getLoop().getFinish()){
                this.onLoopComplete();
            }
        }
        else if(this.state == this.ZOOMING_OUT){
            if(this.currentTime > this.range.getFinish()){
                this.onRangeComplete();
            }
        }
    }

    private startPlay():void{
        this.player.play();
    }
    private stopPlay():void{
        this.player.pause();
    }

    private onStateChanged():void{
        this.callback.call(this, {handler:"playerStateChanged", state:this.state});
        if(this.state == this.LOOPING){
            this.disableVideoPreloader();
        }
        else{
            this.enableVideoPreloader();
        }
    }
    
    private onRangeComplete():void {
        this.state = this.IDLE;
        this.stopPlay();
        this.callback.call(this, {handler:"rangeComplete"});
    }

    private onLoopComplete():void {
        //console.log("on loop complete");
        //console.log("starting loop from "+this.range.getLoop().getStart());
        this.player.currentTime(this.range.getLoop().getStart());
        this.state = this.LOOPING;
        this.onStateChanged();
    }

    private createMetadataListener():void {
        // TODO переместить сюда код из resp.js касаемый vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );
    }

    private disableVideoPreloader():void {
        this.$j(".vjs-loading-spinner").css("display","none");
    }
    private enableVideoPreloader():void {
        this.$j(".vjs-loading-spinner").css("display","block");
        setTimeout(()=>this.disableVideoPreloader(), 300);
    }
}
