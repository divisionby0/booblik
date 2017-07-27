///<reference path="Application.ts"/>
class ApplicationIOS extends Application{
    protected create():void{
        this.$j = jQuery.noConflict();
        this.log("Im ApplicationIOS");

        /*
        this.createVideoSources();
        this.sceneBackButton = new SceneBackButton();
        this.zoomInButtonListenerJS = new ZoomInButtonListenerJS();

        this.createScenes();
        this.currentScene = this.scenes.get("intro");

        this.createPlayer();

        this.createControlsListener();
        this.zoomInButtonListenerJS.init();
        this.zoomInButtonListenerJS.create();

        this.currentScene = this.scenes.get("intro");

        new PathHoverListener();
        new ZoomOutButtonClickListener();

        this.createListeners();
        */
    }

    private log(message){
        console.log(message);
        this.$j("#logTextArea").append(message+"\n");
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    }
}
