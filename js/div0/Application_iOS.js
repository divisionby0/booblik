var Application_iOS = function(){
    var $ = jQuery.noConflict();

    var videoSources;
    var scenes;
    var sceneBackButton;
    var zoomInButtonListenerJS;
    var currentScene;
    var player;
    var playerJS;
    var currentState;

    var LOOPING = "looping";
    var ZOOMING_OUT = "zoomingOut";
    var ZOOMING_IN = "zoomingIn";
    
    function log(message){
        //console.log(message);
        //$("#logTextArea").append(message+"\n");
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    }

    function createVideoSources(){
        videoSources = new VideoSources();
    }

    function createControlsListener(){
        $(".overlayButton").click(function(event){
            controlButtonClicked(event)
        });

        $(".SVGHoverablePath").click(onBackButtonClicked());
        $("#backButton").click(onBackButtonClicked());

        $("#startButton").click(function(event){
            startButtonClickHandler(event)
        });
        $("#stopButton").click(function(){
            stopButtonClickHandler();
        });
    }
    function createListeners(){
        EventBus.addEventListener("ZOOM_OUT_CLICKED", onZoomOutClicked);
        EventBus.addEventListener("SCENE_BUTTON_CLICKED", onSceneButtonClicked);
        EventBus.addEventListener("ON_RESIZE", onResize);
    }
    
    function onZoomOutClicked(){
        log("zoom out clicked");
    }

    function onResize(dimensions){
        videoSources.updateSources(dimensions);
    }

    function changePlayerSourcesHandler(sources){
        log("changePlayerSourcesHandler "+sources);
        /*
        this.videoPlayer.changeSources(sources);
        showScenesControls();
        showPointerInfoContainer();
        this.hideBackButton();
        currentScene = scenes.get('intro');
        this.startScene();
        */
    }

    function onBackButtonClicked(){
        hideBackButton();
        currentScene = scenes.get('intro');
        //videoPlayer.finishRange();
    }

    function onSceneButtonClicked(scene){
        var sceneId = scene;
        this.onSceneSelect(sceneId);
        this.hideScenesControls();
        this.hidePointerInfoContainer();
    }

    function controlButtonClicked(event){
        var sceneId = $(event.target).data("scene");
        this.onSceneSelect(sceneId);
        this.hideScenesControls();
        this.hidePointerInfoContainer();
    }

    function showBackButton() {
        $("#backButton").show();
}
    function hideBackButton(){
        $("#backButton").hide();
        $(".zoomOutButton").hide();
    }

    function startButtonClickHandler(event){
        player.play();
        player.goFullScreen();

        $("#startButton").hide();
        $(".overlay_back_button").css("z-index", 2147483647);
    }
    function stopButtonClickHandler(){
       // videoPlayer.stopPlaying();
    }


    function createScenes() {
        scenes = new Map('scenes');
        scenes.add("intro", new IntroScene("intro", 0, 0, 6.03, 6.03));
        scenes.add("1", new Scene("1", 6.14, 7.8, 13.26, 14.50));
        scenes.add("2", new Scene("2", 15.16, 16.26, 21.49, 22.56));
        scenes.add("3", new Scene("3", 23.49, 24.69, 30.22, 31.32));
        scenes.add("4", new Scene("4", 31.59, 33.00, 38.60, 39.70));
        scenes.add("5", new Scene("5", 40.19, 41.00, 47.00, 47.80));
        scenes.add("6", new Scene("6", 48.4, 49.40, 55.10, 56.30));
        scenes.add("7", new Scene("7", 56.7, 57.90, 63.60, 64.60));
        scenes.add("8", new Scene("8", 65.1, 66.0, 72.1, 73.0));
        scenes.add("9", new Scene("9", 73.4, 74.3, 80.4, 81.4));
        scenes.add("10", new Scene("10", 81.7, 82.8, 88.6, 89.8));
        scenes.add("11", new Scene("11", 90.2, 91.3, 97.0, 98.2));
    }

    function createPlayer(){
        playerJS = videojs('player');
        player = new PlayerIOS(playerCallback, playerJS);
    }

    function playerCallback(data){
        //log("player callback called data="+data.handler);
        var handler = data.handler;

        switch(handler){
            case 'rangeComplete':
                //console.log("Range complete");
                //this.onRangeComplete();
                break;
            case 'playerCreationComplete':
                currentState = LOOPING;
                startIntro();
                //playerJS.el().appendChild($("#allZonesContainer"));
                StartButtonListener.init();
                //log("PLAYER READY. all zonesContainer moved to playerJS");
                break;
            case 'playerStateChanged':
               // this.onPlayerStateChanged(data.state);
                break;
        }
    }

    function startScene(){
        var range = scenes.get(currentScene.getId()).getRange();
        currentState = ZOOMING_IN;
        player.play(range);
    }

    function startIntro(){
        var range = scenes.get(currentScene.getId()).getRange();
        player.play(range);
    }

    
    return{
        init:function(){
            log("Im Application_iOS");
            createVideoSources();

            sceneBackButton = new SceneBackButton();
            zoomInButtonListenerJS = new ZoomInButtonListenerJS();

            createScenes();
            currentScene = scenes.get("intro");
            
            createControlsListener();
            zoomInButtonListenerJS.init();
            zoomInButtonListenerJS.create();

            new PathHoverListener();
            new ZoomOutButtonClickListener();

            createListeners();

            createPlayer();
        }
    }
}
