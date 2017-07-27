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
        this.log("IM IOSPlayer");
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
                //this.onStateChanged();
            }
        }
        else if(this.state == this.LOOPING){
            if(this.currentTime > this.range.getLoop().getFinish()){
                //this.onLoopComplete();
            }
        }
        else if(this.state == this.ZOOMING_OUT){
            if(this.currentTime > this.range.getFinish()){
                //this.onRangeComplete();
            }
        }
    }


    protected createPlayer(playerObject:any):void{
        this.log("Creating iOS player...");
        this.player = playerObject;
        this.player.ready(()=>this.onPlayerReady());
        this.player.on("loadedmetadata",()=>this.onMetadataLoaded());
    }

    protected onPlayerReady():void {
        this.log("-- iOS Player ready");
        //this.player = videojs('player');
        this.createListeners();
        this.callback.call(this, {handler:"playerCreationComplete"});
        this.createMetadataListener();
    }

    protected createMetadataListener():void {
        // TODO переместить сюда код из resp.js касаемый vid.addEventListener( "loadedmetadata", onMetadataLoaded, false );
    }

    protected onMetadataLoaded():void{
        this.log("ON PLAYER METADATA LOADED");
        EventBus.dispatchEvent("ON_PLAYER_METADATA_LOADED",null);
    }

    protected createListeners():void {
        this.player.on("timeupdate", ()=>this.onTimeUpdate());
    }

    protected log(message:string):void{
        //console.log(message);
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    }
}
