///<reference path="Player.ts"/>
///<reference path="Scene.ts"/>
///<reference path="collections/Map.ts"/>
///<reference path="IntroScene.ts"/>
///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="PathHoverListener.ts"/>
///<reference path="ZoomOutButtonClickListener.ts"/>
///<reference path="ShowZoomOutButton.ts"/>
///<reference path="SceneTextCollection.ts"/>
///<reference path="SceneLeavesCollection.ts"/>
///<reference path="VideoSources.ts"/>
///<reference path="CommonScenePointerInfo.ts"/>
///<reference path="SceneBackButton.ts"/>
declare var StartButtonListener:any;
declare var ZoomInButtonListenerJS:any;
class Application{
    private scenes:Map<Scene>;
    private commonScenePointerInfo:CommonScenePointerInfo;
    private sceneBackButton:SceneBackButton;
    private videoPlayer:Player;
    private videoSources:VideoSources;
    private currentScene:Scene;
    private zoomInButtonListenerJS:any;

    private scene1Button:any;

    private $j:any;

    private LOOPING:string = "looping";
    private ZOOMING_OUT:string = "zoomingOut";
    private ZOOMING_IN:string = "zoomingIn";

    private currentState:string;

    constructor(){
        this.$j = jQuery.noConflict();
        console.log("jQuery = ",this.$j);

        this.videoSources = new VideoSources();
        this.commonScenePointerInfo = new CommonScenePointerInfo();
        this.sceneBackButton = new SceneBackButton();
        this.zoomInButtonListenerJS = new ZoomInButtonListenerJS();

        this.createScenes();
        this.createPlayer();
        this.createScenes();

        this.createControlsListener();
        this.zoomInButtonListenerJS.init();
        this.zoomInButtonListenerJS.create();

        this.currentScene = this.scenes.get("intro");
        
        new PathHoverListener();
        new ZoomOutButtonClickListener();
        
        EventBus.addEventListener("ZOOM_OUT_CLICKED", ()=>this.onZoomOutClicked());
        EventBus.addEventListener("SCENE_BUTTON_CLICKED", (scene)=>this.onSceneButtonClicked(scene));
        //EventBus.addEventListener("ZOOM_IN_BUTTON_MOUSE_OVER", (sceneId)=>this.onZoomInButtonMouseOver(sceneId));
        //EventBus.addEventListener("ZOOM_IN_BUTTON_MOUSE_OUT", ()=>this.onZoomInButtonMouseOut());
        EventBus.addEventListener("CHANGE_PLAYER_SOURCES", (sources)=>this.changePlayerSourcesHandler(sources));
        EventBus.addEventListener("ON_RESIZE", (dimensions)=>this.onResize(dimensions));
    }

    private createPlayer():void{
        this.videoPlayer = new Player(this.playerCallback);
    }
    
    private createScenes():void {

        this.scenes = new Map<Scene>('scenes');
        this.scenes.add("intro", new IntroScene("intro", 0, 0, 6.03, 6.03));
        this.scenes.add("1", new Scene("1", 6.14, 7.8, 13.26, 14.50));
        this.scenes.add("2", new Scene("2", 15.16, 16.26, 21.49, 22.56));
        this.scenes.add("3", new Scene("3", 23.49, 24.69, 30.22, 31.32));
        this.scenes.add("4", new Scene("4", 31.59, 33.00, 38.60, 39.70));
        this.scenes.add("5", new Scene("5", 40.19, 41.00, 47.00, 47.80));
        this.scenes.add("6", new Scene("6", 48.4, 49.40, 55.10, 56.30));
        this.scenes.add("7", new Scene("7", 56.7, 57.90, 63.60, 64.60));
        this.scenes.add("8", new Scene("8", 65.1, 66.0, 72.1, 73.0));
        this.scenes.add("9", new Scene("9", 73.4, 74.3, 80.4, 81.4));
        this.scenes.add("10", new Scene("10", 81.7, 82.8, 88.6, 89.8));
        this.scenes.add("11", new Scene("11", 90.2, 91.3, 97.0, 98.2));
    }

    private playerCallback = (data:any) => { // <-- note syntax here
        //console.log("player callback called data=",data);
        var handler:string = data.handler;

        switch(handler){
            case 'rangeComplete':
                //console.log("Range complete");
                this.onRangeComplete();
                break;
            case 'playerCreationComplete':
                this.currentState = this.LOOPING;
                this.startIntro();
                StartButtonListener.init();
                break;
            case 'playerStateChanged':
                this.onPlayerStateChanged(data.state);
                break;
        }
    };

