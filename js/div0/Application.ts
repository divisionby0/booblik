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
        EventBus.addEventListener("ZOOM_IN_BUTTON_MOUSE_OVER", (sceneId)=>this.onZoomInButtonMouseOver(sceneId));
        EventBus.addEventListener("ZOOM_IN_BUTTON_MOUSE_OUT", ()=>this.onZoomInButtonMouseOut());
        EventBus.addEventListener("CHANGE_PLAYER_SOURCES", (sources)=>this.changePlayerSourcesHandler(sources));
        EventBus.addEventListener("ON_RESIZE", (dimensions)=>this.onResize(dimensions));
    }

    private createPlayer():void{
        this.videoPlayer = new Player(this.playerCallback);
    }
    
    private createScenes():void {
        this.scenes = new Map<Scene>('scenes');
        this.scenes.add("intro", new IntroScene("intro", 0, 0, 6.03, 6.03));
        this.scenes.add("zone_1_hover", new Scene("zone_1_hover", 6.53, 6.53, 12.23, 12.23));
        this.scenes.add("zone_2_hover", new Scene("zone_2_hover", 13.23, 13.23, 18.23, 18.23));
        this.scenes.add("zone_3_hover", new Scene("zone_3_hover", 19.43, 19.43, 25.23, 25.23));
        this.scenes.add("zone_4_hover", new Scene("zone_4_hover", 26.43, 26.43, 31.43, 31.43));
        this.scenes.add("zone_5_hover", new Scene("zone_5_hover", 32.43, 32.43, 38.23, 38.23));
        this.scenes.add("zone_6_hover", new Scene("zone_6_hover", 39.03, 39.03, 44.23, 44.23));
        this.scenes.add("zone_7_hover", new Scene("zone_7_hover", 45.03, 45.03, 50.43, 50.43));
        this.scenes.add("zone_8_hover", new Scene("zone_8_hover", 51.43, 51.43, 55.43, 55.43));
        this.scenes.add("zone_9_hover", new Scene("zone_9_hover", 56.33, 56.33, 61.43, 61.43));
        this.scenes.add("zone_10_hover", new Scene("zone_10_hover", 62.53, 62.53, 68.23, 68.23));
        this.scenes.add("zone_11_hover", new Scene("zone_11_hover", 69.03, 69.03, 74.43, 74.43));
        
        this.scenes.add("1", new Scene("1", 75.43, 76.8, 82.26, 83.4));
        this.scenes.add("2", new Scene("2", 83.7, 85.3, 90.8, 91.6));
        this.scenes.add("3", new Scene("3", 92.1, 93.4, 99.12, 100.12));
        this.scenes.add("4", new Scene("4", 100.22, 101.42, 107.02, 108.3));
        this.scenes.add("5", new Scene("5", 109, 109.9, 115.8, 116.74));
        this.scenes.add("6", new Scene("6", 117, 118.1, 124, 125));
        this.scenes.add("7", new Scene("7", 125.4, 126.6, 132.4, 133.4));
        this.scenes.add("8", new Scene("8", 133.7, 134.9, 140.8, 141.6));
        this.scenes.add("9", new Scene("9", 142.3, 143.2, 149, 150.3));
        this.scenes.add("10", new Scene("10", 150.5, 151.5, 157.2, 158.4));

        this.scenes.add("11", new Scene("11", 158.8, 159.8, 165.8, 166.8));
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
