var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Application.ts"/>
var ApplicationIOS = (function (_super) {
    __extends(ApplicationIOS, _super);
    function ApplicationIOS() {
        _super.apply(this, arguments);
    }
    ApplicationIOS.prototype.create = function () {
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
    };
    ApplicationIOS.prototype.log = function (message) {
        console.log(message);
        this.$j("#logTextArea").append(message + "\n");
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    };
    return ApplicationIOS;
}(Application));
//# sourceMappingURL=ApplicationIOS.js.map