    private startScene():void{
        var range:TimeRange = this.scenes.get(this.currentScene.getId()).getRange();
        this.currentState = this.ZOOMING_IN;
        this.videoPlayer.play(range);
    }

    private startIntro():void{
        var range:TimeRange = this.scenes.get(this.currentScene.getId()).getRange();
        this.videoPlayer.play(range);
    }

    private onRangeComplete():void{
        this.videoPlayer.play(this.currentScene.getRange());
        this.showScenesControls();
        this.zoomInButtonListenerJS.create();
    }

    private changePlayerSourcesHandler(sources:any[]){
        this.videoPlayer.changeSources(sources);
        this.showScenesControls();
        this.showPointerInfoContainer();
        this.hideBackButton();
        this.currentScene = this.scenes.get('intro');
        this.startScene();
    }
    
    private onResize(dimensions:any):void{
        this.videoSources.updateSources(dimensions);
    }

    private onSceneButtonClicked(scene:string):void{
        var sceneId:string = scene;
        this.onSceneSelect(sceneId);
        this.hideScenesControls();
        this.hidePointerInfoContainer();
    }

    private controlButtonClicked(event:any):void{
        var sceneId:string = this.$j(event.target).data("scene");
        this.onSceneSelect(sceneId);
        this.hideScenesControls();
        this.hidePointerInfoContainer();
    }

    private startButtonClickHandler(event:any):void{
        var myPlayer = videojs('player');
        myPlayer.play();
        
        this.videoPlayer.goFullScreen();
        this.$j("#startButton").hide();
        this.$j(".overlay_back_button").css("z-index", 2147483647);
    }

    private onSceneSelect(sceneId:string):void{
        this.currentState = this.ZOOMING_OUT;
        
        this.currentScene = this.scenes.get(sceneId);
        this.videoPlayer.finishRange();
        this.zoomInButtonListenerJS.remove();
        // finish prev scene
    }

    private onBackButtonClicked():void {
        this.hideBackButton();
        this.currentScene = this.scenes.get('intro');
        this.videoPlayer.finishRange();
    }

    private onPrevSceneZoomOutComplete():void {
        this.startScene();
    }

    private createControlsListener():void {
        this.$j(".overlayButton").click((event)=>this.controlButtonClicked(event));
        this.$j(".SVGHoverablePath").click(()=>this.onBackButtonClicked());
        this.$j("#backButton").click(()=>this.onBackButtonClicked());
        this.$j("#startButton").click((event)=>this.startButtonClickHandler(event));
        this.$j("#stopButton").click((event)=>this.stopButtonClickHandler(event));
    }

    private onPlayerStateChanged(state:string):void {
        this.$j("#playerStateElement").text(state);
        this.currentState = state;

        if(this.currentState == this.LOOPING){
            this.onLoopStarted();
        }
    }
    private showScenesControls():void {
        this.$j(".overlayButton").show();
        this.$j("#allZonesContainer").show();
    }
    private hideScenesControls():void {
        this.$j(".overlayButton").hide();
        this.$j("#allZonesContainer").hide();
    }

    private showPointerInfoContainer():void {
        this.$j("#pointerInfoIconContainer").show();
    }
    private hidePointerInfoContainer():void {
        this.$j("#pointerInfoIconContainer").hide();
    }

    private showBackButton():void {
        this.$j("#backButton").show();
    }
    private hideBackButton():void {
        this.$j("#backButton").hide();
        this.$j(".zoomOutButton").hide();
    }

    private onZoomOutClicked():void {
        console.log("zoom out clicked");
    }

    private onLoopStarted():void {
        var currentSceneId:string = this.currentScene.getId();

        if(currentSceneId!="intro"){
            new ShowZoomOutButton(this.currentScene.getId());
            this.showBackButton();
        }
        else{
            this.showPointerInfoContainer();
        }
    }

    private stopButtonClickHandler(event:any):void {
        this.videoPlayer.stopPlaying();
    }

    private onZoomInButtonMouseOver(sceneId:string):void {
        console.log("zoom in button mouse over scene id: "+sceneId);
        var scene:Scene = this.scenes.get("zone_"+sceneId+"_hover");
        if(scene){
            var timeRange:TimeRange = scene.getRange();
            this.videoPlayer.play(timeRange);
        }
        else{
            console.error("scene not ready yet");
        }
    }

    private onZoomInButtonMouseOut():void {
        var scene:Scene = this.scenes.get("intro");
        var timeRange:TimeRange = scene.getRange();
        this.videoPlayer.play(timeRange);
    }
}
