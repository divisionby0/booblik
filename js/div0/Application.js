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
var Application = (function () {
    function Application() {
        var _this = this;
        this.LOOPING = "looping";
        this.ZOOMING_OUT = "zoomingOut";
        this.ZOOMING_IN = "zoomingIn";
        this.playerCallback = function (data) {
            //console.log("player callback called data=",data);
            var handler = data.handler;
            switch (handler) {
                case 'rangeComplete':
                    //console.log("Range complete");
                    _this.onRangeComplete();
                    break;
                case 'playerCreationComplete':
                    _this.currentState = _this.LOOPING;
                    _this.startIntro();
                    StartButtonListener.init();
                    break;
                case 'playerStateChanged':
                    _this.onPlayerStateChanged(data.state);
                    break;
            }
        };
        this.$j = jQuery.noConflict();
        console.log("jQuery = ", this.$j);
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
        EventBus.addEventListener("ZOOM_OUT_CLICKED", function () { return _this.onZoomOutClicked(); });
        EventBus.addEventListener("SCENE_BUTTON_CLICKED", function (scene) { return _this.onSceneButtonClicked(scene); });
        //EventBus.addEventListener("ZOOM_IN_BUTTON_MOUSE_OVER", (sceneId)=>this.onZoomInButtonMouseOver(sceneId));
        //EventBus.addEventListener("ZOOM_IN_BUTTON_MOUSE_OUT", ()=>this.onZoomInButtonMouseOut());
        EventBus.addEventListener("CHANGE_PLAYER_SOURCES", function (sources) { return _this.changePlayerSourcesHandler(sources); });
        EventBus.addEventListener("ON_RESIZE", function (dimensions) { return _this.onResize(dimensions); });
    }
    Application.prototype.createPlayer = function () {
        this.videoPlayer = new Player(this.playerCallback);
    };
    Application.prototype.createScenes = function () {
        this.scenes = new Map('scenes');
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
        /*
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
        */
    };
    Application.prototype.startScene = function () {
        var range = this.scenes.get(this.currentScene.getId()).getRange();
        this.currentState = this.ZOOMING_IN;
        this.videoPlayer.play(range);
    };
    Application.prototype.startIntro = function () {
        var range = this.scenes.get(this.currentScene.getId()).getRange();
        this.videoPlayer.play(range);
    };
    Application.prototype.onRangeComplete = function () {
        this.videoPlayer.play(this.currentScene.getRange());
        this.showScenesControls();
        this.zoomInButtonListenerJS.create();
    };
    Application.prototype.changePlayerSourcesHandler = function (sources) {
        this.videoPlayer.changeSources(sources);
        this.showScenesControls();
        this.showPointerInfoContainer();
        this.hideBackButton();
        this.currentScene = this.scenes.get('intro');
        this.startScene();
    };
    Application.prototype.onResize = function (dimensions) {
        this.videoSources.updateSources(dimensions);
    };
    Application.prototype.onSceneButtonClicked = function (scene) {
        var sceneId = scene;
        this.onSceneSelect(sceneId);
        this.hideScenesControls();
        this.hidePointerInfoContainer();
    };
    Application.prototype.controlButtonClicked = function (event) {
        var sceneId = this.$j(event.target).data("scene");
        this.onSceneSelect(sceneId);
        this.hideScenesControls();
        this.hidePointerInfoContainer();
    };
    Application.prototype.startButtonClickHandler = function (event) {
        var myPlayer = videojs('player');
        myPlayer.play();
        this.videoPlayer.goFullScreen();
        this.$j("#startButton").hide();
        this.$j(".overlay_back_button").css("z-index", 2147483647);
    };
    Application.prototype.onSceneSelect = function (sceneId) {
        this.currentState = this.ZOOMING_OUT;
        this.currentScene = this.scenes.get(sceneId);
        this.videoPlayer.finishRange();
        this.zoomInButtonListenerJS.remove();
        // finish prev scene
    };
    Application.prototype.onBackButtonClicked = function () {
        this.hideBackButton();
        this.currentScene = this.scenes.get('intro');
        this.videoPlayer.finishRange();
    };
    Application.prototype.onPrevSceneZoomOutComplete = function () {
        this.startScene();
    };
    Application.prototype.createControlsListener = function () {
        var _this = this;
        this.$j(".overlayButton").click(function (event) { return _this.controlButtonClicked(event); });
        this.$j(".SVGHoverablePath").click(function () { return _this.onBackButtonClicked(); });
        this.$j("#backButton").click(function () { return _this.onBackButtonClicked(); });
        this.$j("#startButton").click(function (event) { return _this.startButtonClickHandler(event); });
        this.$j("#stopButton").click(function (event) { return _this.stopButtonClickHandler(event); });
    };
    Application.prototype.onPlayerStateChanged = function (state) {
        this.$j("#playerStateElement").text(state);
        this.currentState = state;
        if (this.currentState == this.LOOPING) {
            this.onLoopStarted();
        }
    };
    Application.prototype.showScenesControls = function () {
        this.$j(".overlayButton").show();
        this.$j("#allZonesContainer").show();
    };
    Application.prototype.hideScenesControls = function () {
        this.$j(".overlayButton").hide();
        this.$j("#allZonesContainer").hide();
    };
    Application.prototype.showPointerInfoContainer = function () {
        this.$j("#pointerInfoIconContainer").show();
    };
    Application.prototype.hidePointerInfoContainer = function () {
        this.$j("#pointerInfoIconContainer").hide();
    };
    Application.prototype.showBackButton = function () {
        this.$j("#backButton").show();
    };
    Application.prototype.hideBackButton = function () {
        this.$j("#backButton").hide();
        this.$j(".zoomOutButton").hide();
    };
    Application.prototype.onZoomOutClicked = function () {
        console.log("zoom out clicked");
    };
    Application.prototype.onLoopStarted = function () {
        var currentSceneId = this.currentScene.getId();
        if (currentSceneId != "intro") {
            new ShowZoomOutButton(this.currentScene.getId());
            this.showBackButton();
        }
        else {
            this.showPointerInfoContainer();
        }
    };
    Application.prototype.stopButtonClickHandler = function (event) {
        this.videoPlayer.stopPlaying();
    };
    Application.prototype.onZoomInButtonMouseOver = function (sceneId) {
        console.log("zoom in button mouse over scene id: " + sceneId);
        var scene = this.scenes.get("zone_" + sceneId + "_hover");
        if (scene) {
            var timeRange = scene.getRange();
            this.videoPlayer.play(timeRange);
        }
        else {
            console.error("scene not ready yet");
        }
    };
    Application.prototype.onZoomInButtonMouseOut = function () {
        var scene = this.scenes.get("intro");
        var timeRange = scene.getRange();
        this.videoPlayer.play(timeRange);
    };
    return Application;
}());
//# sourceMappingURL=Application.js.map