///<reference path="TimeRange.ts"/>
var Scene = (function () {
    function Scene(id, zoomInStartTime, loopStartTime, loopFinishTime, zoomOutFinishTime) {
        this.id = id;
        this.zoomInStartTime = zoomInStartTime;
        this.zoomOutFinishTime = zoomOutFinishTime;
        this.loopStartTime = loopStartTime;
        this.loopFinishTime = loopFinishTime;
    }
    Scene.prototype.getId = function () {
        return this.id;
    };
    Scene.prototype.getRange = function () {
        return new TimeRange(this.zoomInStartTime, this.zoomOutFinishTime, new TimeRange(this.loopStartTime, this.loopFinishTime));
    };
    return Scene;
}());
//# sourceMappingURL=Scene.js.map