///<reference path="Player.ts"/>
class PlayerIOS{

    protected player:any;
    protected callback:Function;
    private range:TimeRange;
    private $j:any;

    private currentTime:number;
    private state:string;

    private IDLE:string = "idle";
    private LOOPING:string = "looping";
    private ZOOMING_OUT:string = "zoomingOut";
    private ZOOMING_IN:string = "zoomingIn";



    constructor(callback:any, playerObject:any){
        this.$j = jQuery.noConflict();
        this.callback = callback;
        
        //this.disableSpinner();
        this.createPlayer(playerObject);
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
                //this.onRangeComplete();
            }
        }
    }

    public play(range:TimeRange = null):void{

        if(range){
            this.state = this.ZOOMING_IN;
            //this.enableVideoPreloader();
            this.onStateChanged();
            this.range = range;
            this.player.currentTime(this.range.getStart());
            this.startPlay();
        }
        else{
            this.player.play();
        }
    }

    public goFullScreen():void{
        this.$j('.vjs-fullscreen-control').click();
        this.log("PlayerIOS go fullscreen");
    }

    private onLoopComplete():void {
        this.player.currentTime(this.range.getLoop().getStart());
        this.state = this.LOOPING;
        this.onStateChanged();
    }

    /*
    private disableVideoPreloader():void {
        //this.$j(".vjs-loading-spinner").css("display","none");
    }
    private enableVideoPreloader():void {
        //this.$j(".vjs-loading-spinner").css("display","block");
        //setTimeout(()=>this.disableVideoPreloader(), 300);
    }
    */

    private startPlay():void{
        this.player.play();
    }
    private stopPlay():void{
        this.player.pause();
    }

    private onStateChanged():void{
        this.callback.call(this, {handler:"playerStateChanged", state:this.state});
        if(this.state == this.LOOPING){
            //this.disableVideoPreloader();
        }
        else{
           // this.enableVideoPreloader();
        }
    }


    protected createPlayer(playerObject:any):void{
        this.player = playerObject;
        this.player.ready(()=>this.onPlayerReady());
        this.player.on("loadedmetadata",()=>this.onMetadataLoaded());
    }

    protected onPlayerReady():void {
        //this.player = videojs('player');
        this.createListeners();
        this.callback.call(this, {handler:"playerCreationComplete"});
        this.createMetadataListener();
    }

    protected createMetadataListener():void {
        // TODO переместить сюда код из resp.js касаемый vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );
    }

    protected onMetadataLoaded():void{
        EventBus.dispatchEvent("ON_PLAYER_METADATA_LOADED",null);
    }

    protected createListeners():void {
        this.player.on("timeupdate", ()=>this.onTimeUpdate());
    }

    protected log(message:string):void{
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    }
}
