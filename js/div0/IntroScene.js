var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Scene.ts"/>
var IntroScene = (function (_super) {
    __extends(IntroScene, _super);
    function IntroScene(id, zoomInStartTime, loopStartTime, loopFinishTime, zoomOutFinishTime) {
        _super.call(this, id, zoomInStartTime, loopStartTime, loopFinishTime, zoomOutFinishTime);
    }
    IntroScene.prototype.getRange = function () {
        return new TimeRange(0, this.zoomOutFinishTime, new TimeRange(this.loopStartTime, this.loopFinishTime));
    };
    return IntroScene;
}(Scene));
//# sourceMappingURL=IntroScene.js.map